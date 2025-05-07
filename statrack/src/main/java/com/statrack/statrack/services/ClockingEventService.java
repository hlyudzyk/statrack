package com.statrack.statrack.services;

import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.Status;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class ClockingEventService {

    private final ClockingEventRepository clockingEventRepository;
    private final UserService userService;

    public ClockingEvent createClockingEvent(UUID id, Status status) {
        User user = userService.getUserById(id);
        user.setStatus(status);
        userService.saveUser(user);

        ClockingEvent clockingEvent = ClockingEvent.builder()
            .user(user)
            .status(status)
            .timestamp(LocalDateTime.now())
            .build();
        return clockingEventRepository.save(clockingEvent);
    }

    public Page<ClockingEvent> getClockingEventsByUser(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return clockingEventRepository.findByUser(user, pageable);
    }

    public List<ClockingEvent> getClockingEventsByUserAndTimeRange(User user, LocalDateTime start, LocalDateTime end) {
        return clockingEventRepository.findByUserAndTimestampBetween(user, start, end);
    }

    @Transactional
    public void deleteClockingEvent(UUID id) {
        clockingEventRepository.deleteById(id);
    }
}
