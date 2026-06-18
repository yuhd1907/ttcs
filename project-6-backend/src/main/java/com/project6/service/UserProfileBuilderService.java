package com.project6.service;

import com.project6.entity.User;
import com.project6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Service riêng để build text CV từ profile DB.
 * Tách ra một bean riêng để @Transactional được Spring AOP proxy đúng cách
 * khi gọi từ @Async method trong CvScreeningService (tránh LazyInitializationException).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserProfileBuilderService {

    private final UserRepository userRepository;

    /**
     * Đọc toàn bộ profile user từ DB (trong transaction) và build thành chuỗi text
     * để dùng làm input cho Gemini khi PDF không trích xuất được text.
     *
     * @Transactional đảm bảo tất cả lazy collection (educations, experiences,
     * skills, projects, certificates...) được load trong cùng một Session.
     */
    @Transactional(readOnly = true)
    public String buildCvText(UUID userId) {
        log.debug("[PROFILE-BUILDER] Đọc profile từ DB | userId={}", userId);

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            log.warn("[PROFILE-BUILDER] Không tìm thấy user: {}", userId);
            return "";
        }

        StringBuilder sb = new StringBuilder();

        // ── Thông tin cơ bản ──────────────────────────────────────────────
        sb.append("HỌ VÀ TÊN: ").append(nvl(user.getFullName())).append("\n");
        sb.append("Email: ").append(nvl(user.getEmail())).append("\n");
        if (user.getPhone() != null)        sb.append("Điện thoại: ").append(user.getPhone()).append("\n");
        if (user.getBirthDate() != null)    sb.append("Ngày sinh: ").append(user.getBirthDate()).append("\n");
        if (user.getCity() != null)         sb.append("Tỉnh/TP: ").append(user.getCity()).append("\n");
        if (user.getPersonalLink() != null) sb.append("Link cá nhân: ").append(user.getPersonalLink()).append("\n");
        if (user.getPosition() != null)     sb.append("Vị trí ứng tuyển: ").append(user.getPosition()).append("\n");
        if (user.getIntro() != null)        sb.append("Giới thiệu: ").append(cleanHtml(user.getIntro())).append("\n");

        // ── Học vấn ───────────────────────────────────────────────────────
        if (user.getEducations() != null && !user.getEducations().isEmpty()) {
            sb.append("\nHỌC VẤN:\n");
            for (var edu : user.getEducations()) {
                sb.append("- Trường: ").append(nvl(edu.getSchool())).append("\n");
                sb.append("  Bằng cấp: ").append(nvl(edu.getDegree())).append("\n");
                sb.append("  Chuyên ngành: ").append(nvl(edu.getMajor())).append("\n");
                sb.append("  Từ: ").append(edu.getFromMonth()).append("/").append(edu.getFromYear());
                if (Boolean.TRUE.equals(edu.getIsCurrentlyStudying()))
                    sb.append(" - Đang học\n");
                else
                    sb.append(" - ").append(edu.getToMonth()).append("/").append(edu.getToYear()).append("\n");
                if (edu.getDetails() != null)
                    sb.append("  Chi tiết: ").append(cleanHtml(edu.getDetails())).append("\n");
            }
        }

        // ── Kinh nghiệm ───────────────────────────────────────────────────
        if (user.getExperiences() != null && !user.getExperiences().isEmpty()) {
            sb.append("\nKINH NGHIỆM LÀM VIỆC:\n");
            for (var exp : user.getExperiences()) {
                sb.append("- Công ty: ").append(nvl(exp.getCompany())).append("\n");
                sb.append("  Vị trí: ").append(nvl(exp.getPosition())).append("\n");
                sb.append("  Thời gian: ").append(exp.getFromMonth()).append("/").append(exp.getFromYear());
                if (Boolean.TRUE.equals(exp.getIsCurrentlyWorking()))
                    sb.append(" - Hiện tại\n");
                else
                    sb.append(" - ").append(exp.getToMonth()).append("/").append(exp.getToYear()).append("\n");
                if (exp.getDescription() != null)
                    sb.append("  Mô tả: ").append(cleanHtml(exp.getDescription())).append("\n");
            }
        }

        // ── Dự án ─────────────────────────────────────────────────────────
        if (user.getProjects() != null && !user.getProjects().isEmpty()) {
            sb.append("\nDỰ ÁN:\n");
            for (var proj : user.getProjects()) {
                sb.append("- Tên: ").append(nvl(proj.getName())).append("\n");
                if (proj.getDescription() != null)
                    sb.append("  Mô tả: ").append(cleanHtml(proj.getDescription())).append("\n");
                if (proj.getLink() != null)
                    sb.append("  Link: ").append(proj.getLink()).append("\n");
            }
        }

        // ── Kỹ năng ───────────────────────────────────────────────────────
        if (user.getSkills() != null && !user.getSkills().isEmpty()) {
            sb.append("\nKỸ NĂNG:\n");
            for (var skill : user.getSkills()) {
                sb.append("- ").append(nvl(skill.getSkillName()));
                if (skill.getExperience() != null)
                    sb.append(" (").append(skill.getExperience()).append(")");
                sb.append("\n");
            }
        }

        // ── Chứng chỉ ─────────────────────────────────────────────────────
        if (user.getCertificates() != null && !user.getCertificates().isEmpty()) {
            sb.append("\nCHỨNG CHỈ:\n");
            for (var cert : user.getCertificates()) {
                sb.append("- ").append(nvl(cert.getName()));
                if (cert.getOrganization() != null)
                    sb.append(" – ").append(cert.getOrganization());
                if (cert.getYear() != null)
                    sb.append(" (").append(cert.getMonth()).append("/").append(cert.getYear()).append(")");
                sb.append("\n");
                if (cert.getDescription() != null)
                    sb.append("  Mô tả: ").append(cleanHtml(cert.getDescription())).append("\n");
            }
        }

        // ── Giải thưởng ───────────────────────────────────────────────────
        if (user.getAwards() != null && !user.getAwards().isEmpty()) {
            sb.append("\nGIẢI THƯỞNG:\n");
            for (var award : user.getAwards()) {
                sb.append("- ").append(nvl(award.getName()));
                if (award.getOrganization() != null)
                    sb.append(" – ").append(award.getOrganization());
                sb.append("\n");
                if (award.getDescription() != null)
                    sb.append("  Mô tả: ").append(cleanHtml(award.getDescription())).append("\n");
            }
        }

        String result = sb.toString();
        log.info("[PROFILE-BUILDER] ✅ Build profile thành công: {} ký tự | userId={}", result.length(), userId);
        return result;
    }

    // ─── Utilities ────────────────────────────────────────────────────────────

    private String nvl(String s) {
        return s == null ? "" : s;
    }

    private String cleanHtml(String html) {
        if (html == null) return "";
        return html
            .replaceAll("<[^>]*>",  "")
            .replaceAll("&nbsp;",   " ")
            .replaceAll("&amp;",    "&")
            .replaceAll("&lt;",     "<")
            .replaceAll("&gt;",     ">")
            .replaceAll("&quot;",   "\"")
            .replaceAll("&#39;",    "'")
            .replaceAll("\\s{3,}",  " ")
            .trim();
    }
}
