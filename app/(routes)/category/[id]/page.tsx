"use client";

import ResponsiveWrapper from "@/components/common/ResponsiveWrapper";
import { Suspense } from "react";
import CategoryComponent from "../components/Category";
import useCategory from "../hooks/useCategory";

interface PageProps {
  id: string;
}

const CategoryPage = ({ params }: { params: PageProps }) => {
  const { id } = params;
  const useCategoryHook = useCategory(id);

  return (
    <CategoryComponent value={useCategoryHook}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
            지원 페이지 로딩 중...
          </div>
        }
      >
        <ResponsiveWrapper
          WebComponent={CategoryComponent.Web}
          MobileComponent={CategoryComponent.Mobile}
        />
      </Suspense>
    </CategoryComponent>
  );
};

export default CategoryPage;
