"use client";

import { useState, useRef } from "react";
import { uploadFile, uploadMultipleFiles } from "../../lib/api/file";
import { compressImage, CompressionOptions } from "../../lib/utils/imageCompression";

interface FileUploaderProps {
  isUploading: boolean;
  progress: number;
  onChangeFiles: (files: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  children?: React.ReactNode;
  compressionOptions?: CompressionOptions;
  enableCompression?: boolean;
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
  compressionOptions = {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.8,
    format: 'image/jpeg'
  },
  enableCompression = true,
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
    const files = e.target.files;
    const validFiles = validateFiles(files);
    if (validFiles.length === 0) return;
    
    let result = [];
    for (let i = 0; i < validFiles.length; i++) {
      let file = validFiles[i];
      
      // Compress image if enabled and file is an image
      if (enableCompression && file.type.startsWith('image/')) {
        try {
          file = await compressImage(file, compressionOptions);
          console.log(`Image compressed: ${validFiles[i].name}`, {
            originalSize: (validFiles[i].size / 1024 / 1024).toFixed(2) + 'MB',
            compressedSize: (file.size / 1024 / 1024).toFixed(2) + 'MB',
            reduction: ((1 - file.size / validFiles[i].size) * 100).toFixed(1) + '%'
          });
        } catch (error) {
          console.error('Image compression failed:', error);
          // Use original file if compression fails
          file = validFiles[i];
        }
      }
      
      readFile(file, (readed: any) => {
        result.push({ file: file, url: readed });
        if (i === validFiles.length - 1) {
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
