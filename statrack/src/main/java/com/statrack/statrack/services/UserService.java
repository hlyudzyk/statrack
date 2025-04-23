package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.exceptions.NotFoundException;
import com.statrack.statrack.services.mappers.UserMapper;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("User not found: " + id));
        return UserMapper.toDto(user);
    }

    public User saveUser(User user) {
        return userRepository.save(user);

    }
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
