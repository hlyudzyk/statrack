package com.statrack.statrack.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.statrack.statrack.api.dto.ClockingEventDTO;
import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.Status;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.services.email.EmailService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class ClockingEventServiceTest {

    @Mock
    private ClockingEventRepository clockingEventRepository;

    @Mock
    private UserService userService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ClockingEventService clockingEventService;

    private User mockUser;
    private User otherUser;

    @BeforeEach
    void setup() {
        mockUser = User.builder()
            .id(UUID.randomUUID())
            .firstname("John")
            .lastname("Doe")
            .role(Role.ADMIN)
            .email("john@example.com")
            .status(Status.OFFLINE)
            .build();

        otherUser = User.builder()
            .id(UUID.randomUUID())
            .firstname("Alice")
            .lastname("Smith")
            .role(Role.ADMIN)
            .email("alice@example.com")
            .status(Status.ONLINE)
            .build();
    }

    @Test
    void createClockingEvent_shouldUpdateUserStatus_SaveEvent_AndNotifyOthers() {
        // Arrange
        when(userService.getUserById(mockUser.getId())).thenReturn(mockUser);
        when(userService.saveUser(any(User.class))).thenReturn(mockUser);
        when(userService.getAllUsers()).thenReturn(List.of(mockUser, otherUser));
        when(clockingEventRepository.save(any(ClockingEvent.class))).thenAnswer(inv -> inv.getArgument(0));

        // Act
        ClockingEvent result = clockingEventService.createClockingEvent(mockUser.getId(), new ClockingEventDTO(Status.ONLINE,""));

        // Assert
        assertNotNull(result);
        assertEquals(Status.ONLINE, result.getStatus());
        assertEquals(mockUser, result.getUser());

        verify(userService).getUserById(mockUser.getId());
        verify(userService).saveUser(mockUser);
        verify(clockingEventRepository).save(any(ClockingEvent.class));

        verify(emailService).sendMessage(
            eq(otherUser.getEmail()),
            contains("is now ONLINE"),
            contains("has changed their status to ONLINE")
        );
    }

    @Test
    void deleteClockingEvent_shouldCallRepositoryDeleteById() {
        // Arrange
        UUID eventId = UUID.randomUUID();

        // Act
        clockingEventService.deleteClockingEvent(eventId);

        // Assert
        verify(clockingEventRepository).deleteById(eventId);
    }

    @Test
    void getClockingEventsByUser_shouldReturnPage() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "timestamp"));
        Page<ClockingEvent> mockPage = new PageImpl<>(List.of());
        when(clockingEventRepository.findByUser(mockUser, pageable)).thenReturn(mockPage);

        // Act
        Page<ClockingEvent> result = clockingEventService.getClockingEventsByUser(mockUser, 0, 10);

        // Assert
        assertEquals(mockPage, result);
        verify(clockingEventRepository).findByUser(mockUser, pageable);
    }

    @Test
    void getClockingEventsByUserAndTimeRange_shouldReturnList() {
        // Arrange
        LocalDateTime start = LocalDateTime.now().minusHours(1);
        LocalDateTime end = LocalDateTime.now();
        List<ClockingEvent> expected = List.of();
        when(clockingEventRepository.findByUserAndTimestampBetween(mockUser, start, end)).thenReturn(expected);

        // Act
        List<ClockingEvent> result = clockingEventService.getClockingEventsByUserAndTimeRange(mockUser, start, end);

        // Assert
        assertEquals(expected, result);
        verify(clockingEventRepository).findByUserAndTimestampBetween(mockUser, start, end);
    }
}
