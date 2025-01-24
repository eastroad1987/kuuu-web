"use client";
import CategoryBoards from "@/app/category/components/Boards";
import CategoryHeader from "@/app/category/components/Header";
import CategoryPosts from "@/app/category/components/Posts";

import { createContext, ReactNode } from "react";
import { Board, Post, SubBoard } from "../../../types/types";

interface LayoutContextType {
  id: string;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  id?: string;
}

const CategoryLayout = ({ children, id = "0" }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{ id }}>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

interface HeaderInputProps {
  title: string;
  color: string;
}
function Header({ title, color }: HeaderInputProps) {
  return <CategoryHeader title={title} color={color} />;
}

interface BoardsInputProps {
  id: string;
  board: Board;
  subBoards: SubBoard[];
}
function Boards({ id, board, subBoards }: BoardsInputProps) {
  return <CategoryBoards id={id} board={board} subBoards={subBoards} />;
}

interface PostsInputProps {
  posts: Post[];
}
function Posts({ posts }: PostsInputProps) {
  return <CategoryPosts posts={posts} />;
}

CategoryLayout.Header = Header;
CategoryLayout.Boards = Boards;
CategoryLayout.Posts = Posts;

export default CategoryLayout;
