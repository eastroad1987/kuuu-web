"use client";

import { useSearchParams } from "next/navigation";
import WriterComponents from "./components/Writer";
import WriterLayout from "./context/WriterLayout";
import useWriter from "./hooks/useWriter";

const AdminPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  
  const useWriterHook = useWriter(postId);

  return (
    <WriterLayout value={useWriterHook}>
      <WriterComponents.Container>
        <WriterComponents.Navigation />
        <WriterComponents.DateSelector />
        <WriterComponents.Category />
        <WriterComponents.Content />
      </WriterComponents.Container>
    </WriterLayout>
  );
};

export default AdminPage;
