package com.statrack.statrack.security.auth;

import com.statrack.statrack.data.models.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  @NotBlank(message = "Ім'я обов'язкове")
  @Size(min = 1, max = 50, message = "Довжина імені повинна бути від 1 до 50 символів")
  private String firstname;

  @NotBlank(message = "Прізвище обов'язкове")
  @Size(min = 1, max = 50, message = "Довжина прізвища повинна бути від 1 до 50 символів")
  private String lastname;

  @NotBlank(message = "Електронна адреса обов'язкова")
  @Email(message = "Неправильний формат електронної адреси")
  private String email;

  @Past(message = "Дата народження повинна бути в минулому")
  private LocalDate birthday;

  @NotNull(message = "Роль обов'язкова")
  private Role role;

}