"use client";

import { ReactNode } from "react";
import VerticalDots from "@/components/common/VerticalDots";
import { useMainContext } from "../context/MainContext";
import BlogContent from "./BlogContent";
import CategoryContent from "./CategoryContent";
import MainContent from "./MainContent";
import ProfileContent from "./ProfileContent";
import SideMenu from "@/components/common/SideMenu";
import HomeHeader from "./Header";

const MainComponents = {
  Container: ({ children }: { children: ReactNode }) => {
    const { state } = useMainContext();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-start bg-white">
        <main className="h-screen w-full max-w-[1280px] overflow-hidden">
          <div
            className="h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(-${state.currentSection * 100}%)` }}
          >
            {children}
          </div>
        </main>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = useMainContext();
    return <HomeHeader toggleSideMenu={handlers.toggleSideMenu} />;
  },
  SideMenu: () => {
    const { state, handlers } = useMainContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
  MainContent: () => {
    const { state } = useMainContext();
    return <MainContent show={state.currentSection === 0} />;
  },
  CategoryContent: () => {
    const { state } = useMainContext();
    return (
      <CategoryContent
        show={state.currentSection === 1}
        isMobile={state.isMobile}
      />
    );
  },
  ProfileContent: () => {
    const { state } = useMainContext();
    return (
      <ProfileContent
        show={state.currentSection === 2}
        isMobile={state.isMobile}
      />
    );
  },
  BlogContent: () => {
    const { state, handlers } = useMainContext();
    return (
      <BlogContent
        isMobile={state.isMobile}
        data={state.posts}
        visibleItems={state.visibleBlogs}
        windowHeight={state.windowHeight}
        value={state.currentDate}
        onChangeDate={handlers.onChangeDate}
        onSelected={handlers.onSelected}
        onSelectedDate={handlers.onSelectedDate}
      />
    );
  },
  VerticalDotButtons: () => {
    const { state, handlers } = useMainContext();
    return (
      <VerticalDots
        total={state.limit}
        current={state.currentSection}
        onPageChange={handlers.onPageChange}
      />
    );
  },
};

export default MainComponents;
