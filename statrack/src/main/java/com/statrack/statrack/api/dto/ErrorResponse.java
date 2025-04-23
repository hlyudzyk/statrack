package com.statrack.statrack.api.dto;

import java.time.LocalDateTime;

public record ErrorResponse(
    String code,
    String message,
    LocalDateTime timestamp
) {}