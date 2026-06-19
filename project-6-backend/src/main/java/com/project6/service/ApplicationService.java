package com.project6.service;

import com.project6.dto.ApplicationResponseDTO;
import com.project6.entity.Application;
import com.project6.entity.Company;
import com.project6.entity.JobPost;
import com.project6.repository.ApplicationRepository;
import com.project6.repository.CompanyRepository;
import com.project6.repository.JobPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;
    private final FileStorageService fileStorageService;
    private final com.project6.repository.UserRepository userRepository;

    /**
     * Ứng viên nộp đơn ứng tuyển
     */
    public ApplicationResponseDTO apply(UUID jobId, String fullName, String email,
                                        String phone, String coverLetter,
                                        MultipartFile cvFile) {
        // Kiểm tra job tồn tại
        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Công việc không tồn tại!"));

        // Kiểm tra đã nộp đơn chưa
        if (applicationRepository.existsByEmailAndJobPostId(email, jobId)) {
            throw new RuntimeException("Email này đã nộp đơn cho công việc này rồi!");
        }

        // Kiểm tra CV không hợp lệ — chặn toàn bộ, không apply được bất kỳ job nào
        org.springframework.security.core.Authentication authForCvCheck =
            SecurityContextHolder.getContext().getAuthentication();
        if (authForCvCheck != null && authForCvCheck.isAuthenticated()
                && !"anonymousUser".equals(authForCvCheck.getName())
                && authForCvCheck.getName().equalsIgnoreCase(email)) {
            com.project6.entity.User candidate = userRepository.findByEmail(email).orElse(null);
            if (candidate != null && "INVALID".equals(candidate.getCvStatus())) {
                throw new RuntimeException(
                    "CV của bạn đã bị đánh giá KHÔNG HỢP LỆ. Vui lòng cập nhật và tải lại CV hợp lệ trước khi ứng tuyển.");
            }

            // Kiểm tra điều kiện tốt nghiệp (chỉ với ứng viên có CV hợp lệ)
            boolean jobAllowsUngraduated = Boolean.TRUE.equals(job.getAllowUngraduated());
            if (!jobAllowsUngraduated && candidate != null
                    && Boolean.FALSE.equals(candidate.getCvGraduated())) {
                throw new RuntimeException(
                    "Công việc này yêu cầu ứng viên đã tốt nghiệp. CV của bạn cho thấy bạn chưa tốt nghiệp nên không thể nộp đơn cho vị trí này.");
            }
        }

        // Xử lý CV
        String finalCvUrl = null;
        if (cvFile != null && !cvFile.isEmpty()) {
            finalCvUrl = fileStorageService.storeCV(cvFile);
            if (finalCvUrl == null) {
                throw new RuntimeException("Không thể tải lên CV. Vui lòng thử lại!");
            }
        } else {
            // Lấy từ User profile
            org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName()) || !auth.getName().equalsIgnoreCase(email)) {
                throw new RuntimeException("Bạn phải đăng nhập đúng tài khoản để sử dụng CV đã lưu trong hồ sơ!");
            }
            com.project6.entity.User user = userRepository.findByEmail(email).orElse(null);
            if (user != null && user.getCvUrl() != null && !user.getCvUrl().isEmpty()) {
                finalCvUrl = user.getCvUrl();
            } else {
                throw new RuntimeException("Vui lòng tải lên file CV hoặc cập nhật CV chính trong hồ sơ cá nhân!");
            }
        }

        Application application = Application.builder()
                .jobPost(job)
                .fullName(fullName)
                .email(email)
                .phone(phone)
                .coverLetter(coverLetter)
                .cvUrl(finalCvUrl)
                .status("pending")
                .build();

        return ApplicationResponseDTO.from(applicationRepository.save(application));
    }

    /**
     * Company xem danh sách đơn ứng tuyển theo job
     */
    public Page<ApplicationResponseDTO> getApplicationsByJob(UUID jobId, int page, int size) {
        Company company = getCurrentCompany();
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, size,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return applicationRepository.findByJobPostIdAndCompany(jobId, company, pageable)
                .map(ApplicationResponseDTO::from);
    }

    /**
     * Company xem toàn bộ đơn ứng tuyển
     */
    public Page<ApplicationResponseDTO> getAllApplications(int page, int size) {
        Company company = getCurrentCompany();
        Pageable pageable = PageRequest.of(page > 0 ? page - 1 : 0, size,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return applicationRepository.findAllByCompany(company, pageable)
                .map(ApplicationResponseDTO::from);
    }

    /**
     * Company cập nhật trạng thái đơn
     */
    public ApplicationResponseDTO updateStatus(UUID applicationId, String status) {
        Company company = getCurrentCompany();
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển!"));

        // Kiểm tra đơn thuộc về công ty này
        if (!app.getJobPost().getCompany().getId().equals(company.getId())) {
            throw new RuntimeException("Bạn không có quyền cập nhật đơn này!");
        }

        if (!List.of("pending", "reviewed", "accepted", "rejected").contains(status)) {
            throw new RuntimeException("Trạng thái không hợp lệ!");
        }

        app.setStatus(status);
        return ApplicationResponseDTO.from(applicationRepository.save(app));
    }

    /**
     * Ứng viên tra cứu đơn theo email
     */
    public List<ApplicationResponseDTO> getApplicationsByEmail(String email) {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName()) || !auth.getName().equalsIgnoreCase(email)) {
            throw new RuntimeException("Bạn không có quyền xem thông tin này!");
        }
        return applicationRepository.findAll().stream()
                .filter(a -> email.equalsIgnoreCase(a.getEmail()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(ApplicationResponseDTO::from)
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * Lấy chi tiết 1 đơn (dùng cho cả hai phía)
     * — Khi nhà tuyển dụng xem, sẽ kèm thông tin tốt nghiệp từ bảng users
     */
    public ApplicationResponseDTO getApplicationDetail(UUID applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển!"));
        // Tra cứu User theo email để lấy cvGraduated, cvStatus
        com.project6.entity.User user = userRepository.findByEmail(app.getEmail()).orElse(null);
        return ApplicationResponseDTO.from(app, user);
    }

    /**
     * Ứng viên xóa đơn của mình (chỉ khi còn pending)
     */
    public void deleteApplication(UUID applicationId) {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            throw new RuntimeException("Bạn phải đăng nhập để thực hiện thao tác này!");
        }
        String email = auth.getName();
        
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển!"));
        if (!app.getEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Bạn không có quyền xóa đơn này!");
        }
        applicationRepository.delete(app);
    }

    /**
     * Ứng viên đã đăng nhập xem đơn của mình (từ JWT cookie)
     */
    public List<ApplicationResponseDTO> getMyApplications() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return applicationRepository.findAll().stream()
                .filter(a -> email.equalsIgnoreCase(a.getEmail()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(ApplicationResponseDTO::from)
                .collect(java.util.stream.Collectors.toList());
    }

    private Company getCurrentCompany() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin công ty!"));
    }
}
