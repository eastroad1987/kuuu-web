"use client";
// import Image from "next/image";
// import SystemChecked from "@/assets/images/system_checked.png";
// import FTypography from "@/components/common/Typography";

const Custom500 = () => {
  return (
    <div className="flex flex-col justify-start items-center p-9 h-screen">
      {/* <div className="mt-[298px] p-5">
        <Image
          alt="system_error_icon"
          src={SystemChecked}
          width={280}
          height={160}
        />
      </div>
      <FTypography
        sx={{ marginTop: "12px" }}
        type="heading5"
        text="시스템 점검중입니다"
      />
      <FTypography
        sx={{ marginTop: "8px", whiteSpace: "pre-wrap", textAlign: "center" }}
        type="body2"
        text={`${"현재 일부 서비스 사용이 원활하지 않습니다.\n신속하게 조치될 수 있도록 최선을 다하겠습니다."}`}
      /> */}
      시스템 점검중입니다.
      현재 일부 서비스 사용이 원활하지 않습니다.\n신속하게 조치될 수 있도록 최선을 다하겠습니다.
    </div>
  );
};

export default Custom500;
