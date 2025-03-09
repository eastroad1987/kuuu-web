"use client";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

import { createContext, ReactNode } from "react";

interface LayoutContextType {
  backgroundColor: string;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  backgroundColor: string;
}

const Layout = ({ children, backgroundColor }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{ backgroundColor }}>
      {children}
    </LayoutContext.Provider>
  );
};

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
