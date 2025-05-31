package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.EntryRequest;
import com.statrack.statrack.data.models.QueueEntry;
import com.statrack.statrack.data.models.QueueEntry.Status;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.repos.QueueEntryRepository;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import com.statrack.statrack.exceptions.ApiError;
import com.statrack.statrack.exceptions.ApiException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueueService {

    private final UsersQueueRepository usersQueueRepository;
    private final QueueEntryRepository queueEntryRepository;
    private final EmailService emailService;

    public List<QueueEntry> getTodayEntries() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return queueEntryRepository.findAllForToday(start, end);
    }
    public List<QueueEntry> getTodayPendingEntries() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return queueEntryRepository.findAllForToday(start, end);
    }

    public List<QueueEntry> getEntriesByUserAndStatus(UUID userId, QueueEntry.Status status) {
        return queueEntryRepository.findByUserAndStatus(userId, status);
    }

    public List<QueueEntry> getEntriesByUser(UUID userId) {
        return queueEntryRepository.findAllByUser(userId);
    }


    public boolean isTimeSlotAvailable(UUID queueId, LocalDateTime scheduledTime) {
        return !queueEntryRepository.existsByQueueIdAndScheduledTime(queueId, scheduledTime);
    }


    public QueueEntry addStudentToQueue(UUID userId, EntryRequest request) {
        UsersQueue queue = usersQueueRepository.getUsersQueueByBelongsToId(userId).orElseThrow(
            () -> new ApiException(ApiError.USER_NOT_FOUND)
        );
        QueueEntry entry = QueueEntry
            .builder()
            .queue(queue)
            .studentEmail(request.getStudentEmail())
            .studentName(request.getStudentName())
            .scheduledTime(request.getRequestedTime())
            .status(Status.ACCEPTED)
            .build();

        emailService.sendMessage(
            queue.getBelongsTo().getEmail(),
            "New queue entry!",
            String.format("%s has requested a meeting!", request.getStudentName())
        );

        return queueEntryRepository.save(entry);
    }

    public Optional<QueueEntry> getEntry(UUID entryId) {
        return queueEntryRepository.findById(entryId);
    }

    public void deleteEntry(UUID entryId) {
        queueEntryRepository.deleteById(entryId);
    }
}
