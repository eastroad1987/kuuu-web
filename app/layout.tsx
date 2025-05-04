import type { Metadata } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "./components/auth/AuthProvider";
import AxiosProvider from "./components/provider/AxiosProvider";
import ReactQueryProviders from "./components/provider/QueryProvider";
import ReduxProvider from "./components/provider/redux";

import localFont from "next/font/local";

export const shipporiMincho = localFont({
  src: [
    {
      path: "../public/fonts/ShipporiMincho-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ShipporiMincho-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/ShipporiMincho-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/ShipporiMincho-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/ShipporiMincho-ExtraBold.ttf",
      weight: "800",
      style: "extrabold",
    },
  ],
});

export const youngest = localFont({
  src: "../public/fonts/Youngest.woff",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuuu's Blog",
  description: "Japanese in Korea.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="jp" className={`${shipporiMincho.className} ${youngest.className}`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProviders>
            <ReduxProvider>
              <AuthProvider>
                <AxiosProvider>
                  {children}
                  {modal}
                </AxiosProvider>
              </AuthProvider>
            </ReduxProvider>
          </ReactQueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
