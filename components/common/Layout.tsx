"use client";
import Footer from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";

import { createContext, ReactNode } from "react";

interface LayoutContextType {
  isScrollable: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  isScrollable?: boolean;
}

const Layout = ({ children, isScrollable = true }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{ isScrollable }}>
      <div className="scrollbar-none mt-0 flex h-screen w-full flex-col items-stretch justify-start overflow-y-auto bg-white">
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

function LayoutSideMenu() {
  return (
    <SideMenu
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}

function LayoutFooter() {
  return <Footer />;
}

Layout.Header = LayoutHeader;
Layout.Content = Content;
Layout.SideMenu = LayoutSideMenu;
Layout.Footer = LayoutFooter;

export default Layout;
