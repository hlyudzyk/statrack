package com.statrack.statrack.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntryRequest implements Serializable {
    @Email
    private String studentEmail;
    private String studentName;
    @NotNull
    @FutureOrPresent
    private LocalDateTime requestedTime;
}