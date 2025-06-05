package com.statrack.statrack.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;

import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.api.dto.UserStatsDTO;
import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.models.user.ActivationToken;
import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.Status;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.ActivationTokenRepository;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.data.repos.UserRepository;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import com.statrack.statrack.security.auth.RegisterRequest;
import com.statrack.statrack.security.auth.RegistrationResponse;
import com.statrack.statrack.services.email.EmailService;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UsersQueueRepository usersQueueRepository;
    @Mock
    private ActivationTokenRepository activationTokenRepository;
    @Mock
    private ClockingEventRepository clockingEventRepository;
    @Mock
    private EmailService emailService;
    @Mock
    private FileStorageService fileStorageService;
    @Mock
    private RabbitTemplate rabbitTemplate;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(userService, "frontendUrl", "http://localhost:3000");
    }

    @Test
    void testGetAllUsersDto() {
        User user = User.builder()
            .id(UUID.randomUUID())
            .firstname("John")
            .lastname("Doe")
            .accountStatus(UserAccountStatus.ACTIVE)
            .email("john@example.com")
            .role(Role.ADMIN)
            .status(Status.ONLINE)
            .build();
        UsersQueue queue =UsersQueue.builder().belongsTo(user).maxStudents(5).build();
        usersQueueRepository.save(queue);
        user.setQueue(queue);

        Mockito.when(userRepository.findAll()).thenReturn(List.of(user));

        List<UserDto> result = userService.getAllUsersDto();

        assertEquals(1, result.size());
        assertEquals("John", result.get(0).getFirstname());
    }

    @Test
    void testRegisterNewUser_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setFirstname("Alice");
        request.setLastname("Smith");
        request.setEmail("alice@example.com");
        request.setBirthday(LocalDate.of(1990, 1, 1));
        request.setRole(Role.ADMIN);

        User savedUser = User.builder()
            .id(UUID.randomUUID())
            .email("alice@example.com")
            .firstname("Alice")
            .lastname("Smith")
            .birthday(LocalDate.of(1990, 1, 1))
            .accountStatus(UserAccountStatus.PENDING_ACTIVATION)
            .status(Status.ONLINE)
            .role(Role.ADMIN)
            .build();

        UsersQueue queue =UsersQueue.builder().belongsTo(savedUser).maxStudents(5).build();
        savedUser.setQueue(queue);
        usersQueueRepository.save(queue);

        Mockito.when(userRepository.save(Mockito.any())).thenReturn(savedUser);

        RegistrationResponse response = userService.registerNewUser(request);

        assertNotNull(response.getId());
        Mockito.verify(activationTokenRepository).save(Mockito.any(ActivationToken.class));
        Mockito.verify(emailService).sendMessage(
            eq("alice@example.com"),
            contains("Вас було доєднано до платформи"),
            contains("/account/activate?token=")
        );
    }

    @Test
    void testComputeAllUserStats() {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setEmail("testUser@example.com");
        user.setAccountStatus(UserAccountStatus.ACTIVE);
        UsersQueue queue =UsersQueue.builder().belongsTo(user).maxStudents(5).build();
        user.setQueue(queue);
        usersQueueRepository.save(queue);

        ClockingEvent event1 = new ClockingEvent();
        event1.setUser(user);
        event1.setStatus(Status.ONLINE);
        event1.setTimestamp(LocalDateTime.of(2023, 1, 1, 9, 0));

        ClockingEvent event2 = new ClockingEvent();
        event2.setUser(user);
        event2.setStatus(Status.ON_BREAK);
        event2.setTimestamp(LocalDateTime.of(2023, 1, 1, 12, 0));

        Mockito.when(clockingEventRepository.findAllByOrderByUserIdAscTimestampAsc())
            .thenReturn(List.of(event1, event2));

        List<UserStatsDTO> stats = userService.computeAllUserStats();

        assertEquals(1, stats.size());
        UserStatsDTO stat = stats.get(0);
        assertEquals("testUser@example.com", stat.getUsername());
        assertEquals(Duration.ofHours(3), stat.getTotalOnlineTime());
        assertEquals(1, stat.getTotalSessions());
    }
}
