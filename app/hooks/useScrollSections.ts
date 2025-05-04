"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface UseScrollSectionsProps {
  totalSections: number;
  animationDuration?: number;
  initialSection?: number;
}

export function useScrollSections({
  totalSections,
  animationDuration = 1500,
  initialSection = 0,
}: UseScrollSectionsProps) {
  // 초기 섹션 유효성 검사
  const validInitialSection = useMemo(() => {
    return Math.min(Math.max(initialSection, 0), totalSections - 1);
  }, [initialSection, totalSections]);
  
  const [currentSection, setCurrentSection] = useState(validInitialSection);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 섹션 변경 함수 최적화
  const changeSection = useCallback((sectionIndex: number) => {
    // 범위 검증
    const newSection = Math.min(Math.max(sectionIndex, 0), totalSections - 1);
    
    // 현재 섹션과 같거나 스크롤 중이면 무시
    if (newSection === currentSection || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(newSection);
    
    // 기존 타임아웃 취소 후 새로 설정
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;
    }, animationDuration);
  }, [currentSection, isScrolling, totalSections, animationDuration]);

  // 다음/이전 섹션으로 이동하는 함수
  const nextSection = useCallback(() => {
    if (currentSection < totalSections - 1) {
      changeSection(currentSection + 1);
    }
  }, [currentSection, totalSections, changeSection]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      changeSection(currentSection - 1);
    }
  }, [currentSection, changeSection]);

  // handleScroll 함수를 useCallback으로 메모이제이션
  const handleScroll = useCallback((event: WheelEvent) => {
    event.preventDefault();

    if (isScrolling) return;

    // 스크롤 방향에 따라 다음/이전 섹션 호출
    if (event.deltaY > 0) {
      nextSection();
    } else if (event.deltaY < 0) {
      prevSection();
    }
  }, [isScrolling, nextSection, prevSection]);

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  // 섹션 관련 상태 정보 메모이제이션
  const sectionInfo = useMemo(() => ({
    isFirst: currentSection === 0,
    isLast: currentSection === totalSections - 1,
    totalSections,
    progress: (currentSection / (totalSections - 1)) * 100
  }), [currentSection, totalSections]);

  return {
    currentSection,
    setCurrentSection: changeSection, // 직접 setCurrentSection 대신 검증된 changeSection 함수 사용
    isScrolling,
    nextSection,
    prevSection,
    sectionInfo
  };
} 