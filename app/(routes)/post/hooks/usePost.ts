import { useGetPostById } from "@/libs/api";
import { PostPageState } from "@/types/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setBackgroundColor } from "../../../redux/reducer";

export default function usePost(id: string) {
  const dispatch = useAppDispatch();

  const { data: post, isLoading, isError, refetch } = useGetPostById(id);

  const initialState: PostPageState = {
    id: id,
    boardName: "",
    title: post?.title || "",
    color: "",
    date: post?.created_at || new Date(),
    post: post || null,
    isOpen: false,
  };
  const [state, setState] = useState<PostPageState>(initialState);

  const updateState = (updates: Partial<PostPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (post) {
      const boardName = `${post.category.title} - ${post.subcategory.title}`;
      const categoryId = post.category.id - 1;
      const color =
        categoryId === 0
          ? "#FCC018"
          : categoryId === 1
            ? "#0B3B10"
            : categoryId === 2
              ? "#0F2355"
              : "#D62C28";
      updateState({
        boardName: boardName,
        color: color,
        title: post?.title || "",
        date: post?.created_at || new Date(),
        post: post || null,
      });
      dispatch(setBackgroundColor(color));
    }
  }, [post]);

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
