import { CardCompanyItem } from "@/app/components/card/CardCompanyItem";

const CompanyList = () => {
  return (
    <>
      {/* Section 4 - Company List */}
      <div className="mt-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Title */}
          <h1 className="text-[#121212] sm:text-[28px] text-[24px] font-[700] text-center">
            Danh sách công ty
          </h1>
          {/* List */}
          <div className="mt-[30px] grid md:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
            {/* Item */}
            <CardCompanyItem />
          </div>
        </div>
      </div>
      {/* End of Section-4 */}

      {/* Section 5 - Pagination */}
      <div className="mt-[30px] container mx-auto px-[16px]">
        <select
          name=""
          id=""
          className="h-[44px] border border-[#DEDEDE] rounded-[8px] px-[18px]"
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

export default CompanyList;
