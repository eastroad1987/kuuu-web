"use client";

import Image from "next/image";

interface InputProps {
  show: boolean;
}

export default function MainContent({ show }: InputProps) {
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
        <h1 className={`font-youngest ${show ? "animate-scale" : ""}`}>{`Kuuu's BLOG`}</h1>
        <p className={`font-youngest ${show ? "animate-slide-up" : ""}`}>
          Japanese in Korea.
        </p>
      </div>
    </section>
  );
}
