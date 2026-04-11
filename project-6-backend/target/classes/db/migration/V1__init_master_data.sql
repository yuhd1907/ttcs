-- Insert Cities (Thành phố)
INSERT INTO cities (id, name, code) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Hà Nội', 'HN'),
('550e8400-e29b-41d4-a716-446655440002', 'Thành phố Hồ Chí Minh', 'HCM'),
('550e8400-e29b-41d4-a716-446655440003', 'Đà Nẵng', 'DN'),
('550e8400-e29b-41d4-a716-446655440004', 'Hải Phòng', 'HP'),
('550e8400-e29b-41d4-a716-446655440005', 'Cần Thơ', 'CT'),
('550e8400-e29b-41d4-a716-446655440006', 'Bình Dương', 'BD'),
('550e8400-e29b-41d4-a716-446655440007', 'Đồng Nai', 'DN2'),
('550e8400-e29b-41d4-a716-446655440008', 'Hà Tĩnh', 'HT'),
('550e8400-e29b-41d4-a716-446655440009', 'Nghệ An', 'NA'),
('550e8400-e29b-41d4-a716-446655440010', 'Quảng Ninh', 'QN')
ON CONFLICT DO NOTHING;

-- Insert Job Fields (Lĩnh vực công việc)
INSERT INTO job_fields (id, name, slug) VALUES
('550e8400-e29b-41d4-a716-446655550001', 'Dịch vụ Blockchain & Web3', 'dich-vu-blockchain-web3'),
('550e8400-e29b-41d4-a716-446655550002', 'Thực Phẩm và Đồ Uống', 'thuc-pham-va-do-uong'),
('550e8400-e29b-41d4-a716-446655550003', 'Du Lịch và Dịch Vụ Lưu Trú', 'du-lich-va-dich-vu-luu-tru'),
('550e8400-e29b-41d4-a716-446655550004', 'Bảo Hiểm', 'bao-hiem'),
('550e8400-e29b-41d4-a716-446655550005', 'Hàng Tiêu Dùng', 'hang-tieu-dung'),
('550e8400-e29b-41d4-a716-446655550006', 'Thương Mại Điện Tử', 'thuong-mai-dien-tu'),
('550e8400-e29b-41d4-a716-446655550007', 'Giáo Dục và Đào Tạo', 'giao-duc-va-dao-tao'),
('550e8400-e29b-41d4-a716-446655550008', 'Ngân Hàng', 'ngan-hang'),
('550e8400-e29b-41d4-a716-446655550009', 'Trò Chơi', 'tro-choi'),
('550e8400-e29b-41d4-a716-446655550010', 'Chính Phủ', 'chinh-phu'),
('550e8400-e29b-41d4-a716-446655550011', 'Phần Cứng và Điện Toán', 'phan-cung-va-dien-toan'),
('550e8400-e29b-41d4-a716-446655550012', 'Phi Lợi Nhuận và Dịch Vụ Xã Hội', 'phi-loi-nhuan-va-dich-vu-xa-hoi'),
('550e8400-e29b-41d4-a716-446655550013', 'Sản Xuất và Kỹ Thuật', 'san-xuat-va-ky-thuat'),
('550e8400-e29b-41d4-a716-446655550014', 'Truyền Thông, Quảng Cáo và Giải Trí', 'truyen-thong-quang-cao-va-giai-tri'),
('550e8400-e29b-41d4-a716-446655550015', 'Môi Trường', 'moi-truong'),
('550e8400-e29b-41d4-a716-446655550016', 'Dược Phẩm', 'duoc-pham'),
('550e8400-e29b-41d4-a716-446655550017', 'Bất Động Sản và Xây Dựng', 'bat-dong-san-va-xay-dung'),
('550e8400-e29b-41d4-a716-446655550018', 'Bán Lẻ và Bán Buôn', 'ban-le-va-ban-buon'),
('550e8400-e29b-41d4-a716-446655550019', 'Dịch Vụ và Tư Vấn IT', 'dich-vu-va-tu-van-it'),
('550e8400-e29b-41d4-a716-446655550020', 'Viễn Thông', 'vien-thong'),
('550e8400-e29b-41d4-a716-446655550021', 'Vận Tải, Logistics và Kho Hàng', 'van-tai-logistics-va-kho-hang'),
('550e8400-e29b-41d4-a716-446655550022', 'An Ninh Mạng', 'an-ninh-mang'),
('550e8400-e29b-41d4-a716-446655550023', 'Mua Bán và Thương Mại', 'mua-ban-va-thuong-mai'),
('550e8400-e29b-41d4-a716-446655550024', 'Mạng Lưới và Cơ Sở Hạ Tầng', 'mang-luoi-va-co-so-ha-tang'),
('550e8400-e29b-41d4-a716-446655550025', 'Thuê Ngoài Phát Triển Phần Mềm', 'thue-ngoai-phat-trien-phan-mem'),
('550e8400-e29b-41d4-a716-446655550026', 'Sản Phẩm Phần Mềm và Dịch Vụ Web', 'san-pham-phan-mem-va-dich-vu-web'),
('550e8400-e29b-41d4-a716-446655550027', 'Nông Nghiệp', 'nong-nghiep'),
('550e8400-e29b-41d4-a716-446655550028', 'Thể thao và Thể hình', 'the-thao-va-the-hinh'),
('550e8400-e29b-41d4-a716-446655550029', 'May mặc và Thời Trang', 'may-mac-va-thoi-trang'),
('550e8400-e29b-41d4-a716-446655550030', 'Sáng Tạo và Thiết Kế', 'sang-tao-va-thiet-ke'),
('550e8400-e29b-41d4-a716-446655550031', 'Cung Ứng và Tuyển Dụng', 'cung-ung-va-tuyen-dung'),
('550e8400-e29b-41d4-a716-446655550032', 'Xuất Bản và In Ấn', 'xuat-ban-va-in-an'),
('550e8400-e29b-41d4-a716-446655550033', 'Quản Lý Cơ Sở Vật Chất', 'quan-ly-co-so-vat-chat'),
('550e8400-e29b-41d4-a716-446655550034', 'Dịch Vụ Nghiên Cứu', 'dich-vu-nghien-cuu'),
('550e8400-e29b-41d4-a716-446655550035', 'Chăm Sóc Sức Khỏe', 'cham-soc-suc-khoe'),
('550e8400-e29b-41d4-a716-446655550036', 'Vật Liệu và Khai Thác', 'vat-lieu-va-khai-thac'),
('550e8400-e29b-41d4-a716-446655550037', 'Công Nghiệp Tiện Ích', 'cong-nghiep-tien-ich'),
('550e8400-e29b-41d4-a716-446655550038', 'Dịch Vụ Chuyên Nghiệp', 'dich-vu-chuyen-nghiep'),
('550e8400-e29b-41d4-a716-446655550039', 'Chứng khoán và Đầu tư', 'chung-khoan-va-dau-tu'),
('550e8400-e29b-41d4-a716-446655550040', 'Dịch Vụ Tài Chính', 'dich-vu-tai-chinh'),
('550e8400-e29b-41d4-a716-446655550041', 'Nghiên cứu & Phát triển Công nghệ Mới', 'nghien-cuu-phat-trien-cong-nghe-moi'),
('550e8400-e29b-41d4-a716-446655550042', 'Phần mềm và Dịch vụ Trí tuệ Nhân tạo', 'phan-mem-va-dich-vu-tri-tue-nhan-tao')
ON CONFLICT DO NOTHING;

