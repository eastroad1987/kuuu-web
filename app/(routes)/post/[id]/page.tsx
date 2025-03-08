"use client";

import PostComponents from "../components/PostPage";
import PostLayout from "../context/PostLayout";
import usePost from "../hooks/usePost";

interface PageProps {
  id: string;
}

const PostPage = ({ params }: { params: PageProps }) => {
  const { id } = params;

  const usePostHook = usePost(id);

  return (
    <PostLayout value={usePostHook}>
      <PostComponents.Container>
        <PostComponents.Header />
        <PostComponents.SideMenu />
        <PostComponents.Post />
      </PostComponents.Container>
    </PostLayout>
  );
};

export default PostPage;
