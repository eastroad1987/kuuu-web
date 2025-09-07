"use client";

import DropdownMenu from "@/components/common/DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hamburger from "@/components/common/Hamburger";
import Image from "next/image";
import PostSEO from "./PostSEO";
import { ProcessedContent } from "../utils/contentProcessor";
import SideMenu from "@/components/common/SideMenu";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { usePostContext } from "../context/PostContext";
import useWindowSize from "../../../hooks/useWindowSize";

const PostWeb = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { state } = usePostContext();
    const { getDynamicVH } = useWindowSize();
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-start"
        style={{ 
          backgroundColor: state.color,
          height: getDynamicVH(100)
        }}
      >
        <div className="flex h-full w-full max-w-[1024px] flex-col items-center justify-start">
          {children}
        </div>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = usePostContext();
    return (
      <header
        className={`flex h-[230px] w-full flex-row items-center justify-between bg-[${state.color}]`}
      >
        <div className="flex h-full w-1/3 flex-col items-start justify-start p-11">
          <h1 className="font-ipaex text-[24px] font-bold text-white">
            {state.boardName}
          </h1>
        </div>
        <div className="flex w-1/3 items-center justify-center">
          <h1 className="font-ipaex text-center text-[24px] font-bold text-white">
            {state.title}
          </h1>
        </div>
        <div className="flex h-full w-1/3 flex-col items-end justify-between p-11">
          <Hamburger onClick={handlers.toggleSideMenu} color={"white"} />
          <h1 className="font-ipaex text-[24px] font-bold text-white">
            {state?.date?.toLocaleDateString()}
          </h1>
        </div>
      </header>
    );
  },
  SideMenu: () => {
    const { state, handlers } = usePostContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
  Post: () => {
    const { state, handlers } = usePostContext();
    return (
      <section className="flex h-full w-full flex-col items-center justify-between overflow-auto">
        <div style={{ textAlign: "center", width: "100%" }}>
          {state.post && (
            <div className="content-container">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={state.post?.thumbnail || ""}
                  alt={state.post?.title || "Post thumbnail"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                {/* Three-dot menu in top-right corner */}
                <div className="absolute right-4 top-4">
                  <DropdownMenu
                    items={[
                      {
                        label: "수정하기",
                        onClick: () => handlers.goEditPost(state.post?.id?.toString() || ""),
                        icon: (
                          <FontAwesomeIcon icon={faPenSquare} />
                        ),
                      },
                    ]}
                    iconColor="white"
                  />
                </div>
              </div>
              <div className="ql-show">
                <div
                  className="ql-editor h-full w-full font-noto-sans-jp"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "24px",
                    fontFamily: "'Noto Sans JP', 'Noto Sans KR', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'Malgun Gothic', sans-serif",
                  }}
                >
                  <ProcessedContent content={state.post?.content || ""} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
};

const WebWrapper = () => {
  const { state } = usePostContext();
  
  return (
    <PostWeb.Container>
      {state.post && <PostSEO post={state.post} />}
      <PostWeb.Header />
      <PostWeb.Post />
      <PostWeb.SideMenu />
    </PostWeb.Container>
  );
};
export default WebWrapper;
