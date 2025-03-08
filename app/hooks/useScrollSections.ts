import { useEffect, useState } from "react";

interface UseScrollSectionsProps {
  totalSections: number;
  animationDuration?: number;
}

export function useScrollSections({
  totalSections,
  animationDuration = 1500,
}: UseScrollSectionsProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (event: WheelEvent) => {
    // console.log("[handleScroll] event: ", event);
    event.preventDefault();

    if (isScrolling) return;

    setIsScrolling(true);

    // 스크롤 방향 감지
    if (event.deltaY > 0 && currentSection < totalSections - 1) {
      // 아래로 스크롤
      setCurrentSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      // 위로 스크롤
      setCurrentSection((prev) => prev - 1);
    }

    // 스크롤 애니메이션이 끝날 때까지 대기
    setTimeout(() => {
      setIsScrolling(false);
    }, animationDuration);
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isScrolling, currentSection]);

  return {
    currentSection,
    isScrolling,
  };
} 