-- Insert Skills (Công nghệ/Kỹ năng)
INSERT INTO skills (id, name) VALUES
('550e8400-e29b-41d4-a716-446655660001', 'Java'),
('550e8400-e29b-41d4-a716-446655660002', 'Python'),
('550e8400-e29b-41d4-a716-446655660003', 'JavaScript'),
('550e8400-e29b-41d4-a716-446655660004', 'TypeScript'),
('550e8400-e29b-41d4-a716-446655660005', 'C#'),
('550e8400-e29b-41d4-a716-446655660006', 'C++'),
('550e8400-e29b-41d4-a716-446655660007', 'Go'),
('550e8400-e29b-41d4-a716-446655660008', 'Rust'),
('550e8400-e29b-41d4-a716-446655660009', 'PHP'),
('550e8400-e29b-41d4-a716-446655660010', 'Ruby'),
('550e8400-e29b-41d4-a716-446655660011', 'Swift'),
('550e8400-e29b-41d4-a716-446655660012', 'Kotlin'),
('550e8400-e29b-41d4-a716-446655660013', 'React'),
('550e8400-e29b-41d4-a716-446655660014', 'Vue.js'),
('550e8400-e29b-41d4-a716-446655660015', 'Angular'),
('550e8400-e29b-41d4-a716-446655660016', 'Next.js'),
('550e8400-e29b-41d4-a716-446655660017', 'Spring Boot'),
('550e8400-e29b-41d4-a716-446655660018', 'Node.js'),
('550e8400-e29b-41d4-a716-446655660019', 'Express.js'),
('550e8400-e29b-41d4-a716-446655660020', 'Django'),
('550e8400-e29b-41d4-a716-446655660021', 'Flask'),
('550e8400-e29b-41d4-a716-446655660022', 'ASP.NET'),
('550e8400-e29b-41d4-a716-446655660023', 'PostgreSQL'),
('550e8400-e29b-41d4-a716-446655660024', 'MySQL'),
('550e8400-e29b-41d4-a716-446655660025', 'MongoDB'),
('550e8400-e29b-41d4-a716-446655660026', 'Redis'),
('550e8400-e29b-41d4-a716-446655660027', 'Docker'),
('550e8400-e29b-41d4-a716-446655660028', 'Kubernetes'),
('550e8400-e29b-41d4-a716-446655660029', 'AWS'),
('550e8400-e29b-41d4-a716-446655660030', 'Azure'),
('550e8400-e29b-41d4-a716-446655660031', 'Google Cloud'),
('550e8400-e29b-41d4-a716-446655660032', 'Git'),
('550e8400-e29b-41d4-a716-446655660033', 'CI/CD'),
('550e8400-e29b-41d4-a716-446655660034', 'REST API'),
('550e8400-e29b-41d4-a716-446655660035', 'GraphQL'),
('550e8400-e29b-41d4-a716-446655660036', 'Microservices'),
('550e8400-e29b-41d4-a716-446655660037', 'Machine Learning'),
('550e8400-e29b-41d4-a716-446655660038', 'TensorFlow'),
('550e8400-e29b-41d4-a716-446655660039', 'PyTorch'),
('550e8400-e29b-41d4-a716-446655660040', 'Data Science'),
('550e8400-e29b-41d4-a716-446655660041', 'Blockchain'),
('550e8400-e29b-41d4-a716-446655660042', 'Solidity'),
('550e8400-e29b-41d4-a716-446655660043', 'Mobile Development'),
('550e8400-e29b-41d4-a716-446655660044', 'React Native'),
('550e8400-e29b-41d4-a716-446655660045', 'Flutter'),
('550e8400-e29b-41d4-a716-446655660046', 'UI/UX Design'),
('550e8400-e29b-41d4-a716-446655660047', 'Figma'),
('550e8400-e29b-41d4-a716-446655660048', 'Linux'),
('550e8400-e29b-41d4-a716-446655660049', 'Windows'),
('550e8400-e29b-41d4-a716-446655660050', 'Agile/Scrum')
ON CONFLICT DO NOTHING;

