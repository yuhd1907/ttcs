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

export const PAGE_HEIGHT_PX = 1122; // Chiều cao 1 trang A4 (khi width = 794px)

export const applyPageBreaks = (el: HTMLElement) => {
  // Lưu lại margin-top ban đầu để có thể chạy nhiều lần mà không bị dồn
  const allNodes = el.querySelectorAll('.cv-section, .cv-item');
  allNodes.forEach(node => {
    const htmlNode = node as HTMLElement;
    if (htmlNode.dataset.originalMarginTop !== undefined) {
      htmlNode.style.marginTop = htmlNode.dataset.originalMarginTop;
    } else {
      htmlNode.dataset.originalMarginTop = window.getComputedStyle(htmlNode).marginTop;
    }
  });

  const sections = Array.from(el.querySelectorAll('.cv-section'));
  
  sections.forEach(section => {
    const htmlSection = section as HTMLElement;
    let rect = htmlSection.getBoundingClientRect();
    let rootRect = el.getBoundingClientRect();
    let top = rect.top - rootRect.top;
    let bottom = top + rect.height;

    // Tính ranh giới trang gần nhất nằm bên dưới phần top của section
    let pageBoundary = Math.floor(top / PAGE_HEIGHT_PX + 1) * PAGE_HEIGHT_PX;
    if (top > 0 && top % PAGE_HEIGHT_PX === 0) pageBoundary = top + PAGE_HEIGHT_PX;

    // 1. Nếu section cắt ngang trang và nhỏ hơn 1 trang -> Đẩy CẢ section sang trang mới
    if (bottom > pageBoundary && rect.height < PAGE_HEIGHT_PX) {
      const pushAmount = pageBoundary - top;
      const currentMargin = parseFloat(htmlSection.dataset.originalMarginTop || '0') || 0;
      // Cộng thêm 20px padding để không dính sát mép trên
      htmlSection.style.marginTop = `${currentMargin + pushAmount + 20}px`;
    } 
    // 2. Nếu section QUÁ DÀI (lớn hơn 1 trang), ta không đẩy cả section mà xét từng item bên trong
    else if (bottom > pageBoundary && rect.height >= PAGE_HEIGHT_PX) {
      const items = Array.from(htmlSection.querySelectorAll('.cv-item'));
      items.forEach(item => {
        const htmlItem = item as HTMLElement;
        // Phải getBoundingClientRect() TRONG vòng lặp vì các item trước bị đẩy sẽ làm thay đổi vị trí item sau
        let iRect = htmlItem.getBoundingClientRect();
        let iRootRect = el.getBoundingClientRect();
        let iTop = iRect.top - iRootRect.top;
        let iBottom = iTop + iRect.height;
        
        let iPageBoundary = Math.floor(iTop / PAGE_HEIGHT_PX + 1) * PAGE_HEIGHT_PX;
        if (iTop > 0 && iTop % PAGE_HEIGHT_PX === 0) iPageBoundary = iTop + PAGE_HEIGHT_PX;

        if (iBottom > iPageBoundary && iRect.height < PAGE_HEIGHT_PX) {
           const iPushAmount = iPageBoundary - iTop;
           const iCurrentMargin = parseFloat(htmlItem.dataset.originalMarginTop || '0') || 0;
           htmlItem.style.marginTop = `${iCurrentMargin + iPushAmount + 20}px`;
        }
      });
    }
  });
};
