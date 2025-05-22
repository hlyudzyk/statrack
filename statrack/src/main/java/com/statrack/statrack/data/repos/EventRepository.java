package com.statrack.statrack.data.repos;


import com.statrack.statrack.data.models.Event;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends JpaRepository<Event, UUID> {
    Optional<Event> findByEventDate(LocalDateTime eventDate);
    Page<Event> findAll(Pageable pageable);
    @Query("SELECT e FROM Event e WHERE LOWER(e.header) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Event> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    Page<Event> findByEventDateBetween(LocalDateTime startOfDay, LocalDateTime endOfDay, Pageable pageable);
    @Query("SELECT e FROM Event e WHERE (LOWER(e.header) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND e.eventDate BETWEEN :start AND :end")
    Page<Event> findByEventDateBetweenAndKeyword(@Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end,
        @Param("keyword") String keyword,
        Pageable pageable);
}