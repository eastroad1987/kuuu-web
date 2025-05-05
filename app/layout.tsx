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
  display: "swap",
  preload: true,
});

export const youngest = localFont({
  src: "../public/fonts/Youngest.woff",
  display: "swap",
  preload: true,
});

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Kuuu's Blog",
  description: "Japanese in Korea.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="jp" className={`${shipporiMincho.className} ${youngest.className}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
          <ReactQueryProviders>
            <ReduxProvider>
              <AuthProvider>
                <AxiosProvider>
                  <main>
                    {children}
                  </main>
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
