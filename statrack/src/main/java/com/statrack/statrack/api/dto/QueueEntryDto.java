package com.statrack.statrack.api.dto;

import com.statrack.statrack.data.models.QueueEntry;
import com.statrack.statrack.data.models.QueueEntry.Status;
import java.time.LocalDateTime;
import java.util.UUID;

public record QueueEntryDto(
    UUID id,
    String studentName,
    String studentEmail,
    LocalDateTime scheduledTime,
    Status status
) {
    public static QueueEntryDto from(QueueEntry entry) {
        return new QueueEntryDto(
            entry.getId(),
            entry.getStudentName(),
            entry.getStudentEmail(),
            entry.getScheduledTime(),
            entry.getStatus()
        );
    }
}
