import { useState, useCallback } from "react";

interface UseDateSelectorProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
}

export function useDateSelector({
  initialDate = new Date(),
  onChange,
}: UseDateSelectorProps = {}) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setIsOpen(false);
      onChange?.(date);
    },
    [onChange],
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

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    selectedDate,
    currentMonth,
    isOpen,
    formatDate,
    handleDateChange,
    handlePrevMonth,
    handleNextMonth,
    toggle,
  };
}
