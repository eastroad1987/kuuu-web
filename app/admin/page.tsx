"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";

// import { useQuill } from 'react-quilljs';

export default function AdminPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = React.useRef<ReactQuill>(null);

  const modules = React.useMemo(
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const date = new Date();
    try {
      // await createPost({
      //   title: title,
      //   content,
      //   date,
      // }).then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = () => {
    console.log(content);
  };

  const handleBack = () => {
    console.log("back");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full mt-10">
      <div className="flex flex-row items-center justify-start gap-8">
        <button onClick={handleBack}>돌아가기</button>
        <button onClick={handlePreview}>미리보기</button>
        <button onClick={handleSubmit}>저장</button>
      </div>
      <div className="flex max-w-lg flex-col items-center justify-start">
        <label htmlFor="title" className="mt-16">Thumbnail</label>
        <button className="btn btn-primary mt-5">
          <img
            className="mask mask-squircle size-25"
            src="https://cdn.flyonui.com/fy-assets/components/radio/image-1.png"
            alt="mask image"
          />
        </button>
        <label htmlFor="title" className="mt-10">
          제목
        </label>
        <input
          type="text"
          className="input mt-5 w-full"
          aria-label="input"
          onChange={handleTitleChange}
        />
        <ReactQuill
          ref={quillRef}
          id={"quill-editor"}
          className="text-editor mt-10"
          style={{ width: "100%", height: "400px" }}
          formats={formats}
          modules={modules}
          theme="snow"
          value={content}
        />
      </div>
    </div>
  );
}
