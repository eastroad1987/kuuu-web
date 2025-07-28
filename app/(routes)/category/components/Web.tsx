"use client";
import HoverCard from "@/components/common/Card/HoverCard";
import CategoryButton from "@/components/common/CategoryButton";
import Hamburger from "@/components/common/Hamburger";
import NoData from "@/components/common/NoData/NoData";
import SideMenu from "@/components/common/SideMenu";
import Image from "next/image";
import { useCategoryContext } from "../context/CategoryContext";
import useWindowSize from "../../../hooks/useWindowSize";

const CategoryWeb = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { getDynamicVH } = useWindowSize();
    return (
      <div className="flex h-full w-full flex-col items-center justify-start bg-white">
        <div
          className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start"
          style={{ height: getDynamicVH(100) }}
        >
          {children}
        </div>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <header className="flex h-[78px] w-full flex-row items-center justify-between">
        <div
          style={{ backgroundColor: state.color || "#000" }}
          className={`flex h-full w-[60%] flex-row items-center justify-end pr-[50px]`}
        >
          <h1 className="font-ipaex text-[24px] font-bold text-white">
            {state.title}
          </h1>
        </div>
        <div className={`flex h-full flex-col items-end justify-center`}>
          <Hamburger onClick={handlers.toggleSideMenu} />
        </div>
      </header>
    );
  },
  Boards: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <section className="flex w-full flex-row items-center justify-between pb-10 pt-10">
        <div className="grid grid-cols-1 items-center justify-items-start gap-5 sm:grid-cols-[400px_minmax(0,_1fr)] md:grid-cols-[400px_minmax(0,_1fr)] lg:grid-cols-[400px_minmax(0,_1fr)]">
          <div className="max-h-[400px] w-[400px] flex-shrink-0 overflow-hidden text-center md:flex md:w-full md:justify-center">
            <Image
              src={state.mainImage || ""}
              alt="Main Image"
              width={400}
              height={400}
              objectFit="cover"
              style={{ borderRadius: "8px" }}
              className="md:w-full md:max-w-[400px]"
            />
          </div>
          <div className="flex w-full flex-grow flex-row items-start justify-start gap-5 overflow-auto">
            {state.subBoards.map((subBoard) => (
              <CategoryButton
                key={subBoard.id}
                color={state.color || "#000"}
                title={subBoard.title}
                isActive={state.currentSubBoard?.id === subBoard.id}
                onClick={() => handlers.clickSubCategory(subBoard)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
  Posts: () => {
    const { state } = useCategoryContext();
    const boardName = `${state.currentBoard.title} - ${state.currentSubBoard.title}`;
    return (
      <section className="mb-32 flex w-full flex-col items-start justify-stretch">
        <div className="flex w-full flex-col items-center justify-start">
          {state.posts && state.posts.length > 0 ? (
            <div className="grid w-full grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {state.posts.map((post, idx) => (
                <HoverCard key={idx} post={post} boardName={boardName} />
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <NoData />
            </div>
          )}
        </div>
      </section>
    );
  },
  SideMenu: () => {
    const { state, handlers } = useCategoryContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
};

const WebWrapper = () => {
  return (
    <CategoryWeb.Container>
      <CategoryWeb.Header />
      <CategoryWeb.Boards />
      <CategoryWeb.Posts />
      <CategoryWeb.SideMenu />
    </CategoryWeb.Container>
  );
};
export default WebWrapper;
