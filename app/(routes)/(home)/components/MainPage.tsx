"use client";

import VerticalDots from "@/components/common/VerticalDots";
import { useMainContext } from "../context/MainContext";
import BlogContent from "./BlogContent";
import CategoryContent from "./CategoryContent";
import MainContent from "./MainContent";
import ProfileContent from "./ProfileContent";

const MainComponents = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { state } = useMainContext();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-start">
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
  MainContent: () => {
    const { state } = useMainContext();
    return <MainContent show={state.currentSection === 0} />;
  },
  CategoryContent: () => {
    const { state } = useMainContext();
    return <CategoryContent show={state.currentSection === 1} />;
  },
  ProfileContent: () => {
    const { state } = useMainContext();
    return <ProfileContent show={state.currentSection === 2} />;
  },
  BlogContent: () => {
    const { state } = useMainContext();
    return <BlogContent show={state.currentSection === 3} data={state.posts} />;
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
