"use client";

import { Suspense } from "react";
import MainComponents from "./MainPage";
import useHome from "../hooks/useHome";
import MainLayout from "../context/MainLayout";

function HomeContent() {
  const useHomeHook = useHome();

  if (useHomeHook.status.isLoading) {
    return <div>Loading...</div>;
  }

  const mainValue = {
    state: useHomeHook.state,
    updateState: useHomeHook.updateState,
    handlers: useHomeHook.handlers,
  };

  return (
    <MainLayout value={mainValue}>
      <MainComponents.Container>
        <MainComponents.MainContent />
        <MainComponents.CategoryContent />
        <MainComponents.ProfileContent />
        <MainComponents.BlogContent />
      </MainComponents.Container>
      <MainComponents.VerticalDotButtons />
    </MainLayout>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}