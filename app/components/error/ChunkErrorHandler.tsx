'use client';

import { useEffect } from 'react';

export default function ChunkErrorHandler() {
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent) => {
      const { message, filename } = event;
      
      // ChunkLoadError 감지
      if (
        message.includes('Loading chunk') ||
        message.includes('ChunkLoadError') ||
        filename?.includes('_next/static/chunks/')
      ) {
        console.warn('Chunk loading error detected:', message);
        
        // 페이지 새로고침으로 해결 시도
        if (confirm('페이지를 다시 로드해야 합니다. 새로고침하시겠습니까?')) {
          window.location.reload();
        }
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      
      if (
        error?.message?.includes('Loading chunk') ||
        error?.name === 'ChunkLoadError'
      ) {
        console.warn('Chunk loading promise rejection:', error);
        event.preventDefault();
        
        // 자동 새로고침 (사용자 확인 없이)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // 정리 함수
    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // 렌더링할 내용 없음
}
