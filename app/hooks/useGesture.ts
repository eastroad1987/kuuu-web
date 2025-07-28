import { useRef, useCallback } from "react";
import type { TouchEvent, MouseEvent } from "react";

export interface GestureOptions {
  minSwipeDistance?: number;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export interface GestureHandlers {
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchEnd: (e: TouchEvent) => void;
  handleMouseDown?: (e: MouseEvent) => void;
  handleMouseUp?: (e: MouseEvent) => void;
}

/**
 * Custom hook for handling touch and mouse gestures
 * @param options - Configuration options for gesture handling
 * @returns Gesture event handlers
 */
export const useGesture = (options: GestureOptions = {}): GestureHandlers => {
  const {
    minSwipeDistance = 50,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
  } = options;

  // Touch gesture refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);

  // Mouse gesture refs (for desktop testing)
  const mouseStartXRef = useRef<number | null>(null);
  const mouseStartYRef = useRef<number | null>(null);
  const isMouseDownRef = useRef<boolean>(false);

  /**
   * Determine swipe direction and trigger appropriate callback
   */
  const processGesture = useCallback(
    (startX: number, startY: number, endX: number, endY: number) => {
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Check if the swipe distance is significant enough
      const isSignificantSwipe = 
        absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance;

      if (!isSignificantSwipe) return;

      // Determine primary direction (vertical or horizontal)
      if (absDeltaY > absDeltaX) {
        // Vertical swipe
        if (deltaY > 0) {
          // Swiped up
          onSwipeUp?.();
        } else {
          // Swiped down
          onSwipeDown?.();
        }
      } else {
        // Horizontal swipe
        if (deltaX > 0) {
          // Swiped left
          onSwipeLeft?.();
        } else {
          // Swiped right
          onSwipeRight?.();
        }
      }
    },
    [minSwipeDistance, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight]
  );

  /**
   * Handle touch start event
   */
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  }, []);

  /**
   * Handle touch end event
   */
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) {
        return;
      }

      const touch = e.changedTouches[0];
      touchEndXRef.current = touch.clientX;
      touchEndYRef.current = touch.clientY;

      processGesture(
        touchStartXRef.current,
        touchStartYRef.current,
        touchEndXRef.current,
        touchEndYRef.current
      );

      // Reset touch values
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      touchEndXRef.current = null;
      touchEndYRef.current = null;
    },
    [processGesture]
  );

  /**
   * Handle mouse down event (for desktop testing)
   */
  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseStartXRef.current = e.clientX;
    mouseStartYRef.current = e.clientY;
    isMouseDownRef.current = true;
  }, []);

  /**
   * Handle mouse up event (for desktop testing)
   */
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (
        !isMouseDownRef.current ||
        mouseStartXRef.current === null ||
        mouseStartYRef.current === null
      ) {
        return;
      }

      processGesture(
        mouseStartXRef.current,
        mouseStartYRef.current,
        e.clientX,
        e.clientY
      );

      // Reset mouse values
      mouseStartXRef.current = null;
      mouseStartYRef.current = null;
      isMouseDownRef.current = false;
    },
    [processGesture]
  );

  return {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
};

/**
 * Hook specifically for vertical navigation (up/down swipes)
 */
export const useVerticalGesture = (
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  minSwipeDistance = 50
) => {
  return useGesture({
    minSwipeDistance,
    onSwipeUp,
    onSwipeDown,
  });
};

/**
 * Hook specifically for horizontal navigation (left/right swipes)
 */
export const useHorizontalGesture = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  minSwipeDistance = 50
) => {
  return useGesture({
    minSwipeDistance,
    onSwipeLeft,
    onSwipeRight,
  });
};
