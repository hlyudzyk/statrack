package com.statrack.statrack;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.statrack.statrack.security.auth.AuthenticationService;
import com.statrack.statrack.data.models.user.Role;
import com.statrack.statrack.data.models.user.User;
import com.statrack.statrack.data.models.user.User.UserAccountStatus;
import com.statrack.statrack.data.repos.UserRepository;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequiredArgsConstructor
public class StatrackApplication {
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final ObjectMapper mapper;

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

	private void seedDatabase() {
		System.out.println("Seeding database...");


		try (InputStream stream = getClass().getClassLoader().getResourceAsStream("seed/seed.json")) {
			if (stream == null) {
				System.out.println("Seed file not found.");
				return;
			}

			List<User> users = mapper.readValue(stream, new TypeReference<>() {});
			users.forEach(user ->
			{
				users.forEach(u -> {
					u.setId(null);
					u.setVersion(null);
					u.setPassword(passwordEncoder.encode(u.getPassword()));
				});
			});

			userRepository.saveAll(users);
			System.out.println("Seeded {} users successfully.");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
