package com.statrack.statrack.data.repos;


import com.statrack.statrack.data.models.Event;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, UUID> {
    Optional<Event> findByEventDate(LocalDateTime eventDate);
    Page<Event> findAll(Pageable pageable);
    
}