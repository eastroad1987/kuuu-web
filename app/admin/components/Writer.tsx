"use client";

import Link from "next/link";
import { useWriterContext } from "../context/WriterContext";
import Select from "@/components/common/Select";
import FileUploader from "@/components/common/FileUploader";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import DateSelector from "@/components/common/DateSelector";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];

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
        <button id="save-button" onClick={handlers.clickSubmit}>
          Save
        </button>
      </div>
    );
  },
  DateSelector: () => {
    const { handlers } = useWriterContext();
    return (
      <div className="mt-10 flex flex-row items-center justify-start gap-8">
        <DateSelector onChange={handlers.changeDate} />
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
    const quillModules = useMemo(() => modules, []);
    const quillFormats = useMemo(() => formats, []);


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
              <Image
                src={state.thumbnailFile?.url}
                alt="Thumbnail"
                width={500}
                height={300}
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
          className="input mt-5 w-full rounded-md border-2 border-gray-300 bg-white text-black"
          aria-label="input"
          value={state.form.title}
          onChange={handlers.changeTitle}
        />
        {typeof window !== undefined && (
          <div className="h-full w-full">
            <ReactQuill
              id="quill-editor"
              className="text-editor mt-10"
              style={{ width: "100%", height: "400px" }}
              formats={quillFormats}
              modules={quillModules}
              theme="snow"
              value={state.form.content}
              onChange={handlers.changeContent}
            />
          </div>
        )}
      </div>
    );
  },
};

export default WriterComponents;
