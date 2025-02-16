package com.statrack.statrack.security.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivateAccountRequest {
    private String password;
    private String token;
}
