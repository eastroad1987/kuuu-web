"use client";

import WriterComponents from "./components/Writer";
import WriterLayout from "./context/WriterLayout";
import useWriter from "./hooks/useWriter";

const AdminPage = () => {
  const useWriterHook = useWriter();

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
