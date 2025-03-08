"use client"

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 전체 URL 가져오기
  const getFullUrl = useCallback(() => {
    // 클라이언트 사이드에서만 동작
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const queryString = searchParams.toString();
      const query = queryString ? `?${queryString}` : '';
      
      return `${origin}${pathname}${query}`;
    }
    return '';
  }, [pathname, searchParams]);
  
  // 현재 URL의 각 부분
  return {
    pathname,                         // 예: '/blog/123'
    searchParams,                     // URLSearchParams 객체
    query: Object.fromEntries(searchParams), // 예: { page: '1', sort: 'desc' }
    fullUrl: getFullUrl(),            // 예: 'https://example.com/blog/123?page=1'
    origin: typeof window !== 'undefined' ? window.location.origin : '',
    hash: typeof window !== 'undefined' ? window.location.hash : ''
  };
}