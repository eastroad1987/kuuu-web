"use client";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import Hamburger from "@/components/common/Hamburger";
import SideMenu from "@/components/common/SideMenu";
import Image from "next/image";
import Link from "next/link";
import VerticalDots from "@/components/common/VerticalDots";
import Calendar from "react-calendar";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import HorizontalCard from "@/components/common/Card/HorizontalCard";
import NoData from "@/components/common/NoData/NoData";

const MainMobile = {
  Container: ({ children }: { children: ReactNode }) => {
    const { state } = useMainContext();
    return (
      <div className="flex h-screen w-full flex-col items-center justify-start bg-white">
        <main className="h-screen w-full max-w-[1280px] overflow-hidden">
          <div
            className="h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(-${state.currentSection * 100}%)` }}
          >
            {children}
          </div>
        </main>
      </div>
    );
  },
  Header: () => {
    const { state, handlers } = useMainContext();
    return (
      <header className="fixed top-0 z-50 flex h-[78px] w-full flex-row items-center justify-end">
        <div className={`flex h-full flex-col items-end justify-center`}>
          <Hamburger onClick={handlers.toggleSideMenu} />
        </div>
      </header>
    );
  },
  SideMenu: () => {
    const { state, handlers } = useMainContext();
    return (
      <SideMenu isOpen={state.isOpen} onClose={handlers.onSideMenuClose} />
    );
  },
  MainContent: () => {
    const { state } = useMainContext();
    return (
      <section className={`flex h-full items-center justify-center`}>
        <Image
          src="/images/bridge.png"
          alt="main"
          fill
          className="object-cover" // 또는 object-contain
          sizes="100vw"
          priority
        />
        <div className="main-content">
          <h1
            className={`font-youngest ${state.currentSection == 0 ? "animate-scale" : ""}`}
          >{`Kuuu's BLOG`}</h1>
          <p
            className={`font-youngest ${state.currentSection == 0 ? "animate-slide-up" : ""}`}
          >
            Japanese in Korea.
          </p>
        </div>
      </section>
    );
  },
  CategoryContent: () => {
    const { state } = useMainContext();
    return (
      <section className={`flex h-full items-center justify-center`}>
        <div className="category-container">
          <div className="category-top-container">
            <div className="flex h-full w-[55%] flex-col items-center justify-center">
              <div className="flex h-[35%] w-full flex-col items-center justify-center">
                <h2 className={`font-shippori "text-2xl" text-black`}>
                  Category
                </h2>
              </div>
              <Link
                href="/category/0"
                className={`flex h-[65%] w-full flex-col items-center justify-center bg-[#ffc212] ${state.currentSection === 1 ? "animate-slide-right" : ""}`}
              >
                <h2 className={`font-shippori "text-2xl" font-bold text-white`}>
                  Musical & Movie
                </h2>
              </Link>
            </div>
            <div className="flex h-full w-[45%] flex-row items-center justify-center">
              <Link
                href="/category/1"
                className={`flex h-full w-full flex-col items-center justify-center bg-[#0b3b10] ${state.currentSection === 1 ? "animate-slide-down" : ""}`}
              >
                <h2 className={`font-shippori "text-2xl" font-bold text-white`}>
                  Life
                </h2>
              </Link>
            </div>
          </div>
          <div className="category-bottom-container">
            <div className="flex h-full w-[58%] flex-row items-center justify-center">
              <Link
                href="/category/2"
                className={`flex h-full w-full flex-col items-center justify-center bg-[#1f2f57] ${state.currentSection === 1 ? "animate-slide-up" : ""}`}
              >
                <h2 className={`font-shippori "text-2xl" font-bold text-white`}>
                  Cafe & Restaurant
                </h2>
              </Link>
            </div>
            <div className="flex h-full w-[43%] flex-row items-center justify-center">
              <Link
                href="/category/3"
                className={`flex h-full w-full flex-col items-center justify-center bg-[#d62c28] ${state.currentSection === 1 ? "animate-slide-left" : ""}`}
              >
                <h2 className={`font-shippori "text-2xl" font-bold text-white`}>
                  Sightseeing
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
  ProfileContent: () => {
    const { state, handlers } = useMainContext();
    return (
      <div className={`flex h-full w-full items-center justify-center`}>
        <div className={"profile-container-mobile"}>
          <div className="profile-left-container">
            <div className="profile-text">
              <h1 className="font-shippori">Profile</h1>
              <h2>프로필</h2>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <h2 className={`font-tt-commons text-4xl`}>KURUMI</h2>
              <div className="w-[40%]">
                <Image
                  src="/images/line.svg"
                  alt="Line"
                  width={200}
                  height={20}
                />
              </div>
              <h3 className={`text-xl`}>쿠루미</h3>
            </div>
            <div className="icons mb-10">
              <button
                id="profile-prev-button"
                className="icon"
                onMouseEnter={handlers.onEnter}
                onMouseLeave={handlers.onLeave}
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/kuuus_blog?igsh=MXQzZGQ3bHRjd2dhZg%3D%3D&utm_source=qr",
                    "_blank",
                  );
                }}
              >
                {state.isHover ? (
                  <Image
                    src="/images/open_letter.svg"
                    alt="Open Letter"
                    width={200}
                    height={200}
                  />
                ) : (
                  <Image
                    src="/images/letter.svg"
                    alt="Letter"
                    width={200}
                    height={200}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="profile-right-container">
            <div
              className={`relative h-full w-full ${state.currentSection === 2 ? "animate-slide-left" : ""}`}
            >
              <Image
                src="/images/kurumi2.png"
                alt="profile"
                fill
                className="object-cover" // 또는 object-contain
                sizes="100vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  BlogContent: () => {
    const { state, handlers } = useMainContext();
    if (!state.mounted) return null;
    return (
      <>
        <div className="h-[50%] w-full">
          <div className="flex h-full w-full flex-col items-center justify-center">
            {state.mounted && (
              <div className="font-shippori calendar-container">
                <Calendar
                  onChange={(value) => handlers.onChangeDate(value as Date)}
                  formatDay={(locale, date) => moment(date).format("DD")}
                  value={state.currentDate}
                  minDetail="month"
                  maxDetail="month"
                  showNeighboringMonth={false}
                  className="h-full w-full border-b text-xs"
                />
              </div>
            )}
          </div>
        </div>
        <div className="h-[50%] w-full">
          <div className="relative h-full w-full overflow-hidden p-4">
            <div className="flex h-full w-full flex-col items-center justify-center">
              {state.posts && state.posts.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {state.visibleBlogs.map((itemIndex, arrayIndex) => {
                    const cardStyle = handlers.getCardStyle(arrayIndex);
                    return (
                      <motion.div
                        key={arrayIndex}
                        initial={{
                          y: state.windowHeight,
                          opacity: 0,
                          scale: 0.3,
                          zIndex: cardStyle?.zIndex,
                        }}
                        animate={{
                          y: cardStyle?.yOffset,
                          opacity: cardStyle?.opacity,
                          scale: cardStyle?.scale,
                          zIndex: cardStyle?.zIndex,
                        }}
                        exit={{
                          y: -state.windowHeight * 0.3,
                          opacity: 0,
                          scale: 0.3,
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut",
                          },
                          zIndex: cardStyle?.zIndex,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          mass: 0.8,
                          opacity: {
                            duration: 0.6,
                            ease: "easeInOut",
                          },
                          scale: {
                            duration: 0.6,
                            ease: [0.32, 0.72, 0, 1],
                          },
                        }}
                        className="absolute w-[100%] p-4"
                        style={{
                          top: 0,
                          filter: cardStyle?.filter,
                          transformOrigin: "center center",
                          willChange: "transform, opacity",
                          transform: `
                        scale(${cardStyle?.scale})
                        translateY(-${cardStyle?.yOffset}px)
                        ${arrayIndex === 2 ? "translateZ(10px)" : ""}
                      `,
                          transition:
                            "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
                          zIndex: cardStyle.zIndex,
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.9 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                          }}
                        >
                          <HorizontalCard
                            post={itemIndex as any}
                            onSelected={handlers.onSelected}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </>
    );
  },
  VerticalDotButtons: () => {
    const { state, handlers } = useMainContext();
    return (
      <VerticalDots
        total={state.limit}
        current={state.currentSection}
        onPageChange={handlers.onPageChange}
      />
    );
  },
};

const MobileWrapper = () => {
  return (
    <>
      <MainMobile.Header />
      <MainMobile.Container>
        <MainMobile.MainContent />
        <MainMobile.CategoryContent />
        <MainMobile.ProfileContent />
        <MainMobile.BlogContent />
      </MainMobile.Container>
      <MainMobile.VerticalDotButtons />
      <MainMobile.SideMenu />
    </>
  );
};
export default MobileWrapper;
