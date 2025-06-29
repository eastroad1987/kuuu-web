"use client";

import { Suspense } from "react";

import ResponsiveWrapper from "@/components/common/ResponsiveWrapper";
import MainComponent from "./components/Home";
import useHome from "./hooks/useHome";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomeClient() {
  const useHomeHook = useHome();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          지원 페이지 로딩 중...
        </div>
      }
    >
      <MainComponent value={useHomeHook}>
        <ResponsiveWrapper
          WebComponent={MainComponent.Web}
          MobileComponent={MainComponent.Mobile}
        />
      </MainComponent>
    </Suspense>
  );
}
