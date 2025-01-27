package com.statrack.statrack;

import static com.statrack.statrack.security.user.Role.ADMIN;

import com.statrack.statrack.security.auth.AuthenticationService;
import com.statrack.statrack.security.auth.RegisterRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StatrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatrackApplication.class, args);
	}

	@RequestMapping("/")
	public String home() {
		return "Hello  World";
	}


	@Bean
	public CommandLineRunner commandLineRunner(
		AuthenticationService service) {

		return args -> {
			try {
				var admin = RegisterRequest.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@mail.com")
					.password("password")
					.role(ADMIN)
					.birthday(LocalDate.of(2000, 5, 21))
					.build();
				System.out.println("Admin token: " + service.register(admin).getAccessToken());
			} catch (ConstraintViolationException ex) {
				System.out.println("Admin already registered!");
			}
		};

	}
}
