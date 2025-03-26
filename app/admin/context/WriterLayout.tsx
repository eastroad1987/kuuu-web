"use client";

import { memo } from "react";
import { WriterProvider, UseAdminWriterType } from "./WriterContext";

interface WriterLayoutProps {
  children: React.ReactNode;
  value: UseAdminWriterType;
}

const WriterLayout = memo(({ children, value }: WriterLayoutProps) => {
  return <WriterProvider value={value}>{children}</WriterProvider>;
});

WriterLayout.displayName = "WriterLayout";

export default WriterLayout;

