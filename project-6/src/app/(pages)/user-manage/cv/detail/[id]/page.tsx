const CompanyManageCVDetail = () => {
  return (
    <>
      {/* Section 12 */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] border-[1px] rounded-[8px] p-[20px]">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-y-[20px]">
              <h2 className="text-black text-[20px] font-[700]">
                Thông tin CV
              </h2>
              <a
                href="#"
                className="text-[#0088FF] text-[14px] font-[400] underline"
              >
                Quay lại danh sách
              </a>
            </div>
            <div className="mt-[20px] flex flex-col gap-[10px]">
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Họ tên:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  Lê Văn A
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Email:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  levana@gmail.com
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Số điện thoại:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  0123456789
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  File CV:
                </span>
                <div className="mt-[10px] h-[736px] bg-[#D9D9D9] flex items-center justify-center rounded-[8px]">
                  <span className="text-[#A7A2A2] text-[16px] font-[400]">
                    Preview File CV dạng PDF tại đây
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px] border border-[#DEDEDE] border-[1px] rounded-[8px] p-[20px]">
            <h2 className="text-black text-[20px] font-[700]">
              Thông tin công việc
            </h2>
            <div className="mt-[20px] flex flex-col gap-[10px]">
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Tên công việc:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  Frontend Engineer (ReactJS)
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Mức lương:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  1.000$ - 1.500$
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Cấp bậc:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  Fresher
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Hình thức làm việc:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  Tại văn phòng
                </span>
              </div>
              <div className="">
                <span className="text-black text-[16px] font-[400]">
                  Công nghệ:
                </span>
                <span className="text-black text-[16px] font-[500]">
                  {" "}
                  HTML5, CSS3, Javascript, ReactJS
                </span>
              </div>
              <a
                href="#"
                className="text-[#0088FF] text-[14px] font-[400] underline"
              >
                Xem chi tiết công việc
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* End of Section 12 */}
    </>
  );
};

export default CompanyManageCVDetail;
