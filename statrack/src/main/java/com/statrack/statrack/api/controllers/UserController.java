package com.statrack.statrack.api.controllers;


import com.statrack.statrack.api.dto.CommonResponseDTO;
import com.statrack.statrack.api.dto.UpdateUserDto;
import com.statrack.statrack.api.dto.UserStatsDTO;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.security.auth.RegisterRequest;
import com.statrack.statrack.security.auth.RegistrationResponse;
import com.statrack.statrack.services.UserService;
import com.statrack.statrack.api.dto.UserDto;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsersDto();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        UserDto userDto = userService.getUserDtoById(id);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/available")
    public ResponseEntity<List<UserDto>> getAllAvailable(){
        return ResponseEntity.ok(userService.getUsersWithAvailableQueueSlots());
    }

    @GetMapping("/stats")
    public List<UserStatsDTO> getAllUserStats() {
        return userService.computeAllUserStats();
    }

    @PostMapping("/stats")
    public ResponseEntity<CommonResponseDTO> sendReport(@AuthenticationPrincipal User user) {
        userService.queueStatsReportEmail(user.getEmail());
        return ResponseEntity.ok(new CommonResponseDTO("Report sent"));
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(
        @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(userService.registerNewUser(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @ModelAttribute UpdateUserDto updateUserDto) {
        return ResponseEntity.ok(userService.updateUser(id, updateUserDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }



}
