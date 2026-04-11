package com.project6.component;

import com.project6.entity.City;
import com.project6.entity.JobField;
import com.project6.entity.Skill;
import com.project6.entity.Specialization;
import com.project6.repository.CityRepository;
import com.project6.repository.JobFieldRepository;
import com.project6.repository.SkillRepository;
import com.project6.repository.SpecializationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final CityRepository cityRepository;
    private final JobFieldRepository jobFieldRepository;
    private final SkillRepository skillRepository;
    private final SpecializationRepository specializationRepository;

    @Override
    public void run(String... args) throws Exception {
        loadCities();
        loadJobFields();
        loadSkills();
        loadSpecializations();
        log.info("Master data loaded successfully!");
    }

    private void loadCities() {
        if (cityRepository.count() == 0) {
            List<City> cities = Arrays.asList(
                City.builder().name("Hà Nội").code("HN").build(),
                City.builder().name("Thành phố Hồ Chí Minh").code("HCM").build(),
                City.builder().name("Đà Nẵng").code("DN").build(),
                City.builder().name("Hải Phòng").code("HP").build(),
                City.builder().name("Cần Thơ").code("CT").build(),
                City.builder().name("Bình Dương").code("BD").build(),
                City.builder().name("Đồng Nai").code("DN2").build(),
                City.builder().name("Hà Tĩnh").code("HT").build(),
                City.builder().name("Nghệ An").code("NA").build(),
                City.builder().name("Quảng Ninh").code("QN").build(),
                City.builder().name("Lâm Đồng").code("LD").build(),
                City.builder().name("Kiên Giang").code("KG").build(),
                City.builder().name("Long An").code("LA").build(),
                City.builder().name("Tiền Giang").code("TG").build(),
                City.builder().name("Bến Tre").code("BT").build()
            );
            cityRepository.saveAll(cities);
            log.info("Loaded {} cities", cities.size());
        }
    }

    private void loadJobFields() {
        if (jobFieldRepository.count() == 0) {
            List<JobField> fields = Arrays.asList(
                JobField.builder().name("Dịch vụ Blockchain & Web3").slug("dich-vu-blockchain-web3").build(),
                JobField.builder().name("Thực Phẩm và Đồ Uống").slug("thuc-pham-va-do-uong").build(),
                JobField.builder().name("Du Lịch và Dịch Vụ Lưu Trú").slug("du-lich-va-dich-vu-luu-tru").build(),
                JobField.builder().name("Bảo Hiểm").slug("bao-hiem").build(),
                JobField.builder().name("Hàng Tiêu Dùng").slug("hang-tieu-dung").build(),
                JobField.builder().name("Thương Mại Điện Tử").slug("thuong-mai-dien-tu").build(),
                JobField.builder().name("Giáo Dục và Đào Tạo").slug("giao-duc-va-dao-tao").build(),
                JobField.builder().name("Ngân Hàng").slug("ngan-hang").build(),
                JobField.builder().name("Trò Chơi").slug("tro-choi").build(),
                JobField.builder().name("Chính Phủ").slug("chinh-phu").build(),
                JobField.builder().name("Phần Cứng và Điện Toán").slug("phan-cung-va-dien-toan").build(),
                JobField.builder().name("Phi Lợi Nhuận và Dịch Vụ Xã Hội").slug("phi-loi-nhuan-va-dich-vu-xa-hoi").build(),
                JobField.builder().name("Sản Xuất và Kỹ Thuật").slug("san-xuat-va-ky-thuat").build(),
                JobField.builder().name("Truyền Thông, Quảng Cáo và Giải Trí").slug("truyen-thong-quang-cao-va-giai-tri").build(),
                JobField.builder().name("Môi Trường").slug("moi-truong").build(),
                JobField.builder().name("Dược Phẩm").slug("duoc-pham").build(),
                JobField.builder().name("Bất Động Sản và Xây Dựng").slug("bat-dong-san-va-xay-dung").build(),
                JobField.builder().name("Bán Lẻ và Bán Buôn").slug("ban-le-va-ban-buon").build(),
                JobField.builder().name("Dịch Vụ và Tư Vấn IT").slug("dich-vu-va-tu-van-it").build(),
                JobField.builder().name("Viễn Thông").slug("vien-thong").build(),
                JobField.builder().name("Vận Tải, Logistics và Kho Hàng").slug("van-tai-logistics-va-kho-hang").build(),
                JobField.builder().name("An Ninh Mạng").slug("an-ninh-mang").build(),
                JobField.builder().name("Mua Bán và Thương Mại").slug("mua-ban-va-thuong-mai").build(),
                JobField.builder().name("Mạng Lưới và Cơ Sở Hạ Tầng").slug("mang-luoi-va-co-so-ha-tang").build(),
                JobField.builder().name("Thuê Ngoài Phát Triển Phần Mềm").slug("thue-ngoai-phat-trien-phan-mem").build(),
                JobField.builder().name("Sản Phẩm Phần Mềm và Dịch Vụ Web").slug("san-pham-phan-mem-va-dich-vu-web").build(),
                JobField.builder().name("Nông Nghiệp").slug("nong-nghiep").build(),
                JobField.builder().name("Thể thao và Thể hình").slug("the-thao-va-the-hinh").build(),
                JobField.builder().name("May mặc và Thời Trang").slug("may-mac-va-thoi-trang").build(),
                JobField.builder().name("Sáng Tạo và Thiết Kế").slug("sang-tao-va-thiet-ke").build(),
                JobField.builder().name("Cung Ứng và Tuyển Dụng").slug("cung-ung-va-tuyen-dung").build(),
                JobField.builder().name("Xuất Bản và In Ấn").slug("xuat-ban-va-in-an").build(),
                JobField.builder().name("Quản Lý Cơ Sở Vật Chất").slug("quan-ly-co-so-vat-chat").build(),
                JobField.builder().name("Dịch Vụ Nghiên Cứu").slug("dich-vu-nghien-cuu").build(),
                JobField.builder().name("Chăm Sóc Sức Khỏe").slug("cham-soc-suc-khoe").build(),
                JobField.builder().name("Vật Liệu và Khai Thác").slug("vat-lieu-va-khai-thac").build(),
                JobField.builder().name("Công Nghiệp Tiện Ích").slug("cong-nghiep-tien-ich").build(),
                JobField.builder().name("Dịch Vụ Chuyên Nghiệp").slug("dich-vu-chuyen-nghiep").build(),
                JobField.builder().name("Chứng khoán và Đầu tư").slug("chung-khoan-va-dau-tu").build(),
                JobField.builder().name("Dịch Vụ Tài Chính").slug("dich-vu-tai-chinh").build(),
                JobField.builder().name("Nghiên cứu & Phát triển Công nghệ Mới").slug("nghien-cuu-phat-trien-cong-nghe-moi").build(),
                JobField.builder().name("Phần mềm và Dịch vụ Trí tuệ Nhân tạo").slug("phan-mem-va-dich-vu-tri-tue-nhan-tao").build()
            );
            jobFieldRepository.saveAll(fields);
            log.info("Loaded {} job fields", fields.size());
        }
    }

    private void loadSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                Skill.builder().name("Java").build(),
                Skill.builder().name("Python").build(),
                Skill.builder().name("JavaScript").build(),
                Skill.builder().name("TypeScript").build(),
                Skill.builder().name("C#").build(),
                Skill.builder().name("C++").build(),
                Skill.builder().name("Go").build(),
                Skill.builder().name("Rust").build(),
                Skill.builder().name("PHP").build(),
                Skill.builder().name("Ruby").build(),
                Skill.builder().name("Swift").build(),
                Skill.builder().name("Kotlin").build(),
                Skill.builder().name("React").build(),
                Skill.builder().name("Vue.js").build(),
                Skill.builder().name("Angular").build(),
                Skill.builder().name("Next.js").build(),
                Skill.builder().name("Spring Boot").build(),
                Skill.builder().name("Node.js").build(),
                Skill.builder().name("Express.js").build(),
                Skill.builder().name("Django").build(),
                Skill.builder().name("Flask").build(),
                Skill.builder().name("ASP.NET").build(),
                Skill.builder().name("PostgreSQL").build(),
                Skill.builder().name("MySQL").build(),
                Skill.builder().name("MongoDB").build(),
                Skill.builder().name("Redis").build(),
                Skill.builder().name("Docker").build(),
                Skill.builder().name("Kubernetes").build(),
                Skill.builder().name("AWS").build(),
                Skill.builder().name("Azure").build(),
                Skill.builder().name("Google Cloud").build(),
                Skill.builder().name("Git").build(),
                Skill.builder().name("CI/CD").build(),
                Skill.builder().name("REST API").build(),
                Skill.builder().name("GraphQL").build(),
                Skill.builder().name("Microservices").build(),
                Skill.builder().name("Machine Learning").build(),
                Skill.builder().name("TensorFlow").build(),
                Skill.builder().name("PyTorch").build(),
                Skill.builder().name("Data Science").build(),
                Skill.builder().name("Blockchain").build(),
                Skill.builder().name("Solidity").build(),
                Skill.builder().name("Mobile Development").build(),
                Skill.builder().name("React Native").build(),
                Skill.builder().name("Flutter").build(),
                Skill.builder().name("UI/UX Design").build(),
                Skill.builder().name("Figma").build(),
                Skill.builder().name("Linux").build(),
                Skill.builder().name("Windows").build(),
                Skill.builder().name("Agile/Scrum").build()
            );
            skillRepository.saveAll(skills);
            log.info("Loaded {} skills", skills.size());
        }
    }

    private void loadSpecializations() {
        if (specializationRepository.count() == 0) {
            List<Specialization> specializations = Arrays.asList(
                // IT Executive and Management
                Specialization.builder().category("IT Executive and Management").name("Cấp điều hành (CTO, CIO, CISO, CDO)").slug("cap-dieu-hanh-cto-cio-ciso-cdo").build(),
                Specialization.builder().category("IT Executive and Management").name("Phó Chủ tịch / Giám đốc").slug("pho-chu-tich-giam-doc").build(),
                Specialization.builder().category("IT Executive and Management").name("Quản lý").slug("quan-ly").build(),

                // Web Application Development
                Specialization.builder().category("Web Application Development").name("Lập trình viên Backend").slug("lap-trinh-vien-backend").build(),
                Specialization.builder().category("Web Application Development").name("Lập trình viên Frontend").slug("lap-trinh-vien-frontend").build(),
                Specialization.builder().category("Web Application Development").name("Lập trình viên Fullstack").slug("lap-trinh-vien-fullstack").build(),

                // Mobile Application Development
                Specialization.builder().category("Mobile Application Development").name("Lập trình viên Ứng dụng Di động").slug("lap-trinh-vien-ung-dung-di-dong").build(),

                // Core / Enterprise Systems Development
                Specialization.builder().category("Core / Enterprise Systems Development").name("Kỹ sư RPA").slug("ky-su-rpa").build(),
                Specialization.builder().category("Core / Enterprise Systems Development").name("Lập trình viên ERP").slug("lap-trinh-vien-erp").build(),
                Specialization.builder().category("Core / Enterprise Systems Development").name("Lập trình viên Hệ thống Integration & Legacy").slug("lap-trinh-vien-he-thong-integration").build(),

                // Low-Code / No-Code Development
                Specialization.builder().category("Low-Code / No-Code Development").name("Lập trình viên Low-Code/No-Code").slug("lap-trinh-vien-low-code-no-code").build(),

                // Technical Architecture
                Specialization.builder().category("Technical Architecture").name("Kiến trúc sư Doanh nghiệp").slug("kien-truc-su-doanh-nghiep").build(),
                Specialization.builder().category("Technical Architecture").name("Kiến trúc sư Giải pháp").slug("kien-truc-su-giai-phap").build(),
                Specialization.builder().category("Technical Architecture").name("Kiến trúc sư Phần mềm").slug("kien-truc-su-phan-mem").build(),

                // Blockchain Development
                Specialization.builder().category("Blockchain Development").name("Kiến trúc sư Blockchain").slug("kien-truc-su-blockchain").build(),
                Specialization.builder().category("Blockchain Development").name("Lập trình viên Blockchain").slug("lap-trinh-vien-blockchain").build(),
                Specialization.builder().category("Blockchain Development").name("Lập trình viên Smart Contract").slug("lap-trinh-vien-smart-contract").build(),

                // Game Development
                Specialization.builder().category("Game Development").name("Lập trình viên Game").slug("lap-trinh-vien-game").build(),
                Specialization.builder().category("Game Development").name("Thiết kế Game").slug("thiet-ke-game").build(),

                // Software Testing & Quality Assurance
                Specialization.builder().category("Software Testing & QA").name("Kiểm thử thủ công").slug("kiem-thu-thu-cong").build(),
                Specialization.builder().category("Software Testing & QA").name("Kiểm thử tự động").slug("kiem-thu-tu-dong").build(),

                // Data Engineering
                Specialization.builder().category("Data Engineering").name("Kỹ sư Dữ liệu").slug("ky-su-du-lieu").build(),
                Specialization.builder().category("Data Engineering").name("Kỹ sư Cơ sở dữ liệu").slug("ky-su-co-so-du-lieu").build(),

                // Data Science & AI
                Specialization.builder().category("Data Science & AI").name("Data Scientist").slug("data-scientist").build(),
                Specialization.builder().category("Data Science & AI").name("Kỹ sư AI / Machine Learning").slug("ky-su-ai-machine-learning").build(),

                // Cloud Computing
                Specialization.builder().category("Cloud Computing").name("Kỹ sư Đám mây").slug("ky-su-dam-may").build(),

                // DevOps & SRE
                Specialization.builder().category("DevOps & SRE").name("Kỹ sư DevOps").slug("ky-su-devops").build(),

                // Cybersecurity
                Specialization.builder().category("Cybersecurity").name("Kỹ sư An ninh").slug("ky-su-an-ninh").build(),

                // Product Management
                Specialization.builder().category("Product Management").name("Quản lý sản phẩm").slug("quan-ly-san-pham").build(),

                // Design & UX
                Specialization.builder().category("Design & UX").name("Thiết kế UX/UI").slug("thiet-ke-ux-ui").build()
            );
            specializationRepository.saveAll(specializations);
            log.info("Loaded {} specializations", specializations.size());
        }
    }
}

