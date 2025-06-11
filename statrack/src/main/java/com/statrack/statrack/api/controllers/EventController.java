package com.statrack.statrack.api.controllers;

import com.statrack.statrack.api.dto.CreateEventDto;
import com.statrack.statrack.api.dto.EventDto;

import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import com.statrack.statrack.services.EventService;
import com.statrack.statrack.services.mappers.UserMapper;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public ResponseEntity<Page<EventDto>> getEvents(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) LocalDate date,
        @RequestParam(required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<EventDto> events = eventService.findFilteredEvents(date, keyword, pageable);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@ModelAttribute CreateEventDto createEventDto, @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(eventService.createEvent(createEventDto, currentUser));
    }
}
