"use client";

import React, { useEffect } from "react";
import { initSafeAreaInsets, setupViewport } from "../../utils/safeArea";

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

/**
 * SafeAreaProvider initializes safe area insets for the application
 * Place this at the root level of your application
 */
const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  useEffect(() => {
    // Set up viewport meta tag for safe area
    setupViewport();

    // Initialize safe area insets
    initSafeAreaInsets();
  }, []);

  return <>{children}</>;
};

export default SafeAreaProvider;
