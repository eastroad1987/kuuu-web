"use client";

import { memo } from "react";
import { CategoryProvider, UseCategoryType } from "./CategoryContext";

interface CategoryLayoutProps {
  children: React.ReactNode;
  value: UseCategoryType;
}

const CategoryLayout = memo(({ children, value }: CategoryLayoutProps) => {
  return <CategoryProvider value={value}>{children}</CategoryProvider>;
});

export default CategoryLayout;

