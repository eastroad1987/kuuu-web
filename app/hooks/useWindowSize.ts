import { useState, useEffect } from "react";

// https://stackoverflow.com/questions/63406435/how-to-detect-window-size-in-next-js-ssr-using-react-hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
    }
    globalThis.addEventListener("resize", handleResize);
    handleResize();
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  // CSS custom property for dynamic viewport height
  useEffect(() => {
    const updateVH = () => {
      const vh = globalThis.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    globalThis.addEventListener('resize', updateVH);
    globalThis.addEventListener('orientationchange', updateVH);
    
    return () => {
      globalThis.removeEventListener('resize', updateVH);
      globalThis.removeEventListener('orientationchange', updateVH);
    };
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isTablet: windowSize.width < 768,
    isMobile: windowSize.width < 576,
    // Helper functions for height fitting
    getFullHeight: () => windowSize.height,
    getViewportHeight: () => `${windowSize.height}px`,
    getDynamicVH: (percentage: number = 100) => `calc(var(--vh, 1vh) * ${percentage})`,
  };
};

export default useWindowSize;
