import { MainPageState } from "@/types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGetCategories, useGetPostsByPeriod } from "../../../lib/api/apis";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";

export default function useHome() {
  const { isMobile, height } = useWindowSize();

  const limitPages = 4;
  const { currentSection } = useScrollSections({
    totalSections: limitPages,
    animationDuration: 1500,
  });

  const dispatch = useAppDispatch();
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
      isMobile,
      isOpen: false,
      timerRef: null,
      maxVisibleBlogs: 5,
      visibleBlogs: [],
      arrayIndex: [],
      currentIndex: -1,
      windowHeight: height,
      limit: limitPages,
      currentSection: 0,
      isScrolling: false,
      posts: [],
      isHover: false,
      currentPostId: "",
      currentDate: new Date(),
      mounted: false,
    }),
    [limitPages, isMobile],
  );

  const [state, setState] = useState<MainPageState>(initialState);

  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  }, []);

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

  useEffect(() => {
    if (state.currentDate) {
      const start = new Date(state.currentDate);
      start.setDate(start.getDate() - 14);
      start.setHours(0, 0, 0, 0);

      const end = new Date(state.currentDate);
      end.setDate(end.getDate() + 14);
      end.setHours(23, 59, 59, 999);

      setStartDate(start.toISOString());
      setEndDate(end.toISOString());
    }
  }, [state.currentDate]);

  useEffect(() => {
    if (posts?.data) {
      updateState({
        posts: posts.data as any,
        visibleBlogs: posts?.data as any,
      });
    }
  }, [posts, updateState]);

  const handlers = {
    onPageChange: useCallback(
      (page: number) => {
        updateState({ currentSection: page });
      },
      [updateState],
    ),
    onSelected: useCallback(
      (postId: string) => {
        updateState({ currentPostId: postId });
      },
      [updateState],
    ),
    onSelectedDate: useCallback(
      (date: Date) => {
        updateState({ currentDate: date });
      },
      [updateState],
    ),
    onChangeDate: useCallback(
      (date: Date) => {
        updateState({ currentDate: date });
      },
      [updateState],
    ),
    onSideMenuClose: useCallback(() => {
      updateState({ isOpen: false });
    }, [updateState]),
    toggleSideMenu: useCallback(() => {
      updateState({ isOpen: !state.isOpen });
    }, [updateState, state.isOpen]),
    onEnter: useCallback(() => {
      updateState({ isHover: true });
    }, [updateState]),
    onLeave: useCallback(() => {
      updateState({ isHover: false });
    }, [updateState]),
    getCardStyle: useCallback(
      (arrayIndex: number) => {
        if (state.isMobile) {
          // 모바일에서는 애니메이션 없이 기본 스타일
          return {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            yOffset: 0,
            zIndex: 1,
          };
        }
        let scale = 1;
        let blur = 0;
        let yOffset = 0;
        let zIndex = 0;

        // 윈도우 높이를 기준으로 오프셋 계산
        const baseOffset = height * 0.2; // 10% 단위로 계산
        if (arrayIndex === 0 || arrayIndex === 4) {
          scale = 0.6;
          yOffset = arrayIndex === 0 ? 0 : baseOffset * 4;
          blur = 1;
          zIndex = 1;
        } else if (arrayIndex === 1 || arrayIndex === 3) {
          scale = 0.8;
          blur = 0.5;
          yOffset = arrayIndex === 1 ? baseOffset * 0.8 : baseOffset * 3.15;
          zIndex = 2;
        } else {
          scale = 1;
          blur = 0;
          yOffset = baseOffset * 2;
          zIndex = 3;
        }

        const cardStyle = {
          scale,
          filter: `blur(${blur}px)`,
          opacity: 1,
          yOffset,
          zIndex,
        };

        return cardStyle;
      },
      [],
    ),
  };

  const status = {
    isLoading: isCategoriesLoading || isPostsLoading,
    isError: isCategoriesError || isPostsError,
  };

  return {
    state,
    updateState,
    handlers,
    status,
  };
}
