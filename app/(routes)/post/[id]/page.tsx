'use client';

import ResponsiveWrapper from '@/components/common/ResponsiveWrapper';
import PostComponent from '../components/Post';
import usePost from '../hooks/usePost';
import { Suspense } from 'react';

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const usePostHook = usePost(id);

  return (
    <PostComponent value={usePostHook}>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">지원 페이지 로딩 중...</div>}>
        <ResponsiveWrapper
          WebComponent={PostComponent.Web}
          MobileComponent={PostComponent.Mobile}
        />
      </Suspense>
    </PostComponent>
  );
};

export default PostPage;
