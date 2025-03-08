"use client";

import { useState, useRef } from "react";
import { uploadFile, uploadMultipleFiles } from "@/libs/api/file";

interface FileUploaderProps {
  isUploading: boolean;
  progress: number;
  onChangeFiles: (files: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  children?: React.ReactNode;
}

export default function FileUploader({
  isUploading,
  progress,
  onChangeFiles,
  multiple = false,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
  children,
}: FileUploaderProps) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: any, callback: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateFiles = (files: FileList | null): File[] => {
    if (!files || files.length === 0) return [];

    const validFiles: File[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        throw new Error(
          `File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`,
        );
      }
      validFiles.push(file);
    });

    return validFiles;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const validFiles = validateFiles(files);
    if (validFiles.length === 0) return;
    
    let result = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      readFile(file, (readed: any) => {
        result.push({ file: file, url: readed });
        if (i == files.length - 1) {
          onChangeFiles(result as any);
        }
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
      <div
        onClick={handleClick}
        className={`cursor-pointer ${isUploading ? "pointer-events-none" : ""}`}
      >
        {children || (
          <button
            type="button"
            disabled={isUploading}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isUploading ? `Uploading... ${progress}%` : "Upload File"}
          </button>
        )}
      </div>
      {isUploading && (
        <div className="mt-2 h-2 w-full rounded bg-gray-200">
          <div
            className="h-full rounded bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
