package com.statrack.statrack.services.messages;

import java.io.Serializable;
import lombok.Data;

@Data
public class EmailMessage implements Serializable {
    private String to;
    private String subject;
    private String body;

    private byte[] attachment;
    private String attachmentFilename;
    private String attachmentContentType;
}
