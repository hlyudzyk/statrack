package com.statrack.statrack.services.mappers;

import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.user.User;
import org.springframework.security.core.GrantedAuthority;

public class UserMapper {

    public static UserDto toDto(User user) {
        if (user == null) return null;

        return new UserDto(
            String.valueOf(user.getId()),
            user.getFirstname(),
            user.getLastname(),
            user.getRole().name(), // or user.getRole().toString()
            user.getStatus().toString(),
            user.getEmail(),
            "department fixme",
            "avatar url fixme",
            user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toArray(String[]::new),
            user.getBirthday()
        );
    }
}
