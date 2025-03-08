"use client";

import SideMenu from "@/components/common/SideMenu";
import { useCategoryContext } from "../context/CategoryContext";
import CategoryBoards from "./Boards";
import CategoryHeader from "./Header";
import CategoryPosts from "./Posts";

const CategoryComponents = {
  Container: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex h-full w-full flex-col items-center justify-start">
        <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start">
          {children}
        </div>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <CategoryHeader
        title={state.title || ""}
        color={state.color || ""}
        toggleSideMenu={handlers.toggleSideMenu}
      />
    );
  },
  Boards: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <CategoryBoards
        id={state.id || ""}
        board={state.currentBoard}
        currentSubBoard={state.currentSubBoard}
        subBoards={state.subBoards}
        onClickSubCategory={handlers.clickSubCategory}
      />
    );
  },
  Posts: () => {
    const { state } = useCategoryContext();
    return <CategoryPosts posts={state.posts} />;
  },
  SideMenu: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
};

export default CategoryComponents;
