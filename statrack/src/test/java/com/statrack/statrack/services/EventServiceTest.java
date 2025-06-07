package com.statrack.statrack.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.statrack.statrack.api.dto.CreateEventDto;
import com.statrack.statrack.api.dto.EventDto;
import com.statrack.statrack.data.models.Event;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.Status;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.EventRepository;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UsersQueueRepository usersQueueRepository;

    @Mock
    private UserService userService;

    @Mock
    private FileStorageService fileStorageService;

    @InjectMocks
    private EventService eventService;

    @Test
    void
    shouldCreateEventWithImage() {
        MultipartFile mockImage = new MockMultipartFile("image", "test.jpg", "image/jpeg", "fakeimage".getBytes());
        CreateEventDto dto = new CreateEventDto();
        dto.setContent("Sample content");
        dto.setHeader("Sample header");
        dto.setEventDate(LocalDateTime.of(2025, 5, 25, 14, 0));
        dto.setImage(mockImage);

        User mockUser = new User();
        UsersQueue queue =UsersQueue.builder().belongsTo(mockUser).maxStudents(5).build();
        mockUser.setAccountStatus(UserAccountStatus.ACTIVE);
        mockUser.setId(UUID.randomUUID());
        mockUser.setFirstname("John");
        mockUser.setRole(Role.ADMIN);
        mockUser.setStatus(Status.ONLINE);
        mockUser.setQueue(queue);
        usersQueueRepository.save(queue);


        when(fileStorageService.storeFile(mockImage)).thenReturn("http://storage.com/test.jpg");
        when(eventRepository.save(any(Event.class))).thenAnswer(i -> {
            Event e = i.getArgument(0);
            e.setId(UUID.randomUUID());
            return e;
        });

        EventDto result = eventService.createEvent(dto, mockUser);

        assertNotNull(result);
        assertEquals("Sample content", result.getContent());
        assertEquals("http://storage.com/test.jpg", result.getImageUrl());
        verify(eventRepository, times(1)).save(any(Event.class));
        verify(fileStorageService, times(1)).storeFile(mockImage);
    }

    @Test
    void shouldReturnFilteredEventsByDateAndKeyword() {
        Pageable pageable = PageRequest.of(0, 10);
        LocalDate date = LocalDate.of(2025, 5, 25);
        String keyword = "concert";

        List<Event> mockEvents = List.of(
            Event.builder().id(UUID.randomUUID()).header("Rock concert").eventDate(date.atStartOfDay()).build()
        );

        when(eventRepository.findByEventDateBetweenAndKeyword(
            any(LocalDateTime.class), any(LocalDateTime.class), eq(keyword), eq(pageable))
        ).thenReturn(new PageImpl<>(mockEvents));

        Page<EventDto> result = eventService.findFilteredEvents(date, keyword, pageable);


        assertEquals(1, result.getTotalElements());
        verify(eventRepository).findByEventDateBetweenAndKeyword(any(), any(), eq(keyword), eq(pageable));
    }
}
