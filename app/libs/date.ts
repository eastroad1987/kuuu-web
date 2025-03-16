export function getMonthPeriod(startDate: Date): { start: Date, end: Date } {
  const start = new Date(startDate);
  const startDay = start.getDate();
  
  // 다음 달의 같은 날짜로 설정
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  
  // 월말 날짜 처리 (예: 1월 31일 → 2월 28일)
  const daysInStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  const daysInEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  
  if (startDay > daysInEndMonth) {
    end.setDate(daysInEndMonth);
  }
  
  return { start, end };
}