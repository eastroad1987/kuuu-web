import { useState, useEffect } from 'react';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
    isLandscape: false,
    width: 0,
    height: 0,
    deviceType: 'desktop',
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      const isLandscape = width > height;

      // Device type detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Enhanced device detection with user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isTabletDevice = /tablet|ipad|ipad pro|ipad air|ipad mini|playbook|silk|(android(?!.*mobile))/i.test(userAgent);
      
      // Override tablet detection for actual tablet devices
      const finalIsTablet = isTabletDevice || (isTablet && !isMobile);
      const finalIsMobile = isMobile && !isTabletDevice;
      const finalIsDesktop = isDesktop && !isTabletDevice;

      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (finalIsMobile) deviceType = 'mobile';
      else if (finalIsTablet) deviceType = 'tablet';

      setState({
        isMobile: finalIsMobile,
        isTablet: finalIsTablet,
        isDesktop: finalIsDesktop,
        isPortrait,
        isLandscape,
        width,
        height,
        deviceType,
      });
    };

    // Initial call
    updateResponsiveState();

    // Event listeners
    window.addEventListener('resize', updateResponsiveState);
    window.addEventListener('orientationchange', updateResponsiveState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return state;
};

export default useResponsive;
