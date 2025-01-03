"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainContent() {
  const router = useRouter();

  function handleClickReadMore() {
    router.push("/daily");
  }

  return (
    <div className="main-container">
      <section className="title-section">
        <Image
          src="/images/top-back.png" // public 폴더의 이미지 경로
          alt="top-back"
          fill
        />
        <div className="overlay">
          <h2 className="main-title">Welcome to Kurumi's</h2>
          <h2 className="main-title">Blog World.</h2>
        </div>
      </section>
      <section>
        <div className="relative grid grid-cols-2">
          {/* 두 이미지를 나란히 배치 */}
          <div className="representation-section">
            {/* 원하는 높이로 조정 가능 */}
            <Image
              src="/images/cafe-back.png"
              alt="cafe-back"
              fill
              className="backgroundImage object-cover"
            />
            <div className="overlay">
              <button className="post-title">Cafe</button>
            </div>
          </div>
          <div className="representation-section">
            <Image
              src="/images/musical-back.png"
              alt="musical-back"
              fill
              className="backgroundImage object-cover"
            />
            <div className="overlay">
              <button className="post-title">Musical</button>
            </div>
          </div>
        </div>
      </section>
      <section className="category-section">
        <div className="container">
          <button className="button border-[#FFD700] bg-[#FFD700]">
            <p className="text-white">Korea</p>
          </button>
          <button className="button border-[#FFC0CB] bg-[#FFC0CB]">
            <p className="text-black">Life</p>
          </button>
          <button className="button border-[#32CD32] bg-[#32CD32]">
            <p className="text-white">Sightseeing</p>
          </button>
        </div>
      </section>
      <section className="description-section">
        <Image
          src="/images/desc-back.png"
          alt="desc-back"
          fill
          className="backgroundImage object-cover"
        />
        <div className="desc-overlay">
          <p className="desc-title">
            A blog dedicated to recording and sharing useful information
          </p>
          <p className="desc-title">about living in Korea and Japan.</p>
        </div>
      </section>
      <section className="about-section">
        <div className="about-link">
          <Link href="/about" className="social-link underline">
            About
          </Link>
          {/* <a href="https://instagram.com" className="social-link">
            Instagram
          </a> */}
        </div>
      </section>
      <section className="footer-section">
        <Image
          src="/images/footer-back.png"
          alt="footer-back"
          fill
          className="backgroundImage object-cover"
        />
      </section>
    </div>
  );
}
