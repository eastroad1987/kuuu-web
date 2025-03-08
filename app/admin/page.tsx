"use client";
import FileUploader from "@/components/common/FileUploader";
import Select from "@/components/common/Select";
import { uploadFile } from "@/libs/api";
import { CreatePostDto, CreateSubCategoryDto } from "@/types/dto";
import Link from "next/link";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useAppSelector } from "../redux/hooks";
import { useCreatePost } from "@/libs/api";
// import { useQuill } from 'react-quilljs';
export default function AdminPage() {
  const categories = useAppSelector(
    (store) => (store as any).reducers.Categories.categories,
  );

  const initialForm: CreatePostDto = {
    title: "",
    content: "",
    summary: "",
    thumbnail: "",
    referencePlace: "",
    images: "",
    attachFiles: "",
    categoryId: categories[0]?.id,
    subcategoryId: categories[0]?.subcategories[0]?.id,
  };

  const { mutate: createPost } = useCreatePost(initialForm);

  const [form, setForm] = useState<CreatePostDto>(initialForm);

  const [category, setCategory] = useState(categories[0]);

  const [subCategories, setSubCategories] = useState(
    categories.find((category: any) => category.id === category.id)
      ?.subcategories,
  );
  const [subCategory, setSubCategory] = useState<CreateSubCategoryDto>();

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

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

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      console.error(form.title, form.content);
      return;
    }

    let thumbnailUrl = "";
    if (thumbnailFile) {
      const formData = new FormData();
      formData.append("file", thumbnailFile?.file);
      const item: any = await uploadFile(formData);
      console.log("item: ", item);
      thumbnailUrl = item.data[0].url;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      const post = {
        ...form,
        thumbnail: thumbnailUrl,
        categoryId: Number(form.categoryId),
        subcategoryId: Number(form.subcategoryId),
      };
      await createPost(post);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      setProgress(0);
      setThumbnailFile(null);
      setForm(initialForm);
    }
  };

  const handleCategoryChange = (value: string) => {
    const selected = categories.find(
      (category: any) => category.id === Number(value),
    );
    setCategory(selected);
    setSubCategories(selected.subcategories);
    setSubCategory(selected.subcategories[0]);
    setForm({
      ...form,
      categoryId: selected.id,
      subcategoryId: selected.subcategories[0].id,
    });
  };

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(
      subCategories.find(
        (subCategory: any) => subCategory.id === Number(value),
      ),
    );

    setForm({
      ...form,
      subcategoryId: value,
    });
  };

  const handleChangeFiles = (files: any) => {
    if (!files) return;
    setThumbnailFile(files[0]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.currentTarget.value,
    });
  };

  const handleContentChange = (value: string) => {
    setForm({
      ...form,
      content: value,
    });
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-start">
      <div className="flex flex-row items-center justify-start gap-8">
        <Link href="/">Go To Home</Link>
        <button onClick={handleSubmit}>Save</button>
      </div>
      <div className="mt-10 flex flex-row items-center justify-start gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Category
          </label>
          <Select
            value={category?.id}
            onChange={handleCategoryChange}
            options={categories}
            placeholder="Choose Category"
            className="max-w-xs"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            SubCategory
          </label>
          <Select
            value={subCategory?.id}
            onChange={handleSubCategoryChange}
            options={subCategories}
            placeholder="Choose SubCategory"
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="flex max-w-lg flex-col items-center justify-start">
        <label htmlFor="title" className="mt-16">
          Thumbnail
        </label>
        <FileUploader
          isUploading={isUploading}
          progress={progress}
          onChangeFiles={handleChangeFiles}
          accept="image/*"
          className="w-full max-w-md"
        >
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-blue-500">
            {thumbnailFile ? (
              <img
                src={thumbnailFile?.url}
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
          value={form.title}
          onChange={handleTitleChange}
        />
        {typeof window !== "undefined" && (
          <ReactQuill
            ref={quillRef}
            id={"quill-editor"}
            className="text-editor mt-10"
            style={{ width: "100%", height: "400px" }}
            formats={formats}
            modules={modules}
            theme="snow"
            value={form.content}
            onChange={handleContentChange}
          />
        )}
      </div>
    </div>
  );
}
