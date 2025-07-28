"use client";

import { createContext, useContext, ReactNode } from "react";
import useWindowSize from "../../hooks/useWindowSize";

interface HeightContextType {
  width: number;
  height: number;
  isTablet: boolean;
  isMobile: boolean;
  getFullHeight: () => number;
  getViewportHeight: () => string;
  getDynamicVH: (percentage?: number) => string;
}

const HeightContext = createContext<HeightContextType | undefined>(undefined);

export const useHeight = () => {
  const context = useContext(HeightContext);
  if (context === undefined) {
    throw new Error("useHeight must be used within a HeightProvider");
  }
  return context;
};

interface HeightProviderProps {
  children: ReactNode;
}

export default function HeightProvider({ children }: HeightProviderProps) {
  const windowSize = useWindowSize();

  return (
    <HeightContext.Provider value={windowSize}>
      {children}
    </HeightContext.Provider>
  );
}
