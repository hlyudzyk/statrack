package com.statrack.statrack.views.controllers;

import com.statrack.statrack.data.models.UserStatusRecord;
import com.statrack.statrack.security.user.User;
import com.statrack.statrack.security.user.User.Status;
import com.statrack.statrack.services.UserService;
import com.statrack.statrack.services.UserStatusRecordService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/status-records")
@RequiredArgsConstructor
public class UserStatusRecordController {
    private final UserStatusRecordService userStatusRecordService;
    private final UserService userService;

    @PostMapping("/{userId}")
    public ResponseEntity<UserStatusRecord> createStatusRecord(@PathVariable UUID userId, @RequestParam Status status) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserStatusRecord record = userStatusRecordService.createStatusRecord(user.get(), status);
        return new ResponseEntity<>(record, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserStatusRecord>> getStatusRecordsByUser(@PathVariable UUID userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<UserStatusRecord> records = userStatusRecordService.getStatusRecordsByUser(user.get());
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    @GetMapping("/{userId}/range")
    public ResponseEntity<List<UserStatusRecord>> getStatusRecordsByUserAndTimeRange(
        @PathVariable UUID userId,
        @RequestParam LocalDateTime start,
        @RequestParam LocalDateTime end) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<UserStatusRecord> records = userStatusRecordService.getStatusRecordsByUserAndTimeRange(user.get(), start, end);
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatusRecord(@PathVariable UUID id) {
        userStatusRecordService.deleteStatusRecord(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
