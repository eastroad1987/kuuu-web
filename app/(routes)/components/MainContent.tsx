"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainContent() {
  const router = useRouter();

  function handleClickReadMore() {
    router.push("/daily");
  }

  return (
    <div className="cardContainer">
      <Image
        src="/images/main-background.png" // public 폴더의 이미지 경로
        alt="Modern Kitchen Design"
        fill
        className={"backgroundImage"}
      />
      <div className={"overlay"}>
        <div className={"content"}>
          <h1 className={"title"}>Life In Korea</h1>
          <button className={"readMore"} onClick={handleClickReadMore}>
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}
