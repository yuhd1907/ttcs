package com.project6.service;

import com.project6.dto.UserInfoDto;
import com.project6.entity.User;
import com.project6.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final OtpService otpService;

    // ────────────────── REGISTER ──────────────────

    public String register(String fullName, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            return "Email đã được sử dụng!";
        }
        User user = User.builder()
                .fullName(fullName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();
        userRepository.save(user);
        return null; // null = ok
    }

    // ────────────────── LOGIN ──────────────────

    public UserInfoDto login(String email, String password, HttpServletResponse response) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mật khẩu không chính xác!");
        }
        String token = jwtService.generateToken(email, "USER");
        setJwtCookie(response, token);
        return UserInfoDto.from(user);
    }

    // ────────────────── FORGOT PASSWORD ──────────────────

    public String forgotPassword(String email, HttpServletResponse response) {
        if (!userRepository.existsByEmail(email)) {
            return "Email không tồn tại trong hệ thống!";
        }
        otpService.generateAndSendOtp(email);
        // Store email in HttpOnly cookie so next steps can read it
        setResetEmailCookie(response, email);
        return null;
    }

    // ────────────────── VERIFY OTP ──────────────────

    public String verifyOtp(String otp, HttpServletRequest request, HttpServletResponse response) {
        String email = getResetEmailFromCookie(request);
        if (email == null) {
            return "Phiên đặt lại mật khẩu hết hạn, vui lòng thử lại!";
        }
        boolean valid = otpService.verifyOtp(email, otp);
        if (!valid) {
            return "Mã OTP không hợp lệ hoặc đã hết hạn!";
        }
        // Mark OTP as verified
        setResetVerifiedCookie(response, "true");
        return null;
    }

    // ────────────────── RESET PASSWORD ──────────────────

    public String resetPassword(String newPassword, HttpServletRequest request, HttpServletResponse response) {
        String email = getResetEmailFromCookie(request);
        String verified = getResetVerifiedFromCookie(request);
        if (email == null || !"true".equals(verified)) {
            return "Phiên đặt lại mật khẩu không hợp lệ!";
        }
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return "Tài khoản không tồn tại!";
        }
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        // Clear reset cookies
        clearResetCookies(response);
        return null;
    }

    // ────────────────── COOKIE HELPERS ──────────────────

    private void setJwtCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .path("/")
                .maxAge(86400)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void setResetEmailCookie(HttpServletResponse response, String email) {
        ResponseCookie cookie = ResponseCookie.from("reset_email", email)
                .httpOnly(true)
                .path("/")
                .maxAge(600) // 10 minutes
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void setResetVerifiedCookie(HttpServletResponse response, String value) {
        ResponseCookie cookie = ResponseCookie.from("reset_verified", value)
                .httpOnly(true)
                .path("/")
                .maxAge(600)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void clearResetCookies(HttpServletResponse response) {
        for (String name : new String[]{"reset_email", "reset_verified"}) {
            ResponseCookie cookie = ResponseCookie.from(name, "")
                    .httpOnly(true)
                    .path("/")
                    .maxAge(0)
                    .sameSite("Lax")
                    .build();
            response.addHeader("Set-Cookie", cookie.toString());
        }
    }

    private String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> name.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

    private String getResetEmailFromCookie(HttpServletRequest request) {
        return getCookieValue(request, "reset_email");
    }

    private String getResetVerifiedFromCookie(HttpServletRequest request) {
        return getCookieValue(request, "reset_verified");
    }
}
