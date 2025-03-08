"use client";

import { Suspense } from "react";

import { useUrl } from "../hooks/useURL";
import Layout from "./LayoutContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useUrl();
  // console.log("[MainLayout] pathname: ", pathname);
  const list = pathname.split("/");
  const id = list.pop();
  const isPost = list.includes("post");
  const isAdmin = list.includes("admin");
  const color = isPost
    ? id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28"
    : isAdmin
      ? "#000000"
      : "#FFFFFF";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout backgroundColor={color}>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Suspense>
  );
};

export default MainLayout;
