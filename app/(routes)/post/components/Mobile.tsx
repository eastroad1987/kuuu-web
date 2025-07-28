"use client";
import Image from "next/image";
import { usePostContext } from "../context/PostContext";
import Hamburger from "@/components/common/Hamburger";
import SideMenu from "@/components/common/SideMenu";
import SafeArea from "@/components/common/SafeArea";
import useWindowSize from "../../../hooks/useWindowSize";

const PostMobile = {
  Container: ({ children }: { children: React.ReactNode }) => {
    const { state } = usePostContext();
    const { getDynamicVH } = useWindowSize();
    return (
      <SafeArea
        className="flex h-full w-full flex-col items-center justify-start"
        style={{ backgroundColor: state.color }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-start"
          style={{ height: getDynamicVH(100) }}
        >
          {children}
        </div>
      </SafeArea>
    );
  },
  Header: () => {
    const { state, handlers } = usePostContext();
    return (
      <SafeArea
        top={true}
        bottom={false}
        className={`stretch flex w-full flex-col justify-start bg-[${state.color}]`}
      >
        <div className="flex w-full flex-row items-center justify-between p-11">
          <h1 className="font-ipaex text-[24px] font-bold text-white">
            {state.boardName}
          </h1>
          <Hamburger onClick={handlers.toggleSideMenu} color={"white"} />
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <h1 className="font-ipaex text-center text-[24px] font-bold text-white">
            {state.title}
          </h1>
        </div>
        <div className="flex w-full flex-row items-end justify-end p-11">
          <h1 className="font-ipaex text-[24px] font-bold text-white">
            {state?.date?.toLocaleDateString()}
          </h1>
        </div>
      </SafeArea>
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
                  className="ql-editor h-full w-full"
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

const MobileWrapper = () => {
  return (
    <PostMobile.Container>
      <PostMobile.Header />
      <PostMobile.Post />
      <PostMobile.SideMenu />
    </PostMobile.Container>
  );
};
export default MobileWrapper;
