"use client";

import { useState } from "react";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { FiFacebook, FiYoutube, FiLinkedin } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

export const Footer = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#000065] mt-[60px]">
        <div className="container mx-auto pt-[48px] pb-[20px] grid grid-cols-1 lg:grid-cols-4 gap-x-[30px]">
          <div className={"flex flex-col lg:items-start items-center"}>
            <div className={"w-[132px] h-[50px]"}>
              <img src={"/assets/images/logo.png"} alt={"it-viec"} />
            </div>
            <span className={"mt-[8px] font-[400] text-[12px] text-white"}>
              BUILD YOU THEN BUILD IMPACT
            </span>
            <div className={"flex flex-row gap-[15px] mt-[32px]"}>
              <div
                className={
                  "w-[40px] h-[40px] border border-[#333333]" +
                  " border-[1px] p-[5px] rounded-[50%] flex items-center" +
                  " justify-center bg-[#000080]"
                }
              >
                <Link href={"/"}>
                  <FiLinkedin className={"text-[20px] text-[#A6A6A6]"} />
                </Link>
              </div>
              <div
                className={
                  "w-[40px] h-[40px] border border-[#333333]" +
                  " border-[1px] p-[5px] rounded-[50%] flex items-center" +
                  " justify-center bg-[#000080]"
                }
              >
                <Link href={"/"}>
                  <FiFacebook className={"text-[20px] text-[#A6A6A6]"} />
                </Link>
              </div>
              <div
                className={
                  "w-[40px] h-[40px] border border-[#333333]" +
                  " border-[1px] p-[5px] rounded-[50%] flex items-center" +
                  " justify-center bg-[#000080]"
                }
              >
                <Link href={"/"}>
                  <FiYoutube className={"text-[20px] text-[#A6A6A6]"} />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              aria-expanded={isAboutOpen}
              aria-controls="footer-about-list"
              onClick={() => setIsAboutOpen((prev) => !prev)}
              className="lg:hidden mt-[12px] w-full flex items-center justify-between cursor-pointer"
            >
              <span className="text-white text-[16px] font-[700]">
                Về ITviec
              </span>
              <FaAngleDown
                className={`text-white transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
              />
            </button>
            <span
              className={"hidden lg:inline text-white text-[16px] font-[700]"}
            >
              Về ITviec
            </span>
            <ul
              id="footer-about-list"
              className={`${isAboutOpen ? "block" : "hidden"} lg:block mt-[12px] [&>li]:text-[14px] [&>li]:text-[#A6A6A6] [&>li]:pb-[12px]`}
            >
              <li>
                <Link href={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link href={"/"}>Về ITviec.com</Link>
              </li>
              <li>
                <Link href={"/"}>Dịch vụ gợi ý ứng viên</Link>
              </li>
              <li>
                <Link href={"/"}>Việc Làm IT</Link>
              </li>
              <li>
                <Link href={"/"}>Liên Hệ</Link>
              </li>
              <li>
                <Link href={"/"}>Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
          <div className="border-t border-[#2A2A2A] pt-[12px] mt-[12px] lg:border-t-0 lg:pt-0 lg:mt-0">
            <button
              type="button"
              aria-expanded={isTermsOpen}
              aria-controls="footer-terms-list"
              onClick={() => setIsTermsOpen((prev) => !prev)}
              className="lg:hidden w-full flex items-center justify-between cursor-pointer"
            >
              <span className="text-white text-[16px] font-[700]">
                Điều khoản chung
              </span>
              <FaAngleDown
                className={`text-white transition-transform ${isTermsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <span
              className={"hidden lg:inline text-white text-[16px] font-[700]"}
            >
              Điều khoản chung
            </span>
            <ul
              id="footer-terms-list"
              className={`${isTermsOpen ? "block" : "hidden"} lg:block mt-[12px] [&>li]:text-[14px] [&>li]:text-[#A6A6A6] [&>li]:pb-[12px]`}
            >
              <li>
                <Link href={"/"}>Chính sách quyền riêng tư</Link>
              </li>
              <li>
                <Link href={"/"}>Quy chế hoạt động</Link>
              </li>
              <li>
                <Link href={"/"}>Giải quyết khiếu nại</Link>
              </li>
              <li>
                <Link href={"/"}>Thoả thuận sử dụng</Link>
              </li>
              <li>
                <Link href={"/"}>Thông cáo báo chí</Link>
              </li>
            </ul>
          </div>
          <div className="border-t border-[#2A2A2A] pt-[12px] mt-[12px] lg:border-t-0 lg:pt-0 lg:mt-0">
            <span className={"text-white text-[16px] font-[700]"}>
              Liên hệ để đăng tin tuyển dụng tại:
            </span>
            <ul className="mt-[12px] [&>li]:text-[14px] [&>li]:text-[#A6A6A6] [&>li]:pb-[12px]">
              <li className={"flex items-center gap-[5px]"}>
                <FiPhoneCall />
                <span>Hồ Chí Minh: (+84) 977 460 519</span>
              </li>
              <li className={"flex items-center gap-[5px]"}>
                <FiPhoneCall />
                <span>Hà Nội: (+84) 983 131 351</span>
              </li>
              <li className={"flex items-center gap-[5px]"}>
                <IoMailOutline />
                <span>Email: love@itviec.com</span>
              </li>
              <li className={"flex items-center gap-[5px]"}>
                <FiSend />
                <span>Gửi thông tin liên hệ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản đồ và Fanpage */}
        <div className="container mx-auto pb-[32px] pt-[12px] grid grid-cols-1 lg:grid-cols-4 gap-x-[30px] gap-y-[24px]">
          {/* Cột Bản đồ */}
          <div className="col-span-1 lg:col-start-1 w-full flex flex-col pt-[8px]">
            <span className="text-white text-[16px] font-[700] mb-[16px]">
              Vị trí của chúng tôi
            </span>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.319350036697!2d106.6953139153343!3d10.786834892314545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3692af023d%3A0xa6cb99a3c9eb55b!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1689721665421!5m2!1svi!2s"
              width="100%"
              height="130"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg "
            ></iframe>
          </div>

          {/* Cột Fanpage */}
          <div className="col-span-1 lg:col-start-4 w-full flex flex-col pt-[8px]">
            <span className="text-white text-[16px] font-[700] mb-[16px]">
              Theo dõi chúng tôi
            </span>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmeta&tabs&width=500&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="130"
              style={{ border: 0, overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="rounded-lg bg-white"
            ></iframe>
          </div>
        </div>

        <div className="py-[24px] flex flex-col gap-10px text-center border-t-[1px] border-[#A6A6A6]">
          <span className="text-[#A6A6A6] text-[14px] font-[400]">
            Copyright © IT VIEC JSC | MST: 0230129843083
          </span>
        </div>
      </footer>
    </>
  );
};
