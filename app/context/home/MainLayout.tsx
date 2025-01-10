"use client";
import BlogContent from "@/app/components/BlogContent";
import CategoryContent from "@/app/components/CategoryContent";
import MainContent from "@/app/components/MainContent";
import ProfileContent from "@/app/components/ProfileContent";
import VerticalDots from "@/components/common/VerticalDots";

import { createContext, ReactNode } from "react";

interface LayoutContextType {
  currentSection: number;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  currentSection?: number;
}

const MainLayout = ({ children, currentSection = 0 }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{ currentSection }}>
      <div
        className="h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}%)` }}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

interface InputProps {
  show: boolean;
}

function Home({ show }: InputProps) {
  return <MainContent show={show} />;
}

function Category({ show }: InputProps) {
  return <CategoryContent show={show} />;
}

function Profile({ show }: InputProps) {
  return <ProfileContent show={show} />;
}

function Blogs({ show }: InputProps) {
  return <BlogContent show={show} />;
}

interface VerticalDotButtonsProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

function VerticalDotButtons({
  total,
  current,
  onPageChange,
}: VerticalDotButtonsProps) {
  return (
    <VerticalDots total={total} current={current} onPageChange={onPageChange} />
  );
}

MainLayout.Home = Home;
MainLayout.Category = Category;
MainLayout.Profile = Profile;
MainLayout.Blogs = Blogs;
MainLayout.Dots = VerticalDotButtons;

export default MainLayout;
