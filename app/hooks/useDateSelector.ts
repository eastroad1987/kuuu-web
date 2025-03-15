import { useState, useCallback, useMemo, useEffect, useRef } from "react";

interface UseDateSelectorProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  formatOptions?: Intl.DateTimeFormatOptions;
  locale?: string;
}

export function useDateSelector({
  initialDate = new Date(),
  onChange,
  minDate,
  maxDate,
  formatOptions,
  locale = "ko-KR",
}: UseDateSelectorProps = {}) {
  // 날짜 유효성 검사
  const validatedInitialDate = useMemo(() => {
    let validDate = new Date(initialDate);
    
    if (minDate && validDate < minDate) {
      validDate = new Date(minDate);
    }
    
    if (maxDate && validDate > maxDate) {
      validDate = new Date(maxDate);
    }
    
    return validDate;
  }, [initialDate, minDate, maxDate]);
  
  // 초기 상태 최적화: initialDate를 기반으로 currentMonth 초기값 설정
  const initialMonth = useMemo(() => 
    new Date(validatedInitialDate.getFullYear(), validatedInitialDate.getMonth(), 1),
    [validatedInitialDate]
  );

  const [selectedDate, setSelectedDate] = useState<Date>(validatedInitialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);
  
  // 외부 클릭 감지를 위한 ref
  const containerRef = useRef<HTMLElement | null>(null);

  // 날짜 유효성 검사 함수
  const isDateValid = useCallback((date: Date): boolean => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  }, [minDate, maxDate]);

  const handleDateChange = useCallback(
    (date: Date) => {
      if (!isDateValid(date)) return;
      
      setSelectedDate(date);
      setIsOpen(false);
      onChange?.(date);
    },
    [onChange, isDateValid],
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  }, []);
  
  const goToToday = useCallback(() => {
    const today = new Date();
    if (isDateValid(today)) {
      setSelectedDate(today);
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
      onChange?.(today);
    }
  }, [isDateValid, onChange]);

  // 날짜 형식 옵션을 useMemo로 메모이제이션
  const dateFormatOptions = useMemo(() => ({
    year: "numeric", 
    month: "long", 
    day: "numeric",
    ...formatOptions
  } as const), [formatOptions]);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString(locale, dateFormatOptions);
  }, [locale, dateFormatOptions]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 추가: 현재 월의 정보 메모이제이션
  const monthData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 달력에 표시할 일 수 계산 (이전/다음 달 포함)
    const firstDayOfWeek = firstDay.getDay(); // 0: 일요일, 6: 토요일
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // 이전 달의 마지막 날짜들 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = new Date(year, month, -firstDayOfWeek + i + 1);
      days.push({
        date: day,
        isCurrentMonth: false,
        isSelected: day.toDateString() === selectedDate.toDateString(),
        isToday: day.toDateString() === new Date().toDateString(),
        isDisabled: !isDateValid(day)
      });
    }
    
    // 현재 달의 날짜들 추가
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true,
        isSelected: day.toDateString() === selectedDate.toDateString(),
        isToday: day.toDateString() === new Date().toDateString(),
        isDisabled: !isDateValid(day)
      });
    }
    
    // 다음 달 첫 날짜들 추가 (6주 채움)
    const totalCells = 42; // 6주 x 7일 = 42
    const remainingCells = totalCells - days.length;
    
    for (let i = 1; i <= remainingCells; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false,
        isSelected: day.toDateString() === selectedDate.toDateString(),
        isToday: day.toDateString() === new Date().toDateString(),
        isDisabled: !isDateValid(day)
      });
    }
    
    return {
      year,
      month,
      firstDay,
      lastDay,
      daysInMonth,
      days,
      monthName: firstDay.toLocaleDateString(locale, { month: 'long' }),
      yearMonth: firstDay.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
    };
  }, [currentMonth, selectedDate, locale, isDateValid]);
  
  // 외부 클릭 감지 이벤트 설정
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close]);

  return {
    selectedDate,
    currentMonth,
    isOpen,
    formatDate,
    handleDateChange,
    handlePrevMonth,
    handleNextMonth,
    toggle,
    close,
    goToToday,
    monthData,
    containerRef,
    isDateValid
  };
}
