import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrPerformance } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { PiSuitcase } from "react-icons/pi";
const CompanyDetail = () => {
  return (
    <>
      <div className="bg-[#000071]">
        <div className="container mx-auto px-[16px] flex flex-wrap gap-[16px] py-[32px]">
          <div className="w-[160px] h-[160px]">
            <img
              src="/assets/images/naver.png"
              alt=""
              className="aspect-[100/100] rounded-[4px] w-full h-full"
            />
          </div>
          <div className="sm:flex-1">
            <h2 className="text-white text-[28px] font-[700]">
              Naver Việt Nam
            </h2>
            <div className="flex gap-[6px] items-center mt-[8px]">
              <FaLocationDot className="text-white" />
              <span className="text-white text-[14px] font-[400]">
                Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem, Ha Noi
              </span>
            </div>
            <div className="flex gap-[6px] items-center mt-[8px]">
              <FaBriefcase className="text-white" />
              <span className="text-white text-[14px] font-[400]">
                2 việc làm đang tuyển dụng
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-[16px] mt-[30px] flex flex-col lg:flex-row gap-[24px] items-start">
        {/* Left block */}
        <div className="w-full lg:w-[65%] flex flex-col gap-[20px]">
          {/* Section 6 */}
          <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] )] bg-white">
            <div>
              <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
                Thông tin chung
              </h2>
            </div>
            {/* Company general info */}
            <div className="mt-[20px] grid md:grid-cols-3 grid-cols-2 gap-x-[10px] gap-y-[24px]">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Mô hình công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  Sản phẩm
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Lĩnh vực công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  Sản Phẩm Phần Mềm và Dịch Vụ Web
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Tỉnh thành
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  Hà Nội
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Quy mô công ty
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  151 - 300 nhân viên
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Thời gian làm việc
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  Thứ 2 - Thứ 6
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[#A6A6A6] text-[16px] font-[400]">
                  Làm việc ngoài giờ
                </span>
                <span className="text-[#121212] text-[16px] font-[500]">
                  Không có OT
                </span>
              </div>
            </div>
          </div>
          {/* End of Section 6 */}

          {/* Section 7 */}
          <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] )] bg-white">
            <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
              Giới thiệu công ty
            </h2>
            <div className="mt-[20px]">
              <p className="text-[#121212] text-[15px] font-[400] leading-[1.6]">
                Naver Corporation là một công ty kỹ thuật số và công nghệ đa
                quốc gia có trụ sở tại Hàn Quốc. Công ty vận hành công cụ tìm
                kiếm Naver (cổng thông tin web số 1 Hàn Quốc) và hàng loạt các
                sản phẩm công nghệ toàn cầu tiêu biểu như ứng dụng nhắn tin
                LINE, ứng dụng Webtoon, camera tự sướng Snow và nền tảng
                livestream V LIVE.
              </p>
              <br />
              <p className="text-[#121212] text-[15px] font-[400] leading-[1.6]">
                Naver Việt Nam (Naver Vietnam) được thành lập với tầm nhìn phát
                triển Trung tâm Dữ liệu và Công nghệ tiên tiến (Dev Center) tại
                khu vực Châu Á. Chúng tôi tập trung mạnh mẽ vào nghiên cứu phát
                triển các AI, Machine Learning, Web/Mobile backend tối ưu cao.
                Cùng hệ sinh thái khổng lồ, Naver mở ra cơ hội để bạn phát triển
                bản thân trên các sàn công nghệ có hàng triệu người dùng hằng
                ngày.
              </p>
            </div>

            <h3 className="text-[#121212] text-[18px] font-[700] mt-[24px]">
              Văn hóa và Đãi ngộ
            </h3>
            <ul className="mt-[12px] list-disc list-inside text-[#121212] text-[15px] font-[400] leading-[1.8] flex flex-col gap-[8px]">
              <li>
                Môi trường quốc tế phẳng, lộ trình thăng tiến rõ ràng dành cho
                kỹ sư chuyên môn.
              </li>
              <li>
                Laptop cao cấp được cấp phát (MacBook Pro / Windows tuỳ chọn)
                cùng phụ kiện màn hình rời.
              </li>
              <li>Chế độ bảo hiểm sức khỏe cá nhân cao cấp.</li>
              <li>
                Tham gia các khóa đào tạo Công Nghệ, lớp học tiếng Hàn, tiếng
                Anh miễn phí trong giờ làm việc.
              </li>
              <li>Team building, du lịch hàng năm và Happy Hour mỗi tuần.</li>
            </ul>
          </div>
          {/* End of Section 7 */}

          {/* Section 7.5: Location */}
          <div className="border border-[1px] border-[#D9DCDB] rounded-[8px] p-[20px] )] bg-white">
            <h2 className="text-[#121212] text-[22px] font-[700] pb-[16px] border-b border-dashed border-[#D9DCDB]">
              Địa điểm
            </h2>
            <div className="mt-[20px] flex flex-col md:flex-row gap-[20px]">
              {/* Left Column */}
              <div className="w-full md:w-[35%]">
                <h3 className="text-[#121212] text-[18px] font-[700]">
                  TP Hồ Chí Minh
                </h3>
                <div className="mt-[16px] border border-[1px] border-red-500 rounded-[4px] p-[16px] flex gap-[8px] items-start">
                  <IoLocationOutline className="text-red-500 text-[20px] shrink-0 mt-[2px]" />
                  <span className="text-[#121212] text-[14px] font-[500] leading-[1.5]">
                    1295 1295B, Nguyễn Thị Định, Phường Cát Lái, District 2, Ho
                    Chi Minh
                  </span>
                </div>
              </div>
              {/* Right Column (Map) */}
              <div className="w-full md:w-[65%] h-[250px] md:h-auto min-h-[250px] rounded-[8px] overflow-hidden border border-[1px] border-[#D9DCDB]">
                <iframe
                  src="https://maps.google.com/maps?q=1295%20Nguyễn%20Thị%20Định,%20District%202,%20Ho%20Chi%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
          {/* End of Section 7.5 */}
        </div>

        {/* Right block */}
        <div className="w-full lg:w-[32%]">
          {/* Section 8 */}
          <h2 className="text-[#121212] text-[20px] lg:text-[24px] font-[700]">
            Công ty có 6 việc làm
          </h2>
          <div className="grid grid-cols-1 gap-[20px] mt-[20px]">
            <Link href={"/job/detail/123"} className="">
              <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 )] h-full flex flex-col justify-between">
                <div>
                  <div className="text-[14px] text-[#A6AEC5] font-[400]">
                    Đăng 17 giờ trước
                  </div>
                  <div className="mt-[12px] text-[18px] font-[700]">
                    Lead Front-end Developer (HTML, CSS, JavaScript)
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px]">
                    <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] )]">
                      <img
                        src={"/assets/images/hsc.png"}
                        alt="hsc"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>HSC</span>
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
                    <AiOutlineDollarCircle className="text-[20px] font-[500]" />
                    <span className="font-[500] text-[16px]">
                      3,000 - 3,500 USD
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[8px]">
                    <PiSuitcase />
                    <Link href={"/"}>Lập trình viên Frontend</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <GrPerformance />
                    <Link href={"/"}>Làm việc tại văn phòng</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <IoLocationOutline />
                    <Link href={"/"}>Hà Nội</Link>
                  </div>
                  <div className="flex items-center gap-[8px] mt-[12px]">
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      UI-UX
                    </div>
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      ReactJS
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"/"} className="">
              <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 )] h-full flex flex-col justify-between">
                <div>
                  <div className="text-[14px] text-[#A6AEC5] font-[400]">
                    Đăng 2 ngày trước
                  </div>
                  <div className="mt-[12px] text-[18px] font-[700]">
                    Senior Backend Engineer (Node.js, PostgreSQL)
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px]">
                    <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] )]">
                      <img
                        src={"/assets/images/rakuten.png"}
                        alt="rakuten"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>Rakuten</span>
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
                    <AiOutlineDollarCircle className="text-[20px] font-[500]" />
                    <span className="font-[500] text-[16px]">
                      2,500 - 4,000 USD
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[8px]">
                    <PiSuitcase />
                    <Link href={"/"}>Lập trình viên Backend</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <GrPerformance />
                    <Link href={"/"}>Làm việc từ xa</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <IoLocationOutline />
                    <Link href={"/"}>Hồ Chí Minh</Link>
                  </div>
                  <div className="flex items-center gap-[8px] mt-[12px]">
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      Node.js
                    </div>
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      PostgreSQL
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"/"} className="">
              <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 )] h-full flex flex-col justify-between">
                <div>
                  <div className="text-[14px] text-[#A6AEC5] font-[400]">
                    Đăng 5 ngày trước
                  </div>
                  <div className="mt-[12px] text-[18px] font-[700]">
                    Full-stack Developer (React, TypeScript, AWS)
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px]">
                    <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] )]">
                      <img
                        src={"/assets/images/naver.png"}
                        alt="naver"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>Naver Vietnam</span>
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
                    <AiOutlineDollarCircle className="text-[20px] font-[500]" />
                    <span className="font-[500] text-[16px]">
                      1,800 - 2,500 USD
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[8px]">
                    <PiSuitcase />
                    <Link href={"/"}>Lập trình viên Full-stack</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <GrPerformance />
                    <Link href={"/"}>Hybrid</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <IoLocationOutline />
                    <Link href={"/"}>Đà Nẵng</Link>
                  </div>
                  <div className="flex items-center gap-[8px] mt-[12px]">
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      TypeScript
                    </div>
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      AWS
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={""} className="">
              <div className="bg-[#F0F4F8] px-[12px] py-[8px] rounded-[8px] duration-300 )] h-full flex flex-col justify-between">
                <div>
                  <div className="text-[14px] text-[#A6AEC5] font-[400]">
                    Đăng 1 tuần trước
                  </div>
                  <div className="mt-[12px] text-[18px] font-[700]">
                    Mobile Developer (React Native, iOS, Android)
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px]">
                    <div className="w-[48px] h-[48px] border border-[1px] border-[#DEDEDE] rounded-[4px] )]">
                      <img
                        src={"/assets/images/nab.png"}
                        alt="nab"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>NAB Innovation Centre</span>
                  </div>
                  <div className="flex items-center gap-[12px] mt-[12px] text-[#0ab305] pb-[12px] border-b border-dashed border-[#DEDEDE]">
                    <AiOutlineDollarCircle className="text-[20px] font-[500]" />
                    <span className="font-[500] text-[16px]">
                      2,000 - 3,000 USD
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[8px]">
                    <PiSuitcase />
                    <Link href={"/"}>Lập trình viên Mobile</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <GrPerformance />
                    <Link href={"/"}>Làm việc tại văn phòng</Link>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <IoLocationOutline />
                    <Link href={"/"}>Hồ Chí Minh</Link>
                  </div>
                  <div className="flex items-center gap-[8px] mt-[12px]">
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      React Native
                    </div>
                    <div className="flex items-center justify-center border border-[#DEDEDE] rounded-[20px] px-[10px] py-[4px] hover:border-black">
                      Mobile
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* End of Section 8 */}
        </div>
      </div>
    </>
  );
};

export default CompanyDetail;
