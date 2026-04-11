import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaBriefcase,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

const CompanyManageCVList = () => {
  return (
    <>
      {/* Section 11 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-black text-[28px] font-[700]">Quản lý CV</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] mt-[20px]">
            {/* Item 1 */}
            <div
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
              }}
            >
              <img
                src="assets/images/item-bg.png"
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
                      Ứng viên:
                    </span>
                    <span className="text-[#000000] text-[14px] font-[700]">
                      {" "}
                      Lê Văn A
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[14px] mr-[8px]" />
                    <span className="text-[#000000] text-[14px] font-[400]">
                      levana@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-[14px] mr-[8px]" />
                    <span className="text-[#000000] text-[14px] font-[400]">
                      0123456789
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
                    <FaEye className="mr-[8px] text-[#FF0000] text-[14px]" />
                    <span className="text-[14px] text-[#FF0000] font-[400]">
                      Chưa xem
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
                  <a
                    href="#"
                    className="bg-[#0088FF] rounded-[4px] font-[400] text-[12px] text-white py-[8px] px-[20px]"
                  >
                    Xem
                  </a>
                  <a
                    href="#"
                    className="bg-[#9FDB7C] rounded-[4px] font-[400] text-[12px] text-black py-[8px] px-[20px]"
                  >
                    Duyệt
                  </a>
                  <a
                    href="#"
                    className="bg-[#FF5100] rounded-[4px] font-[400] text-[12px] text-white py-[8px] px-[20px]"
                  >
                    Từ chối
                  </a>
                  <a
                    href="#"
                    className="bg-[#FF0000] rounded-[4px] font-[400] text-[12px] text-white py-[8px] px-[20px]"
                  >
                    Xoá
                  </a>
                </div>
              </div>
            </div>

            {/* Các Item từ 2 đến 9 lặp lại cấu trúc tương tự (Dưới đây là mẫu Item 2 đã duyệt) */}
            <div
              className="border-[#DEDEDE] border-[1px] relative rounded-[8px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)",
              }}
            >
              <img
                src="assets/images/item-bg.png"
                alt=""
                className="absolute top-[0] left-[0] w-[100%] h-auto"
              />
              <div className="mt-[20px] flex-1">
                <h3 className="text-[18px] text-[#121212] text-center font-[700] line-clamp-2 md:px-[16px] px-[8px]">
                  Frontend Engineer (ReactJS)
                </h3>
                <div className="mt-[12px] flex flex-col items-center gap-y-[6px]">
                  <div className="">
                    <span className="text-[14px]">Ứng viên: </span>
                    <span className="font-[700]">Lê Văn A</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-[8px]" />
                    <span className="text-[14px]">levana@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-[8px]" />
                    <span className="text-[14px]">0123456789</span>
                  </div>
                </div>
                <div className="mt-[12px] text-[#0088FF] font-[600] text-center">
                  1.000$ - 1.500$
                </div>
                <div className="flex flex-col gap-[6px] mt-[6px]">
                  <div className="flex justify-center items-center">
                    <FaUserTie className="mr-[8px]" />
                    <span>Fresher</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaBriefcase className="mr-[8px]" />
                    <span>Tại văn phòng</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaEye className="mr-[8px] text-black" />
                    <span>Đã xem</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <FaCheckCircle className="mr-[8px] text-[#47BE02]" />
                    <span className="text-[#47BE02]">Đã duyệt</span>
                  </div>
                </div>
                <div className="flex justify-center gap-x-[8px] mt-[12px] mb-[22px]">
                  <a
                    href="#"
                    className="bg-[#0088FF] text-white py-[8px] px-[20px] rounded-[4px] text-[12px]"
                  >
                    Xem
                  </a>
                  <a
                    href="#"
                    className="bg-[#FF5100] text-white py-[8px] px-[20px] rounded-[4px] text-[12px]"
                  >
                    Từ chối
                  </a>
                  <a
                    href="#"
                    className="bg-[#FF0000] text-white py-[8px] px-[20px] rounded-[4px] text-[12px]"
                  >
                    Xoá
                  </a>
                </div>
              </div>
            </div>

            {/* ... Item 3 đến 9 tiếp tục giữ nguyên logic cũ với className và icons mới ... */}
          </div>
        </div>
      </div>
      {/* End of Section 11 */}

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

export default CompanyManageCVList;