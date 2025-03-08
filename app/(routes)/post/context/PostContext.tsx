"use client";

import { createContext, memo, useContext } from "react";
import { UsePostType } from "@/types/types";

const PostContext = createContext<UsePostType | undefined>(undefined);

interface PostProviderProps {
  children: React.ReactNode;
  value: UsePostType;
}

function PostProvider({ children, value }: PostProviderProps): JSX.Element {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePostContext(): UsePostType {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post compound components must be used within Post");
  }
  return context;
}

export { PostProvider, usePostContext };
export type { UsePostType, PostProviderProps };
