package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.CreateEventDto;
import com.statrack.statrack.api.dto.EventDto;
import com.statrack.statrack.data.models.Event;
import com.statrack.statrack.data.models.user.User;
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
    private final FileStorageService fileStorageService;

    public EventDto createEvent(CreateEventDto eventDto, User createdBy) {
        String imageUrl = null;

        if (eventDto.getImage() != null && !eventDto.getImage().isEmpty()) {
            imageUrl = fileStorageService.storeFile(eventDto.getImage());
        }

        Event event = Event.builder()
            .content(eventDto.getContent())
            .header(eventDto.getHeader())
            .eventDate(eventDto.getEventDate())
            .imageUrl(imageUrl)
            .createdBy(createdBy)
            .build();

        return EventMapper.toEventDto(eventRepository.save(event));
    }

    public List<EventDto> findAllEvents() {
        return eventRepository.findAll().stream().map(EventMapper::toEventDto).toList();
    }
}
