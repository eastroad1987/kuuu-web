import { MainPageState } from "@/types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGetCategories, useGetPostsByPeriod } from "../../../lib/api/apis";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";
import { useRouter } from "next/navigation";

export default function useHome() {
  const { isMobile, height } = useWindowSize();

  const router = useRouter();

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
      isRotating: false,
      rotationInterval: null,
    }),
    [limitPages, isMobile, height],
  );

  const [state, setState] = useState<MainPageState>(initialState);

  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev: MainPageState) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  // Add a client-side only flag to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  
  // This effect runs only once after client-side hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    updateState({ currentSection });

    // Auto-rotate cards when in blog section - only run on client side
    if (isClient && currentSection === 3) {
      // Start rotation when entering blog section
      updateState({ isRotating: true });
    } else if (isClient && state.isRotating) {
      // Stop rotation when leaving blog section
      if (state.rotationInterval) {
        clearInterval(state.rotationInterval);
      }
      updateState({
        isRotating: false,
        rotationInterval: null,
      });
    }
  }, [currentSection, updateState, state.isRotating, state.rotationInterval, isClient]);

  // Rotate cards every 3 seconds when rotation is active
  useEffect(() => {
    // Only run rotation on client side after hydration
    if (isClient && state.isRotating) {
      const rotationTimer = setInterval(() => {
        // Rotate the cards by shifting the first visible blog to the end
        if (state.visibleBlogs.length > 0) {
          const newVisibleBlogs = [...state.visibleBlogs];
          const firstItem = newVisibleBlogs.shift();
          if (firstItem) {
            newVisibleBlogs.push(firstItem);
            updateState({ visibleBlogs: newVisibleBlogs });
          }
        }
      }, 3000); // Rotate every 3 seconds

      return () => {
        clearInterval(rotationTimer);
      };
    }
    }, [isClient, state.isRotating, state.visibleBlogs, updateState]);

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

  // We've consolidated the rotation logic in the useEffect above

  const handlers = {
    startRotation: useCallback(() => {
      updateState({ isRotating: true });
    }, [updateState]),

    stopRotation: useCallback(() => {
      if (state.rotationInterval) {
        clearInterval(state.rotationInterval);
      }
      updateState({
        isRotating: false,
        rotationInterval: null,
      });
    }, [state.rotationInterval, updateState]),

    toggleRotation: useCallback(() => {
      if (state.isRotating) {
        if (state.rotationInterval) {
          clearInterval(state.rotationInterval);
        }
        updateState({
          isRotating: false,
          rotationInterval: null,
        });
      } else {
        updateState({ isRotating: true });
      }
    }, [state.isRotating, state.rotationInterval, updateState]),
    onPageChange: useCallback(
      (page: number) => {
        updateState({ currentSection: page });
      },
      [updateState],
    ),
    onSelected: useCallback(
      (postId: string) => {
        updateState({ currentPostId: postId });
        router.push(`/post/${postId}`);
      },
      [updateState, router],
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
          // For mobile, we want the cards to be centered and animate from bottom to top
          // Only the first card is fully visible, others are positioned below for animation
          if (arrayIndex === 0) {
            return {
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
              yOffset: 0,
              zIndex: 10,
              rotation: 0,
            };
          } else {
            // Position other cards below the viewport for bottom-to-top animation
            return {
              scale: 0.95,
              filter: "blur(1px)",
              opacity: 0.8,
              yOffset: height ? height * 0.5 : 300, // Position below the viewport
              zIndex: 1,
              rotation: 0,
            };
          }
        } else {
          let scale, blur, opacity, yOffset, zIndex, rotation;
          const baseOffset = height ? height * 0.05 : 30;
          if (arrayIndex === 0) {
            // Front card
            scale = 1;
            blur = 0;
            opacity = 1;
            yOffset = 0;
            zIndex = 10;
            rotation = 0;
          } else if (arrayIndex === 1) {
            // Second card
            scale = 0.9;
            blur = 1.5;
            opacity = 0.8;
            yOffset = baseOffset * 1.5;
            zIndex = 9;
            rotation = -1;
          } else if (arrayIndex === 2) {
            // Third card
            scale = 0.8;
            blur = 3;
            opacity = 0.6;
            yOffset = baseOffset * 3;
            zIndex = 8;
            rotation = 1;
          } else {
            // Other cards
            scale = Math.max(0.7, 0.75 - (arrayIndex - 3) * 0.05);
            blur = arrayIndex * 1.5;
            opacity = Math.max(0.3, 0.5 - (arrayIndex - 3) * 0.1);
            yOffset = baseOffset * (3 + arrayIndex * 0.5);
            zIndex = 7 - (arrayIndex - 3);
            rotation = (arrayIndex % 2 === 0 ? -1 : 1) * (1 + arrayIndex * 0.2);
          }
          return {
            scale,
            filter: `blur(${blur}px)`,
            opacity,
            yOffset,
            zIndex,
            rotation,
          };
        }
      },
      [state.isMobile, height],
    ),
  };

  // We'll use state properties for loading and error status
  const status = {
    isLoading: false, // Replace with actual loading state when API integration is done
    isError: false, // Replace with actual error state when API integration is done
  };

  return {
    state,
    updateState,
    handlers,
    status,
  };
}
