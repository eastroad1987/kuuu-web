"use client";

import PostHeader from "@/app/post/components/Header";
import PostContent from "@/app/post/components/Post";
import { createContext, ReactNode } from "react";
import { Post } from "../../../types/entities";
import SideMenu from "@/components/common/SideMenu";

interface LayoutContextType {
  id: string;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  id?: string;
  color?: string;
}

const PostLayout = ({ children, id = "0", color }: LayoutProps) => {
  return (
    <LayoutContext.Provider value={{ id }}>
      <div className="flex h-full w-full flex-col items-center justify-start" style={{ backgroundColor: color }}>
        <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

interface HeaderInputProps {
  toggleSideMenu?: () => void;
  boardName: string;
  title: string;
  color: string;
  date: Date;
}
function Header({ toggleSideMenu, boardName, title, color, date }: HeaderInputProps) {
  return <PostHeader toggleSideMenu={toggleSideMenu} boardName={boardName} title={title} color={color} date={date}/>;
}


interface PostInputProps {
  post: Post;
}
function PostPage({ post }: PostInputProps) {
  return <PostContent post={post} />;
}

interface PostSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
function PostSideMenu({ isOpen, onClose }: PostSideMenuProps) {
  return (
    <SideMenu
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

PostLayout.Header = Header;
PostLayout.SideMenu = PostSideMenu;
PostLayout.Post = PostPage;

export default PostLayout;
