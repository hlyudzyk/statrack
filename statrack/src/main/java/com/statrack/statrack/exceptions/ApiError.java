package com.statrack.statrack.exceptions;

import org.springframework.http.HttpStatus;

public enum ApiError {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "ERR-001", "Користувача не знайдено"),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "ERR-002", "Адресу електронної пошти вже використано"),
    INVALID_PAYLOAD(HttpStatus.BAD_REQUEST, "ERR-003", "Неправильний формат запиту"),
    UNAUTHORIZED_ACCESS(HttpStatus.UNAUTHORIZED, "ERR-004", "Несанкціонований доступ"),
    INVALID_ACTIVATION_TOKEN(HttpStatus.BAD_REQUEST, "ERR-005", "Недійсний токен активації"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "ERR-006", "Ресурс не знайдено"),
    ALREADY_IN_QUEUE(HttpStatus.BAD_REQUEST, "ERR-007", "Ви вже подали запит до цього викладача");


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
