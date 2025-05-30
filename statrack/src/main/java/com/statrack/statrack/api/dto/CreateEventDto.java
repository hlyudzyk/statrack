package com.statrack.statrack.api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEventDto implements Serializable {
    private String id;
    @NotNull
    @Size(max = 255)
    @NotEmpty
    @NotBlank
    private String header;

    private String content;

    private MultipartFile image;

    @NotNull
    @FutureOrPresent
    private LocalDateTime eventDate;
}