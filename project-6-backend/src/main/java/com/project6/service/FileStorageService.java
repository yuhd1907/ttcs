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

    /**
     * Upload ảnh (image) lên Cloudinary
     */
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", UUID.randomUUID().toString(),
                            "resource_type", "auto"
                    ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException ex) {
            throw new RuntimeException("Không thể tải lên ảnh. Vui lòng thử lại!", ex);
        }
    }

    /**
     * Upload file CV (PDF) lên Cloudinary với resource_type=raw
     */
    public String storeCV(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = ".pdf"; // fallback
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", "cv-files/" + UUID.randomUUID().toString() + extension,
                            "resource_type", "auto" // Cloudinary will generate correct headers for PDFs
                    ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException ex) {
            throw new RuntimeException("Không thể tải lên CV. Vui lòng thử lại!", ex);
        }
    }
    /**
     * Upload PDF bytes (từ mảng byte) lên Cloudinary với resource_type=raw
     */
    public String storePdfBytes(byte[] pdfBytes, String fileName) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(pdfBytes,
                    ObjectUtils.asMap(
                            "public_id", "cv-files/" + UUID.randomUUID() + "_" + fileName,
                            "resource_type", "raw",
                            "format", "pdf"
                    ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException ex) {
            throw new RuntimeException("Không thể tải lên PDF. Vui lòng thử lại!", ex);
        }
    }
}
