"use client";

import Layout from "@/components/common/Layout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default MainLayout;
