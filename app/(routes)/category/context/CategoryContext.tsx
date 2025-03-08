'use client';

import { createContext, useContext } from 'react';
import { UseCategoryType } from '@/types/types';

const CategoryContext = createContext<UseCategoryType | undefined>(undefined);

interface CategoryProviderProps {
  children: React.ReactNode;
  value: UseCategoryType;
}

function CategoryProvider({ children, value }: CategoryProviderProps): JSX.Element {
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

function useCategoryContext(): UseCategoryType {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('Category compound components must be used within Category');
  }
  return context;
}

export { CategoryProvider, useCategoryContext };
export type { UseCategoryType, CategoryProviderProps };