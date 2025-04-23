package com.statrack.statrack.exceptions;

import org.springframework.http.HttpStatus;

public enum ApiError {
    USER_NOT_FOUND    (HttpStatus.NOT_FOUND,   "ERR-001", "User not found"),
    DUPLICATE_EMAIL   (HttpStatus.CONFLICT,    "ERR-002", "Email address is already in use"),
    INVALID_PAYLOAD   (HttpStatus.BAD_REQUEST,  "ERR-003", "Request payload is invalid"),
    UNAUTHORIZED_ACCESS   (HttpStatus.UNAUTHORIZED,  "ERR-004", "Unauthorized access");


    private final HttpStatus status;
    private final String code;
    private final String message;

    ApiError(HttpStatus status, String code, String message) {
        this.status  = status;
        this.code    = code;
        this.message = message;
    }

    public HttpStatus getStatus()  { return status;  }
    public String     getCode()    { return code;    }
    public String     getMessage() { return message; }
}
