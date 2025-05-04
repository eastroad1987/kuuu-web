import { PostPageState } from "@/types/types";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setBackgroundColor } from "../../../redux/reducer";
import { useGetPostById } from "../../../lib/api/apis";

export default function usePost(id: string) {
  const dispatch = useAppDispatch();

  const { data: postResponse, isLoading, isError, refetch } = useGetPostById(id);
  const post = postResponse?.data;

  // 초기 상태 메모이제이션
  const initialState = useMemo<PostPageState>(() => ({
    id: id,
    boardName: "",
    title: post?.title || "",
    color: "",
    date: post?.created_at || new Date(),
    post: post || null,
    isOpen: false,
  }), [id, post]);

  const [state, setState] = useState<PostPageState>(initialState);

  // updateState 함수 메모이제이션
  const updateState = useCallback((updates: Partial<PostPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  // 카테고리 ID에 따른 색상 결정 함수 메모이제이션
  const getCategoryColor = useCallback((categoryId: number) => {
    return categoryId === 0
      ? "#FCC018"
      : categoryId === 1
        ? "#0B3B10"
        : categoryId === 2
          ? "#0F2355"
          : "#D62C28";
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (post) {
      const boardName = `${post.category.title} - ${post.subcategory.title}`;
      const categoryId = post.category.id - 1;
      const color = getCategoryColor(categoryId);
      
      updateState({
        boardName: boardName,
        color: color,
        title: post?.title || "",
        date: post?.created_at || new Date(),
        post: post || null,
      });
      
      dispatch(setBackgroundColor(color));
    }
  }, [post, updateState, getCategoryColor, dispatch]);

  // handlers 함수들을 개별 useCallback으로 분리
  const handleToggleSideMenu = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }, [updateState]);
  
  const handleSideMenuClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, [updateState]);

  // handlers 객체 구성
  const handlers = {
    toggleSideMenu: handleToggleSideMenu,
    onSideMenuClose: handleSideMenuClose,
  };

  return {
    state,
    updateState,
    handlers,
    isLoading,
    isError
  };
}
