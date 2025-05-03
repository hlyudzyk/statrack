package com.statrack.statrack.api.controllers;

import com.statrack.statrack.api.dto.EventDto;

import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import com.statrack.statrack.services.EventService;
import com.statrack.statrack.services.mappers.UserMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    private final AuditorAware<User> auditorAware;

    @GetMapping
    public ResponseEntity<List<EventDto>> getEvents() {
        List<EventDto> events = eventService.findAllEvents();
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }

    public ResponseEntity<EventDto> createEvent(@ModelAttribute EventDto eventDto) {
        User user = auditorAware.getCurrentAuditor().orElseThrow(() -> new ApiException(ApiError.UNAUTHORIZED_ACCESS));
        eventDto.setCreatedBy(UserMapper.toDto(user));
        return ResponseEntity.ok(eventService.createEvent(eventDto));
    }
}
