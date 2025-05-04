'use client';

import { createContext, memo, useContext } from 'react';
import { UseMainType } from '@/types/types';

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
    throw new Error('Main compound components must be used within Main');
  }
  return context;
}

export { MainProvider, useMainContext };
export type { UseMainType, MainProviderProps };