package com.statrack.statrack.security.auth;


import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authService;
  private final ActivationTokenRepository activationTokenRepository;


  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    authService.refreshToken(request, response);
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @Valid @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(authService.authenticate(request));
  }

  @GetMapping("/validate-activation-token")
  public ResponseEntity<AuthTokenValidationResponse> validateActivationLink(@RequestParam String token) {
    Optional<ActivationToken> activationToken = authService.getActivationTokenIfValid(token);

    if (activationToken.isEmpty()) {
      return ResponseEntity.status(404).body(new AuthTokenValidationResponse(404,"Activation token is invalid or expired."));
    }

    return ResponseEntity.ok(new AuthTokenValidationResponse(200,"Activation token is valid."));

  }


  @PostMapping("/activate-account")
  public ResponseEntity<AuthenticationResponse> activateAccount(@RequestBody ActivateAccountRequest activateAccountRequest){
    Optional<ActivationToken> activationToken = authService.getActivationTokenIfValid(activateAccountRequest.getToken());
    if (activationToken.isEmpty()){
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(authService.activateAccount(activationToken.get(),activateAccountRequest.getPassword()));

  }


}
