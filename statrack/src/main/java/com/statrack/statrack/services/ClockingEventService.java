package com.statrack.statrack.services;

import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.security.user.User;
import com.statrack.statrack.security.user.User.Status;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class ClockingEventService {

    private final ClockingEventRepository clockingEventRepository;
    private final UserService userService;

    public ClockingEvent createClockingEvent(User user, Status status) {
        user.setStatus(status);
        userService.saveUser(user);

        ClockingEvent clockingEvent = ClockingEvent.builder()
            .user(user)
            .status(status)
            .timestamp(LocalDateTime.now())
            .build();
        return clockingEventRepository.save(clockingEvent);
    }

    public List<ClockingEvent> getClockingEventsByUser(User user) {
        return clockingEventRepository.findByUser(user);
    }

    public List<ClockingEvent> getClockingEventsByUserAndTimeRange(User user, LocalDateTime start, LocalDateTime end) {
        return clockingEventRepository.findByUserAndTimestampBetween(user, start, end);
    }

    @Transactional
    public void deleteClockingEvent(UUID id) {
        clockingEventRepository.deleteById(id);
    }
}
