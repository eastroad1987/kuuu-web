"use client";

import "react-quill/dist/quill.snow.css";
import "../../styles/writer.css";
import "../../styles/quill-image-resize.css";

import { useEffect, useMemo, useRef } from "react";

import DateSelector from "@/components/common/DateSelector";
import FileUploader from "@/components/common/FileUploader";
import Image from "next/image";
import ImageResize from "../utils/quillImageResize";
import Link from "next/link";
import Select from "@/components/common/Select";
import dynamic from "next/dynamic";
import { useWriterContext } from "../context/WriterContext";

// Import React Quill with proper dynamic import handling for Next.js
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // Only register the module on client-side
    if (typeof window !== "undefined") {
      // Make Quill available globally for the resize module to access
      window.Quill = RQ.Quill;
      // Register our custom image resize module
      RQ.Quill.register("modules/imageResize", ImageResize);
    }
    return RQ;
  },
  { ssr: false, loading: () => <p>Loading editor...</p> },
);

// Custom image resizing functionality with size controls
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
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
    ],
  },
  // Add image resize module
  imageResize: {
    displaySize: true, // Show image dimensions when resizing
    handleColor: "#0078d4", // Resize handle color
    modules: ["Resize", "DisplaySize"],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
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

    // Initialize the Quill image resize module after component mounts
    useEffect(() => {
      if (typeof window !== "undefined") {
        // Quill editor initialized with image resize capabilities
        console.log("Quill editor initialized with image resize capabilities");
      }
    }, []);

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
            {state.thumbnailFile || state.form.thumbnail ? (
              <div className="relative">
                <Image
                  src={state.thumbnailFile?.url || state.form.thumbnail || ""}
                  alt="Thumbnail"
                  width={500}
                  height={300}
                  className="h-48 w-full rounded object-contain"
                />
                <button
                  type="button"
                  onClick={handlers.deleteThumbnail}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                  aria-label="썸네일 삭제"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
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
              style={{ width: "100%", height: "400px", marginBottom: "100px" }}
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
