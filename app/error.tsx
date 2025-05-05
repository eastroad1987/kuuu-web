"use client";

export default function Error() {
  return (
    <div className="absolute inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8">
          <h1 className="text-2xl font-bold text-black">시스템 점검중입니다.</h1>
          <p className="text-black">
            잠시 후 다시 시도해 주세요.
          </p>
          <p className="text-black">
            불편을 드려 죄송합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
