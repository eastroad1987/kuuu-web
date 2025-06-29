"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ApiResponse, PaginatedResponse } from "@/types/api";

// 카테고리 조회
export const useGetCategories = () => {
  return useQuery<ApiResponse<PaginatedResponse<any>>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
};

export const useGetSubCategoriesByCategoryId = (categoryId: number) => {
  return useQuery<ApiResponse<PaginatedResponse<any>>>({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      const response = await fetch(
        `/api/subcategories?categoryId=${categoryId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts by sub category");
      }
      return response.json();
    },
  });
};

// 게시글 조회
export const useGetPosts = (params?: {
  page?: number;
  limit?: number;
  categoryId?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.categoryId)
    queryParams.append("categoryId", params.categoryId.toString());

  return useQuery<ApiResponse<PaginatedResponse<any>>>({
    queryKey: ["posts", params],
    queryFn: async () => {
      const response = await fetch(`/api/posts?${queryParams.toString()}`);
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch posts");
      }
      return response.json();
    },
  });
};

// 특정 기간의 게시글 조회
export const useGetPostsByPeriod = (startDate: string, endDate: string) => {
  return useQuery<ApiResponse<PaginatedResponse<any>>>({
    queryKey: ["posts", startDate, endDate],
    queryFn: async () => {
      const response = await fetch(
        `/api/posts?startDate=${startDate}&endDate=${endDate}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts by period");
      }
      return response.json();
    },
  });
};

export const useGetPostBySubCategoryId = (subCategoryId: number) => {
  return useQuery<ApiResponse<any>>({
    queryKey: ["post", subCategoryId],
    queryFn: async () => {
      const response = await fetch(`/api/posts?subCategoryId=${subCategoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      return response.json();
    },
  });
};

export const useGetPostById = (id: string) => {
  return useQuery<ApiResponse<any>>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      return response.json();
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      publishedAt: string;
      content: string;
      summary: string;
      thumbnail: string;
      referencePlace: string;
      images: string;
      attachFiles: string;
      categoryId: number;
      subcategoryId: number;
      authorId: number;
    }) => {
      console.log("data", data);
      console.log("json", JSON.stringify(data));
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        content?: string;
        summary?: string;
        thumbnail?: string;
        referencePlace?: string;
        images?: string;
        attachFiles?: string;
        categoryId?: number;
        subcategoryId?: number;
      };
    }) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return response.json();
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

export const useGetS3SignedUrl = () => {
  return useMutation({
    mutationFn: async (data: { fileName: string; fileType: string }) => {
      const response = await fetch("/api/s3/signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }

      return response.json();
    },
  });
};

export const useS3UploadMultipart = () => {
  return useMutation({
    mutationFn: async (data: {
      uploadId: string;
      partNumber: number;
      file: File;
      signedUrl: string;
    }) => {
      const response = await fetch(data.signedUrl, {
        method: "PUT",
        body: data.file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload part");
      }

      return response.headers.get("ETag");
    },
  });
};

export const useS3AbortUpload = () => {
  return useMutation({
    mutationFn: async (data: { uploadId: string; fileName: string }) => {
      const response = await fetch("/api/s3/abort-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to abort upload");
      }

      return response.json();
    },
  });
};

export const useS3UploadFile = () => {
  const getSignedUrl = useGetS3SignedUrl();

  return useMutation({
    mutationFn: async (data: { file: File }) => {
      // 1. Get signed URL
      const { data: signedUrlData } = await getSignedUrl.mutateAsync({
        fileName: data.file.name,
        fileType: data.file.type,
      });

      // 2. Upload file using signed URL
      const response = await fetch(signedUrlData.signedUrl, {
        method: "PUT",
        body: data.file,
        headers: {
          "Content-Type": data.file.type,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      return signedUrlData.key;
    },
  });
};
