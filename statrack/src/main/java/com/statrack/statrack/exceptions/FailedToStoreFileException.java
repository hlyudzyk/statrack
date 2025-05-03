package com.statrack.statrack.exceptions;
import java.io.IOException;

public class FailedToStoreFileException extends RuntimeException {
    public FailedToStoreFileException(String message, IOException e) {
        super(message, e);
    }

}
