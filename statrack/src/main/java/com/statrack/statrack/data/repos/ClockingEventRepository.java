package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.security.user.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClockingEventRepository extends
    JpaRepository<ClockingEvent, UUID> {

    Optional<ClockingEvent> findByUserId(UUID id);
    List<ClockingEvent> findByUser(User user);
    List<ClockingEvent> findByUserAndTimestampBetween(User user, LocalDateTime from, LocalDateTime to);
}
