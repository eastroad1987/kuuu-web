import { MainPageState } from "@/types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import { useGetCategories, useGetPostsByPeriod } from "../../../lib/api/apis";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";

import { useRouter } from "next/navigation";

export default function useHome() {
  const limitPages = 4;
  const { currentSection } = useScrollSections({
    totalSections: limitPages,
    animationDuration: 1500,
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const categoriesList = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
  } = useGetPostsByPeriod(startDate, endDate);

  const initialState = useMemo<MainPageState>(
    () => ({
      timerRef: null,
      maxVisibleBlogs: 5,
      visibleBlogs: [],
      arrayIndex: [],
      currentIndex: -1,
      windowHeight: 0,
      limit: limitPages,
      currentSection: 0,
      isScrolling: false,
      posts: [],
      currentPostId: "",
      currentDate: new Date(),
    }),
    [limitPages],
  );

  const [state, setState] = useState<MainPageState>(initialState);

  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const handleResize = () =>
      updateState({ windowHeight: window.innerHeight });
    updateState({ windowHeight: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateState]);

  useEffect(() => {
    updateState({ arrayIndex: state.arrayIndex });
  }, [state.arrayIndex, updateState]);

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  useEffect(() => {
    updateState({ currentSection });
  }, [currentSection, updateState]);

  useEffect(() => {
    if (categories?.data && (!categoriesList || categoriesList.length === 0)) {
      dispatch(setCategories(categories.data));
    }
  }, [categories, categoriesList, dispatch]);

  // 날짜 변경 시 포스트 데이터 업데이트
  useEffect(() => {
    if (state.currentDate) {
      const start = new Date(state.currentDate);
      start.setDate(start.getDate() - 14); // 2주 전
      start.setHours(0, 0, 0, 0);

      const end = new Date(state.currentDate);
      end.setDate(end.getDate() + 14); // 2주 후
      end.setHours(23, 59, 59, 999);

      setStartDate(start.toISOString());
      setEndDate(end.toISOString());
    }
  }, [state.currentDate]);

  // 포스트 데이터 업데이트
  useEffect(() => {
    if (posts?.data) {
      updateState({
        posts: posts.data as any,
        visibleBlogs: posts.data as any,
      });
    }
  }, [posts, updateState]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateState({ currentSection: page });
    },
    [updateState],
  );

  const handleChangeDate = useCallback(
    (date: Date) => {
      updateState({ currentDate: date });
    },
    [updateState],
  );

  const handleSelected = useCallback(
    (postId: string) => {
      updateState({ currentPostId: postId });
      router.push(`/post/${postId}`);
    },
    [updateState],
  );

  const handleSelectedDate = useCallback(
    (date: Date) => {
      updateState({ currentDate: date });
    },
    [updateState],
  );

  const handlers = useMemo(
    () => ({
      onPageChange: handlePageChange,
      onSelected: handleSelected,
      onSelectedDate: handleSelectedDate,
      onChangeDate: handleChangeDate,
    }),
    [handlePageChange, handleSelected, handleSelectedDate, handleChangeDate],
  );

  const status = useMemo(
    () => ({
      isLoading: isCategoriesLoading || isPostsLoading,
      isError: isCategoriesError || isPostsError,
    }),
    [isCategoriesLoading, isPostsLoading, isCategoriesError, isPostsError],
  );

  return {
    state,
    updateState,
    handlers,
    status,
  };
}
