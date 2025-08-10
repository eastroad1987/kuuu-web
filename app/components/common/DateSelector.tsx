"use client";

import { useRef, useEffect } from "react";
import { useDateSelector } from "../../hooks/useDateSelector";

interface DateSelectorProps {
  onChange?: (date: Date) => void;
  initialDate?: Date;
  className?: string;
  placeholder?: string;
}

export default function DateSelector({
  onChange,
  initialDate,
  className = "",
  placeholder = "날짜 선택",
}: DateSelectorProps) {
  const {
    selectedDate,
    currentMonth,
    isOpen,
    formatDate,
    handleDateChange,
    handlePrevMonth,
    handleNextMonth,
    toggle,
  } = useDateSelector({ initialDate, onChange });

  const calendarRef = useRef<HTMLDivElement>(null);

  // 캘린더 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        isOpen && toggle();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggle]);

  // 달력 렌더링 유틸리티 함수
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 해당 월의 첫날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 달력 첫 주의 시작일 (이전 달의 날짜 포함)
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const calendar = [];
    let currentDate = new Date(startDate);

    // 6주 달력 생성 (42일)
    for (let i = 0; i < 42; i++) {
      const dayDate = new Date(currentDate);
      const isCurrentMonth = dayDate.getMonth() === month;
      const isToday = dayDate.toDateString() === new Date().toDateString();
      const isSelected = dayDate.toDateString() === selectedDate.toDateString();

      calendar.push({
        date: dayDate,
        day: dayDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      {/* 날짜 선택 입력 필드 */}
      <div
        className="flex cursor-pointer items-center justify-between rounded-md border bg-black p-3"
        onClick={toggle}
      >
        <span className={selectedDate ? "" : "text-gray-400"}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* 달력 팝업 */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 rounded-md border bg-black shadow-lg">
          {/* 달력 헤더 */}
          <div className="flex items-center justify-between border-b p-3">
            <button
              id="prev-month-button"
              onClick={handlePrevMonth}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              {currentMonth.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
              })}
            </div>
            <button
              id="next-month-button"
              onClick={handleNextMonth}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 border-b py-2 text-center text-xs">
            {weekdays.map((day) => (
              <div key={day} className="px-1">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 p-2">
            {calendar.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDateChange(day.date)}
                className={`mx-auto my-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-sm text-black ${!day.isCurrentMonth ? "text-gray-300" : ""} ${day.isToday || day.isSelected ? "border border-blue-400" : ""} hover:bg-gray-100`}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
