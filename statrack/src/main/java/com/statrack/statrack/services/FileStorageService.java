package com.statrack.statrack.services;

import com.statrack.statrack.exceptions.FailedToStoreFileException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private Path fileStorageLocation;

    @PostConstruct
    public void init() throws IOException {
        fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(fileStorageLocation);
    }

    public String storeFile(MultipartFile file) {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            Path targetLocation = fileStorageLocation.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + filename;
        } catch (IOException ex) {
            throw new FailedToStoreFileException("Could not store file " + filename, ex);
        }
    }
}
