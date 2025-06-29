-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "YnEnum" AS ENUM ('Y', 'N');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'user',
    "access_token" TEXT,
    "refresh_token" TEXT,
    "device_token" TEXT,
    "image_url" TEXT,
    "sns_id" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "anonymous_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "title_yn" "YnEnum" NOT NULL DEFAULT 'Y',
    "content_yn" "YnEnum" NOT NULL DEFAULT 'Y',
    "thumbnail_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "reference_place_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "secret_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "images_yn" "YnEnum" NOT NULL DEFAULT 'Y',
    "attach_files_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "comment_yn" "YnEnum" NOT NULL DEFAULT 'N',
    "view_cnt_yn" "YnEnum" NOT NULL DEFAULT 'Y',
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" BIGSERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT,
    "reference_place" TEXT,
    "images" TEXT,
    "attach_files" TEXT,
    "view_cnt" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "published_at" TIMESTAMP(6),
    "author_id" BIGINT NOT NULL,
    "subcategory_id" BIGINT,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "write_name" TEXT NOT NULL,
    "file_path" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "post_id" BIGINT NOT NULL,
    "author_id" BIGINT NOT NULL,
    "parent_comment_id" BIGINT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload_files" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "original_name" TEXT,
    "encoding" TEXT,
    "mime_type" TEXT,
    "size" DECIMAL(10,2) NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "post_id" BIGINT,

    CONSTRAINT "upload_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload_files" ADD CONSTRAINT "upload_files_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
