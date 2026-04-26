"use client";

import { useRouter } from "next/navigation";

/** Semi-circular gauge that shows profile completion percentage */
const GaugeChart = ({ percent }: { percent: number }) => {
  // SVG semi-circle gauge
  // Outer arc: r=60, from 180° to 360° (left to right, bottom half up)
  const r = 54;
  const cx = 80;
  const cy = 72;
  const circumference = Math.PI * r; // half circle
  const offset = circumference - (percent / 100) * circumference;

  // Arc path: start at left (0°) sweep right half-circle
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[90px]">
        <svg
          viewBox="0 0 160 90"
          width="160"
          height="90"
          className="overflow-visible"
        >
          {/* Background track */}
          <path
            d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
            stroke="#F0F0F0"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress */}
          <path
            d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
            stroke="#0D8EFF"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
          {/* Percentage text */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="#121212"
          >
            {percent}%
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fontSize="11"
            fill="#757575"
          >
            hoàn thành
          </text>
        </svg>
      </div>
    </div>
  );
};

import { InfoUser } from "@/interface/user.interface";

export const ProfileSidebar = ({ infoUser }: { infoUser: InfoUser | null }) => {
  const router = useRouter();
  const completionPercent = (() => {
    if (!infoUser) return 0;
    let score = 0;

    // 1. Thông tin cá nhân (Cơ bản + Vị trí): 20%
    if (infoUser.username && infoUser.email) score += 5;

    // 2. Giới thiệu bản thân: 10%
    if (infoUser.intro && infoUser.intro.replace(/<[^>]*>/g, "").trim().length > 0) {
      score += 10;
    }

    // 3. Học vấn: 15%
    if (infoUser.educations && infoUser.educations.length > 0) score += 20;

    // 4. Kinh nghiệm làm việc: 15%
    if (infoUser.experiences && infoUser.experiences.length > 0) score += 20;

    // 5. Kỹ năng: 10%
    if (infoUser.skills && infoUser.skills.length > 0) score += 10;

    // 6. Dự án: 15%
    if (infoUser.projects && infoUser.projects.length > 0) score += 15;

    // 7. Chứng chỉ: 5%
    if (infoUser.certificates && infoUser.certificates.length > 0) score += 5;

    // 8. Giải thưởng: 5%
    if (infoUser.awards && infoUser.awards.length > 0) score += 5;

    // 9. Ngoại ngữ: 5%
    if (infoUser.languages && infoUser.languages.length > 0) score += 5;

    return Math.min(score, 100);
  })();

  return (
    <div className="bg-white border border-[#DEDEDE] rounded-[12px] p-5">
      {/* Title */}
      <p className="text-[14px] font-[600] text-[#444] text-center mb-3">
        Độ hoàn thiện hồ sơ
      </p>

      {/* Gauge */}
      <GaugeChart percent={completionPercent} />

      {/* Tip box */}
      <div className="mt-4 flex items-start gap-3 bg-[#F0F7FF] border border-[#CCE5FF] rounded-[10px] p-3">
        <div className="flex-1 text-[12px] text-[#444] leading-relaxed">
          Nâng cấp hồ sơ của bạn lên{" "}
          <span className="font-[700] text-[#0D8EFF]">65%</span> để tải mẫu CV
          dành cho chuyên gia IT.
        </div>
        {/* Robot icon */}
        <div className="flex-shrink-0 text-[28px] leading-none">🤖</div>
      </div>

      {/* Download CV button */}
      <button
        disabled={completionPercent < 65}
        onClick={() => completionPercent >= 65 && router.push('/user-manage/cv-preview')}
        className={`mt-4 w-full h-11 transition-colors rounded-[8px] text-[14px] font-[700] flex items-center justify-center gap-2 ${
          completionPercent < 65
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#0D8EFF] hover:bg-[#0076E5] text-white cursor-pointer"
        }`}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16L7 11H10V4H14V11H17L12 16Z"
            fill="currentColor"
          />
          <path
            d="M5 20H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Xem và Tải CV
      </button>
    </div>
  );
};
