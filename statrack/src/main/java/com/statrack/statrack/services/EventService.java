package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.EventDto;
import com.statrack.statrack.data.models.Event;
import com.statrack.statrack.data.repos.EventRepository;
import com.statrack.statrack.services.mappers.EventMapper;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserService userService;

    public EventDto createEvent(EventDto eventDto) {
        Event event = Event.builder()
            .content(eventDto.getContent())
            .header(eventDto.getHeader())
            .eventDate(eventDto.getEventDate())
            .imageUrl(eventDto.getImageUrl())
            .createdBy(userService.getUserById(UUID.fromString(eventDto.getCreatedBy().getId())))
            .build();

        return EventMapper.toEventDto(eventRepository.save(event));
    }

    public List<EventDto> findAllEvents() {
        return eventRepository.findAll().stream().map(EventMapper::toEventDto).toList();
    }
}
