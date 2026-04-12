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

        // Upload CV lên Cloudinary
        if (cvFile == null || cvFile.isEmpty()) {
            throw new RuntimeException("Vui lòng tải lên file CV!");
        }
        String cvUrl = fileStorageService.storeCV(cvFile);
        if (cvUrl == null) {
            throw new RuntimeException("Không thể tải lên CV. Vui lòng thử lại!");
        }

        Application application = Application.builder()
                .jobPost(job)
                .fullName(fullName)
                .email(email)
                .phone(phone)
                .coverLetter(coverLetter)
                .cvUrl(cvUrl)
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

        app.setStatus(status);
        return ApplicationResponseDTO.from(applicationRepository.save(app));
    }

    /**
     * Ứng viên tra cứu đơn theo email
     */
    public List<ApplicationResponseDTO> getApplicationsByEmail(String email) {
        return applicationRepository.findAll().stream()
                .filter(a -> email.equalsIgnoreCase(a.getEmail()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(ApplicationResponseDTO::from)
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * Lấy chi tiết 1 đơn (dùng cho cả hai phía)
     */
    public ApplicationResponseDTO getApplicationDetail(UUID applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn ứng tuyển!"));
        return ApplicationResponseDTO.from(app);
    }

    /**
     * Ứng viên xóa đơn của mình (chỉ khi còn pending)
     */
    public void deleteApplication(UUID applicationId, String email) {
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
