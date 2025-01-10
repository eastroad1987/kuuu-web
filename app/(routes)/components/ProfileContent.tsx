"use client";

import Image from "next/image";

interface InputProps {
  show: boolean;
}

export default function ProfileContent({ show }: InputProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      <div className="profile-container">
        <div className="profile-left-container">
          <div className="profile-text">
            <h1>Profile</h1>
            <h2>프로필</h2>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="text-4xl">KURUMI</h2>
            <div className="w-[40%]">
              <LineSvg />
            </div>
            <h3 className="text-2xl">쿠루미</h3>
          </div>
          <div className="icons mb-10">
            <button className="icon mr-4">
              <LetterIcon />
            </button>
            <button className="icon ml-4">
              <OpenLetterIcon />
            </button>
          </div>
        </div>
        <div className="profile-right-container">
          <div className={`relative w-full h-full ${show ? "animate-slide-left" : ""}`}>
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
}

function LineSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 20"
      fill="none"
      stroke="white"
      stroke-width="2"
    >
      <line x1="10" y1="10" x2="190" y2="10"></line>
      <rect
        x="2"
        y="7"
        width="6"
        height="6"
        transform="rotate(45 5 10)"
        fill="white"
      ></rect>
      <rect
        x="192"
        y="7"
        width="6"
        height="6"
        transform="rotate(45 195 10)"
        fill="white"
      ></rect>
    </svg>
  );
}

function LetterIcon() {
  return (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M461.913,83.478H50.087C22.467,83.478,0,105.974,0,133.565v244.87c0,27.622,22.498,50.087,50.087,50.087h411.826 c27.578,0,50.087-22.453,50.087-50.087v-244.87C512,105.984,489.543,83.478,461.913,83.478z M460.563,116.87 c-8.494,8.494-186.871,186.871-192.757,192.758c-6.527,6.526-17.085,6.526-23.612,0C238.303,303.735,59.927,125.36,51.437,116.87 H460.563z M33.391,377.085V146.046l115.519,115.519L33.391,377.085z M62.567,395.13l109.954-109.954l48.061,48.061 c19.526,19.528,51.304,19.529,70.834,0l48.061-48.061L449.432,395.13H62.567z M478.609,377.085L363.089,261.565l115.519-115.519 V377.085z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

function OpenLetterIcon() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 272.814 272.814"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M260.7,106.606c0.545-2.581-0.289-5.372-2.423-7.222L148.876,4.545 c-6.992-6.061-17.945-6.061-24.938,0L14.537,99.384c-2.134,1.85-2.968,4.641-2.423,7.222c-0.098,0.757-0.164,1.543-0.164,2.386 v146.322c0,9.649,7.851,17.5,17.5,17.5h213.915c9.649,0,17.5-7.851,17.5-17.5V108.992 C260.865,108.149,260.798,107.363,260.7,106.606z M133.763,15.879c1.334-1.156,3.953-1.156,5.287,0l98.77,85.622l-29.943,23.072 V88.8c0-6.893-5.607-12.5-12.5-12.5H77.437c-6.893,0-12.5,5.607-12.5,12.5v35.773l-29.943-23.072L133.763,15.879z M192.878,136.132 L139.75,177.07c-0.779,0.6-2.029,0.958-3.343,0.958c-1.314,0-2.564-0.358-3.344-0.958l-53.126-40.938V91.3h112.941V136.132z M245.865,255.314c0,1.355-1.145,2.5-2.5,2.5H29.449c-1.355,0-2.5-1.145-2.5-2.5V114.239l96.958,74.712 c3.412,2.63,7.851,4.077,12.499,4.077c4.648,0,9.087-1.447,12.499-4.077l96.958-74.712V255.314z"></path>{" "}
      </g>
    </svg>
  );
}
