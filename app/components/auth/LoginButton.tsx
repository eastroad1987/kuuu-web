'use client';

import { faSignOutAlt, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  // const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth');
  };

  const handleLogout = async () => {
    try {
      // await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  if (status === 'loading') {
    return (
      <button disabled className="flex items-center px-4 py-2 text-sm text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-4 h-4 mr-2" />
        로딩중...
      </button>
    );
  }

  // if (session) {
  //   return (
  //     <div className="flex items-center space-x-4">
  //       <span className="text-sm text-gray-700">
  //         <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-1" />
  //         {session.user?.name || session.user?.email}
  //       </span>
  //       <button
  //         onClick={handleLogout}
  //         className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
  //       >
  //         <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
  //         로그아웃
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
    >
      <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
      로그인
    </button>
  );
}
