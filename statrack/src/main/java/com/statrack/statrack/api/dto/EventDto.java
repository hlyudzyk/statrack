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


/**
 * DTO for {@link com.statrack.statrack.data.models.Event}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDto implements Serializable {
    private String id;
    private String header;
    private String content;
    private String imageUrl;
    private LocalDateTime eventDate;
    private UserDto createdBy;
    private LocalDateTime createdAt;
}