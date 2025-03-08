import { Category, Post, SubCategory, UploadFile, User } from "./entities";

// 생성 요청 DTO 인터페이스
interface CreateCategoryDto {
  title: string;
}

interface CreateSubCategoryDto {
  id?: any;
  title: string;
  anonymous_yn: 'Y' | 'N';
  title_yn: 'Y' | 'N';
  content_yn: 'Y' | 'N';
  thumbnail_yn: 'Y' | 'N';
  reference_place_yn: 'Y' | 'N';
  secret_yn: 'Y' | 'N';
  images_yn: 'Y' | 'N';
  attach_files_yn: 'Y' | 'N';
  comment_yn: 'Y' | 'N';
  view_cnt_yn: 'Y' | 'N';
  category_id: bigint;
}

interface CreatePostDto {
  summary: string;
  title: string;
  content: string;
  thumbnail?: string;
  referencePlace?: string;
  images?: string;
  attachFiles?: string;
  categoryId: any;
  subcategoryId?: any;
}

interface CreateCommentDto {
  post_id: bigint;
  author_id: bigint;
  content: string;
  write_name: string;
  file_path?: string;
  parent_comment_id?: bigint;
}

interface CreateUploadFileDto {
  name?: string;
  original_name?: string;
  encoding?: string;
  mime_type?: string;
  size?: number;
  url?: string;
}

interface CreateUserDto {
  email: string;
  name: string;
  role?: 'user' | 'admin';
  password: string;
  device_token?: string;
  image_url?: string;
  sns_id?: string;
}


// 응답 DTO 인터페이스
interface CategoryResponse extends Omit<Category, 'deleted_at'> {}
interface SubCategoryResponse extends Omit<SubCategory, 'deleted_at'> {}
interface PostResponse extends Omit<Post, 'deleted_at'> {}
interface UploadFileResponse extends Omit<UploadFile, 'deleted_at'> {}
interface UserResponse extends Omit<User, 'deleted_at' | 'password'> {}

export type {
  CreateCategoryDto,
  CreateSubCategoryDto,
  CreatePostDto,
  CreateCommentDto,
  CreateUploadFileDto,
  CreateUserDto,
  CategoryResponse,
  SubCategoryResponse,
  PostResponse,
  UploadFileResponse,
  UserResponse
};