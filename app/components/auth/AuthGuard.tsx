'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallbackUrl?: string;
}

export default function AuthGuard({ 
  children, 
  requireAdmin = false, 
  fallbackUrl = '/auth' 
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 대기

    if (!isAuthenticated) {
      // 로그인되지 않은 경우
      router.push(fallbackUrl);
      return;
    }

    if (requireAdmin && user?.role !== 'admin') {
      // 관리자 권한이 필요하지만 관리자가 아닌 경우
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, isLoading, user, router, requireAdmin, fallbackUrl]);

  // 로딩 중이거나 인증되지 않은 경우 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  if (requireAdmin && user?.role !== 'admin') {
    return null; // 권한 없음, 리다이렉트 중
  }

  return <>{children}</>;
}
