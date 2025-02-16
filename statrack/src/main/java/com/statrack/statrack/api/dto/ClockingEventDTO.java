package com.statrack.statrack.api.dto;

import com.statrack.statrack.data.models.user.User.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClockingEventDTO {
    private Status status;
}
