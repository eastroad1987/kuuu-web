"use client";
import { Suspense } from "react";

import Layout from "./LayoutContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default MainLayout;
