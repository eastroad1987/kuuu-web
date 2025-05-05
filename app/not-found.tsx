"use client";
export default function NotFound() {
  return (
    <div className="absolute inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8">
          <h1 className="text-2xl font-bold text-black">404 Not Found</h1>
          <p className="text-black">페이지를 찾을 수 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
