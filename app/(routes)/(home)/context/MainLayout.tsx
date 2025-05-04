"use client";

import { memo } from "react";
import { MainProvider, UseMainType } from "./MainContext";

interface MainLayoutProps {
  children: React.ReactNode;
  value: UseMainType;
}

const MainLayout = memo(({ children, value }: MainLayoutProps) => {
  return <MainProvider value={value}>{children}</MainProvider>;
});

MainLayout.displayName = "MainLayout";

export default MainLayout;
