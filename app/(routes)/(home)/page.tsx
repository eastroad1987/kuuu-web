"use client";

import MainComponents from "./components/MainPage";
import useHome from "./hooks/useHome";
import MainLayout from "./context/MainLayout";

export default function HomePage() {
  const useHomeHook = useHome();
  return (
    <MainLayout value={useHomeHook}>
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
