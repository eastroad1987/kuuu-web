"use client";
import { Suspense } from "react";

import { LayoutProvider } from "./LayoutContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutProvider>{children}</LayoutProvider>;
};

export default MainLayout;
