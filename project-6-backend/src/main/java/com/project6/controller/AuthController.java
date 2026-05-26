package com.project6.controller;

import com.project6.dto.ApiResponse;
import com.project6.dto.CompanyInfoDto;
import com.project6.dto.UserInfoDto;
import com.project6.entity.Company;
import com.project6.entity.User;
import com.project6.repository.CompanyRepository;
import com.project6.repository.UserRepository;
import com.project6.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    /**
     * GET /auth/check
     * Đọc cookie "token", giải mã JWT, trả về thông tin user hoặc company.
     * Frontend (useAuth hook) gọi endpoint này mỗi khi path thay đổi.
     */
    @GetMapping("/check")
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> check(HttpServletRequest request) {
        String token = getTokenFromCookie(request);

        if (token == null || !jwtService.isValid(token)) {
            return ResponseEntity.ok(ApiResponse.error("Chưa xác thực"));
        }

        String email = jwtService.getEmail(token);
        String role  = jwtService.getRole(token);

        if ("USER".equals(role)) {
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.ok(ApiResponse.error("Tài khoản không tồn tại"));
            }
            UserInfoDto userInfoDto = UserInfoDto.from(userOpt.get());
            ApiResponse res = new ApiResponse("success", "OK", null, userInfoDto, null);
            return ResponseEntity.ok(res);
        }

        if ("COMPANY".equals(role)) {
            Optional<Company> companyOpt = companyRepository.findByEmail(email);
            if (companyOpt.isEmpty()) {
                return ResponseEntity.ok(ApiResponse.error("Tài khoản không tồn tại"));
            }
            CompanyInfoDto companyInfoDto = CompanyInfoDto.from(companyOpt.get());
            ApiResponse res = new ApiResponse("success", "OK", null, null, companyInfoDto);
            return ResponseEntity.ok(res);
        }

        return ResponseEntity.ok(ApiResponse.error("Role không hợp lệ"));
    }

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok(ApiResponse.success("Đăng xuất thành công"));
    }

    private String getTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> "token".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
