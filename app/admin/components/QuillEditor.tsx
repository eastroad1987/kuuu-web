"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
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
];

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditorComponent({ value, onChange }: QuillEditorProps) {
  const quillModules = useMemo(() => modules, []);
  const quillFormats = useMemo(() => formats, []);

  return (
    <div className="h-[500px] w-full">
      <QuillEditor
        theme="snow"
        value={value}
        onChange={onChange}
        modules={quillModules}
        formats={quillFormats}
        className="h-full"
      />
    </div>
  );
} 