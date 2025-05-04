"use client";
import { Suspense } from "react";

import Layout from "./LayoutContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Suspense>
  );
};

export default MainLayout;