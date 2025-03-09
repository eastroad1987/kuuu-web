"use client";

import SideMenu from "@/components/common/SideMenu";
import { usePostContext } from "../context/PostContext";
import PostHeader from "./Header";
import PostContent from "./Post";

const PostComponents = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { state } = usePostContext();
    return (
      <div
        className="flex h-screen w-full flex-col items-center justify-start"
        style={{ backgroundColor: state.color }}
      >
        <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start">
          {children}
        </div>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = usePostContext();
    return (
      <PostHeader
        toggleSideMenu={handlers.toggleSideMenu}
        boardName={state.boardName}
        title={state.title}
        color={state.color}
        date={state.date}
      />
    );
  },
  SideMenu: () => {
    const { state, handlers } = usePostContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
  Post: () => {
    const { state } = usePostContext();
    return <PostContent post={state.post} />;
  },
};

export default PostComponents;
