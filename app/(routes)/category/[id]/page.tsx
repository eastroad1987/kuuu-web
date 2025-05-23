"use client";

import useCategory from "../hooks/useCategory";
import CategoryLayout from "../context/CategoryLayout";
import CategoryComponents from "../components/CategoryPage";

interface PageProps {
  id: string;
}

const CategoryPage = ({ params }: { params: PageProps }) => {
  const { id } = params;
  const useCategoryHook = useCategory(id);

  return (
    <CategoryLayout value={useCategoryHook}>
      <CategoryComponents.Container>
        <CategoryComponents.Header />
        <CategoryComponents.Boards />
        <CategoryComponents.Posts />
        <CategoryComponents.SideMenu />
      </CategoryComponents.Container>
    </CategoryLayout>
  );
};

export default CategoryPage;
