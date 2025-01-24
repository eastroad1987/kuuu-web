"use client";

import Image from "next/image";
import Link from "next/link";

interface InputProps {
  show: boolean;
}

export default function CategoryContent({ show }: InputProps) {
  return (
    <section className={`flex h-full items-center justify-center`}>
      <div className="category-container">
        <div className="category-top-container">
          <div className="flex h-full w-[55%] flex-col items-center justify-center">
            <div className="flex h-[35%] w-full flex-col items-center justify-center">
              <h2 className="text-4xl font-bold text-black">Category</h2>
            </div>
            <Link
              href="/category/0"
              className={`flex h-[65%] w-full flex-col items-center justify-center bg-[#ffc212] ${show ? "animate-slide-right" : ""}`}
            >
              <h2 className="text-4xl font-bold">Musical & Movie</h2>
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
              className={`flex h-full w-[55%] flex-col items-center justify-center bg-[#0b3b10] ${show ? "animate-slide-down" : ""}`}
            >
              <h2 className="text-4xl font-bold">Life</h2>
            </Link>
          </div>
        </div>
        <div className="category-bottom-container">
          <div className="flex h-full w-[50%] flex-row items-center justify-center">
            <Link
              href="/category/2"
              className={`flex h-full w-full flex-col items-center justify-center bg-[#1f2f57] ${show ? "animate-slide-up" : ""}`}
            >
              <h2 className="text-4xl font-bold">CAFE & Restaurant</h2>
            </Link>
            <div className="relative h-full w-[30%]">
              <Image
                src="/images/life.png"
                alt="musical"
                fill
                className="object-cover" // 또는 object-contain
                sizes="100vw, 100vw"
                priority
              />
            </div>
          </div>
          <div className="flex h-full w-[50%] flex-row items-center justify-center">
            <Link
              href="/category/3"
              className={`flex h-full w-full flex-col items-center justify-center bg-[#d62c28] ${show ? "animate-slide-left" : ""}`}
            >
              <h2 className="text-4xl font-bold">Sightseeing</h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
