"use client";

import { memo } from "react";
import { CategoryProvider, UseCategoryType } from "../context/CategoryContext";
import MobileWrapper from "./Mobile";
import WebWrapper from "./Web";

interface CategoryProps {
  children: React.ReactNode;
  value: UseCategoryType;
}

const Category = memo(({ children, value }: CategoryProps) => {
  return <CategoryProvider value={value}>{children}</CategoryProvider>;
});

Category.displayName = "Category";

type CategoryComponentType = typeof Category & {
  Web: typeof WebWrapper;
  Mobile: typeof MobileWrapper;
};

const CategoryComponent = Category as CategoryComponentType;
CategoryComponent.Web = WebWrapper;
CategoryComponent.Mobile = MobileWrapper;

export default CategoryComponent;
