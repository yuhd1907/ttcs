package com.project6.controller;

import com.project6.dto.*;
import com.project6.service.UserAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserAuthService userAuthService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody UserRegisterRequest req) {
        String error = userAuthService.register(req.getFullName(), req.getEmail(), req.getPassword());
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Đăng ký thành công!"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest req,
                                             HttpServletResponse response) {
        try {
            var userInfo = userAuthService.login(req.getEmail(), req.getPassword(), response);
            return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công!", userInfo));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req,
                                                      HttpServletResponse response) {
        String error = userAuthService.forgotPassword(req.getEmail(), response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Mã OTP đã được gửi đến email của bạn!"));
    }

    @PostMapping("/otp")
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody OtpRequest req,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) {
        String error = userAuthService.verifyOtp(req.getOtp(), request, response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Xác thực OTP thành công!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest req,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) {
        String error = userAuthService.resetPassword(req.getPassword(), request, response);
        if (error != null) {
            return ResponseEntity.badRequest().body(ApiResponse.error(error));
        }
        return ResponseEntity.ok(ApiResponse.success("Đặt lại mật khẩu thành công!"));
    }
}
