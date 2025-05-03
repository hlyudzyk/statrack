package com.statrack.statrack.api.dto;

import java.io.Serializable;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
    @NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {
    private String id;
    private String firstname;
    private String lastname;
    private String role;
    private String status;
    private String email;
    private String department;
    private String avatarUrl;
    private String[] authorities;
    private LocalDate birthday;
}
