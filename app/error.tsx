"use client";
const Custom500 = () => {
  return (
    <div className="absolute inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[400px] rounded-lg bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold text-black">시스템 점검중입니다.</p>
          <p className="text-black">
            현재 일부 서비스 사용이 원활하지 않습니다.
          </p>
          <p className="text-black">
            신속하게 조치될 수 있도록 최선을 다하겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Custom500;
