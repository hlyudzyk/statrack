package com.statrack.statrack.services.email;

import com.statrack.statrack.services.messages.EmailMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Profile("prod")
public class SmtpEmailService implements EmailService {
    private final RabbitTemplate rabbitTemplate;

    @Override
    public void sendMessage(String to, String subject, String text) {
        sendMessage(to, subject, text, null, null, null);
    }
    @Override
    public void sendMessage(
        String to,
        String subject,
        String text,
        byte[] attachment,
        String filename,
        String contentType) {

        EmailMessage message = new EmailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setBody(text);
        message.setAttachment(attachment);
        message.setAttachmentFilename(filename);
        message.setAttachmentContentType(contentType);

        rabbitTemplate.convertAndSend("emailQueue", message);
    }
}