-- Insert Specializations (Chuyên môn)
INSERT INTO specializations (id, category, name, slug) VALUES
-- IT Executive and Management
('550e8400-e29b-41d4-a716-446655770001', 'IT Executive and Management', 'Cấp điều hành (CTO, CIO, CISO, CDO)', 'cap-dieu-hanh-cto-cio-ciso-cdo'),
('550e8400-e29b-41d4-a716-446655770002', 'IT Executive and Management', 'Phó Chủ tịch / Giám đốc', 'pho-chu-tich-giam-doc'),
('550e8400-e29b-41d4-a716-446655770003', 'IT Executive and Management', 'Quản lý', 'quan-ly'),

-- Web Application Development
('550e8400-e29b-41d4-a716-446655770004', 'Web Application Development', 'Lập trình viên Backend', 'lap-trinh-vien-backend'),
('550e8400-e29b-41d4-a716-446655770005', 'Web Application Development', 'Lập trình viên Frontend', 'lap-trinh-vien-frontend'),
('550e8400-e29b-41d4-a716-446655770006', 'Web Application Development', 'Lập trình viên Fullstack', 'lap-trinh-vien-fullstack'),

-- Mobile Application Development
('550e8400-e29b-41d4-a716-446655770007', 'Mobile Application Development', 'Lập trình viên Ứng dụng Di động', 'lap-trinh-vien-ung-dung-di-dong'),

