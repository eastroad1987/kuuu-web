"use client";

import { memo } from "react";
import { MainProvider, UseMainType } from "../context/MainContext";
import MobileWrapper from "./Mobile";
import WebWrapper from "./Web";

interface MainProps {
  children: React.ReactNode;
  value: UseMainType;
}

const Main = memo(({ children, value }: MainProps) => {
  return <MainProvider value={value}>{children}</MainProvider>;
});

Main.displayName = "Main";

type MainComponentType = typeof Main & {
  Web: typeof WebWrapper;
  Mobile: typeof MobileWrapper;
};

const MainComponent = Main as MainComponentType;
MainComponent.Web = WebWrapper;
MainComponent.Mobile = MobileWrapper;

export default MainComponent;
