package com.statrack.statrack.api.dto;

import java.time.Duration;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatsDTO {
    private String userId;
    private String username;
    private Duration totalOnlineTime;
    private Duration totalBreakTime;
    private int totalSessions;
    private Duration averageSessionTime;
}
