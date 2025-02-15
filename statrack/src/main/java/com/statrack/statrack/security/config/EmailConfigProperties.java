package com.statrack.statrack.security.config;

import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.mail")
@Getter
@Setter
public class EmailConfigProperties {
    private String host;
    private int port;
    private String username;
    private String password;
    private Map<String, String> properties;

}
