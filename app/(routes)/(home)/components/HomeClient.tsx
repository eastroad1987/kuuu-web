"use client";

import { Suspense } from "react";
import MainComponents from "./MainPage";
import useHome from "../hooks/useHome";
import MainLayout from "../context/MainLayout";

export default function HomeClient() {
  const useHomeHook = useHome();

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
