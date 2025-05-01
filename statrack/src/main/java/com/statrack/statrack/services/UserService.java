package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import com.statrack.statrack.exceptions.NotFoundException;
import com.statrack.statrack.security.auth.RegisterRequest;
import com.statrack.statrack.security.auth.RegistrationResponse;
import com.statrack.statrack.services.emails.EmailService;
import com.statrack.statrack.services.mappers.UserMapper;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final EmailService emailService;

    @Value("${frontend.url}")
    private String frontendUrl;


    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    public RegistrationResponse registerNewUser(@Valid RegisterRequest request) {
        var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .birthday(request.getBirthday())
            .accountStatus(UserAccountStatus.PENDING_ACTIVATION)
            .role(request.getRole())
            .build();


        User savedUser = null;
        try {
            savedUser = userRepository.save(user);
        }

        catch (DataIntegrityViolationException e) {
            throw new ConstraintViolationException("Email is already in use",null);
        }

        String token = UUID.randomUUID().toString();
        ActivationToken activationToken = new ActivationToken();
        activationToken.setUser(user);
        activationToken.setToken(token);
        activationToken.setExpiryDate(LocalDateTime.now().plusDays(1)); // Expire in 24h

        activationTokenRepository.save(activationToken);

        String activationLink = frontendUrl + "/account/activate?token=" + token;
        emailService.sendMessage(user.getEmail(), "Activate Your Account",
            "Click the link to activate: " + activationLink);

        return RegistrationResponse.builder()
            .id(savedUser.getId().toString())
            .build();
    }

    public UserDto getUserDtoById(UUID id) {
        User user = userRepository.findById(id)
        .orElseThrow(() ->  new ApiException(ApiError.USER_NOT_FOUND));
        return UserMapper.toDto(user);
    }
    public User getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new ApiException(ApiError.USER_NOT_FOUND));
    }

    public User saveUser(User user) {
        return userRepository.save(user);

    }

    public UserDto updateUser(UUID userId, UserDto newData) {
        User user = this.getUserById(userId);

        user.setFirstname(newData.getFirstname());
        user.setLastname(newData.getLastname());
        //user.setRole(Role.valueOf(newData.getRole()));
        user.setEmail(newData.getEmail());
        //user.setDepartment(newData.getDepartment());
        //user.setAvatarUrl(newData.getAvatarUrl());


        user.setBirthday(newData.getBirthday());
        return UserMapper.toDto(userRepository.save(user));
    }
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
