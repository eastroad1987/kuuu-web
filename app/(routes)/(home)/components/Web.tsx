"use client";
import HorizontalCard from "@/components/common/Card/HorizontalCard";
import Hamburger from "@/components/common/Hamburger";
import NoData from "@/components/common/NoData/NoData";
import SideMenu from "@/components/common/SideMenu";
import VerticalDots from "@/components/common/VerticalDots";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMainContext } from "../context/MainContext";
import { useVerticalGesture } from "../../../hooks/useGesture";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";

const MainWeb = {
  Container: ({ children }: { children: ReactNode }) => {
    const { state, handlers } = useMainContext();
    const { getDynamicVH } = useWindowSize();
    const [isTablet, setIsTablet] = useState(false);

    // Detect tablet device
    useEffect(() => {
      const checkIsTablet = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isTabletDevice =
          /tablet|ipad|playbook|silk|(android(?!.*mobile))/i.test(userAgent);
        const isTabletSize =
          window.innerWidth >= 768 && window.innerWidth <= 1024;
        setIsTablet(isTabletDevice || isTabletSize);
      };

      checkIsTablet();
      window.addEventListener("resize", checkIsTablet);
      return () => window.removeEventListener("resize", checkIsTablet);
    }, []);

    // Handle swipe up - go to next section
    const handleSwipeUp = () => {
      if (state.currentSection < state.limit - 1) {
        handlers.onPageChange(state.currentSection + 1);
      }
    };

    // Handle swipe down - go to previous section
    const handleSwipeDown = () => {
      if (state.currentSection > 0) {
        handlers.onPageChange(state.currentSection - 1);
      }
    };

    // Use vertical gesture hook only for tablets
    const { handleTouchStart, handleTouchEnd } = useVerticalGesture(
      isTablet ? handleSwipeUp : undefined,
      isTablet ? handleSwipeDown : undefined,
      50, // minSwipeDistance
    );

    return (
      <div
        className="flex h-full w-full flex-col items-center justify-start bg-white"
        onTouchStart={isTablet ? handleTouchStart : undefined}
        onTouchEnd={isTablet ? handleTouchEnd : undefined}
      >
        <main
          className="h-full w-full max-w-[1280px] overflow-hidden"
          style={{ height: getDynamicVH(100) }}
        >
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
            className={`font-ipaex ${state.currentSection == 0 ? "animate-scale" : ""}`}
          >{`Kuuu's BLOG`}</h1>
          <p
            className={`font-ipaex ${state.currentSection == 0 ? "animate-slide-up" : ""}`}
          >
            Japanese in Korea.
          </p>
        </div>
      </section>
    );
  },
  ProfileContent: () => {
    const { state, handlers } = useMainContext();
    return (
      <div className={`flex h-full w-full items-center justify-center`}>
        <div className={`profile-container`}>
          <div className="profile-left-container">
            <div className="profile-text">
              <h1 className="font-ipaex">Profile</h1>
              <h2 className="font-designhouse">프로필</h2>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <h2 className={`font-inter text-4xl`}>KURUMI</h2>
              <div className="w-[40%]">
                <Image
                  src="/images/line.svg"
                  alt="Line"
                  width={600}
                  height={20}
                />
              </div>
              <h3 className={`font-designhouse text-xl`}>쿠루미</h3>
            </div>
            <div className="icons mb-10">
              <button
                id="profile-prev-button"
                className="icon"
                onMouseEnter={handlers.onEnter}
                onMouseLeave={handlers.onLeave}
                onClick={() => {
                  window.open("mailto:k_u.0626@icloud.com", "_blank");
                }}
              >
                {state.isHover ? (
                  <Image
                    src="/images/open_letter.svg"
                    alt="Open Letter"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src="/images/letter.svg"
                    alt="Letter"
                    width={50}
                    height={50}
                  />
                )}
              </button>
              <button
                id="profile-prev-button"
                className="icon"
                onClick={() => {
                  window.open("https://www.instagram.com/hodu_963/", "_blank");
                }}
              >
                <Image
                  src="/images/instar.svg"
                  alt="Open Letter"
                  width={50}
                  height={50}
                />
              </button>
            </div>
          </div>
          <div className="profile-right-container">
            <div
              className={`relative h-full w-full ${state.currentSection == 2 ? "animate-slide-left" : ""}`}
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
  CategoryContent: () => {
    const { state } = useMainContext();
    return (
      <section className={`flex h-full items-center justify-center`}>
        <div className="category-container">
          <div className="category-top-container">
            <div className="flex h-full w-[55%] flex-col items-center justify-center">
              <div className="flex h-[35%] w-full flex-col items-center justify-center">
                <h2 className={`font-ipaex text-4xl text-black`}>CATEGORY</h2>
              </div>
              <Link
                href="/category/0"
                className={`flex h-[65%] w-full flex-col items-center justify-center bg-[#ffc212] ${state.currentSection == 1 ? "animate-slide-right" : ""}`}
              >
                <h2 className={`font-ipaex text-4xl font-bold text-white`}>
                  MUSICAL/MOVIE
                </h2>
              </Link>
            </div>
            <div className="flex h-full w-[45%] flex-row items-center justify-center">
              <div className="flex h-full w-[45%] flex-col items-center justify-center">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/korea.png"
                    alt="musical"
                    fill
                    className="object-cover" // 또는 object-contain
                    sizes="100vw, 100vw"
                    priority
                  />
                </div>
              </div>
              <Link
                href="/category/1"
                className={`flex h-full w-[55%] flex-col items-center justify-center bg-[#0b3b10] ${state.currentSection == 1 ? "animate-slide-down" : ""}`}
              >
                <h2 className={`font-ipaex text-4xl font-bold text-white`}>
                  LIFE
                </h2>
              </Link>
            </div>
          </div>
          <div className="category-bottom-container">
            <div className="flex h-full w-[58%] flex-row items-center justify-center">
              <Link
                href="/category/2"
                className={`flex h-full w-full flex-col items-center justify-center bg-[#1f2f57] ${state.currentSection == 1 ? "animate-slide-up" : ""}`}
              >
                <h2 className={`font-ipaex text-4xl font-bold text-white`}>
                  CAFE/RESTAURANT
                </h2>
              </Link>

              <div className="relative h-full w-[45%]">
                <Image
                  src="/images/life.png"
                  alt="musical"
                  fill
                  className="object-cover"
                  sizes="100vw, 100vw"
                  priority
                />
              </div>
            </div>
            <div className="flex h-full w-[43%] flex-row items-center justify-center">
              <Link
                href="/category/3"
                className={`flex h-full w-full flex-col items-center justify-center bg-[#d62c28] ${state.currentSection == 1 ? "animate-slide-left" : ""}`}
              >
                <h2 className={`font-ipaex text-4xl font-bold text-white`}>
                  SIGHTSEEING
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
  BlogContent: () => {
    const { state, handlers } = useMainContext();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
    }, []);
    if (!isClient) return null;
    return (
      <section className="flex h-full w-full p-8">
        <div className="flex h-full w-full">
          <div className="flex h-full w-[50%] flex-col justify-between pr-6">
            <div className="relative flex h-full w-full flex-col items-center gap-5">
              {state.cardData && state.cardData.length > 0 && (
                <AnimatePresence>
                  {handlers.getVisibleCards().map((card, index) => {
                    // Get the visual position based on the index (0-4)
                    const visualPosition = index;

                    // Define card styling based on position
                    let cardWidth = "w-full";
                    let zIndex = 10; // Default z-index

                    if (visualPosition === 0 || visualPosition === 4) {
                      cardWidth = "w-[85%]"; // Smallest width for 1st and 5th
                      zIndex = 10; // Back layer
                    } else if (visualPosition === 1 || visualPosition === 3) {
                      cardWidth = "w-[92%]"; // Medium width for 2nd and 4th
                      zIndex = 20; // Middle layer
                    } else if (visualPosition === 2) {
                      zIndex = 30; // Front layer for middle card (full width)
                    }

                    // Position cards vertically based on index
                    const yPosition = `${visualPosition * (100 / 5)}%`;

                    // Get the original index for the key (important for animations)
                    const originalIndex =
                      (state.activeCardIndex + index) % state.cardData.length;

                    return (
                      <motion.div
                        key={`card-${originalIndex}`}
                        className={`${cardWidth} absolute mx-auto`}
                        initial={false}
                        animate={{
                          top: yPosition,
                          zIndex: zIndex,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{ height: `${state.cardHeight}px` }}
                      >
                        <HorizontalCard
                          image={card?.image}
                          title={card?.title}
                          subtitle={card?.subtitle}
                          description={card?.description}
                          badge={card?.badge}
                          badgeColor={card?.badgeColor}
                          onClick={() => handlers.onSelected(card.postId)}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
              {(!state.cardData || state.cardData.length === 0) && (
                <div className="flex h-full w-full items-center justify-center">
                  <NoData />
                </div>
              )}
            </div>
          </div>

          {/* Right side - Calendar */}
          <div className="flex h-full w-[50%] items-center justify-center">
            <div className="font-ipaex calendar-container mx-auto flex h-[90%] w-[90%] items-center justify-center">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Calendar
                  className="w-full"
                  value={state.currentDate}
                  formatDay={(locale, date) => moment(date).format("D")}
                  navigationLabel={({ date }) => (
                    <div className="mt-5 flex flex-col items-center">
                      <div className="font-ipaex text-[1.5em]">
                        {date.getFullYear()}
                      </div>
                      <div className="font-ipaex text-[1.25em]">
                        {date.getMonth() + 1}
                      </div>
                    </div>
                  )}
                  formatShortWeekday={(locale, date) =>
                    ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
                  }
                  minDetail="month"
                  maxDetail="month"
                  showNeighboringMonth={false}
                  onChange={handlers.calendarChange}
                  // Tile 스타일은 calendar.css에서 관리됩니다
                />
              </div>
            </div>
          </div>
        </div>
      </section>
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

const WebWrapper = () => {
  return (
    <>
      <MainWeb.Header />
      <MainWeb.Container>
        <MainWeb.MainContent />
        <MainWeb.ProfileContent />
        <MainWeb.CategoryContent />
        <MainWeb.BlogContent />
      </MainWeb.Container>
      <MainWeb.VerticalDotButtons />
      <MainWeb.SideMenu />
    </>
  );
};
export default WebWrapper;
