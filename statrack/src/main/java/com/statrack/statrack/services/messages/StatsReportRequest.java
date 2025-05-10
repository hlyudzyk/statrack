package com.statrack.statrack.services.messages;

import java.io.Serializable;
import lombok.Data;

@Data
public class StatsReportRequest implements Serializable {
    private String email;
}