export const fmt = (month: string, year: string) =>
  month && year ? `${month}/${year}` : year || month || '';

export const dateRange = (
  fromMonth: string,
  fromYear: string,
  toMonth: string,
  toYear: string,
  isCurrent: boolean
) => {
  const from = fmt(fromMonth, fromYear);
  const to = isCurrent ? 'Hiện tại' : fmt(toMonth, toYear);
  return `${from} - ${to}`;
};

// Re-export tất cả label helpers từ config dùng chung
export {
  mapLabel,
  degreeLabel,
  languageLabel,
  levelLabel,
  skillLabel,
  experienceLabel,
  softSkillLabel,
} from '@/config/cvLabels';
