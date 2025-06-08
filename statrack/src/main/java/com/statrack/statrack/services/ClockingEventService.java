package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.ClockingEventDTO;
import com.statrack.statrack.data.models.ClockingEvent;
import com.statrack.statrack.data.repos.ClockingEventRepository;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.services.email.EmailService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final EmailService emailService;

    public ClockingEvent createClockingEvent(UUID id, ClockingEventDTO dto) {
        User user = userService.getUserById(id);
        user.setStatus(dto.getStatus());
        userService.saveUser(user);

        ClockingEvent clockingEvent = ClockingEvent.builder()
            .user(user)
            .status(dto.getStatus())
            .comment(dto.getComment())
            .timestamp(LocalDateTime.now())
            .build();

        notifyUsers(clockingEvent);

        return clockingEventRepository.save(clockingEvent);
    }


    public void notifyUsers(ClockingEvent clockingEvent) {
        List<User> allUsers = userService.getAllUsers();
        for (User otherUser : allUsers) {
            if (!otherUser.getId().equals(clockingEvent.getUser().getId())) {
                emailService.sendMessage(
                    otherUser.getEmail(),
                    String.format("%s %s змінив(-ла) статус на %s", clockingEvent.getUser().getFirstname(), clockingEvent.getUser().getLastname(), clockingEvent.getStatus()),
                    String.format("[ %s ] Викладач %s %s змінив(-ла) статус на %s",clockingEvent.getTimestamp()c.format(
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),  clockingEvent.getUser().getFirstname(), clockingEvent.getUser().getLastname(), clockingEvent.getStatus())
                );
            }
        }

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
