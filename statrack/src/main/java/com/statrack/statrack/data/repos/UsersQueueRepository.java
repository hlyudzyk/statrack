package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.UsersQueue;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersQueueRepository extends JpaRepository<UsersQueue, UUID> {
    Optional<UsersQueue> getUsersQueueByBelongsToId(UUID belongsToId);
}
