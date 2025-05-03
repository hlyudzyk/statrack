package com.statrack.statrack.services.mappers;

import com.statrack.statrack.api.dto.EventDto;
import com.statrack.statrack.data.models.Event;

public class EventMapper {
    public static EventDto toEventDto(final Event event) {
        return new EventDto(
            event.getId().toString(),
            event.getHeader(),
            event.getContent(),
            event.getImageUrl(),
            event.getEventDate(),
            UserMapper.toDto(event.getCreatedBy()),
            event.getCreatedAt()
        );
    }

}
