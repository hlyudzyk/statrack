package com.statrack.statrack.services.emails;

import com.statrack.statrack.services.messages.EmailMessage;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailConsumer {
    private final JavaMailSender emailSender;

    @RabbitListener(queues = "emailQueue")
    public void processEmail(EmailMessage message) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, message.getAttachment() != null);

            helper.setTo(message.getTo());
            helper.setSubject(message.getSubject());
            helper.setText(message.getBody());

            if (message.getAttachment() != null) {
                helper.addAttachment(
                    message.getAttachmentFilename(),
                    new ByteArrayDataSource(message.getAttachment(), message.getAttachmentContentType())
                );
            }

            emailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
