// ── CV Label Mapping Config ───────────────────────────────────────────────
// Dùng chung cho cv-preview/Template*.tsx và profile/sections/*.tsx

export const DEGREE_MAP: Record<string, string> = {
  college:   'Cao đẳng',
  bachelor:  'Cử nhân',
  master:    'Thạc sĩ',
  doctorate: 'Tiến sĩ',
  other:     'Khác',
};

export const LANGUAGE_MAP: Record<string, string> = {
  vietnamese: 'Tiếng Việt',
  english:    'Tiếng Anh',
  japanese:   'Tiếng Nhật',
  german:     'Tiếng Đức',
  spanish:    'Tiếng Tây Ban Nha',
  korean:     'Tiếng Hàn',
  chinese:    'Tiếng Trung',
  french:     'Tiếng Pháp',
};

export const LEVEL_MAP: Record<string, string> = {
  beginner:     'Sơ cấp',
  intermediate: 'Trung cấp',
  advanced:     'Nâng cao',
  proficient:   'Thành thạo',
};

export const SKILL_MAP: Record<string, string> = {
  react:  'ReactJS',
  node:   'NodeJS',
  python: 'Python',
  java:   'Java',
  figma:  'Figma',
  css:    'CSS',
  html:   'HTML',
};

export const EXPERIENCE_MAP: Record<string, string> = {
  'no-exp':  'Chưa có kinh nghiệm',
  'under-1': 'Dưới 1 năm',
  '1-3':     '1 - 3 năm',
  '3-5':     '3 - 5 năm',
  'over-5':  'Trên 5 năm',
};

export const SOFT_SKILL_MAP: Record<string, string> = {
  communication:    'Giao tiếp',
  teamwork:         'Làm việc nhóm',
  problem_solving:  'Giải quyết vấn đề',
  time_management:  'Quản lý thời gian',
  leadership:       'Lãnh đạo',
};

// ── Generic helper ────────────────────────────────────────────────────────

/** Trả về label tiếng Việt, fallback về chính value nếu không tìm thấy */
export const mapLabel = (map: Record<string, string>, value: string): string =>
  map[value] ?? value;

export const degreeLabel     = (v: string) => mapLabel(DEGREE_MAP,     v);
export const languageLabel   = (v: string) => mapLabel(LANGUAGE_MAP,   v);
export const levelLabel      = (v: string) => mapLabel(LEVEL_MAP,      v);
export const skillLabel      = (v: string) => mapLabel(SKILL_MAP,      v);
export const experienceLabel = (v: string) => mapLabel(EXPERIENCE_MAP, v);
export const softSkillLabel  = (v: string) => mapLabel(SOFT_SKILL_MAP, v);

