"use client";

import { Suspense } from "react";

import { useUrl } from "../hooks/useURL";
import Layout from "./LayoutContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useUrl();
  const list = pathname.split("/");
  const isAdmin = list.includes("admin");
  const color = isAdmin ? "#000000" : "#FFFFFF";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout backgroundColor={color}>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Suspense>
  );
};

export default MainLayout;
