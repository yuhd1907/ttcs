package com.project6.service;

import com.project6.entity.JobAlertCompanyFollow;
import com.project6.entity.JobAlertSkillSubscription;
import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.repository.JobAlertCompanyFollowRepository;
import com.project6.repository.JobAlertSkillSubscriptionRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobAlertService {

    private final JobAlertSkillSubscriptionRepository skillSubRepo;
    private final JobAlertCompanyFollowRepository companyFollowRepo;
    private final JavaMailSender mailSender;

    /**
     * Được gọi ngay sau khi job mới được tạo.
     * Gửi email đến các user có subscription khớp với job này.
     */
    @Async
    @Transactional(readOnly = true)
    public void notifyNewJob(JobPost job) {
        if (job == null) return;
        log.info("Xử lý thông báo job mới: [{}] - {}", job.getId(), job.getTitle());

        // Tập hợp email cần gửi để tránh gửi 2 lần cho cùng 1 user
        // (user có thể match cả skill lẫn company)
        Map<String, String> toSend = new LinkedHashMap<>(); // email -> fullName

        // ===== 1. MATCH THEO KỸ NĂNG =====
        Set<String> jobSkillNames = job.getSkills() == null ? Set.of() :
                job.getSkills().stream()
                        .map(sk -> sk.getName().toLowerCase().trim())
                        .collect(Collectors.toSet());

        String jobCityName = (job.getCity() != null) ? job.getCity().getName().toLowerCase().trim() : null;

        if (!jobSkillNames.isEmpty()) {
            List<JobAlertSkillSubscription> skillSubs = skillSubRepo.findAllByActiveTrue();
            for (JobAlertSkillSubscription sub : skillSubs) {
                String subSkill = sub.getSkillName().toLowerCase().trim();
                String subCity = sub.getCityName().toLowerCase().trim();

                boolean skillMatch = jobSkillNames.contains(subSkill);
                // City match: nếu job không có city → match tất cả; ngược lại phải khớp city
                boolean cityMatch = jobCityName == null || jobCityName.equals(subCity);

                if (skillMatch && cityMatch) {
                    String userEmail = sub.getUser().getEmail();
                    toSend.putIfAbsent(userEmail, sub.getUser().getFullName());
                }
            }
        }

        // ===== 2. MATCH THEO CÔNG TY THEO DÕI =====
        if (job.getCompany() != null) {
            UUID companyId = job.getCompany().getId();
            List<JobAlertCompanyFollow> companyFollows = companyFollowRepo.findAllByActiveTrue();
            for (JobAlertCompanyFollow follow : companyFollows) {
                if (follow.getCompany().getId().equals(companyId)) {
                    String userEmail = follow.getUser().getEmail();
                    toSend.putIfAbsent(userEmail, follow.getUser().getFullName());
                }
            }
        }

        if (toSend.isEmpty()) {
            log.info("Không có user nào match với job [{}]. Không gửi email.", job.getId());
            return;
        }

        // ===== GỬI EMAIL =====
        for (Map.Entry<String, String> entry : toSend.entrySet()) {
            sendJobNotificationEmail(entry.getKey(), entry.getValue(), job);
        }

        log.info("Đã gửi thông báo job [{}] đến {} người dùng.", job.getId(), toSend.size());
    }

    private void sendJobNotificationEmail(String toEmail, String toName, JobPost job) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Việc làm mới: " + job.getTitle() + " - " + job.getCompany().getCompanyName());

            String salary = (job.getSalaryMin() != null && job.getSalaryMax() != null)
                    ? "$" + job.getSalaryMin().toPlainString() + " - $" + job.getSalaryMax().toPlainString()
                    : "Thỏa thuận";

            String skillStr = (job.getSkills() != null && !job.getSkills().isEmpty())
                    ? job.getSkills().stream().map(Skill::getName).collect(Collectors.joining(", "))
                    : "Không yêu cầu cụ thể";

            String cityStr = (job.getCity() != null) ? job.getCity().getName() : "Toàn quốc";
            String jobUrl = "http://localhost:3000/job/detail/" + job.getId();

            String html = """
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;'>
                      <div style='background: #0088FF; padding: 24px; border-radius: 8px 8px 0 0;'>
                        <h1 style='color: white; margin: 0; font-size: 20px;'>Việc làm mới phù hợp với bạn!</h1>
                      </div>
                      <div style='border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;'>
                        <p style='margin: 0 0 16px 0;'>Xin chào <b>%s</b>,</p>
                        <p style='margin: 0 0 20px 0; color: #4b5563;'>Có một việc làm mới vừa được đăng phù hợp với đăng ký của bạn:</p>

                        <div style='background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;'>
                          <h2 style='margin: 0 0 12px 0; color: #0088FF; font-size: 18px;'>%s</h2>
                          <table style='width: 100%%; border-collapse: collapse;'>
                            <tr><td style='padding: 4px 0; color: #6b7280; width: 120px;'>Công ty</td><td style='padding: 4px 0; font-weight: 600;'>%s</td></tr>
                            <tr><td style='padding: 4px 0; color: #6b7280;'>Địa điểm</td><td style='padding: 4px 0;'>%s</td></tr>
                            <tr><td style='padding: 4px 0; color: #6b7280;'>Lương</td><td style='padding: 4px 0;'>%s</td></tr>
                            <tr><td style='padding: 4px 0; color: #6b7280;'>Kỹ năng</td><td style='padding: 4px 0;'>%s</td></tr>
                          </table>
                        </div>

                        <a href='%s' style='display: inline-block; background-color: #0088FF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;'>Xem chi tiết & Ứng tuyển</a>

                        <p style='margin-top: 24px; color: #9ca3af; font-size: 12px;'>
                          Bạn nhận được email này vì đã đăng ký nhận thông báo việc làm.<br>
                          Để quản lý đăng ký, vào <a href='http://localhost:3000/user-manage/skill-register' style='color: #0088FF;'>trang đăng ký nhận email</a>.
                        </p>
                      </div>
                    </div>
                    """.formatted(toName, job.getTitle(), job.getCompany().getCompanyName(),
                    cityStr, salary, skillStr, jobUrl);

            helper.setText(html, true);
            mailSender.send(message);
            log.info("Gửi thông báo job mới [{}] đến {}", job.getId(), toEmail);
        } catch (MessagingException e) {
            log.error("Lỗi khi gửi email thông báo job cho {}: {}", toEmail, e.getMessage());
        }
    }
}
