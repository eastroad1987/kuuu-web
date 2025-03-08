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
      <div className="scrollbar-none mt-0 flex h-screen w-full flex-col items-stretch justify-start overflow-y-auto" style={{ backgroundColor }}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

function Content({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 w-full">{children}</div>;
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
