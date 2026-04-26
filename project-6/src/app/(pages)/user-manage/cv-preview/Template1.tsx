import { InfoUser } from '@/interface/user.interface';
import { fmt, dateRange, degreeLabel, languageLabel, levelLabel, skillLabel, experienceLabel, softSkillLabel } from './cvUtils';
import { CiMail, CiPhone, CiCalendar } from "react-icons/ci";
import { GoLocation } from "react-icons/go";

export const Template1 = ({ user }: { user: InfoUser }) => {
  const hardSkills = user.skills?.filter(g => g.type === 'hard') ?? [];
  const softSkills = user.skills?.filter(g => g.type === 'soft') ?? [];

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:w-full print:m-0 relative font-sans text-gray-900 overflow-visible box-border flex flex-col">

      {/* Header */}
      <header className="flex items-center bg-gray-800 text-white px-10 py-8 shrink-0">
        <span className="w-[120px] h-[120px] bg-gray-600 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
          {user.avatar
            ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
            : <svg className="w-16 h-16 fill-current text-gray-300"><use xlinkHref="#elegant-avatar-default" /></svg>
          }
        </span>
        <div className="ml-10 flex flex-col w-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold leading-tight break-words">{user.username}</h1>
            <h2 className="text-base font-light uppercase tracking-widest text-gray-300 mt-2 break-words">{user.position || 'Ứng viên'}</h2>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2 w-1/2 pr-4">
              {user.phone && (
                <div className="flex items-center">
                  <CiPhone className="mr-3 shrink-0 text-gray-400 text-lg" />
                  <p className="text-sm">{user.phone}</p>
                </div>
              )}
              {user.email && (
                <div className="flex items-start">
                  <CiMail className="mr-3 mt-0.5 shrink-0 text-gray-400 text-lg" />
                  <p className="text-sm break-all">{user.email}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              {user.birth_date && (
                <div className="flex items-center">
                  <CiCalendar className="mr-3 shrink-0 text-gray-400 text-lg" />
                  <p className="text-sm">{user.birth_date}</p>
                </div>
              )}
              {user.city && (
                <div className="flex items-start">
                  <GoLocation className="mr-3 mt-0.5 shrink-0 text-gray-400 text-lg" />
                  <p className="text-sm break-words">{user.city}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-grow bg-white px-10 py-10 flex flex-col gap-6">

        {/* Giới thiệu */}
        {user.intro && (
          <div className="flex flex-row">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Giới thiệu</div>
            <div className="w-[70%] text-sm font-normal leading-relaxed text-gray-800 break-words prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: user.intro }} />
          </div>
        )}

        {/* Học vấn */}
        {user.educations && user.educations.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Học vấn</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-4">
              {user.educations.map((edu, i) => (
                <div key={edu.id ?? i}>
                  <span className="text-base font-bold text-gray-900 break-words block mb-1">{edu.school}</span>
                  <div className="flex flex-wrap items-center mt-1 text-gray-600 gap-x-1">
                    <p className="whitespace-nowrap">{dateRange(edu.fromMonth, edu.fromYear, edu.toMonth, edu.toYear, edu.isCurrentlyStudying)}</p>
                    <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                    <p className="font-medium text-gray-800 min-w-0 break-words">{degreeLabel(edu.degree)} <span className="font-normal text-gray-600">- {edu.major}</span></p>
                  </div>
                  {edu.details && (
                    <div className="leading-relaxed font-normal break-words mt-2 text-sm prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: edu.details }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kỹ năng */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Kỹ năng</div>
            <div className="w-[70%] text-sm text-gray-800">
              {hardSkills.map((group, i) => (
                <div key={group.id ?? i} className="mb-4">
                  <div className="text-sm font-bold text-gray-900 mb-2 italic">{group.groupName}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={item.id ?? j} className="inline-flex items-center px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-800">
                        {skillLabel(item.skill)}{item.experience && <span className="text-gray-500 ml-1">({experienceLabel(item.experience)})</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {softSkills.map((group, i) => (
                <div key={group.id ?? i} className="mb-4">
                  <div className="text-sm font-bold text-gray-900 mb-2 italic">{group.groupName}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={item.id ?? j} className="inline-flex items-center px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-800">
                        {softSkillLabel(item.skill)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kinh nghiệm */}
        {user.experiences && user.experiences.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Kinh nghiệm làm việc</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-4">
              {user.experiences.map((exp, i) => (
                <div key={exp.id ?? i}>
                  <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                    {dateRange(exp.fromMonth, exp.fromYear, exp.toMonth, exp.toYear, exp.isCurrentlyWorking)}
                  </div>
                  <div className="flex flex-wrap items-center text-base font-bold text-gray-900 mt-1 mb-2 gap-x-1">
                    <p className="uppercase break-words min-w-0">{exp.position}</p>
                    <div className="w-px h-4 bg-gray-400 mx-2 shrink-0" />
                    <p className="font-normal break-words min-w-0">{exp.company}</p>
                  </div>
                  {exp.description && (
                    <div className="text-sm font-normal leading-relaxed break-words mb-3 text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                  {exp.projectDetails && (
                    <div>
                      <div className="text-xs font-bold uppercase mb-1 text-gray-900">Dự án:</div>
                      <div className="text-sm font-normal leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: exp.projectDetails }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ngoại ngữ */}
        {user.languages && user.languages.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Ngoại ngữ</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-2">
              {user.languages.map((lang, i) => (
                <div key={lang.id ?? i} className="flex items-center">
                  <span className="font-bold text-gray-900 mr-1">{languageLabel(lang.language)}</span>
                  <span className="text-gray-700">: {levelLabel(lang.level)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dự án */}
        {user.projects && user.projects.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Dự án nổi bật</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-4">
              {user.projects.map((proj, i) => (
                <div key={proj.id ?? i}>
                  <span className="text-sm font-bold text-gray-900 block mb-1">
                    {dateRange(proj.fromMonth, proj.fromYear, proj.toMonth, proj.toYear, proj.isCurrentlyWorking).toUpperCase()}
                  </span>
                  <div className="text-base font-bold text-gray-900 mb-2 break-words">{proj.name}</div>
                  {proj.description && (
                    <div className="text-sm font-normal leading-relaxed break-words text-gray-700 mb-2 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                  {proj.link && (
                    <div className="text-sm font-normal">
                      <span className="font-bold text-gray-900 mr-2">Link dự án:</span>
                      <a className="text-blue-600 underline break-all hover:text-blue-800 transition-colors" target="_blank" rel="noreferrer" href={proj.link}>{proj.link}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chứng chỉ */}
        {user.certificates && user.certificates.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Chứng chỉ</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-4">
              {user.certificates.map((cert, i) => (
                <div key={cert.id ?? i}>
                  <span className="text-base font-bold text-gray-900 block mb-1 break-words">{cert.name}</span>
                  <div className="flex flex-wrap items-center text-gray-600 mb-2 mt-1 gap-x-1">
                    <span className="whitespace-nowrap">{fmt(cert.month, cert.year)}</span>
                    <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                    <span className="font-semibold text-gray-800 break-words min-w-0">{cert.organization}</span>
                  </div>
                  {cert.link && (
                    <div className="text-sm font-normal mb-2">
                      <span className="font-bold text-gray-900 mr-2">Link chứng chỉ:</span>
                      <a className="text-blue-600 underline break-all hover:text-blue-800 transition-colors" target="_blank" rel="noreferrer" href={cert.link}>{cert.link}</a>
                    </div>
                  )}
                  {cert.description && (
                    <div className="text-sm font-normal leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: cert.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Giải thưởng */}
        {user.awards && user.awards.length > 0 && (
          <div className="flex flex-row border-t border-gray-300 pt-6">
            <div className="w-[30%] text-base font-bold text-gray-900 pr-6 shrink-0 uppercase tracking-wide">Giải thưởng</div>
            <div className="w-[70%] text-sm text-gray-800 flex flex-col gap-4">
              {user.awards.map((award, i) => (
                <div key={award.id ?? i}>
                  <span className="text-base font-bold text-gray-900 block mb-1 break-words">{award.name}</span>
                  <div className="flex flex-wrap items-center text-gray-600 mt-1 mb-2 gap-x-1">
                    <span className="whitespace-nowrap">{fmt(award.month, award.year)}</span>
                    <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                    <span className="font-semibold text-gray-800 break-words min-w-0">{award.organization}</span>
                  </div>
                  {award.description && (
                    <div className="text-sm font-normal leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: award.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
