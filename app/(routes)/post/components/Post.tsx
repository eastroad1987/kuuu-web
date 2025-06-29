"use client";

import { memo } from "react";
import { PostProvider, UsePostType } from "../context/PostContext";
import MobileWrapper from "./Mobile";
import WebWrapper from "./Web";

interface PostProps {
  children: React.ReactNode;
  value: UsePostType;
}

const Post = memo(({ children, value }: PostProps) => {
  return <PostProvider value={value}>{children}</PostProvider>;
});

Post.displayName = "Post";

type PostComponentType = typeof Post & {
  Web: typeof WebWrapper;
  Mobile: typeof MobileWrapper;
};

const PostComponent = Post as PostComponentType;
PostComponent.Web = WebWrapper;
PostComponent.Mobile = MobileWrapper;

export default PostComponent;
