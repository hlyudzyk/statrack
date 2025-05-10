package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.models.user.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClockingEventRepository extends
    JpaRepository<ClockingEvent, UUID> {

    Optional<ClockingEvent> findByUserId(UUID id);
    Page<ClockingEvent> findByUser(User user, Pageable pageable);
    List<ClockingEvent> findByUserAndTimestampBetween(User user, LocalDateTime from, LocalDateTime to);
    List<ClockingEvent> findAllByOrderByUserIdAscTimestampAsc();
}

