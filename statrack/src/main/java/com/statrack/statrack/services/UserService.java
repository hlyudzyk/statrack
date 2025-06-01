package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.UpdateUserDto;
import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.api.dto.UserStatsDTO;
import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.Status;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import com.statrack.statrack.security.auth.RegisterRequest;
import com.statrack.statrack.security.auth.RegistrationResponse;
import com.statrack.statrack.services.mappers.UserMapper;
import com.statrack.statrack.services.messages.StatsReportRequest;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final ClockingEventRepository clockingEventRepository;
    private final EmailService emailService;
    private final FileStorageService fileStorageService;
    private final RabbitTemplate rabbitTemplate;
    private final UsersQueueRepository usersQueueRepository;
    @Value("${frontend.url}")
    private String frontendUrl;


    public List<UserDto> getAllUsersDto() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public RegistrationResponse registerNewUser(@Valid RegisterRequest request) {
        var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .birthday(request.getBirthday())
            .accountStatus(UserAccountStatus.PENDING_ACTIVATION)
            .status(Status.ONLINE)
            .role(request.getRole())
            .build();


        User savedUser = null;
        try {
            savedUser = userRepository.save(user);
        }

        catch (DataIntegrityViolationException e) {
            throw new ApiException(ApiError.DUPLICATE_EMAIL);
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

    @Transactional
    public UserDto updateUser(UUID userId, UpdateUserDto newData) {
        User user = this.getUserById(userId);
        UsersQueue queue = user.getQueue();

        if (newData.getFirstname() != null) {
            user.setFirstname(newData.getFirstname());
        }

        if (newData.getLastname() != null) {
            user.setLastname(newData.getLastname());
        }

        if (newData.getRole() != null) {
            user.setRole(newData.getRole());
        }

        if (newData.getBirthday() != null) {
            user.setBirthday(newData.getBirthday());
        }

        if (newData.getImage() != null && !newData.getImage().isEmpty()) {
            String imageUrl = fileStorageService.storeFile(newData.getImage());
            user.setImageUrl(imageUrl);
        }

        queue.setMaxStudents(newData.getQueueSize());
        queue.setComment(newData.getQueueComment());
        usersQueueRepository.save(queue);


        return UserMapper.toDto(userRepository.save(user));
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }


    public List<UserStatsDTO> computeAllUserStats() {
        List<ClockingEvent> allEvents = clockingEventRepository.findAllByOrderByUserIdAscTimestampAsc();
        Map<UUID, List<ClockingEvent>> eventsByUser = allEvents.stream()
            .collect(Collectors.groupingBy(event -> event.getUser().getId()));

        List<UserStatsDTO> statsList = new ArrayList<>();

        for (var entry : eventsByUser.entrySet()) {
            UUID userId = entry.getKey();
            List<ClockingEvent> events = entry.getValue();
            String username = events.getFirst().getUser().getUsername();

            Duration onlineDuration = Duration.ZERO;
            Duration breakDuration = Duration.ZERO;
            int sessions = 0;

            for (int i = 0; i < events.size() - 1; i++) {
                ClockingEvent current = events.get(i);
                ClockingEvent next = events.get(i + 1);
                Duration duration = Duration.between(current.getTimestamp(), next.getTimestamp());

                switch (current.getStatus()) {
                    case ONLINE -> {
                        onlineDuration = onlineDuration.plus(duration);
                        sessions++;
                    }
                    case ON_BREAK -> breakDuration = breakDuration.plus(duration);
                }
            }

            Duration averageSession = sessions > 0 ? onlineDuration.dividedBy(sessions) : Duration.ZERO;

            statsList.add(new UserStatsDTO(userId.toString(), username, onlineDuration, breakDuration, sessions, averageSession));
        }

        return statsList;
    }


    public void queueStatsReportEmail(String toEmail) {
        StatsReportRequest request = new StatsReportRequest();
        request.setEmail(toEmail);
        rabbitTemplate.convertAndSend("statsReportQueue", request);
    }

    public List<UserDto> getUsersWithAvailableQueueSlots() {
        return userRepository.findAll().stream()
            .filter(user -> {
                UsersQueue queue = user.getQueue();
                return queue != null &&
                    queue.getEntries().size() < queue.getMaxStudents();
            }).map(UserMapper::toDto)
            .toList();
    }
}
