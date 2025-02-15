package com.statrack.statrack.data.repos;

import com.statrack.statrack.data.models.user.ActivationToken;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationTokenRepository extends JpaRepository<ActivationToken, UUID> {

}