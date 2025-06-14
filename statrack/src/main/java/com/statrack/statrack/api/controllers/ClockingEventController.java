package com.statrack.statrack.api.controllers;

import com.statrack.statrack.api.dto.ClockingEventDTO;
import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.services.UserService;
import com.statrack.statrack.services.ClockingEventService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clocking-events/by-user-id")
@RequiredArgsConstructor
public class ClockingEventController {
    private final ClockingEventService clockingEventService;
    private final UserService userService;

    @PostMapping("/{userId}")
    public ResponseEntity<ClockingEventDTO> createClockingEvent(@PathVariable UUID userId, @RequestBody ClockingEventDTO clockingEventDTO) {
        ClockingEventDTO clockingEvent = ClockingEventDTO.from(clockingEventService.createClockingEvent(userId, clockingEventDTO));
        return new ResponseEntity<>(clockingEvent, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Page<ClockingEvent>> getClockingEventByUser(
        @PathVariable UUID userId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        User user = userService.getUserById(userId);
        Page<ClockingEvent> clockingEvents = clockingEventService.getClockingEventsByUser(user, page, size);
        return new ResponseEntity<>(clockingEvents, HttpStatus.OK);
    }

    @GetMapping("/{userId}/range")
    public ResponseEntity<List<ClockingEvent>> getClockingEventsByUserAndTimeRange(
        @PathVariable UUID userId,
        @RequestParam LocalDateTime start,
        @RequestParam LocalDateTime end) {
        User user = userService.getUserById(userId);
        List<ClockingEvent> clockingEvents = clockingEventService.getClockingEventsByUserAndTimeRange(user, start, end);
        return new ResponseEntity<>(clockingEvents, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClockingEvent(@PathVariable UUID id) {
        clockingEventService.deleteClockingEvent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
