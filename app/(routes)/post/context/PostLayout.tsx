"use client";

import { memo } from "react";
import { PostProvider, UsePostType } from "./PostContext";

interface PostLayoutProps {
  children: React.ReactNode;
  value: UsePostType;
}

const PostLayout = memo(({ children, value }: PostLayoutProps) => {
  return <PostProvider value={value}>{children}</PostProvider>;
});

export default PostLayout;

