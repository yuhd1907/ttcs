import { InfoUser } from '@/interface/user.interface';
import { fmt, dateRange, degreeLabel, languageLabel, levelLabel, skillLabel, experienceLabel, softSkillLabel } from './cvUtils';
import { CiMail, CiPhone, CiCalendar } from "react-icons/ci";
import { GoLocation } from "react-icons/go";

export const Template2 = ({ user }: { user: InfoUser }) => {
  const hardSkills = user.skills?.filter(g => g.type === 'hard') ?? [];
  const softSkills = user.skills?.filter(g => g.type === 'soft') ?? [];

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:w-full print:m-0 relative font-sans text-gray-900 overflow-visible box-border flex flex-col justify-between">
        <div className="flex-1 w-full px-8 py-10 relative">

          {/* Header */}
          <div className="flex justify-between items-start pt-10 pb-9 relative z-10">
            <div className="absolute top-0 left-0 w-full h-full z-0 flex justify-between pointer-events-none">
              <div className="pt-10 pl-9"><div className="w-12 h-12 bg-lime-500" /></div>
              <div className="w-16 h-full bg-lime-600" />
            </div>
            <div className="mr-10 mb-6 relative flex w-full z-10">
              <div className="w-2 h-12 bg-gray-900 mt-8 mr-4" />
              <div className="w-full">
                <h3 className="text-2xl font-bold break-words leading-tight uppercase mt-6 mb-1">{user.username}</h3>
                <p className="text-base font-normal uppercase tracking-widest break-words text-gray-700">{user.position || 'Ứng viên'}</p>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-2 mt-6">
              {user.phone && (
                <div className="flex items-center gap-2">
                  <CiPhone className="w-4 h-4 text-gray-700" />
                  <div className="text-xs break-words">{user.phone}</div>
                </div>
              )}
              {user.birth_date && (
                <div className="flex items-center gap-2">
                  <CiCalendar className="w-4 h-4 text-gray-700" />
                  <div className="text-xs">{user.birth_date}</div>
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-2">
                  <CiMail className="w-4 h-4 text-gray-700" />
                  <div className="text-xs break-words">{user.email}</div>
                </div>
              )}
              {user.city && (
                <div className="flex items-center gap-2">
                  <GoLocation className="w-4 h-4 text-gray-700" />
                  <div className="text-xs break-words">{user.city}</div>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="mb-4 relative z-10 pr-20">

            {/* Giới thiệu */}
            {user.intro && (
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Giới thiệu</h4>
                </div>
                <div className="text-xs leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: user.intro }} />
              </div>
            )}

            {/* Học vấn */}
            {user.educations && user.educations.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Học vấn</h4>
                </div>
                {user.educations.map((edu, i) => (
                  <div key={edu.id ?? i} className="mb-3 cv-item">
                    <div className="text-sm font-bold break-words mb-1">{edu.school}</div>
                    <div className="flex flex-wrap items-center mb-1 gap-x-1">
                      <div className="text-xs min-w-0">
                        <span className="font-medium">{degreeLabel(edu.degree)}</span>
                        <span className="break-words"> - {edu.major}</span>
                      </div>
                      <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                      <div className="text-xs whitespace-nowrap text-gray-600">
                        {dateRange(edu.fromMonth, edu.fromYear, edu.toMonth, edu.toYear, edu.isCurrentlyStudying)}
                      </div>
                    </div>
                    {edu.details && (
                      <div className="text-xs break-words text-gray-700 mt-1 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: edu.details }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Kỹ năng */}
            {user.skills && user.skills.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Kỹ năng</h4>
                </div>
                {hardSkills.map((group, i) => (
                  <div key={group.id ?? i} className="mb-3 cv-item">
                    <div className="text-xs font-bold mb-2 italic">{group.groupName}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <span key={item.id ?? j} className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-800">
                          {skillLabel(item.skill)}{item.experience && <span className="text-gray-500 ml-1">({experienceLabel(item.experience)})</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {softSkills.map((group, i) => (
                  <div key={group.id ?? i} className="mb-3 cv-item">
                    <div className="text-xs font-bold mb-2 italic">{group.groupName}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <span key={item.id ?? j} className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-800">
                          {softSkillLabel(item.skill)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Kinh nghiệm */}
            {user.experiences && user.experiences.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-4">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Kinh nghiệm làm việc</h4>
                </div>
                {user.experiences.map((exp, i) => (
                  <div key={exp.id ?? i} className="mt-4 cv-item">
                    <div className="flex items-start mb-2">
                      <div className="w-1.5 h-8 bg-lime-500 mr-4 mt-1" />
                      <div className="flex flex-col w-full">
                        <div className="flex flex-wrap items-center mb-1 gap-x-1">
                          <div className="text-sm font-bold uppercase break-words min-w-0">{exp.position}</div>
                          <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                          <div className="text-sm break-words min-w-0">{exp.company}</div>
                        </div>
                        <div className="text-xs whitespace-nowrap uppercase text-gray-600">
                          {dateRange(exp.fromMonth, exp.fromYear, exp.toMonth, exp.toYear, exp.isCurrentlyWorking)}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 pl-6 border-l border-gray-200 ml-[3px]">
                      {exp.description && (
                        <div className="text-xs leading-relaxed break-words text-gray-700 mb-2 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: exp.description }} />
                      )}
                      {exp.projectDetails && (
                        <>
                          <div className="text-xs font-bold uppercase mb-1">Dự án:</div>
                          <div className="text-xs leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: exp.projectDetails }} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ngoại ngữ */}
            {user.languages && user.languages.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Ngoại ngữ</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user.languages.map((lang, i) => (
                    <div key={lang.id ?? i} className="bg-gray-100 px-3 py-1.5 text-xs rounded-sm cv-item">
                      <span className="font-bold capitalize">{languageLabel(lang.language)}</span>
                      <span className="font-normal text-gray-600 ml-1">({levelLabel(lang.level)})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dự án */}
            {user.projects && user.projects.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Dự án nổi bật</h4>
                </div>
                {user.projects.map((proj, i) => (
                  <div key={proj.id ?? i} className="mt-3 cv-item">
                    {proj.link
                      ? <a target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-1 hover:text-blue-600 transition-colors" href={proj.link}>
                          <div className="text-sm font-bold break-words">{proj.name}</div>
                          <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                            <path d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.99951 7L10.4995 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      : <div className="text-sm font-bold break-words mb-1">{proj.name}</div>
                    }
                    <div className="text-xs whitespace-nowrap uppercase mb-2 text-gray-600">
                      {dateRange(proj.fromMonth, proj.fromYear, proj.toMonth, proj.toYear, proj.isCurrentlyWorking)}
                    </div>
                    {proj.description && (
                      <div className="text-xs leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: proj.description }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Chứng chỉ */}
            {user.certificates && user.certificates.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Chứng chỉ</h4>
                </div>
                {user.certificates.map((cert, i) => (
                  <div key={cert.id ?? i} className="mt-3 cv-item">
                    <div className="mb-1">
                      {cert.link
                        ? <a target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-1 hover:text-blue-600 transition-colors" href={cert.link}>
                            <div className="text-sm font-bold break-words">{cert.name}</div>
                            <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                              <path d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.99951 7L10.4995 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        : <div className="text-sm font-bold break-words mb-1">{cert.name}</div>
                      }
                    </div>
                    <div className="flex flex-wrap items-center mb-2 gap-x-1">
                      <div className="text-xs break-words min-w-0">{cert.organization}</div>
                      <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                      <div className="text-xs whitespace-nowrap text-gray-600">{fmt(cert.month, cert.year)}</div>
                    </div>
                    {cert.description && (
                      <div className="text-xs leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: cert.description }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Giải thưởng */}
            {user.awards && user.awards.length > 0 && (
              <div className="mb-6 cv-section">
                <div className="flex items-center mb-3">
                  <div className="w-1.5 h-4 bg-gray-900 mr-2" />
                  <h4 className="font-bold text-base uppercase">Giải thưởng</h4>
                </div>
                {user.awards.map((award, i) => (
                  <div key={award.id ?? i} className="mt-3 cv-item">
                    <div className="text-sm font-bold break-words mb-1">{award.name}</div>
                    <div className="flex flex-wrap items-center mb-2 gap-x-1">
                      <div className="text-xs break-words min-w-0">{award.organization}</div>
                      <div className="w-px h-3 bg-gray-400 mx-2 shrink-0" />
                      <div className="text-xs whitespace-nowrap text-gray-600">{fmt(award.month, award.year)}</div>
                    </div>
                    {award.description && (
                      <div className="text-xs leading-relaxed break-words text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: award.description }} />
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end h-8">
          <div className="w-20 bg-lime-500 mr-6" />
          <div className="w-32 bg-lime-600" />
        </div>
      </div>
  );
};
