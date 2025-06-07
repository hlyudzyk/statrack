package com.statrack.statrack;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.security.auth.AuthenticationService;
import com.statrack.statrack.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequiredArgsConstructor
public class StatrackApplication {
	private final UserService userService;


	public static void main(String[] args) {
		SpringApplication.run(StatrackApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
		AuthenticationService service) {
		return args -> {
			seedDatabase();
		};

	}
	public void seedDatabase() {
		try {
			userService.seedDatabase();
		}
		catch (Exception ex){ex.printStackTrace();}
	}
}
