package com.statrack.statrack.services.email;

public interface EmailService {

  void sendMessage(String to, String subject, String text);

  void sendMessage(
      String to,
      String subject,
      String text,
      byte[] attachment,
      String filename,
      String contentType);
}