package com.statrack.statrack.api.dto;

import com.statrack.statrack.data.models.user.Role;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

/**
 * DTO for {@link com.statrack.statrack.data.models.user.User}
 */
@Data
@NoArgsConstructor
public class UpdateUserDto implements Serializable {

    @NotNull
    @Size(max = 32)
    @NotEmpty
    @NotBlank
    private String firstname;
    @NotNull
    @Size(max = 32)
    @NotEmpty
    @NotBlank
    private String lastname;
    private Role role;
    @Past
    private LocalDate birthday;
    @Nullable
    private MultipartFile image;

//    @NotNull
//    private final User.UserAccountStatus accountStatus;
}