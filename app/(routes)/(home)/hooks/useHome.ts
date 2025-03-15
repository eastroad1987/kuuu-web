import { useGetCategories, useGetPosts } from "@/libs/api";
import { MainPageState } from "@/types/types";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export default function useHome() {
  const limitPages = 4;
  const { currentSection } = useScrollSections({
    totalSections: limitPages,
    animationDuration: 1500,
  });

  const dispatch = useAppDispatch();
  const list = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories();

  // const { data: posts, isLoading: isPostsLoading, isError: isPostsError } = useGetPostsByPeriod(
  //   "2024-01-01",
  //   "2024-01-31",
  // );

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetPosts({ start: 1, limit: 99999 });

  // 초기 상태 메모이제이션
  const initialState = useMemo<MainPageState>(() => ({
    limit: limitPages,
    currentSection: 0,
    isScrolling: false,
    posts: [],
  }), [limitPages]);

  const [state, setState] = useState<MainPageState>(initialState);

  // updateState 함수 메모이제이션
  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  }, []);

  // 백그라운드 색상 설정 Effect
  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  // 현재 섹션 업데이트 Effect
  useEffect(() => {
    updateState({ currentSection });
  }, [currentSection, updateState]);

  // 카테고리 데이터 로딩 Effect
  useEffect(() => {
    if (categories && (!list || list.length === 0)) {
      dispatch(setCategories(categories));
    }
  }, [categories, list, dispatch]);

  // 포스트 데이터 로딩 Effect
  useEffect(() => {
    if (posts && (!state.posts || state.posts.length === 0)) {
      updateState({ posts });
    }
  }, [posts, state.posts, updateState]);

  // handlers 객체 메모이제이션
  const handlers = useMemo(() => ({
    onPageChange: (page: number) => {
      updateState({ currentSection: page });
    },
  }), [updateState]);

  // 관련 상태들 메모이제이션
  const status = useMemo(() => ({
    isLoading: isPostsLoading || isCategoriesLoading,
    isError: isPostsError || isCategoriesError,
  }), [isPostsLoading, isCategoriesLoading, isPostsError, isCategoriesError]);

  return {
    state,
    updateState,
    handlers,
    status,
  };
}
