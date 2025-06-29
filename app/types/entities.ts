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
  subcategories: SubCategory[];
}

// SubCategories 테이블
interface SubCategory extends BaseEntity {
  title: string;
  anonymous_yn: "Y" | "N";
  title_yn: "Y" | "N";
  content_yn: "Y" | "N";
  thumbnail_yn: "Y" | "N";
  reference_place_yn: "Y" | "N";
  secret_yn: "Y" | "N";
  images_yn: "Y" | "N";
  attach_files_yn: "Y" | "N";
  comment_yn: "Y" | "N";
  view_cnt_yn: "Y" | "N";
  category_id: bigint;
}

// Posts 테이블
interface Post extends BaseEntity {
  id: bigint;
  published_at: Date;
  summary: string;
  title: string;
  content: string;
  thumbnail: string | null;
  referencePlace: string | null;
  images: string | null;
  attachFiles: string | null;
  authorId: bigint;
  viewCnt: number;
  subcategoryId: bigint | null;
  categoryId: bigint;
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
  role: "user" | "admin";
  password: string;
  access_token: string | null;
  refresh_token: string | null;
  device_token: string | null;
  image_url: string | null;
  sns_id: string | null;
}

export type {
  BaseEntity,
  Category,
  SubCategory,
  Post,
  Comment,
  UploadFile,
  User,
};
