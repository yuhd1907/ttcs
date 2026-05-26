package com.project6.dto;

import lombok.Data;

@Data
public class SaveCvPdfRequest {
    private String base64Pdf;   // PDF dưới dạng base64 (không có tiền tố data:...)
    private String fileName;    // Tên file, ví dụ: NguyenVanAn-cv
}
