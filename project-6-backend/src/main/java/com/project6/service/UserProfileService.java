package com.project6.service;

import com.project6.dto.UserInfoDto;
import com.project6.dto.UserProfileRequest;
import com.project6.entity.User;
import com.project6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public UserInfoDto updateProfile(UserProfileRequest request) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> optionalUser = userRepository.findByEmail(currentEmail);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Không tìm thấy người dùng đang đăng nhập.");
        }

        User user = optionalUser.get();

        if (request.getUsername() != null) user.setFullName(request.getUsername());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        
        // Handle Email update carefully
        if (request.getEmail() != null && !request.getEmail().equals(currentEmail)) {
            // Check if email is already taken
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email đã được sử dụng bởi người dùng khác!");
            }
            user.setEmail(request.getEmail());
        }

        // Handle Avatar update
        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String avatarUrl = fileStorageService.storeFile(request.getAvatar());
            user.setAvatar(avatarUrl);
        }

        User updatedUser = userRepository.save(user);
        return UserInfoDto.from(updatedUser);
    }
}
