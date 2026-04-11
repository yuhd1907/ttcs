import { FaUserTie, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const UserManageCVList = () => {
  return (
    <>
      {/* Section 14 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-[#121212] sm:text-[28px] text-[24px] font-[700]">
            Quản lý CV đã gửi
          </h1>
          <div className="mt-[20px] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {/* Item 1 */}
            <div
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
              }}
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-[0] left-[0] w-[100%] h-auto"
              />
              <div className="mt-[20px] flex-1">
                <h3 className="text-[18px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  Frontend Engineer (ReactJS)
                </h3>
                <div className="mt-[12px] flex flex-col items-center gap-y-[6px]">
                  <div className="">
                    <span className="text-[#000000] text-[14px] font-[400]">
                      Công ty:
                    </span>
                    <span className="text-[#000000] text-[14px] font-[700]">
                      {" "}
                      Công ty ABC
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] text-[16px] text-[#0088FF] font-[600] text-center">
                  1.000$ - 1.500$
                </div>
                <div className="flex flex-col gap-[6px] mt-[6px]">
                  <div className="flex justify-center items-center">
                    <FaUserTie className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Fresher
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaBriefcase className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Tại văn phòng
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaCheckCircle className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Chưa duyệt
                    </span>
                  </div>
                </div>
                <div className="flex justify-center gap-x-[8px] mt-[12px] mb-[22px]">
                  <Link
                    href="#"
                    className="bg-[#0088FF] rounded-[4px] font-[400] text-[12px] text-white inline-block py-[8px] px-[20px]"
                  >
                    Xem
                  </Link>
                  <Link
                    href="#"
                    className="bg-[#FF0000] rounded-[4px] font-[400] text-[12px] text-white inline-block py-[8px] px-[20px]"
                  >
                    Xoá
                  </Link>
                </div>
              </div>
            </div>

            {/* Item 2 (Lặp lại logic tương tự cho các item còn lại) */}
            <div
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
              }}
            >
              <img
                src="/assets/images/item-bg.png"
                alt=""
                className="absolute top-[0] left-[0] w-[100%] h-auto"
              />
              <div className="mt-[20px] flex-1">
                <h3 className="text-[18px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  Frontend Engineer (ReactJS)
                </h3>
                <div className="mt-[12px] flex flex-col items-center gap-y-[6px]">
                  <div className="">
                    <span className="text-[#000000] text-[14px] font-[400]">
                      Công ty:
                    </span>
                    <span className="text-[#000000] text-[14px] font-[700]">
                      {" "}
                      Công ty ABC
                    </span>
                  </div>
                </div>
                <div className="mt-[12px] text-[16px] text-[#0088FF] font-[600] text-center">
                  1.000$ - 1.500$
                </div>
                <div className="flex flex-col gap-[6px] mt-[6px]">
                  <div className="flex justify-center items-center">
                    <FaUserTie className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Fresher
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaBriefcase className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Tại văn phòng
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaCheckCircle className="mr-[8px] text-[14px]" />
                    <span className="text-[14px] text-[#121212] font-[400]">
                      Chưa duyệt
                    </span>
                  </div>
                </div>
                <div className="flex justify-center gap-x-[8px] mt-[12px] mb-[22px]">
                  <Link
                    href="#"
                    className="bg-[#0088FF] rounded-[4px] font-[400] text-[12px] text-white inline-block py-[8px] px-[20px]"
                  >
                    Xem
                  </Link>
                  <Link
                    href="#"
                    className="bg-[#FF0000] rounded-[4px] font-[400] text-[12px] text-white inline-block py-[8px] px-[20px]"
                  >
                    Xoá
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Section 14 */}

      {/* Section 5 */}
      <div className="mt-[30px] container mx-auto px-[16px]">
        <select
          name=""
          id=""
          className="h-[44px] border border-[1px] border-[#DEDEDE] rounded-[8px] px-[18px]"
        >
          <option value="">Trang 1</option>
          <option value="">Trang 2</option>
          <option value="">Trang 3</option>
        </select>
      </div>
      {/* End of Section 5 */}
    </>
  );
};

export default UserManageCVList;
