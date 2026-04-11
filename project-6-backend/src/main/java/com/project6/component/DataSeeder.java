package com.project6.component;

import com.project6.entity.City;
import com.project6.entity.JobField;
import com.project6.entity.Specialization;
import com.project6.entity.Skill;
import com.project6.repository.CityRepository;
import com.project6.repository.JobFieldRepository;
import com.project6.repository.SkillRepository;
import com.project6.repository.SpecializationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final JobFieldRepository jobFieldRepository;
    private final SpecializationRepository specializationRepository;
    private final CityRepository cityRepository;
    private final SkillRepository skillRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedCities();
        seedJobFields();
        seedSpecializations();
        seedSkills();
    }

    private void seedCities() {
        if (cityRepository.count() == 0) {
            cityRepository.saveAll(List.of(
                City.builder().code("HN").name("Hà Nội").build(),
                City.builder().code("HCM").name("Hồ Chí Minh").build(),
                City.builder().code("DN").name("Đà Nẵng").build(),
                City.builder().code("CT").name("Cần Thơ").build(),
                City.builder().code("HP").name("Hải Phòng").build()
            ));
        }
    }

    private void seedJobFields() {
        if (jobFieldRepository.count() == 0) {
            jobFieldRepository.saveAll(List.of(
                JobField.builder().slug("dich-vu-blockchain-web3").name("Dịch vụ Blockchain & Web3").build(),
                JobField.builder().slug("thuong-mai-dien-tu").name("Thương Mại Điện Tử").build(),
                JobField.builder().slug("ngan-hang").name("Ngân Hàng").build(),
                JobField.builder().slug("giao-duc-va-dao-tao").name("Giáo Dục và Đào Tạo").build(),
                JobField.builder().slug("dich-vu-va-tu-van-it").name("Dịch Vụ và Tư Vấn IT").build(),
                JobField.builder().slug("thue-ngoai-phat-trien-phan-mem").name("Thuê Ngoài Phát Triển Phần Mềm").build(),
                JobField.builder().slug("dich-vu-tai-chinh").name("Dịch Vụ Tài Chính").build(),
                JobField.builder().slug("phan-mem-va-dich-vu-tri-tue-nhan-tao").name("Phần mềm và Dịch vụ Trí tuệ Nhân tạo").build()
            ));
        }
    }

    private void seedSpecializations() {
        if (specializationRepository.count() == 0) {
            specializationRepository.saveAll(List.of(
                // Web Application Development
                Specialization.builder().category("Web Application Development").slug("lap-trinh-vien-backend").name("Lập trình viên Backend").build(),
                Specialization.builder().category("Web Application Development").slug("lap-trinh-vien-frontend").name("Lập trình viên Frontend").build(),
                Specialization.builder().category("Web Application Development").slug("lap-trinh-vien-fullstack").name("Lập trình viên Fullstack").build(),
                
                // Mobile
                Specialization.builder().category("Mobile Application Development").slug("lap-trinh-vien-ung-dung-di-dong").name("Lập trình viên Ứng dụng Di động").build(),
                
                // AI & Data
                Specialization.builder().category("Data Science & AI").slug("data-scientist").name("Data Scientist").build(),
                Specialization.builder().category("Data Science & AI").slug("ky-su-ai-machine-learning").name("Kỹ sư AI / Machine Learning").build(),
                Specialization.builder().category("Data Engineering").slug("ky-su-du-lieu").name("Kỹ sư Dữ liệu").build(),
                
                // QA/QC & DevOps
                Specialization.builder().category("Software Testing").slug("kiem-thu-thu-cong").name("Kiểm thử thủ công").build(),
                Specialization.builder().category("Software Testing").slug("kiem-thu-tu-dong").name("Kiểm thử tự động").build(),
                Specialization.builder().category("DevOps").slug("ky-su-devops").name("Kỹ sư DevOps").build(),
                
                // PM / BA
                Specialization.builder().category("Project Management").slug("phan-tich-nghiep-vu").name("Phân tích nghiệp vụ").build(),
                Specialization.builder().category("Project Management").slug("quan-ly-du-an").name("Quản lý Dự án").build()
            ));
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            skillRepository.saveAll(List.of(
                Skill.builder().name("Java").build(),
                Skill.builder().name("Python").build(),
                Skill.builder().name("JavaScript").build(),
                Skill.builder().name("TypeScript").build(),
                Skill.builder().name("React").build(),
                Skill.builder().name("Node.js").build(),
                Skill.builder().name("Spring Boot").build(),
                Skill.builder().name("Docker").build(),
                Skill.builder().name("Kubernetes").build(),
                Skill.builder().name("AWS").build(),
                Skill.builder().name("SQL").build(),
                Skill.builder().name("NoSQL").build(),
                Skill.builder().name("Go").build(),
                Skill.builder().name("Ruby").build(),
                Skill.builder().name("PHP").build(),
                Skill.builder().name(".NET").build(),
                Skill.builder().name("C#").build(),
                Skill.builder().name("Angular").build(),
                Skill.builder().name("Vue.js").build()
            ));
        }
    }
}
