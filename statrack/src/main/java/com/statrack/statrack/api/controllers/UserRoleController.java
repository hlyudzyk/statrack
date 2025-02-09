package com.statrack.statrack.api.controllers;

import com.statrack.statrack.security.user.Role;
import com.statrack.statrack.security.user.User;
import com.statrack.statrack.services.UserRoleService;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/v1/user-roles")
public class UserRoleController {
    private final UserRoleService userRoleService;

    @Autowired
    public UserRoleController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @GetMapping("/{userId}/authorities")
    public ResponseEntity<List<SimpleGrantedAuthority>> getUserAuthorities(@PathVariable UUID userId) {
        List<SimpleGrantedAuthority> authorities = userRoleService.getUserAuthorities(userId);
        return new ResponseEntity<>(authorities, HttpStatus.OK);
    }

    @PutMapping("/{userId}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable UUID userId, @RequestBody Role newRole) {
        User updatedUser = userRoleService.updateUserRole(userId, newRole);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
