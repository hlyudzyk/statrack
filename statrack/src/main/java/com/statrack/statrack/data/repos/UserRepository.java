package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.Role;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByEmail(String email);
  List<User> findAllByRole(Role role);
}
