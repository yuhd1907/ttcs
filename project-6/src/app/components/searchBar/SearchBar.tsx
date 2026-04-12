"use client";

import Link from "next/link";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { toSlugHelpter } from "@/helper/Slug.helpter";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRouter } from 'next/navigation';
import { useRoles } from "@/hooks/useRoles";
import { useProvinces } from "@/hooks/useProvinces";
import { useSkills } from "@/hooks/useSkills";

export const SearchBar = () => {
  const [companyList, setCompanyList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { roleList } = useRoles();
  const { provinceList } = useProvinces();
  const { skillList: techSuggestions } = useSkills();

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/list`)
      .then((res) => res.json())
      .then((data) =>
        setCompanyList(data.companyList)
      );
  }, []);

  const searchSlug = toSlugHelpter(keyword);

  const recommendedTechSkills = keyword.trim()
    ? techSuggestions.filter((skill) =>
      skill.slug?.includes(searchSlug) ||
      skill.name?.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 3)
    : [];

  const recommendedRoles = keyword.trim()
    ? roleList.filter((role) =>
      role.slug?.includes(searchSlug) ||
      role.name?.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 3)
    : [];

  const recommendedCompanies = keyword.trim()
    ? companyList.filter((company: any) =>
      company.slug?.includes(searchSlug) ||
      (company.name || company.companyName || "").toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 3)
    : [];

  const handleSearch = (event: any) => {
    event.preventDefault();
    const province = event.target.province.value;
    const keyword = event.target.keyword.value;

    const params = new URLSearchParams();
    if (province) params.set("province", province);
    if (keyword) params.set("keyword", keyword);

    router.push(`/search?${params.toString()}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setShowSuggestions(true);
  };

  useClickOutside(searchContainerRef, () => setShowSuggestions(false));

  return (
    <>
      <section className="bg-[#000065] py-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Tiêu đề */}
          <h1 className="text-white text-[28px] text-center font-[700]">
            887 Việc làm IT cho Developer &#34;Chất&#34;
          </h1>

          {/* Form Tìm kiếm */}
          <div className="mt-[30px] relative w-full" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="flex flex-wrap gap-x-[15px] gap-y-[12px]">
              <select name="province" className="md:w-[240px] w-full h-[56px] bg-white rounded-[4px] px-[20px] text-[#121212] text-[16px] font-[500] outline-none">
                <option value="">-- Tất cả tỉnh thành --</option>
                {provinceList.map((province: any, index) => (
                  <option key={province.id || province._id || index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>

              <div className="md:flex-1 flex-none w-full relative">
                <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Nhập từ khoá theo kỹ năng, chức vụ, công ty..."
                  className="w-full h-[56px] bg-white rounded-[4px] px-[20px] text-[#121212] text-[16px] font-[500] outline-none"
                />

                {/* Search Suggestions Dropdown */}
                {showSuggestions && keyword.trim() !== "" && (
                  <div className="absolute top-[60px] left-0 w-full bg-white rounded-[4px] shadow-lg border border-[#DEDEDE] z-50 overflow-hidden text-left">
                    {recommendedTechSkills.length > 0 && (
                      <div className="p-[12px] border-b border-[#F6F6F6]">
                        <h3 className="text-[#757576] text-[14px] font-[600] mb-[8px] px-[8px]">
                          KỸ NĂNG (SKILLS)
                        </h3>
                        <ul>
                          {recommendedTechSkills.map((skill) => (
                            <li key={skill.slug || skill.name}>
                              <button
                                type="button"
                                onClick={() => {
                                  setKeyword(skill.name);
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left block px-[8px] py-[6px] text-[#121212] hover:bg-[#F0F8FF] hover:text-[#0088FF] rounded-[4px] transition-colors"
                              >
                                {skill.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recommendedRoles.length > 0 && (
                      <div className="p-[12px] border-b border-[#F6F6F6]">
                        <h3 className="text-[#757576] text-[14px] font-[600] mb-[8px] px-[8px]">
                          CHUYÊN MÔN (EXPERTS/ROLES)
                        </h3>
                        <ul>
                          {recommendedRoles.map((role) => (
                            <li key={role.slug || role.name}>
                              <button
                                type="button"
                                onClick={() => {
                                  setKeyword(role.name);
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left block px-[8px] py-[6px] text-[#121212] hover:bg-[#F0F8FF] hover:text-[#0088FF] rounded-[4px] transition-colors"
                              >
                                {role.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recommendedCompanies.length > 0 && (
                      <div className="p-[12px]">
                        <h3 className="text-[#757576] text-[14px] font-[600] mb-[8px] px-[8px]">
                          CÔNG TY (COMPANIES)
                        </h3>
                        <ul>
                          {recommendedCompanies.map((company: any, idx) => (
                            <li key={company.slug || company.id || idx}>
                              <button
                                type="button"
                                onClick={() => {
                                  setKeyword(company.name || company.companyName || "");
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left block px-[8px] py-[6px] text-[#121212] hover:bg-[#F0F8FF] hover:text-[#0088FF] rounded-[4px] transition-colors"
                              >
                                {company.name || company.companyName}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recommendedTechSkills.length === 0 && recommendedRoles.length === 0 && recommendedCompanies.length === 0 && (
                      <div className="p-[20px] text-center text-[#757576] text-[14px]">
                        Không tìm thấy gợi ý nào cho &#34;{keyword}&#34;
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#0088FF] rounded-[4px] flex flex-none justify-center items-center gap-x-[10px] md:w-[240px] w-full h-[56px] text-white text-[16px] font-[500] transition-opacity hover:opacity-100 opacity-90"
              >
                <FaSearch />
                Tìm Kiếm
              </button>
            </form>
          </div>

          {/* Chip tim kiem */}
          <div className="mt-[30px] flex flex-wrap gap-x-[12px] gap-y-[15px] items-center">
            <span className="text-white text-[16px] font-[500]">
              Mọi người đang tìm kiếm:
            </span>
            <div className="flex flex-wrap gap-x-[10px] gap-y-[8px] items-center">
              {["React", "JavaScript", "Node.js", "Java", "PHP", "Python", ".NET"].map((skill) => (
                <Link
                  key={skill}
                  href={`/search?skill=${encodeURIComponent(skill)}`}
                  className="py-[8px] px-[22px] bg-[#121212] border border-[#414042] rounded-[20px] text-[#DEDEDE] text-[16px] font-[500] hover:bg-[#414042] hover:text-white transition-colors"
                >
                  {skill}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
