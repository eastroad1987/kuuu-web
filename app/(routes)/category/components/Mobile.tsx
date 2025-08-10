"use client";
import HoverCard from "@/components/common/Card/HoverCard";
import CategoryButton from "@/components/common/CategoryButton";
import Hamburger from "@/components/common/Hamburger";
import NoData from "@/components/common/NoData/NoData";
import SideMenu from "@/components/common/SideMenu";
import Image from "next/image";
import { useCategoryContext } from "../context/CategoryContext";
import BasicCard from "@/components/common/Card/BasicCard";
import HorizontalCard from "@/components/common/Card/HorizontalCard";
import useWindowSize from "../../../hooks/useWindowSize";

const CategoryMobile = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { getDynamicVH } = useWindowSize();
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-start bg-white"
        style={{ height: getDynamicVH(100) }}
      >
        {children}
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
      <section className="flex w-full flex-row items-center justify-between pb-10 pt-10 ">
        <div className="grid grid-cols-1 items-center justify-items-start gap-5 
                       portrait:grid-cols-1 
                       landscape:grid-cols-[300px_minmax(0,_1fr)] 
                       sm:grid-cols-[400px_minmax(0,_1fr)] 
                       md:grid-cols-[400px_minmax(0,_1fr)] 
                       lg:grid-cols-[400px_minmax(0,_1fr)]">
          <div className="flex w-full items-center justify-center overflow-hidden text-center">
            <Image
              src={state.mainImage || ""}
              alt="Main Image"
              width={768}
              height={400}
              className="w-full max-w-full"
              style={{ borderRadius: "8px", objectFit: "contain" }}
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
      <section className="mb-32 flex h-full w-full flex-col items-start justify-stretch bg-white">
        <div className="flex w-full flex-col items-center justify-start">
          {state.posts && state.posts.length > 0 ? (
            <div className="grid w-full grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {state.posts.map((post, idx) => (
                // <HoverCard key={idx} post={post} boardName={boardName} />
                <HorizontalCard
                  key={idx}
                  title={post.title}
                  subtitle={post.summary}
                  image={post?.thumbnail || ""}
                />
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

const MobileWrapper = () => {
  return (
    <CategoryMobile.Container>
      <CategoryMobile.Header />
      <CategoryMobile.Boards />
      <CategoryMobile.Posts />
      <CategoryMobile.SideMenu />
    </CategoryMobile.Container>
  );
};
export default MobileWrapper;
