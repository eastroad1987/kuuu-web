'use client';

import { createContext, useContext } from 'react';
import { UseAdminWriterType } from '../types/types';

const WriterContext = createContext<UseAdminWriterType | undefined>(undefined);

interface WriterProviderProps {
  children: React.ReactNode;
  value: UseAdminWriterType;
}

function WriterProvider({ children, value }: WriterProviderProps): JSX.Element {
  return <WriterContext.Provider value={value}>{children}</WriterContext.Provider>;
}

function useWriterContext(): UseAdminWriterType {
  const context = useContext(WriterContext);
  if (!context) {
    throw new Error('Writer compound components must be used within Writer');
  }
  return context;
}

export { WriterProvider, useWriterContext };
export type { UseAdminWriterType, WriterProviderProps };