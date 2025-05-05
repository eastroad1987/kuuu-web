"use client";

import HorizontalCard from "@/components/common/Card/HorizontalCard";
import NoData from "@/components/common/NoData/NoData";
import { PostResponse } from "@/types/dto";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";

interface InputProps {
  isMobile: boolean;
  data?: PostResponse[];
  visibleItems: any[];
  windowHeight: number;
  value: Date;
  onChangeDate: (date: Date) => void;
  onSelected: (postId: string) => void;
  onSelectedDate: (date: Date) => void;
}

export default function BlogContent({
  isMobile,
  visibleItems,
  windowHeight,
  value,
  data,
  onChangeDate,
  onSelected,
  onSelectedDate,
}: InputProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  function getCardStyle(arrayIndex: number) {
    let scale = 1;
    let blur = 0;
    let yOffset = 0;
    let zIndex = 0;

    // 윈도우 높이를 기준으로 오프셋 계산
    const baseOffset = windowHeight * 0.2; // 10% 단위로 계산

    if (arrayIndex === 0 || arrayIndex === 4) {
      scale = 0.6;
      yOffset = arrayIndex === 0 ? 0 : baseOffset * 4;
      blur = 1;
      zIndex = 1;
    } else if (arrayIndex === 1 || arrayIndex === 3) {
      scale = 0.8;
      blur = 0.5;
      yOffset = arrayIndex === 1 ? baseOffset * 0.8 : baseOffset * 3.15;
      zIndex = 2;
    } else {
      scale = 1;
      blur = 0;
      yOffset = baseOffset * 2;
      zIndex = 3;
    }

    return {
      scale,
      filter: `blur(${blur}px)`,
      opacity: 1,
      yOffset,
      zIndex,
    };
  }

  return (
    <section
      className={`flex h-full w-full ${isMobile ? "flex-col" : "flex-row"} items-center justify-between bg-white`}
    >
      {isMobile ? (
        <Mobile
          isClient={isClient}
          data={data}
          visibleItems={visibleItems}
          windowHeight={windowHeight}
          value={value}
          getCardStyle={getCardStyle}
          onChangeDate={onChangeDate}
          onSelected={onSelected}
          onSelectedDate={onSelectedDate}
        />
      ) : (
        <Desktop
          isClient={isClient}
          data={data}
          visibleItems={visibleItems}
          windowHeight={windowHeight}
          value={value}
          getCardStyle={getCardStyle}
          onChangeDate={onChangeDate}
          onSelected={onSelected}
          onSelectedDate={onSelectedDate}
        />
      )}
    </section>
  );
}

interface ChildInputProps {
  isClient: boolean;
  data?: PostResponse[];
  visibleItems: any[];
  windowHeight: number;
  value: Date;
  getCardStyle: any;
  onChangeDate: (date: Date) => void;
  onSelected: (postId: string) => void;
  onSelectedDate: (date: Date) => void;
}

function Mobile({
  isClient,
  data,
  visibleItems,
  windowHeight,
  getCardStyle,
  onSelected,
  onChangeDate,
  value,
}: ChildInputProps) {
  return (
    <Fragment>
      <div className="h-[50%] w-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {isClient && (
            <div className="calendar-container">
              <Calendar
                onChange={(value) => onChangeDate(value as Date)}
                formatDay={(locale, date) => moment(date).format("DD")}
                value={value}
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
            {data && data.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {visibleItems.map((itemIndex, arrayIndex) => {
                  const { scale, filter, opacity, yOffset, zIndex } =
                    getCardStyle(arrayIndex);
                  return (
                    <motion.div
                      key={arrayIndex}
                      initial={{
                        y: windowHeight,
                        opacity: 0,
                        scale: 0.3,
                        zIndex,
                      }}
                      animate={{
                        y: yOffset,
                        opacity,
                        scale,
                        zIndex,
                      }}
                      exit={{
                        y: -windowHeight * 0.3,
                        opacity: 0,
                        scale: 0.3,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut",
                        },
                        zIndex,
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
                        filter,
                        transformOrigin: "center center",
                        willChange: "transform, opacity",
                        transform: `
                        scale(${scale})
                        translateY(-${yOffset}px)
                        ${arrayIndex === 2 ? "translateZ(10px)" : ""}
                      `,
                        transition:
                          "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
                        zIndex,
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
                          onSelected={onSelected}
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
    </Fragment>
  );
}

function Desktop({
  isClient,
  data,
  visibleItems,
  windowHeight,
  getCardStyle,
  onSelected,
  onChangeDate,
  value,
}: ChildInputProps) {
  return (
    <Fragment>
      <div className={`h-full w-[50%]`}>
        <div className="relative h-screen w-full overflow-hidden p-4">
          <div className="flex h-full w-full flex-col items-center justify-center">
            {data && data.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {visibleItems.map((itemIndex, arrayIndex) => {
                  const { scale, filter, opacity, yOffset, zIndex } =
                    getCardStyle(arrayIndex);
                  return (
                    <motion.div
                      key={arrayIndex}
                      initial={{
                        y: windowHeight, // 윈도우 높이에서 시작
                        opacity: 0,
                        scale: 0.3,
                        zIndex,
                      }}
                      animate={{
                        y: yOffset,
                        opacity,
                        scale,
                        zIndex,
                      }}
                      exit={{
                        y: -windowHeight * 0.3, // 윈도우 높이의 30% 위치로 사라짐
                        opacity: 0,
                        scale: 0.3,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut",
                        },
                        zIndex,
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
                        top: 0, // 윈도우 높이의 30% 위치에 배치
                        filter,
                        transformOrigin: "center center", // 기준점 변경
                        willChange: "transform, opacity",
                        transform: `
                        scale(${scale})
                        translateY(-${yOffset}px)
                        ${arrayIndex === 2 ? "translateZ(10px)" : ""}
                      `,
                        transition:
                          "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
                        zIndex,
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
                          onSelected={onSelected}
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
      <div className="h-full w-[50%]">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {isClient && (
            <div className="calendar-container">
              <Calendar
                onChange={(value) => onChangeDate(value as Date)} // useState로 포커스 변경 시 현재 날짜 받아오기
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                value={value}
                minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                className="h-full w-full border-b text-sm"
                // tileContent={({ date, view }) => {
                //   // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                //   // 추가할 html 태그를 변수 초기화
                //   let html = [];
                //   // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                //   if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                //     html.push(<div className="dot"></div>);
                //   }
                //   // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                //   return (
                //     <>
                //       <div className="absoluteDiv flex h-full w-full items-center justify-center">
                //         {html}
                //       </div>
                //     </>
                //   );
                // }}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
