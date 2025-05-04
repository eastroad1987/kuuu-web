"use client";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

import { createContext, ReactNode } from "react";
import { useUrl } from "../hooks/useURL";

interface LayoutContextType {
  backgroundColor: string;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useUrl();
  const list = pathname.split("/");
  const isAdmin = list.includes("admin");
  const color = isAdmin ? "#000000" : "#FFFFFF";

  return (
    <LayoutContext.Provider value={{ backgroundColor: color }}>
      {children}
    </LayoutContext.Provider>
  );
};

Layout.displayName = "Layout";

function Content({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

interface LayoutHeaderProps {
  isSideMenuOpen?: boolean;
  toggleSideMenu?: () => void;
}

function LayoutHeader({ isSideMenuOpen, toggleSideMenu }: LayoutHeaderProps) {
  return (
    <Header isSideMenuOpen={isSideMenuOpen} toggleSideMenu={toggleSideMenu} />
  );
}

function LayoutFooter() {
  return <Footer />;
}

Layout.Header = LayoutHeader;
Layout.Content = Content;
Layout.Footer = LayoutFooter;

export default Layout;