import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

export const HeaderITJobs = () => {
  const skills = [
    "Java",
    "MySQL",
    "Database",
    "UI-UX",
    "PHP",
    "Tester",
    ".NET",
    "Project Manager",
    "JavaScript",
    "English",
    "Business Analyst",
    "OOP",
    "HTML5",
    "Ruby",
    "Linux",
    "Oracle",
    "Manager",
    "Python",
    "Team Leader",
    "MVC",
    "SQL",
    "Mobile Apps",
    "Node.js",
    "React",
    "Android",
    "Ruby on Rails",
    "System Engineer",
    "Embedded",
    "iOS",
    "QA QC",
    "Designer",
    "J2EE",
  ];

  const jobRoles = [
    { label: "Lập trình viên Backend",          slug: "lap-trinh-vien-backend" },
    { label: "Kiểm thử tự động",                slug: "kiem-thu-tu-dong" },
    { label: "Lập trình viên Fullstack",         slug: "lap-trinh-vien-fullstack" },
    { label: "Lập trình viên Frontend",          slug: "lap-trinh-vien-frontend" },
    { label: "Kỹ sư Dữ liệu",                   slug: "ky-su-du-lieu" },
    { label: "Kỹ sư AI / Machine Learning",      slug: "ky-su-ai-machine-learning" },
    { label: "Kỹ sư DevOps",                     slug: "ky-su-devops" },
    { label: "Phân tích nghiệp vụ",              slug: "phan-tich-nghiep-vu" },
    { label: "Lập trình viên Ứng dụng Di động",  slug: "lap-trinh-vien-ung-dung-di-dong" },
    { label: "Quản lý Dự án",                    slug: "quan-ly-du-an" },
    { label: "Kiểm thử thủ công",                slug: "kiem-thu-thu-cong" },
    { label: "Data Scientist",                   slug: "data-scientist" },
  ];

  return (
    <>
      <li className="inline-flex lg:w-auto w-full lg:justify-start justify-between lg:p-0 p-[10px] gap-x-[8px] items-center relative group/sub-1">
        <Link
          href="#"
          className="text-[#FFFFFF] sm:text-[16px] text-[12px] font-[600] capitalize"
        >
          Việc làm IT
        </Link>
        <FaAngleDown className="text-[#FFFFFF] sm:text-[16px] text-[12px]"></FaAngleDown>
        <ul className="absolute top-[100%] left-[0] w-[280px] rounded-[4px] bg-[#000065] hidden group-hover/sub-1:block z-[999]">
          <li className="relative py-[10px] px-[16px] flex items-center justify-between bg-[#000065] sm:text-[14px] text-[12px] text-white font-[600] hover:bg-[#000096] group/sub-2">
            <span className={"sm:text-[14px] text-[12px]"}>
              Việc làm IT theo kỹ năng
            </span>
            <FaAngleRight className="text-[#FFFFFF] text-[14px]"></FaAngleRight>
            <ul
              className="absolute top-0 left-[100%] w-[600px] rounded-[4px] bg-[#000065]
 hidden group-hover/sub-2:grid grid-cols-4 "
            >
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="sm:text-[14px] text-[12px] py-[8px] px-[12px] bg-[#000065] hover:bg-[#000096] cursor-pointer border border-transparent text-white transition-colors"
                >
                  <Link href={`/search?skill=${encodeURIComponent(skill)}`}>
                    {skill}
                  </Link>
                </li>
              ))}
              <li className="col-span-4 flex items-center justify-center py-[10px] px-[12px] text-white border-t-[0.1px] border-white/30 hover:bg-[#000096] cursor-pointer">
                <Link
                  href={"/it-job-by-skills"}
                  className="flex flex-row items-center"
                >
                  <span className="text-[14px] font-medium">Xem tất cả</span>
                  <FaAngleRight className="text-[14px] ml-[5px]" />
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative py-[10px] px-[16px] flex items-center justify-between bg-[#000065] sm:text-[14px] text-[12px] text-white font-[600] hover:bg-[#000096] group/sub-3">
            Việc làm IT theo chuyên môn
            <FaAngleRight className="text-[#FFFFFF] text-[14px]"></FaAngleRight>
            <ul
              className="absolute top-0 left-[100%] w-[600px] rounded-[4px] bg-[#000065]
 hidden group-hover/sub-3:grid grid-cols-2 border border-white/10"
            >
              {jobRoles.map((role, index) => (
                <li
                  key={index}
                  className="sm:text-[14px] text-[12px] py-[10px] px-[16px] bg-[#000065] hover:bg-[#000096] cursor-pointer border border-transparent text-white transition-all duration-200"
                >
                  <Link href={`/search?specialization=${encodeURIComponent(role.slug)}`}>
                    {role.label}
                  </Link>
                </li>
              ))}
              <li className="col-span-2 flex items-center justify-center py-[12px] px-[12px] text-white border-t-[0.1px] border-white/20 hover:bg-[#000096] cursor-pointer">
                <Link
                  href={"/it-job-by-major"}
                  className="flex flex-row items-center"
                >
                  <span className="text-[14px] font-semibold">Xem tất cả</span>
                  <FaAngleRight className="text-[14px] ml-[6px]" />
                </Link>
              </li>
            </ul>
          </li>
          <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between bg-[#000065] sm:text-[14px] text-[12px] text-white font-[600] hover:bg-[#000096]">
            Việc làm IT theo công ty
            <FaAngleRight className="text-[#FFFFFF] text-[14px]"></FaAngleRight>
          </li>
          <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between bg-[#000065] sm:text-[14px] text-[12px] text-white font-[600] hover:bg-[#000096]">
            Việc làm IT theo thành phố
            <FaAngleRight className="text-[#FFFFFF] text-[16px]"></FaAngleRight>
          </li>
        </ul>
      </li>
    </>
  );
};
