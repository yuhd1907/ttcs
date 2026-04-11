package com.project6.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final Cloudinary cloudinary;

    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            // Upload to Cloudinary with unique name and auto resource type
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", UUID.randomUUID().toString(),
                            "resource_type", "auto" // allows images, raw, etc.
                    ));

            // Return the secure cloud URL
            return uploadResult.get("secure_url").toString();
            
        } catch (IOException ex) {
            throw new RuntimeException("Could not upload file to Cloudinary. Please try again!", ex);
        }
    }
}
