"use client";

import { UseMainType } from "@/types/types";
import { createContext, useContext } from "react";

const MainContext = createContext<UseMainType | undefined>(undefined);

interface MainProviderProps {
  children: React.ReactNode;
  value: UseMainType;
}

function MainProvider({ children, value }: MainProviderProps): JSX.Element {
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

function useMainContext(): UseMainType {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("Main compound components must be used within Main");
  }
  return context;
}

export { MainProvider, useMainContext };
export type { MainProviderProps, UseMainType };

