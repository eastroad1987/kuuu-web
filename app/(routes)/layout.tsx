"use client";

import Layout from "@/components/common/Layout";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  // const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // const toggleSideMenu = () => {
  //   setIsSideMenuOpen(!isSideMenuOpen);
  // };

  return (
    <Layout>
      {/* {isSideMenuOpen && <Layout.SideMenu />} */}
      <Layout.Header
        // isSideMenuOpen={isSideMenuOpen}
        // toggleSideMenu={toggleSideMenu}
      />
      <Layout.Content>{children}</Layout.Content>
      {/* <Layout.Footer /> */}
    </Layout>
  );
};

export default MainLayout;
