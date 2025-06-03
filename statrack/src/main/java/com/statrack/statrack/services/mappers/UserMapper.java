package com.statrack.statrack.services.mappers;

import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.models.user.User;
import org.springframework.security.core.GrantedAuthority;

public class UserMapper {

    public static UserDto toDto(User user) {
        if (user == null) return null;
        UsersQueue queue = user.getQueue();

        return new UserDto(
            String.valueOf(user.getId()),
            user.getFirstname(),
            user.getLastname(),
            user.getRole().name(),
            user.getStatus().toString(),
            user.getEmail(),
            user.getImageUrl(),
            user.getAccountStatus().name(),
            user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toArray(String[]::new),
            user.getBirthday(),
            queue.getMaxStudents(),
            queue.getComment(),
            ""
        );
    }

}
