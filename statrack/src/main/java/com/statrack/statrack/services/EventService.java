package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.CreateEventDto;
import com.statrack.statrack.api.dto.EventDto;
import com.statrack.statrack.data.models.Event;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.repos.EventRepository;
import com.statrack.statrack.services.mappers.EventMapper;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<EventDto> findFutureEvents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "eventDate"));
        return eventRepository.findAll(pageable).map(EventMapper::toEventDto);
    }

    public Page<EventDto> findAllEvents(Pageable pageable) {
        return eventRepository.findAll(pageable).map(EventMapper::toEventDto);
    }

    public Page<EventDto> findAllEventsSortedByCreated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return eventRepository.findAll(pageable).map(EventMapper::toEventDto);
    }

    public Page<EventDto> findFilteredEvents(LocalDate date, String keyword, Pageable pageable) {
        if (date != null && keyword != null) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);
            return eventRepository.findByEventDateBetweenAndKeyword(start, end, keyword, pageable).map(EventMapper::toEventDto);
        } else if (date != null) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);
            return eventRepository.findByEventDateBetween(start, end, pageable).map(EventMapper::toEventDto);
        } else if (keyword != null) {
            return eventRepository.findByKeyword(keyword, pageable).map(EventMapper::toEventDto);
        } else {
            return eventRepository.findAll(pageable).map(EventMapper::toEventDto);
        }
    }

}
