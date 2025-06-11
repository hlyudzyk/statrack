package com.statrack.statrack.services.email;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile({"dev", "test"})
public class MockEmailService implements EmailService {

    @Override
    public void sendMessage(String to, String subject, String text) {
        System.out.println("LOG ONLY - Email to " + to + ": " + subject + "\n" + text + "\n");
    }

    @Override
    public void sendMessage(String to, String subject, String text, byte[] attachment,
        String filename, String contentType) {
        System.out.println("LOG ONLY - Email to " + to + ": " + subject +  "\n" + text + "\n");
    }
}
