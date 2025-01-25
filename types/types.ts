export enum YNEnum {
  Y = "Y",
  N = "N",
}

// 공통 필드 인터페이스
interface BaseEntity {
  id: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

// Categories 테이블
interface Category extends BaseEntity {
  title: string;
}

// SubCategories 테이블
interface SubCategory extends BaseEntity {
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

// Posts 테이블
interface Post extends BaseEntity {
  summary: string;
  title: string;
  content: string;
  thumbnail: string | null;
  reference_place: string | null;
  images: string | null;
  attach_files: string | null;
  author_id: bigint;
  view_cnt: number;
  subcategory_id: bigint | null;
  category_id: bigint;
}

// Comments 테이블
interface Comment extends BaseEntity {
  post_id: bigint;
  author_id: bigint;
  content: string;
  write_name: string;
  file_path: string | null;
  parent_comment_id: bigint | null;
}

// UploadFiles 테이블
interface UploadFile extends BaseEntity {
  name: string | null;
  original_name: string | null;
  encoding: string | null;
  mime_type: string | null;
  size: number | null;
  url: string | null;
}

// Users 테이블
interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'user' | 'admin';
  password: string;
  access_token: string | null;
  refresh_token: string | null;
  device_token: string | null;
  image_url: string | null;
  sns_id: string | null;
}

// 생성 요청 DTO 인터페이스
interface CreateCategoryDto {
  title: string;
}

interface CreateSubCategoryDto {
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
  reference_place?: string;
  images?: string;
  attach_files?: string;
  author_id: bigint;
  subcategory_id?: bigint;
  category_id: bigint;
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
interface CommentResponse extends Omit<Comment, 'deleted_at'> {}
interface UploadFileResponse extends Omit<UploadFile, 'deleted_at'> {}
interface UserResponse extends Omit<User, 'deleted_at' | 'password'> {}

export type {
  BaseEntity,
  Category,
  SubCategory,
  Post,
  Comment,
  UploadFile,
  User,
  CreateCategoryDto,
  CreateSubCategoryDto,
  CreatePostDto,
  CreateCommentDto,
  CreateUploadFileDto,
  CreateUserDto,
  CategoryResponse,
  SubCategoryResponse,
  PostResponse,
  CommentResponse,
  UploadFileResponse,
  UserResponse
};