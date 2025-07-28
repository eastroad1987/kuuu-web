"use client";
import { memo } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import SafeArea from "./SafeArea";

interface ResponsiveWrapperProps {
  WebComponent: React.ComponentType<any>;
  MobileComponent: React.ComponentType<any>;
  props?: any;
}

const ResponsiveWrapper = memo(
  ({ WebComponent, MobileComponent, props = {} }: ResponsiveWrapperProps) => {
    const { isTablet } = useWindowSize();

    return isTablet ? (
      <SafeArea className="flex h-full flex-col bg-white">
        <MobileComponent {...props} />
      </SafeArea>
    ) : (
      <WebComponent {...props} />
    );
  },
);

ResponsiveWrapper.displayName = "ResponsiveWrapper";

export default ResponsiveWrapper;
