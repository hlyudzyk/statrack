package com.statrack.statrack.api.dto;

import com.statrack.statrack.data.models.QueueEntry;
import com.statrack.statrack.data.models.QueueEntry.Status;
import java.time.LocalDateTime;
import java.util.UUID;

public record QueueEntryPublicDto(
    LocalDateTime scheduledTime,
    Status status
) {
    public static QueueEntryPublicDto from(QueueEntry entry) {
        return new QueueEntryPublicDto(
            entry.getScheduledTime(),
            entry.getStatus()
        );
    }
}
