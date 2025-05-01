package com.statrack.statrack.services;

import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class UserRoleService {

    private final UserRepository userRepository;

    public List<SimpleGrantedAuthority> getUserAuthorities(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getRole().getAuthorities();
    }





    @Transactional
    public User updateUserRole(UUID userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ApiError.USER_NOT_FOUND));
        user.setRole(newRole);
        return userRepository.save(user);
    }
}
