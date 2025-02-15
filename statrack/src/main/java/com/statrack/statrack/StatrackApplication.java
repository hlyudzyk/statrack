package com.statrack.statrack;

import com.statrack.statrack.security.auth.AuthenticationService;
import com.statrack.statrack.security.auth.RegisterRequest;
import com.statrack.statrack.security.user.Role;
import com.statrack.statrack.security.user.User;
import com.statrack.statrack.security.user.User.UserAccountStatus;
import com.statrack.statrack.security.user.UserRepository;
import java.time.LocalDate;
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
				var user = User.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@example.com")
					.password(passwordEncoder.encode("password"))
					.birthday(LocalDate.of(2000, 5, 21))
					.role(Role.ADMIN)
					.accountStatus(UserAccountStatus.ACTIVE)
					.build();
				userRepository.save(user);
			} catch (Exception ex) {
				System.out.println("Admin already registered!");
			}
		};

	}
}
