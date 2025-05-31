package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.QueueEntry;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QueueEntryRepository extends JpaRepository<QueueEntry, UUID> {
    @Query("SELECT e FROM QueueEntry e WHERE e.queue.belongsTo.id = :userId")
    List<QueueEntry> findAllByUser(UUID userId);

    @Query("SELECT e FROM QueueEntry e WHERE e.scheduledTime >= :startOfDay AND e.scheduledTime < :endOfDay")
    List<QueueEntry> findAllForToday(
        @Param("startOfDay") LocalDateTime startOfDay,
        @Param("endOfDay") LocalDateTime endOfDay
    );

    @Query("SELECT e FROM QueueEntry e WHERE e.status = 'PENDING' AND e.scheduledTime >= :startOfDay AND e.scheduledTime < :endOfDay")
    List<QueueEntry> findPendingForToday(
        @Param("startOfDay") LocalDateTime startOfDay,
        @Param("endOfDay") LocalDateTime endOfDay
    );

    List<QueueEntry> findByQueueId(UUID queueId);

    @Query("SELECT e FROM QueueEntry e WHERE e.queue.belongsTo.id = :userId AND e.status = :status")
    List<QueueEntry> findByUserAndStatus(@Param("userId") UUID userId, @Param("status") QueueEntry.Status status);

    @Query("SELECT COUNT(e) > 0 FROM QueueEntry e WHERE e.queue.id = :queueId AND e.scheduledTime = :time")
    boolean existsByQueueIdAndScheduledTime(@Param("queueId") UUID queueId, @Param("time") LocalDateTime time);

}
