package com.statrack.statrack.services;

import com.statrack.statrack.services.messages.EmailMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
  private final RabbitTemplate rabbitTemplate;

  public void sendMessage(String to, String subject, String text) {
    sendMessage(to, subject, text, null, null, null);
  }

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