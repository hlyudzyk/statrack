package com.statrack.statrack.exceptions;

public class ApiException extends RuntimeException {
    private final ApiError error;

    public ApiException(ApiError error) {
        super(error.getMessage());
        this.error = error;
    }

    public ApiError getError() {
        return error;
    }
}

