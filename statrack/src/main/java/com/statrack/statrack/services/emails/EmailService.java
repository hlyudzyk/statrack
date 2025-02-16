package com.statrack.statrack.services.emails;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
  public class EmailService {
  private final RabbitTemplate rabbitTemplate;

  public void sendMessage(
      String to, String subject, String text)  {
    EmailMessage message = new EmailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setBody(text);
    rabbitTemplate.convertAndSend("emailQueue", message);

  }
}