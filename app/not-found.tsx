"use client";
const Custom404 = () => {
  return (
    <div className="absolute inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[400px] rounded-lg bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold text-black">404 Not Found.</p>
          <p className="text-black">페이지를 찾을수 없습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
