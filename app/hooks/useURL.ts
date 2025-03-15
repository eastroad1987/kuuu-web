"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';

export interface UseUrlOptions {
  /**
   * 자동으로 URL 상태를 업데이트할 간격 (ms)
   * 0이면 비활성화 (기본값)
   */
  refreshInterval?: number;
  
  /**
   * URL 매개변수 변경 시 페이지 이동 없이 URL만 업데이트
   */
  shallow?: boolean;
}

/**
 * URL 관련 정보와 유틸리티 함수를 제공하는 훅
 */
export function useUrl(options: UseUrlOptions = {}) {
  const { refreshInterval = 0, shallow = true } = options;
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // pathname과 searchParams가 바뀔 때마다 갱신할 ref
  const currentUrlRef = useRef<string>('');
  
  // window 관련 상태를 별도로 관리
  const [windowInfo, setWindowInfo] = useState({
    origin: '',
    hash: '',
    isClient: false
  });
  
  // 클라이언트 사이드에서만 window 정보 업데이트
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowInfo({
        origin: window.location.origin,
        hash: window.location.hash,
        isClient: true
      });
      
      // 초기 URL 저장
      currentUrlRef.current = window.location.href;
    }
  }, []);
  
  // searchParams를 객체로 변환 (메모이제이션)
  const query = useMemo(() => {
    if (!searchParams) return {};
    return Object.fromEntries(searchParams);
  }, [searchParams]);
  
  // 검색 매개변수 문자열 생성 함수
  const createQueryString = useCallback((params: Record<string, string>) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value);
      }
    });
    
    return urlSearchParams.toString();
  }, [searchParams]);
  
  // 전체 URL 계산 (메모이제이션)
  const getFullUrl = useCallback(() => {
    if (!windowInfo.isClient || !windowInfo.origin) return '';
    
    const queryString = searchParams.toString();
    const queryParam = queryString ? `?${queryString}` : '';
    const hash = windowInfo.hash || '';
    
    return `${windowInfo.origin}${pathname}${queryParam}${hash}`;
  }, [pathname, searchParams, windowInfo]);
  
  // 최종 URL 문자열을 메모이제이션
  const fullUrl = useMemo(() => getFullUrl(), [getFullUrl]);
  
  // 쿼리 매개변수 업데이트 함수
  const updateQueryParams = useCallback((
    params: Record<string, string | null>,
    { replace = false } = {}
  ) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value);
      }
    });
    
    const queryString = urlSearchParams.toString();
    const newUrl = `${pathname}${queryString ? '?' : ''}${queryString}`;
    
    if (shallow) {
      if (replace) {
        router.replace(newUrl);
      } else {
        router.push(newUrl);
      }
    } else {
      window.history[replace ? 'replaceState' : 'pushState'](
        null, 
        '', 
        newUrl
      );
    }
  }, [pathname, searchParams, router, shallow]);
  
  // URL 변경 감지 및 주기적 갱신
  useEffect(() => {
    // URL 간격 갱신이 비활성화된 경우 종료
    if (!refreshInterval || !windowInfo.isClient) return;
    
    const checkUrlChanges = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== currentUrlRef.current) {
        currentUrlRef.current = currentUrl;
        // URL 변경 감지 시 window 정보 업데이트
        setWindowInfo({
          origin: window.location.origin,
          hash: window.location.hash,
          isClient: true
        });
      }
    };
    
    const intervalId = setInterval(checkUrlChanges, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval, windowInfo.isClient]);
  
  // 주소를 복사하는 함수
  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
        return true;
      }
      
      // 폴백 방식
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (error) {
      console.error('Failed to copy URL:', error);
      return false;
    }
  }, [fullUrl]);
  
  return {
    // 기본 URL 정보
    pathname,
    searchParams,
    query,
    fullUrl,
    origin: windowInfo.origin,
    hash: windowInfo.hash,
    isClient: windowInfo.isClient,
    
    // 유틸리티 함수
    getQueryParam: useCallback((key: string) => searchParams.get(key), [searchParams]),
    hasQueryParam: useCallback((key: string) => searchParams.has(key), [searchParams]),
    updateQueryParams,
    createQueryString,
    copyToClipboard
  };
}