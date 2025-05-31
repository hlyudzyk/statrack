package com.statrack.statrack.api.controllers;

import com.statrack.statrack.api.dto.EntryRequest;
import com.statrack.statrack.api.dto.QueueEntryDto;
import com.statrack.statrack.api.dto.UserDto;
import com.statrack.statrack.data.models.QueueEntry;
import com.statrack.statrack.data.models.UsersQueue;
import com.statrack.statrack.data.repos.UsersQueueRepository;
import com.statrack.statrack.services.QueueService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/queues")
@RequiredArgsConstructor
public class QueueController {
    private final QueueService queueService;

    @PostMapping("/by-user-id/{userId}/entries")
    public ResponseEntity<QueueEntry> joinQueue(@PathVariable UUID userId,
                                                @ModelAttribute EntryRequest request) {
        return ResponseEntity.ok(queueService.addStudentToQueue(userId, request));
    }

    @PatchMapping("/by-user-id/{userId}/entries/{entryId}")
    public ResponseEntity<Void> updateEntryStatus(@PathVariable UUID queueId,
                                                  @PathVariable UUID entryId,
                                                  @RequestParam QueueEntry.Status status) {
        //queueService.updateStatus(entryId, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/by-user-id/{userId}/entries")
    public ResponseEntity<List<QueueEntryDto>> listEntries(@PathVariable UUID userId) {
        return ResponseEntity.ok(queueService.getEntriesByUser(userId));
    }

}
