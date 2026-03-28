package com.project6.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)  // Không serialize các field null → JSON gọn hơn
public class ApiResponse {
    private String code;
    private String message;
    private Object data;

    // Dùng cho /auth/check — trả về thông tin user hoặc company
    private UserInfoDto infoUser;
    private CompanyInfoDto infoCompany;

    // ─── Factory methods ───────────────────────────────────────

    public static ApiResponse success(String message) {
        return new ApiResponse("success", message, null, null, null);
    }

    public static ApiResponse success(String message, Object data) {
        return new ApiResponse("success", message, data, null, null);
    }

    public static ApiResponse error(String message) {
        return new ApiResponse("error", message, null, null, null);
    }
}
