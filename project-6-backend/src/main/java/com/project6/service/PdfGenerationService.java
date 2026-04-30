package com.project6.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.project6.dto.CvPdfRequest;
import com.project6.dto.CvProfileRequest;
import com.project6.entity.User;
import com.project6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfGenerationService {

    private final TemplateEngine templateEngine;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    /**
     * Tạo file PDF từ dữ liệu CV, upload lên Cloudinary và trả về URL.
     */
    public String generateAndUploadCvPdf(CvPdfRequest req) {
        // 1. Lấy thông tin user hiện tại
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng đang đăng nhập."));

        // 2. Chuẩn bị Thymeleaf context
        Context ctx = new Context();
        ctx.setVariable("fullName", user.getFullName());
        ctx.setVariable("email", user.getEmail());
        ctx.setVariable("phone", user.getPhone());
        ctx.setVariable("city", user.getCity());
        ctx.setVariable("position", user.getPosition());
        ctx.setVariable("personalLink", user.getPersonalLink());
        ctx.setVariable("avatar", user.getAvatar());

        ctx.setVariable("intro", req.getIntro());
        ctx.setVariable("educations", nullSafe(req.getEducations()));
        ctx.setVariable("experiences", nullSafe(req.getExperiences()));
        ctx.setVariable("skills", nullSafe(req.getSkills()));
        ctx.setVariable("languages", nullSafe(req.getLanguages()));
        ctx.setVariable("projects", nullSafe(req.getProjects()));
        ctx.setVariable("certificates", nullSafe(req.getCertificates()));
        ctx.setVariable("awards", nullSafe(req.getAwards()));

        // 3. Render HTML string từ Thymeleaf template
        String htmlContent = templateEngine.process("cv-template", ctx);

        // 4. Chuyển HTML sang PDF bytes
        byte[] pdfBytes = htmlToPdfBytes(htmlContent);

        // 5. Upload lên Cloudinary
        String safeFileName = user.getFullName().trim().replaceAll("\\s+", "_") + "_cv";
        String pdfUrl = fileStorageService.storePdfBytes(pdfBytes, safeFileName);

        // 6. Cập nhật cvUrl cho user
        user.setCvUrl(pdfUrl);
        userRepository.save(user);

        return pdfUrl;
    }

    private byte[] htmlToPdfBytes(String html) {
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(os);
            builder.run();
            return os.toByteArray();
        } catch (Exception e) {
            log.error("Lỗi khi tạo PDF: {}", e.getMessage(), e);
            throw new RuntimeException("Không thể tạo file PDF: " + e.getMessage(), e);
        }
    }

    private <T> List<T> nullSafe(List<T> list) {
        return list != null ? list : List.of();
    }
}
