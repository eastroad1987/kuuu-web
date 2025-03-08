import { useGetPostById } from "@/libs/api";
import { PostPageState } from "@/types/types";
import { useState } from "react";

export default function usePost(id: string) {

  const board =
    id === "0"
      ? "MUSICAL&MOVIE"
      : id === "1"
        ? "LIFE"
        : id === "2"
          ? "CAFE&RESTAURANT"
          : "SIGHTSEEING";
  const color =
    id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28";
  const { data: post } = useGetPostById(id);
  
  const initialState: PostPageState = {
    id: id,
    boardName: board,
    title: post?.title || "",
    color: color,
    date: post?.created_at || new Date(),
    post: post || null,
    isOpen: false,
  };
  const [state, setState] = useState<PostPageState>(initialState);

  const updateState = (updates: Partial<PostPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };
  
  const handlers = {
    toggleSideMenu: () => {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
    },
    onSideMenuClose: () => {
      setState((prevState) => ({ ...prevState, isOpen: false }));
    },
  };

  return {
    state,
    updateState,
    handlers,
  };
}
