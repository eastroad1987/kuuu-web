import {
  CardData,
  MainPageState,
  PostCardData,
  postToCardData,
} from "../../../types/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useScrollSections } from "../../../hooks/useScrollSections";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGetCategories, useGetPostsByPeriod } from "../../../lib/api/apis";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBackgroundColor, setCategories } from "../../../redux/reducer";
import { useRouter } from "next/navigation";
import { Value } from "react-calendar/dist/cjs/shared/types";

/**
 * Custom hook for managing home page state and functionality
 * @returns Home page context with state and handlers
 */
export default function useHome() {
  const { height } = useWindowSize();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Constants
  const limitPages = 4;

  // Section scrolling
  const { currentSection } = useScrollSections({
    totalSections: limitPages,
    animationDuration: 1500,
  });

  // API data fetching
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories();

  const [startDate, setStartDate] = useState<string>("");

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
  } = useGetPostsByPeriod(startDate, "");

  // Initialize with sample card data, will be replaced with API data when available
  const initialState: MainPageState = {
    isMobile: false,
    isOpen: false,
    limit: limitPages,
    currentSection: 0,
    isHover: false,
    currentPostId: "",
    currentDate: new Date(),
    isRotating: false,
    windowHeight: height,
    cardHeight: height / 6 || 80,
    activeCardIndex: 0,
    cardData: [],
  };

  const [state, setState] = useState<MainPageState>(initialState);

  const updateState = useCallback((updates: Partial<MainPageState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    if (
      categories &&
      categories.data &&
      Array.isArray(categories.data) &&
      categories.data.length > 0
    ) {
      dispatch(setCategories(categories.data));
    }
  }, [categories]);

  // Update cardData when posts data is loaded from API
  useEffect(() => {
    if (
      posts &&
      posts.data &&
      Array.isArray(posts.data) &&
      posts.data.length > 0
    ) {
      // Convert API posts to CardData format
      const apiCardData = posts.data.map((post: any) =>
        postToCardData(post as PostCardData),
      );

      // 기존 샘플 데이터와 API 데이터 결합
      updateState({
        cardData: [...initialState.cardData, ...apiCardData],
      });
      console.log("Updated card data with API posts:", apiCardData.length);
    }
  }, [posts, updateState]);

  // Update card height when window height changes
  useEffect(() => {
    if (height !== 0) {
      updateState({
        windowHeight: height,
        cardHeight: height / 6 || 80,
      });
    }
  }, [height, updateState]);

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  // Separate effect for section changes
  useEffect(() => {
    // Update state when section changes
    updateState({ currentSection, isRotating: true });

    // Debug information
    console.log(`Section changed to: ${currentSection}`);

    // Auto-rotate cards when in blog section - only run on client side
    if (currentSection === 3) {
      console.log("In blog section (3), preparing to start rotation");
      if (state.isRotating) {
        const rotationTimer = setInterval(() => {
          // Rotate the cards by shifting the first visible blog to the end
          if (state.cardData && state.cardData.length > 0) {
            const nextIndex =
              (state.activeCardIndex - 1) % state.cardData.length;
            console.log(
              `Rotating card: ${state.activeCardIndex} → ${nextIndex}`,
            );
            updateState({
              activeCardIndex: nextIndex,
              isRotating: true,
            });
          }
        }, 3000); // Rotate every 3 seconds

        return () => {
          clearInterval(rotationTimer);
        };
      }
    }
    return undefined;
  }, [
    currentSection,
    state.isRotating,
    updateState,
    state.activeCardIndex,
    state.cardData,
  ]);

  const handlers = {
    onPageChange: useCallback(
      (page: number): void => {
        updateState({ currentSection: page });
      },
      [updateState],
    ),

    onSelected: useCallback(
      (postId: string): void => {
        console.log(postId);
        updateState({ currentPostId: postId });
        router.push(`/post/${postId}`);
      },
      [updateState, router],
    ),

    onSideMenuClose: useCallback((): void => {
      updateState({ isOpen: false });
    }, [updateState]),

    onEnter: useCallback((): void => {
      updateState({ isHover: true });
    }, [updateState]),

    onLeave: useCallback((): void => {
      updateState({ isHover: false });
    }, [updateState]),

    toggleSideMenu: useCallback((): void => {
      updateState({
        isOpen: !state.isOpen,
      });
    }, [updateState, state.isOpen]),

    /**
     * Handle calendar date change with proper typing
     * @param value - Value from react-calendar (Date | Date[] | [Date, Date] | null)
     * @param event - Optional mouse event from calendar
     */
    calendarChange: useCallback(
      (value: Value, event?: React.MouseEvent<HTMLButtonElement>): void => {
        if (value instanceof Date) {
          updateState({ currentDate: value });
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof Date
        ) {
          updateState({ currentDate: value[0] }); // Use the first date in the range
        }
      },
      [updateState],
    ),

    /**
     * Calculate the appropriate visual position for card display
     * Handles different layouts based on the number of available cards
     * @param index - Current card index
     * @param totalCards - Total number of cards
     * @returns Visual position (0-4) for card display
     */
    /**
     * Get the subset of cards that should be visible based on activeCardIndex
     * Always returns exactly 5 cards or fewer if total cards < 5
     * @returns Array of card data that should be visible
     */
    getVisibleCards: useCallback((): CardData[] => {
      if (!state.cardData) return [];

      const totalCards = state.cardData.length;
      if (totalCards <= 5) return state.cardData;

      // For more than 5 cards, return exactly 5 cards centered around activeCardIndex
      // Shows 2 cards before and 2 cards after the active card (total of 5 cards)
      const visibleCards: CardData[] = [];
      for (let offset = -2; offset <= 2; offset++) {
        // Calculate the actual index using modulo to wrap around
        // Add totalCards before taking modulo to handle negative indices
        const actualIndex =
          (state.activeCardIndex + offset + totalCards) % totalCards;
        visibleCards.push(state.cardData[actualIndex]);
      }

      return visibleCards;
    }, [state.activeCardIndex, state.cardData]),
  };

  // We'll use state properties for loading and error status
  const status = {
    isLoading: false, // Replace with actual loading state when API integration is done
    isError: false, // Replace with actual error state when API integration is done
  };

  // Return optimized object with all handlers consolidated
  return {
    state,
    updateState,
    handlers,
    status,
  };
}
