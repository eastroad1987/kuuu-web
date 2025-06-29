"use client";

import { createContext, useContext } from "react";
import { useUrl } from "../hooks/useURL";

interface LayoutContextType {
  backgroundColor: string;
}
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: LayoutProviderProps): JSX.Element {
  const { pathname } = useUrl();
  const list = pathname.split("/");
  const isAdmin = list.includes("admin");
  const color = isAdmin ? "#000000" : "#FFFFFF";

  return (
    <LayoutContext.Provider value={{ backgroundColor: color }}>
      {children}
    </LayoutContext.Provider>
  );
}

function useLayoutContext(): LayoutContextType {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("Layout compound components must be used within Layout");
  }
  return context;
}

export { LayoutProvider, useLayoutContext };
export type { LayoutProviderProps };
