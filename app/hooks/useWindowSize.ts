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

  return {
    width: windowSize.width,
    height: windowSize.height,
    isTablet: windowSize.width < 768,
    isMobile: windowSize.width < 576,
  };
};

export default useWindowSize;
