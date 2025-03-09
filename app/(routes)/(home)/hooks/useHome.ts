import { useGetCategories, useGetPosts } from "@/libs/api";
import { MainPageState } from "@/types/types";
import { useEffect, useState } from "react";
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

  const initialState: MainPageState = {
    limit: limitPages,
    currentSection: 0,
    isScrolling: false,
    posts: [],
  };

  const [state, setState] = useState<MainPageState>(initialState);

  const updateState = (updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, []);

  useEffect(() => {
    updateState({ currentSection: currentSection });
  }, [currentSection]);

  useEffect(() => {
    if (!list || list.length === 0) {
      dispatch(setCategories(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      updateState({ posts: posts });
    }
  }, [posts]);

  const handlers = {
    onPageChange: (page: number) => {
      updateState({ currentSection: page });
    },
  };
  return {
    state,
    updateState,
    handlers,
  };
}