-- Core / Enterprise Systems Development
('550e8400-e29b-41d4-a716-446655770008', 'Core / Enterprise Systems Development', 'Kỹ sư RPA', 'ky-su-rpa'),
('550e8400-e29b-41d4-a716-446655770009', 'Core / Enterprise Systems Development', 'Lập trình viên ERP', 'lap-trinh-vien-erp'),
('550e8400-e29b-41d4-a716-446655770010', 'Core / Enterprise Systems Development', 'Lập trình viên Hệ thống Integration & Legacy', 'lap-trinh-vien-he-thong-integration'),

-- Low-Code / No-Code Development
('550e8400-e29b-41d4-a716-446655770011', 'Low-Code / No-Code Development', 'Lập trình viên Low-Code/No-Code', 'lap-trinh-vien-low-code-no-code'),

-- Technical Architecture
('550e8400-e29b-41d4-a716-446655770012', 'Technical Architecture', 'Kiến trúc sư Doanh nghiệp', 'kien-truc-su-doanh-nghiep'),
('550e8400-e29b-41d4-a716-446655770013', 'Technical Architecture', 'Kiến trúc sư Giải pháp', 'kien-truc-su-giai-phap'),
('550e8400-e29b-41d4-a716-446655770014', 'Technical Architecture', 'Kiến trúc sư Phần mềm', 'kien-truc-su-phan-mem'),

-- Blockchain Development
('550e8400-e29b-41d4-a716-446655770015', 'Blockchain Development', 'Kiến trúc sư Blockchain', 'kien-truc-su-blockchain'),
('550e8400-e29b-41d4-a716-446655770016', 'Blockchain Development', 'Lập trình viên Blockchain', 'lap-trinh-vien-blockchain'),
('550e8400-e29b-41d4-a716-446655770017', 'Blockchain Development', 'Lập trình viên Smart Contract', 'lap-trinh-vien-smart-contract'),

-- Game Development
('550e8400-e29b-41d4-a716-446655770018', 'Game Development', 'Lập trình viên Game', 'lap-trinh-vien-game'),
('550e8400-e29b-41d4-a716-446655770019', 'Game Development', 'Thiết kế Game', 'thiet-ke-game'),

-- Software Testing & Quality Assurance
('550e8400-e29b-41d4-a716-446655770020', 'Software Testing & QA', 'Kiểm thử thủ công', 'kiem-thu-thu-cong'),
('550e8400-e29b-41d4-a716-446655770021', 'Software Testing & QA', 'Kiểm thử tự động', 'kiem-thu-tu-dong'),

-- Data Engineering
('550e8400-e29b-41d4-a716-446655770022', 'Data Engineering', 'Kỹ sư Dữ liệu', 'ky-su-du-lieu'),
('550e8400-e29b-41d4-a716-446655770023', 'Data Engineering', 'Kỹ sư Cơ sở dữ liệu', 'ky-su-co-so-du-lieu'),

-- Data Science & AI / Machine Learning
('550e8400-e29b-41d4-a716-446655770024', 'Data Science & AI', 'Data Scientist', 'data-scientist'),
('550e8400-e29b-41d4-a716-446655770025', 'Data Science & AI', 'Kỹ sư AI / Machine Learning', 'ky-su-ai-machine-learning'),

-- Cloud Computing
('550e8400-e29b-41d4-a716-446655770026', 'Cloud Computing', 'Kỹ sư Đám mây', 'ky-su-dam-may'),

-- DevOps & SRE
('550e8400-e29b-41d4-a716-446655770027', 'DevOps & SRE', 'Kỹ sư DevOps', 'ky-su-devops'),

-- Cybersecurity
('550e8400-e29b-41d4-a716-446655770028', 'Cybersecurity', 'Kỹ sư An ninh', 'ky-su-an-ninh'),

-- Product Management
('550e8400-e29b-41d4-a716-446655770029', 'Product Management', 'Quản lý sản phẩm', 'quan-ly-san-pham'),

-- Design & UX
('550e8400-e29b-41d4-a716-446655770030', 'Design & UX', 'Thiết kế UX/UI', 'thiet-ke-ux-ui')
ON CONFLICT DO NOTHING;

