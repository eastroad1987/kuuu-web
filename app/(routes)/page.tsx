"use client";

import MainLayout from "@/context/home/MainLayout";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = useMemo(() => {
    return [
      { id: 0, children: <MainLayout.Home show={currentSection === 0} /> },
      { id: 1, children: <MainLayout.Profile show={currentSection === 1} /> },
      { id: 2, children: <MainLayout.Category show={currentSection === 2} /> },
      { id: 3, children: <MainLayout.Blogs show={currentSection === 3} /> },
    ];
  }, [currentSection]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection, isScrolling]);

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();

    if (isScrolling) return;

    setIsScrolling(true);

    // 스크롤 방향 감지
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
      // 아래로 스크롤
      setCurrentSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      // 위로 스크롤
      setCurrentSection((prev) => prev - 1);
    }

    // 스크롤 애니메이션이 끝날 때까지 대기
    setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start">
      <main className="h-screen w-full max-w-[1280px] overflow-hidden">
        <MainLayout currentSection={currentSection}>
          {sections.map((section, idx) => (
            <div key={idx} className="h-full w-full">
              {section.children}
            </div>
          ))}
        </MainLayout>
        <MainLayout.Dots
          total={sections.length}
          current={currentSection}
          onPageChange={setCurrentSection}
        />
      </main>
    </div>
  );
}
