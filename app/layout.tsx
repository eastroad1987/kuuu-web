import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

import AuthProvider from "./components/auth/AuthProvider";
import AxiosProvider from "./components/provider/AxiosProvider";
import ReactQueryProviders from "./components/provider/QueryProvider";
import ReduxProvider from "./components/provider/redux";

import localFont from "next/font/local";

export const ttCommonsPro = localFont({
  src: [
    {
      path: "../public/fonts/TT Commons Pro Trial Expanded Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons Pro Trial Expanded Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons Pro Trial Expanded Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons Pro Trial Expanded Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tt-commons",
  display: "swap",
  preload: true,
});

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
      style: "normal",
    },
    {
      path: "../public/fonts/ShipporiMincho-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ShipporiMincho-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ShipporiMincho-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-shippori-mincho",
  display: "swap",
  preload: true,
});

export const youngest = localFont({
  src: "../public/fonts/Youngest.woff",
  display: "swap",
  preload: true,
  variable: "--font-youngest",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Kuuu's Blog",
    template: "%s | Kuuu's Blog",
  },
  description: "Japanese in Korea. 일본인 블로거의 한국 생활 이야기",
  keywords: ["일본인", "한국", "블로그", "일본", "한국생활", "일본인블로거"],
  authors: [{ name: "Kuuu" }],
  creator: "Kuuu",
  publisher: "Kuuu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kuuu-blog.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kuuu's Blog",
    description: "Japanese in Korea. 일본인 블로거의 한국 생활 이야기",
    url: "https://kuuu-blog.vercel.app",
    siteName: "Kuuu's Blog",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuuu's Blog",
    description: "Japanese in Korea. 일본인 블로거의 한국 생활 이야기",
    creator: "@kuuu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "om2IJ3sEDUfW5sFCGGqpvNkQNGgHf-p5pvnGM51afDI", // Google Search Console 인증 코드
  },
  category: "blog",
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
      className={`${youngest.variable} ${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${ttCommonsPro.variable} ${shipporiMincho.variable} text-base sm:text-sm md:text-base lg:text-lg`}
      style={{ height: "100%" }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="om2IJ3sEDUfW5sFCGGqpvNkQNGgHf-p5pvnGM51afDI"
        />
        <meta name="msvalidate.01" content="7DA94538204E9CA3E189E0D39D546C6B" />
      </head>
      <body
        style={{
          height: "100%",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          position: "fixed",
          width: "100%",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProviders>
            <ReduxProvider>
              <AuthProvider>
                <AxiosProvider>
                  <main style={{ height: "100%", overflow: "auto" }}>
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
