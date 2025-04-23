package com.statrack.statrack.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.api.dto.ErrorResponse;
import com.statrack.statrack.exceptions.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
        throws IOException {
        ApiError error = ApiError.UNAUTHORIZED_ACCESS;
        ErrorResponse errorResponse = new ErrorResponse(
            error.getCode(),
            error.getMessage(),
            LocalDateTime.now()
        );

        response.setStatus(error.getStatus().value());
        response.setContentType("application/json");

        String json = objectMapper.writeValueAsString(errorResponse);
        System.out.println(json); // log it
        response.getWriter().write(json);
    }
}
