import { useGetCategories, useGetPosts, useGetPostsByPeriod } from "@/libs/api";
import { MainPageState } from "@/types/types";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getMonthPeriod } from "@/libs/date";

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

  //   const {
  //     data: posts,
  //     isLoading: isPostsLoading,
  //   isError: isPostsError,
  // } = useGetPosts({ start: 1, limit: 99999 });

  // 초기 상태 메모이제이션
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

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetPostsByPeriod(
    getMonthPeriod(state.currentDate).start.toDateString(),
    getMonthPeriod(state.currentDate).end.toDateString(),
  );

  // updateState 함수 메모이제이션
  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  }, []);

  // 클라이언트 사이드 초기화
  useEffect(() => {
    const handleResize = () =>
      updateState({ windowHeight: window.innerHeight });
    updateState({ windowHeight: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 데이터가 변경되면 인덱스 배열 초기화
  useEffect(() => {
    updateState({ arrayIndex: state.arrayIndex });
  }, [state.arrayIndex]);

  // 아이템 순환 타이머 로직
  useEffect(() => {
    if (posts && posts.length <= 0 || state.currentIndex < 0) return;
    const timer = setInterval(() => {
      if (posts && state.currentIndex < posts.length) {
        let newItems = [...state.visibleBlogs, state.currentIndex];
        if (newItems.length > state.maxVisibleBlogs) {
          newItems = newItems.slice(1);
        }
        updateState({
          visibleBlogs: newItems,
          currentIndex: state.currentIndex + 1,
        });
      } else {
        updateState({ currentIndex: 0 });
      }
    }, 1200); // 시간 간격 증가
    return () => clearInterval(timer);
  }, [state.currentIndex]);

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
      updateState({ posts, currentIndex: 0 });
    }
  }, [posts, state.posts, updateState]);

  // handlers 함수들을 개별 useCallback으로 분리
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
    },
    [updateState],
  );

  const handleSelectedDate = useCallback(
    (date: Date) => {
      updateState({ currentDate: date });
    },
    [updateState],
  );

  // handlers 객체 구성
  const handlers = {
    onPageChange: handlePageChange,
    onSelected: handleSelected,
    onSelectedDate: handleSelectedDate,
    onChangeDate: handleChangeDate,
  };

  // 관련 상태들 메모이제이션
  const status = useMemo(
    () => ({
      isLoading: isPostsLoading || isCategoriesLoading,
      isError: isPostsError || isCategoriesError,
    }),
    [isPostsLoading, isCategoriesLoading, isPostsError, isCategoriesError],
  );

  return {
    state,
    updateState,
    handlers,
    status,
  };
}
