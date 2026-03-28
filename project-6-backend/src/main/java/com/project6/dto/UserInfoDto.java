package com.project6.dto;

import com.project6.entity.User;
import lombok.Data;
import java.util.UUID;

@Data
public class UserInfoDto {
    private UUID id;
    private String email;
    private String username;  // = fullName
    private String phone;
    private String avatar;

    public static UserInfoDto from(User user) {
        UserInfoDto dto = new UserInfoDto();
        dto.id = user.getId();
        dto.email = user.getEmail();
        dto.username = user.getFullName();
        dto.phone = user.getPhone();
        dto.avatar = user.getAvatar();
        return dto;
    }
}
