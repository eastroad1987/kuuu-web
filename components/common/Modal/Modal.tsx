"use client";

import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 z-[1001] bg-black/50">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-[400px] rounded-lg bg-white p-6">
          {children}
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
