package com.statrack.statrack;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.security.auth.AuthenticationService;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.services.UserService;
import java.io.InputStream;
import java.util.List;
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
	private final ObjectMapper mapper;
	private final UserService userService;


	public static void main(String[] args) {
		SpringApplication.run(StatrackApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
		AuthenticationService service) {
		return args -> {
			boolean seed = false;
			for (String arg : args) {
				if (arg.equalsIgnoreCase("--seed")) {
					seed = true;
					break;
				}
			}
			if (seed) {
				seedDatabase();
			}
		};

	}

	@Transactional
    public void seedDatabase() {
		System.out.println("Seeding database...");


		try (InputStream stream = getClass().getClassLoader().getResourceAsStream("seed/users.json")) {
			if (stream == null) {
				System.out.println("Seed file not found.");
				return;
			}

			List<User> users = mapper.readValue(stream, new TypeReference<>() {});
			userService.seedDatabase(users);
			System.out.println("Seeded {} users successfully.");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
