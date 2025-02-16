package com.statrack.statrack.services;

import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.repos.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);

    }
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
