// components/auth/LoginModal.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Modal from "../common/Modal/Modal";
import Login from "../../@modal/(.)auth/components/Login";

export default function LoginModal() {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  return (
    <Modal>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
        <div className="relative max-w-md w-full">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="닫기"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          {/* 로그인 컴포넌트 */}
          <Login />
        </div>
      </div>
    </Modal>
  );
}
