package com.project6.controller;

import com.project6.dto.*;
import com.project6.service.CompanyAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyAuthService companyAuthService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody CompanyRegisterRequest req) {
        String error = companyAuthService.register(req.getCompanyName(), req.getEmail(), req.getPassword());
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Đăng ký công ty thành công!"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest req,
                                             HttpServletResponse response) {
        try {
            var companyInfo = companyAuthService.login(req.getEmail(), req.getPassword(), response);
            return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công!", companyInfo));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req,
                                                      HttpServletResponse response) {
        String error = companyAuthService.forgotPassword(req.getEmail(), response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Mã OTP đã được gửi đến email của bạn!"));
    }

    @PostMapping("/otp")
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody OtpRequest req,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) {
        String error = companyAuthService.verifyOtp(req.getOtp(), request, response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Xác thực OTP thành công!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest req,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) {
        String error = companyAuthService.resetPassword(req.getPassword(), request, response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Đặt lại mật khẩu thành công!"));
    }
}
