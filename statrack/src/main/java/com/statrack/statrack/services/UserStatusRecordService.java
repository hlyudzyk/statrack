package com.statrack.statrack.services;

import com.statrack.statrack.data.models.UserStatusRecord;
import com.statrack.statrack.data.repos.UserStatusRecordRepository;
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
public class UserStatusRecordService {

    private final UserStatusRecordRepository userStatusRecordRepository;
    private final UserService userService;

    public UserStatusRecord createStatusRecord(User user, Status status) {
        user.setStatus(status);
        userService.saveUser(user);

        UserStatusRecord record = UserStatusRecord.builder()
            .user(user)
            .status(status)
            .timestamp(LocalDateTime.now())
            .build();
        return userStatusRecordRepository.save(record);
    }

    public List<UserStatusRecord> getStatusRecordsByUser(User user) {
        return userStatusRecordRepository.findByUser(user);
    }

    public List<UserStatusRecord> getStatusRecordsByUserAndTimeRange(User user, LocalDateTime start, LocalDateTime end) {
        return userStatusRecordRepository.findByUserAndTimestampBetween(user, start, end);
    }

    @Transactional
    public void deleteStatusRecord(UUID id) {
        userStatusRecordRepository.deleteById(id);
    }
}
