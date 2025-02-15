package com.statrack.statrack.api.controllers;


import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.services.UserService;
import com.statrack.statrack.api.dto.UserDto;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @ModelAttribute UserDto updateUserDto) {
        return userService.getUserById(id)
            .map(user -> {
                user.setFirstname(updateUserDto.getFirstname());
                user.setLastname(updateUserDto.getLastname());
                user.setRole(Role.valueOf(updateUserDto.getRole()));
                userService.saveUser(user);
                return ResponseEntity.ok(user);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
