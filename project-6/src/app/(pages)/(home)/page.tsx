import { SearchBar } from "@/app/components/searchBar/SearchBar";
import { CardCompanyItem } from "@/app/components/card/CardCompanyItem";
import { ITCategory } from "@/app/(pages)/(home)/IT-Category";
import { FaUserTie, FaAngleRight } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Trang Chủ",
  description: "Nội dung trang chủ...",
};

export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <SearchBar />
      {/* End of Section 1 */}

      {/* Section 2 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="text-[#121212] text-[28px] font-[700] text-center mb-[30px]">
            Nhà tuyển dụng hàng đầu
          </h2>
          <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/company-1.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  LG Electronics Development Vietnam (LGEDV)
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/andpad.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  ANDPAD VietNam Co., Ltd
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/hsc.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  HSC
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/nab.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  NAB Innovation Centre Vietnam
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/naver.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  NAVER VIETNAM
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/rakuten.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  Rakuten Fintech Vietnam Co., Ltd.
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/trusting-social.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  Trusting Social
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/one.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  ONE Tech Stop Vietnam Company Ltd
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
            {/* Item */}
            <Link
              href="#"
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col bg-gradient-to-b from-[#F6F6F6] from-[2.38%] to-[#FFFFFF] to-[70.43%]"
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-0 left-0 w-full h-auto"
              />
              <div className="relative md:w-[160px] w-[125px] md:h-[160px] h-[125px] mx-auto md:mt-[32px] mt-[20px] bg-white rounded-[8px] px-[10px]">
                <img
                  src="/assets/images/tmt.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="md:mt-[24px] mt-[16px] flex-1">
                <h3 className="md:text-[18px] text-[14px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  TRUONG MINH THINH TECHNOLOGY JOINT STOCK COMPANY
                </h3>
              </div>
              <div className="md:mt-[24px] mt-[16px] bg-[#F7F7F7] flex md:flex-row flex-col md:justify-between gap-y-[12px] items-center px-[15px] py-[12px]">
                <div className="md:text-[14px] text-[12px] text-[#414042] font-[400]">
                  Ho Chi Minh
                </div>
                <div className="flex gap-[6px] items-center">
                  <FaUserTie className="fa-solid fa-user-tie text-[#000096] md:text-[14px] text-[12px]" />
                  <span className="md:text-[14px] text-[12px] text-[#121212] font-[400]">
                    5 Việc làm
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Section 2 */}

      <div className={"bg-[#F7F7F7] mt-[120px] pt-[80px] pb-[100px]"}>
        <div className={"container mx-auto"}>
          <div className={"mb-[32px] flex justify-between items-center"}>
            <h2
              className={
                "text-[28px] font-[700] lg:text-left text-center w-full"
              }
            >
              Bài viết nổi bật
            </h2>
            <Link
              href={"/"}
              className={
                "hidden lg:flex items-center text-[#474AEE]" +
                " hover:text-[#192FBB]"
              }
            >
              Xem tất cả
              <FaAngleRight className={"ml-[5px]"} />
            </Link>
          </div>
          <div
            className={
              "grid grid-cols-1 lg:grid-cols-4 gap-x-[20px] gap-y-[20px]"
            }
          >
            <div
              className={
                "flex flex-col bg-[white] rounded-[8px]" +
                " lg:col-span-2 lg:row-span-2 overflow-hidden"
              }
            >
              <div className={"flex-1"}>
                <div className="w-full aspect-[2/1] overflow-hidden rounded-[8px]">
                  <img
                    src="/assets/images/news1.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={"text-[22px] font-[700] m-[12px]"}>
                  Lương & Thị Trường Tuyển Dụng IT tại Việt Nam 2025-2026
                </div>
                <div className={"text-[16px] text-[#757576] m-[12px]"}>
                  Tải báo cáo năm nay để cập nhật những góc nhìn mới về thị
                  trường IT Việt Nam, xu hướng tuyển dụng, sự thay đổi trong
                  hành vi của chuyên gia IT, cùng tác động của AI lên nhân tài
                  và doanh nghiệp
                </div>
              </div>
              <Link
                href={"/"}
                className={
                  "hidden lg:flex items-center text-[#474AEE]" +
                  " hover:text-[#192FBB] pb-[16px] pl-[16px]"
                }
              >
                Bắt đầu đọc
                <FaAngleRight className={"ml-[5px]"} />
              </Link>
            </div>
            <div
              className={
                "lg:flex-col lg:border-t-0 border-t border-[#DEDEDE]" +
                " flex flex-row lg:bg-[white] rounded-[8px] overflow-hidden pt-[16px] lg:pt-0"
              }
            >
              <div className="w-1/2 lg:w-full aspect-[2/1] overflow-hidden rounded-[8px]">
                <img
                  src="/assets/images/activity-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={"text-[16px] text-[#757576] m-[12px]"}>
                Cách DevBlock xây dựng môi trường làm việc trong kỷ nguyên AI
              </div>
              <Link
                href={"/"}
                className={
                  "hidden lg:flex items-center text-[#474AEE]" +
                  " hover:text-[#192FBB] pb-[16px] pl-[16px]"
                }
              >
                Bắt đầu đọc
                <FaAngleRight className={"ml-[5px]"} />
              </Link>
            </div>
            <div
              className={
                "lg:flex-col lg:border-t-0 border-t border-[#DEDEDE]" +
                " flex flex-row lg:bg-[white] rounded-[8px] overflow-hidden pt-[16px] lg:pt-0"
              }
            >
              <div className="w-1/2 lg:w-full aspect-[2/1] overflow-hidden rounded-[8px]">
                <img
                  src="/assets/images/activity-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={"text-[16px] text-[#757576] m-[12px]"}>
                Story Hub công bố tác giả chiến thắng hai thử thách viết bài đầu
                tiên...
              </div>
              <Link
                href={"/"}
                className={
                  "hidden lg:flex items-center text-[#474AEE]" +
                  " hover:text-[#192FBB] pb-[16px] pl-[16px]"
                }
              >
                Bắt đầu đọc
                <FaAngleRight className={"ml-[5px]"} />
              </Link>
            </div>
            <div
              className={
                "lg:flex-col lg:border-t-0 border-t border-[#DEDEDE]" +
                " flex flex-row lg:bg-[white] rounded-[8px] overflow-hidden pt-[16px] lg:pt-0"
              }
            >
              <div className="w-1/2 lg:w-full aspect-[2/1] overflow-hidden rounded-[8px]">
                <img
                  src="/assets/images/activity-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={"text-[16px] text-[#757576] m-[12px]"}>
                Announcing the Top 30 Best IT Companies in Vietnam 2026: When...
              </div>
              <Link
                href={"/"}
                className={
                  "hidden lg:flex items-center text-[#474AEE]" +
                  " hover:text-[#192FBB] pb-[16px] pl-[16px]"
                }
              >
                Bắt đầu đọc
                <FaAngleRight className={"ml-[5px]"} />
              </Link>
            </div>
            <div
              className={
                "lg:flex-col lg:border-t-0 border-t border-[#DEDEDE]" +
                " flex flex-row lg:bg-[white] rounded-[8px] overflow-hidden pt-[16px] lg:pt-0"
              }
            >
              <div className="w-1/2 lg:w-full aspect-[2/1] overflow-hidden rounded-[8px]">
                <img
                  src="/assets/images/activity-1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={"text-[16px] text-[#757576] m-[12px]"}>
                Công bố danh sách 30 Công ty IT Tốt nhất Việt Nam 2026: Khi
                Hiệu...
              </div>
              <Link
                href={"/"}
                className={
                  "hidden lg:flex items-center text-[#474AEE]" +
                  " hover:text-[#192FBB] pb-[16px] pl-[16px]"
                }
              >
                Bắt đầu đọc
                <FaAngleRight className={"ml-[5px]"} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ITCategory />
    </>
  );
}
