"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import { useSkills } from "@/hooks/useSkills";
import { useProvinces } from "@/hooks/useProvinces";
import { useCompanies } from "@/hooks/useCompanies";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SuggestionDropDown } from "@/app/components/suggestionDropdown/SuggestionDropDown";
import { Skill } from "@/interface/skill.interface";
import { toast, Toaster } from "sonner";

interface SkillSubscription {
  id: string;
  skillName: string;
  cityName: string;
  active: boolean;
}

interface CompanyFollow {
  id: string;
  companyId: string;
  companyName: string;
  active: boolean;
}

interface CompanyItem {
  id: string;
  name: string;
  avatar?: string;
}

const MAX_ITEMS = 5;
const EMPTY_ICON_URL =
  "https://itviec.com/assets/everything-empty-62c813bcb84be8a092033e40550b6fdc9f6bda05947d60c619b2a74906144f8b.svg";
const API = process.env.NEXT_PUBLIC_API_URL;

const SkillRegister = () => {
  const { skillList } = useSkills();
  const { provinceList } = useProvinces();
  const { companyList } = useCompanies();

  const [skillSubs, setSkillSubs] = useState<SkillSubscription[]>([]);
  const [companyFollows, setCompanyFollows] = useState<CompanyFollow[]>([]);
  const [loading, setLoading] = useState(true);

  const [skillInput, setSkillInput] = useState("");
  const [cityName, setCityName] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [skillOpen, setSkillOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const skillBoxRef = useRef<HTMLDivElement>(null);
  const companyBoxRef = useRef<HTMLDivElement>(null);
  useClickOutside(skillBoxRef, () => setSkillOpen(false));
  useClickOutside(companyBoxRef, () => setCompanyOpen(false));

  // Danh sách công ty từ API (có id)
  const companyItems: CompanyItem[] = useMemo(
    () => companyList as unknown as CompanyItem[],
    [companyList]
  );

  const filteredSkills = useMemo(() => {
    const q = skillInput.trim().toLowerCase();
    const list = q ? skillList.filter((s) => s.name.toLowerCase().includes(q)) : skillList;
    return list.slice(0, 10);
  }, [skillInput, skillList]);

  const filteredCompanies = useMemo(() => {
    const q = companyInput.trim().toLowerCase();
    const list = q
      ? companyItems.filter((c) => c.name.toLowerCase().includes(q))
      : companyItems;
    return list.slice(0, 10);
  }, [companyInput, companyItems]);

  const matchedSkill = useMemo(
    () => skillList.find((s) => s.name.toLowerCase() === skillInput.trim().toLowerCase()),
    [skillList, skillInput]
  );

  const matchedCompany = useMemo(
    () => companyItems.find((c) => c.name.toLowerCase() === companyInput.trim().toLowerCase()),
    [companyItems, companyInput]
  );

  // ===== Tải dữ liệu từ API khi mount =====
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [skillRes, companyRes] = await Promise.all([
        fetch(`${API}/user/job-alert/skills`, { credentials: "include" }),
        fetch(`${API}/user/job-alert/companies`, { credentials: "include" }),
      ]);
      const skillData = await skillRes.json();
      const companyData = await companyRes.json();

      if (skillData.code === "success") setSkillSubs(skillData.data ?? []);
      if (companyData.code === "success") setCompanyFollows(companyData.data ?? []);
    } catch {
      toast.error("Không thể tải dữ liệu đăng ký!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== Thêm kỹ năng =====
  const handleAddSkill = async () => {
    if (!matchedSkill || !cityName) return;
    if (skillSubs.length >= MAX_ITEMS) return;
    try {
      const res = await fetch(`${API}/user/job-alert/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ skillName: matchedSkill.name, cityName }),
      });
      const data = await res.json();
      if (data.code === "success") {
        setSkillSubs((prev) => [...prev, data.data]);
        setSkillInput("");
        setCityName("");
        toast.success("Đăng ký kỹ năng thành công!");
      } else {
        toast.error(data.message || "Đăng ký thất bại!");
      }
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  // ===== Xóa kỹ năng =====
  const removeSkill = async (id: string) => {
    try {
      const res = await fetch(`${API}/user/job-alert/skills/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.code === "success") {
        setSkillSubs((prev) => prev.filter((s) => s.id !== id));
        toast.success("Đã xóa đăng ký kỹ năng!");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  // ===== Theo dõi công ty =====
  const handleAddCompany = async () => {
    if (!matchedCompany) return;
    if (companyFollows.length >= MAX_ITEMS) return;
    try {
      const res = await fetch(`${API}/user/job-alert/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ companyId: matchedCompany.id }),
      });
      const data = await res.json();
      if (data.code === "success") {
        setCompanyFollows((prev) => [...prev, data.data]);
        setCompanyInput("");
        toast.success("Theo dõi công ty thành công!");
      } else {
        toast.error(data.message || "Theo dõi thất bại!");
      }
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  // ===== Bỏ theo dõi công ty =====
  const removeCompany = async (id: string) => {
    try {
      const res = await fetch(`${API}/user/job-alert/companies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.code === "success") {
        setCompanyFollows((prev) => prev.filter((c) => c.id !== id));
        toast.success("Đã bỏ theo dõi công ty!");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const skillAddDisabled = !matchedSkill || !cityName || skillSubs.length >= MAX_ITEMS;
  const companyAddDisabled = !matchedCompany || companyFollows.length >= MAX_ITEMS;

  return (
    <div className="max-w-5xl mx-auto mt-[60px] mb-[48px] flex flex-col gap-6 px-4">
      <Toaster richColors position="top-right" />

      {/* Skills card */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-[20px] font-bold text-gray-900">
          Kỹ năng đã đăng ký ({skillSubs.length}/{MAX_ITEMS})
        </h2>
        <p className="text-gray-700 text-[14px] mt-1">
          Đăng ký Job Robot để không bỏ lỡ việc làm phù hợp với kỹ năng của bạn.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1" ref={skillBoxRef}>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => { setSkillInput(e.target.value); setSkillOpen(true); }}
              onFocus={() => setSkillOpen(true)}
              placeholder="Tìm kiếm kỹ năng, chức vụ"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#0088FF] focus:border-[#0088FF]"
            />
            <SuggestionDropDown<Skill>
              items={filteredSkills}
              isVisible={skillOpen}
              renderItem={(sk) => sk.name}
              onSelect={(sk) => { setSkillInput(sk.name); setSkillOpen(false); }}
            />
          </div>

          <select
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-[#0088FF] focus:border-[#0088FF]"
          >
            <option value="" className="text-[16px]">-- Hãy chọn thành phố --</option>
            {provinceList.map((p) => (
              <option key={p.id ?? p._id ?? p.name} value={p.name} className="text-[16px]">
                {p.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddSkill}
            disabled={skillAddDisabled}
            className={`px-8 py-2.5 rounded-md text-white font-medium text-[14px] transition-colors ${
              skillAddDisabled
                ? "bg-[#0088FF]/50 cursor-not-allowed"
                : "bg-[#0088FF] hover:bg-[#0076E5] cursor-pointer"
            }`}
          >
            Đăng ký
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-[#0088FF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : skillSubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <img src={EMPTY_ICON_URL} alt="Chưa có đăng ký nào" className="w-16 h-16 opacity-80" />
            <p className="text-gray-400 text-[14px]">Bạn chưa đăng ký kỹ năng hay chức vụ nào.</p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {skillSubs.map((s, idx) => (
              <li
                key={s.id}
                className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3"
              >
                <div className="text-[14px] text-gray-800">
                  <span className="mr-1">{idx + 1}.</span>
                  <span className="font-bold underline">{s.skillName}</span>
                  <span className="text-gray-600"> tại </span>
                  <span className="underline">{s.cityName}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <span className="text-green-600 font-medium">Đã đăng ký</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(s.id)}
                    title="Xoá"
                    className="w-8 h-8 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Companies card */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-[20px] font-bold text-gray-900">
          Công ty đã theo dõi ({companyFollows.length}/{MAX_ITEMS})
        </h2>
        <p className="text-gray-700 text-[14px] mt-1">
          Nhận thêm thông báo khi công ty bạn yêu thích có việc làm mới.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1" ref={companyBoxRef}>
            <input
              type="text"
              value={companyInput}
              onChange={(e) => { setCompanyInput(e.target.value); setCompanyOpen(true); }}
              onFocus={() => setCompanyOpen(true)}
              placeholder="Tìm kiếm công ty"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0088FF] focus:border-[#0088FF]"
            />
            <SuggestionDropDown<CompanyItem>
              items={filteredCompanies}
              isVisible={companyOpen}
              renderItem={(c) => c.name}
              onSelect={(c) => { setCompanyInput(c.name); setCompanyOpen(false); }}
            />
          </div>
          <button
            type="button"
            onClick={handleAddCompany}
            disabled={companyAddDisabled}
            className={`px-8 py-2.5 rounded-md text-white font-medium text-[14px] transition-colors ${
              companyAddDisabled
                ? "bg-[#0088FF]/50 cursor-not-allowed"
                : "bg-[#0088FF] hover:bg-[#0076E5] cursor-pointer"
            }`}
          >
            Theo dõi
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-[#0088FF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : companyFollows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <img src={EMPTY_ICON_URL} alt="Chưa theo dõi công ty nào" className="w-16 h-16 opacity-80" />
            <p className="text-gray-400 text-[14px]">Bạn chưa theo dõi công ty nào.</p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {companyFollows.map((c, idx) => (
              <li
                key={c.id}
                className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3"
              >
                <div className="text-[14px] text-gray-800">
                  <span className="mr-1">{idx + 1}.</span>
                  <span className="font-bold underline">{c.companyName}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <span className="text-green-600 font-medium">Đã theo dõi</span>
                  <button
                    type="button"
                    onClick={() => removeCompany(c.id)}
                    title="Xoá"
                    className="w-8 h-8 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SkillRegister;
