"use client";

import Link from "next/link";
import { useWriterContext } from "../context/WriterContext";
import Select from "@/components/common/Select";
import FileUploader from "@/components/common/FileUploader";
import ReactQuill from "react-quill";
import { useMemo } from "react";
import DateSelector from "@/components/common/DateSelector";

const WriterComponents = {
  Container: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="mt-10 flex w-full flex-col items-center justify-start">
        {children}
      </div>
    );
  },
  Navigation: () => {
    const { handlers } = useWriterContext();
    return (
      <div className="flex flex-row items-center justify-start gap-8">
        <Link href="/">Go To Home</Link>
        <button onClick={handlers.clickSubmit}>Save</button>
      </div>
    );
  },
  DateSelector: () => {
    const { handlers } = useWriterContext();
    return (
      <div className="mt-10 flex flex-row items-center justify-start gap-8">
        <DateSelector
          onChange={handlers.changeDate}
        />
      </div>
    );
  },
  Category: () => {
    const { state, handlers } = useWriterContext();
    return (
      <div className="mt-10 flex flex-row items-center justify-start gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Category
          </label>
          <Select
            value={state.category?.id.toString()}
            onChange={handlers.changeCategory}
            options={state.categories as any}
            placeholder="Choose Category"
            className="max-w-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            SubCategory
          </label>
          <Select
            value={state.subCategory?.id.toString()}
            onChange={handlers.changeSubCategory}
            options={state.subCategories as any}
            placeholder="Choose SubCategory"
            className="max-w-xs"
          />
        </div>
      </div>
    );
  },

  Content: () => {
    const { state, handlers } = useWriterContext();
    const modules = useMemo(
        () => ({
          toolbar: {
            // container에 등록되는 순서대로 tool 배치
            container: [
              [{ header: [1, 2, 3, false] }], // header 설정
              [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
              ],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ], // 리스트, 인덴트 설정
              ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
            ],
          },
        }),
        [],
      ),
      formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "map",
      ];

    return (
      <div className="flex max-w-lg flex-col items-center justify-start">
        <label htmlFor="title" className="mt-16">
          Thumbnail
        </label>
        <FileUploader
          isUploading={state.isUploading}
          progress={state.progress}
          onChangeFiles={handlers.changeFiles}
          accept="image/*"
          className="w-full max-w-md"
        >
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-blue-500">
            {state.thumbnailFile ? (
              <img
                src={state.thumbnailFile?.url}
                alt="Thumbnail"
                className="h-48 w-full rounded object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center text-gray-500">
                클릭하여 썸네일 업로드
              </div>
            )}
          </div>
        </FileUploader>
        <label htmlFor="title" className="mt-10">
          Title
        </label>
        <input
          type="text"
          className="input mt-5 w-full text-black"
          aria-label="input"
          value={state.form.title}
          onChange={handlers.changeTitle}
        />
        {typeof window !== "undefined" && (
          <ReactQuill
            ref={state.quillRef}
            id={"quill-editor"}
            className="text-editor mt-10"
            style={{ width: "100%", height: "400px" }}
            formats={formats}
            modules={modules}
            theme="snow"
            value={state.form.content}
            onChange={handlers.changeContent}
          />
        )}
      </div>
    );
  },
};

export default WriterComponents;
