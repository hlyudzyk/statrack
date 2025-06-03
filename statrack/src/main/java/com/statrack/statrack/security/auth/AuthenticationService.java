package com.statrack.statrack.security.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.models.user.User.Status;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import com.statrack.statrack.security.config.JwtService;
import com.statrack.statrack.security.token.Token;
import com.statrack.statrack.security.token.TokenRepository;
import com.statrack.statrack.security.token.TokenType;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
  private final UserRepository userRepository;
  private final UsersQueueRepository usersQueueRepository;

  public AuthenticationResponse authenticate(@Valid AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    user.setStatus(Status.ONLINE);
    repository.save(user);


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


  public ActivationToken getActivationTokenIfValid(String token){
    return activationTokenRepository.findByTokenAndExpiryDateGreaterThan(token, LocalDateTime.now()).orElseThrow(() -> new ApiException(
        ApiError.INVALID_ACTIVATION_TOKEN));
  }

  @Transactional
  public AuthenticationResponse activateAccount(ActivationToken token, String password) {
    User user = token.getUser();
    user.setAccountStatus(UserAccountStatus.ACTIVE);
    user.setStatus(Status.ONLINE);
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
    activationTokenRepository.delete(token);


    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);

    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .id(user.getId().toString())
        .build();
  }


}
