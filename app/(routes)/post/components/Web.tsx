"use client";
import Image from "next/image";
import { usePostContext } from "../context/PostContext";
import Hamburger from "@/components/common/Hamburger";
import SideMenu from "@/components/common/SideMenu";

const PostWeb = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { state } = usePostContext();
    return (
      <div
        className="flex h-screen w-full flex-col items-center justify-start"
        style={{ backgroundColor: state.color }}
      >
        <div className="flex h-full w-full max-w-[1280px] flex-col items-center justify-start">
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
    const { state } = usePostContext();
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
              </div>
              <div className="ql-show">
                <div
                  className="ql-editor h-screen w-full"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                  dangerouslySetInnerHTML={{ __html: state.post?.content }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
};

const WebWrapper = () => {
  return (
    <PostWeb.Container>
      <PostWeb.Header />
      <PostWeb.Post />
      <PostWeb.SideMenu />
    </PostWeb.Container>
  );
};
export default WebWrapper;
