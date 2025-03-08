import { CategoryResponse, CreatePostDto } from "@/types/dto";
import {
  useBatch,
  useCreate,
  useDelete,
  useGetList,
  useGetOne,
  useGetQuery,
  useUpdate,
  axiosFileUpload,
} from "./request";

export const uploadFile = (file: any) => {
  return axiosFileUpload<any, any>("/upload-file", file);
};

export const useGetCategories = () => {
  return useGetList<any>("categories", `/categories/all`);
};

export const useGetCategory = (categoryId: string) => {
  return useGetQuery<any>("category", `/categories/${categoryId}`);
};

export const useGetPostsBySubCategory = (subCategoryId: string) => {
  return useGetList<any>("posts", `/subcategory/${subCategoryId}/posts`);
};

export const useGetPostById = (postId: string) => {
  return useGetOne<any>("post", `/posts/${postId}`);
};

export const useGetPostsByPeriod = (startDate: string, endDate: string) => {
  return useGetList<any>("postsByPeriod", `/posts/monthly/list?startDate=${startDate}&endDate=${endDate}`);
};

export const useGetPosts = (query: any) => {
  return useGetQuery<any>("allPost", `/posts`, query);
};

export const useCreatePost = (post: CreatePostDto) => {
  return useCreate<CreatePostDto, any>(`/posts`);
};


