package com.statrack.statrack.services.emails;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailConsumer {
    private final JavaMailSender emailSender;

    @RabbitListener(queues = "emailQueue")
    public void processEmail(EmailMessage message) {
        SimpleMailMessage emailMesage = new SimpleMailMessage();
        emailMesage.setTo(message.getTo());
        emailMesage.setSubject(message.getSubject());
        emailMesage.setText(message.getBody());
        emailSender.send(emailMesage);
    }
}
