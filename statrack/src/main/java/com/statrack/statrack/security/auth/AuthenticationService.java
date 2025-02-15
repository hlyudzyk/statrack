package com.statrack.statrack.security.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import com.statrack.statrack.security.config.JwtService;
import com.statrack.statrack.security.token.Token;
import com.statrack.statrack.security.token.TokenRepository;
import com.statrack.statrack.security.token.TokenType;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.services.util.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


@Service
@RequiredArgsConstructor
@Validated
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final ActivationTokenRepository activationTokenRepository;
  private final EmailService emailService;

  @Value("${frontend.url}")
  private String frontendUrl;

  public RegistrationResponse register(@Valid RegisterRequest request) {
    var user = User.builder()
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .email(request.getEmail())
        .birthday(request.getBirthday())
        .accountStatus(UserAccountStatus.PENDING_ACTIVATION)
        .role(request.getRole())
        .build();


    User savedUser = null;
    try {
      savedUser = repository.save(user);
    }

    catch (DataIntegrityViolationException e) {
      throw new ConstraintViolationException("Email is already in use",null);
    }

    String token = UUID.randomUUID().toString();
    ActivationToken activationToken = new ActivationToken();
    activationToken.setUser(user);
    activationToken.setToken(token);
    activationToken.setExpiryDate(LocalDateTime.now().plusDays(1)); // Expire in 24h

    activationTokenRepository.save(activationToken);

    String activationLink = frontendUrl + "/account/activate?token=" + token;
    emailService.sendMessage(user.getEmail(), "Activate Your Account",
        "Click the link to activate: " + activationLink);

    return RegistrationResponse.builder()
        .id(savedUser.getId().toString())
        .build();
  }

  public AuthenticationResponse authenticate(@Valid AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();


    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .id(user.getId().toString())
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .id(user.getId().toString())
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
