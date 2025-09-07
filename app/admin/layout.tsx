"use client";

import { AuthGuard } from "@/components/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AuthGuard requireAdmin={true}>
    //   {children}
    // </AuthGuard>
    <>{children}</>
  );
};

export default Layout;
