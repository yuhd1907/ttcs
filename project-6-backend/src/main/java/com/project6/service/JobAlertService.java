package com.project6.service;

import com.project6.entity.JobPost;
import com.project6.entity.Skill;
import com.project6.entity.User;
import com.project6.entity.cv.UserSkill;
import com.project6.repository.JobPostRepository;
import com.project6.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobAlertService {

    private final UserRepository userRepository;
    private final JobPostRepository jobPostRepository;
    private final JavaMailSender mailSender;

    @Transactional(readOnly = true)
    public void processAndSendJobAlerts() {
        log.info("Bắt đầu tiến trình gửi Email gợi ý việc làm...");

        List<JobPost> allOpenJobs = jobPostRepository.findAll().stream()
                .filter(job -> "open".equalsIgnoreCase(job.getStatus()))
                .filter(job -> job.getCreatedAt().isAfter(LocalDateTime.now().minusDays(7)))
                .toList();

        if (allOpenJobs.isEmpty()) {
            log.info("Không có việc làm mới nào đang mở. Kết thúc tiến trình.");
            return;
        }

        List<User> users = userRepository.findAll();

        int sentCount = 0;
        for (User user : users) {
            List<UserSkill> userSkills = user.getSkills();
            if (userSkills == null || userSkills.isEmpty()) {
                continue;
            }

            Set<String> userSkillNames = userSkills.stream()
                    .map(s -> s.getSkillName().toLowerCase().trim())
                    .collect(Collectors.toSet());

            List<JobPost> matchedJobs = allOpenJobs.stream()
                    .filter(job -> {
                        if (job.getSkills() == null) return false;
                        return job.getSkills().stream().anyMatch(jobSkill ->
                            userSkillNames.contains(jobSkill.getName().toLowerCase().trim())
                        );
                    })
                    .limit(5)
                    .toList();

            if (!matchedJobs.isEmpty()) {
                sendEmailToUser(user, matchedJobs);
                sentCount++;
            }
        }

        log.info("Hoàn tất tiến trình. Đã gửi email đến {} người dùng.", sentCount);
    }

    private void sendEmailToUser(User user, List<JobPost> jobs) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Gợi ý việc làm phù hợp với kỹ năng của bạn");

            StringBuilder htmlContent = new StringBuilder();
            htmlContent.append("<h2>Chào ").append(user.getFullName()).append(",</h2>");
            htmlContent.append("<p>Dựa trên kỹ năng trong hồ sơ của bạn, chúng tôi tìm thấy <b>")
                       .append(jobs.size())
                       .append("</b> việc làm có thể bạn sẽ quan tâm:</p>");
            htmlContent.append("<ul style='list-style-type: none; padding: 0;'>");

            for (JobPost job : jobs) {
                htmlContent.append("<li style='margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px;'>");
                htmlContent.append("<h3 style='margin: 0 0 10px 0; color: #0D8EFF;'>").append(job.getTitle()).append("</h3>");
                htmlContent.append("<p style='margin: 5px 0;'><b>Công ty:</b> ").append(job.getCompany().getCompanyName()).append("</p>");

                String salary = (job.getSalaryMin() != null && job.getSalaryMax() != null)
                    ? job.getSalaryMin() + " - " + job.getSalaryMax() + " " + job.getCurrency()
                    : "Thỏa thuận";
                htmlContent.append("<p style='margin: 5px 0;'><b>Lương:</b> ").append(salary).append("</p>");

                Set<Skill> jobSkills = job.getSkills();
                if (jobSkills != null && !jobSkills.isEmpty()) {
                    String skillNames = jobSkills.stream().map(Skill::getName).collect(Collectors.joining(", "));
                    htmlContent.append("<p style='margin: 5px 0;'><b>Kỹ năng yêu cầu:</b> ").append(skillNames).append("</p>");
                }

                String jobUrl = "http://localhost:3000/job/detail/" + job.getId();
                htmlContent.append("<br><a href='").append(jobUrl).append("' style='background-color: #0D8EFF; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; display: inline-block;'>Xem chi tiết</a>");
                htmlContent.append("</li>");
            }

            htmlContent.append("</ul>");
            htmlContent.append("<p>Chúc bạn sớm tìm được công việc ưng ý!</p>");
            htmlContent.append("<p>Trân trọng,<br>Đội ngũ Hỗ trợ Việc làm</p>");

            helper.setText(htmlContent.toString(), true);
            mailSender.send(message);

            log.info("Đã gửi email gợi ý việc làm cho user: {}", user.getEmail());
        } catch (MessagingException e) {
            log.error("Lỗi khi gửi email cho user {}: {}", user.getEmail(), e.getMessage());
        }
    }
}
