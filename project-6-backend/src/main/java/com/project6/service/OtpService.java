package com.project6.service;

import com.project6.entity.OtpToken;
import com.project6.repository.OtpTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpTokenRepository otpTokenRepository;
    private final JavaMailSender mailSender;

    @Value("${app.otp.expiration}")
    private int otpExpirationMinutes;

    public void generateAndSendOtp(String email) {
        // Xóa tất cả OTP cũ chưa dùng của email này
        otpTokenRepository.deleteByEmailAndUsedFalse(email);

        String otp = String.format("%06d", new Random().nextInt(1000000));

        OtpToken token = OtpToken.builder()
                .email(email)
                .otp(otp)
                .expiresAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes))
                .build();
        otpTokenRepository.save(token);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Mã OTP đặt lại mật khẩu - IT Jobs");
            helper.setText(buildOtpEmailHtml(otp, otpExpirationMinutes), true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Không thể gửi email OTP, vui lòng thử lại!");
        }
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpToken> tokenOpt = otpTokenRepository
                .findTopByEmailAndUsedFalseOrderByCreatedAtDesc(email);

        if (tokenOpt.isEmpty()) return false;

        OtpToken token = tokenOpt.get();

        if (LocalDateTime.now().isAfter(token.getExpiresAt())) return false;
        if (!token.getOtp().equals(otp)) return false;

        token.setUsed(true);
        otpTokenRepository.save(token);
        return true;
    }

    private String buildOtpEmailHtml(String otp, int expirationMinutes) {
        return """
                <!DOCTYPE html>
                <html lang="vi">
                <head><meta charset="UTF-8"></head>
                <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
                    <tr>
                      <td align="center">
                        <table width="480" cellpadding="0" cellspacing="0"
                               style="background:#ffffff;border-radius:12px;overflow:hidden;
                                      box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#0088FF,#0055CC);
                                       padding:32px 40px;text-align:center;">
                              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;
                                         letter-spacing:-0.5px;">IT Jobs</h1>
                              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                                Đặt lại mật khẩu
                              </p>
                            </td>
                          </tr>
                          <!-- Body -->
                          <tr>
                            <td style="padding:40px;">
                              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                                Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                                Sử dụng mã OTP bên dưới để tiếp tục:
                              </p>
                              <!-- OTP Box -->
                              <div style="background:#f0f7ff;border:2px dashed #0088FF;
                                          border-radius:10px;padding:24px;text-align:center;
                                          margin:24px 0;">
                                <p style="margin:0 0 8px;color:#6b7280;font-size:13px;
                                          letter-spacing:1px;text-transform:uppercase;">Mã OTP của bạn</p>
                                <span style="font-size:40px;font-weight:800;color:#0088FF;
                                             letter-spacing:10px;font-family:monospace;">
                                  %s
                                </span>
                              </div>
                              <p style="margin:0 0 12px;color:#6b7280;font-size:13px;text-align:center;">
                                ⏱ Mã có hiệu lực trong <strong style="color:#374151;">%d phút</strong>
                              </p>
                              <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;line-height:1.6;
                                         border-top:1px solid #f3f4f6;padding-top:20px;">
                                Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
                                Tài khoản của bạn vẫn an toàn.
                              </p>
                            </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                            <td style="background:#f9fafb;padding:20px 40px;text-align:center;">
                              <p style="margin:0;color:#9ca3af;font-size:12px;">
                                © 2025 IT Jobs. Đây là email tự động, vui lòng không trả lời.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(otp, expirationMinutes);
    }
}
