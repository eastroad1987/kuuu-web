"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  style?: React.CSSProperties;
}

/**
 * SafeArea component provides a safe area for mobile devices with notches and home indicators
 * Similar to React Native's SafeAreaView
 *
 * @param children - React children to render inside the safe area
 * @param className - Additional class names to apply
 * @param top - Whether to apply safe area at the top (default: true)
 * @param bottom - Whether to apply safe area at the bottom (default: true)
 * @param left - Whether to apply safe area on the left (default: true)
 * @param right - Whether to apply safe area on the right (default: true)
 * @param style - Additional inline styles to apply
 */
const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  className = "",
  top = true,
  bottom = true,
  left = true,
  right = true,
  style = {},
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only apply safe area styles after component has mounted (client-side)
  // This prevents hydration mismatch errors
  if (!hasMounted) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={classNames(className, {
        "pt-safe": top,
        "pb-safe": bottom,
        "pl-safe": left,
        "pr-safe": right,
      })}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SafeArea;
