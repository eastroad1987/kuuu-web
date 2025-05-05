import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "./components/auth/AuthProvider";
import AxiosProvider from "./components/provider/AxiosProvider";
import ReactQueryProviders from "./components/provider/QueryProvider";
import ReduxProvider from "./components/provider/redux";

import localFont from "next/font/local";

// export const shipporiMincho = localFont({
//   src: [
//     {
//       path: "../public/fonts/ShipporiMincho-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/ShipporiMincho-Medium.ttf",
//       weight: "500",
//       style: "medium",
//     },
//     {
//       path: "../public/fonts/ShipporiMincho-SemiBold.ttf",
//       weight: "600",
//       style: "semibold",
//     },
//     {
//       path: "../public/fonts/ShipporiMincho-Bold.ttf",
//       weight: "700",
//       style: "bold",
//     },
//     {
//       path: "../public/fonts/ShipporiMincho-ExtraBold.ttf",
//       weight: "800",
//       style: "extrabold",
//     },
//   ],
//   display: "swap",
//   preload: true,
// });

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

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Kuuu's Blog",
  description: "Japanese in Korea.",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${youngest.className} text-base sm:text-sm md:text-base lg:text-lg`}
      style={{ height: '100%' }}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ 
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        width: '100%'
      }}>
        <ReactQueryProviders>
          <ReduxProvider>
            <AuthProvider>
              <AxiosProvider>
                <main style={{ height: '100%', overflow: 'auto' }}>{children}</main>
                {modal}
              </AxiosProvider>
            </AuthProvider>
          </ReduxProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
