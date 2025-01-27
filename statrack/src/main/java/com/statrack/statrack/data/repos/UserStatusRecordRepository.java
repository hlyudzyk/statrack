package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.UserStatusRecord;
import com.statrack.statrack.security.user.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserStatusRecordRepository extends
    JpaRepository<UserStatusRecord, UUID> {

    Optional<UserStatusRecord> findByUserId(UUID id);
    List<UserStatusRecord> findByUser(User user);
    List<UserStatusRecord> findByUserAndTimestampBetween(User user, LocalDateTime from, LocalDateTime to);
}
