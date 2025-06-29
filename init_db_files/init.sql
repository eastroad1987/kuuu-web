-- 데이터베이스 생성
CREATE DATABASE kuuu_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c kuuu_db;

-- 1. categories 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. subcategories 테이블 생성
CREATE TABLE IF NOT EXISTS sub_categories (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    title VARCHAR(255),
    anonymous_yn CHAR(1) CHECK (anonymous_yn IN ('Y', 'N')),
    title_yn CHAR(1) CHECK (title_yn IN ('Y', 'N')),
    content_yn CHAR(1) CHECK (content_yn IN ('Y', 'N')),
    thumbnail_yn CHAR(1) CHECK (thumbnail_yn IN ('Y', 'N')),
    reference_place_yn CHAR(1) CHECK (reference_place_yn IN ('Y', 'N')),
    secret_yn CHAR(1) CHECK (secret_yn IN ('Y', 'N')),
    images_yn CHAR(1) CHECK (images_yn IN ('Y', 'N')),
    attach_files_yn CHAR(1) CHECK (attach_files_yn IN ('Y', 'N')),
    comment_yn CHAR(1) CHECK (comment_yn IN ('Y', 'N')),
    view_cnt_yn CHAR(1) CHECK (view_cnt_yn IN ('Y', 'N')),
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- 3. posts 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    summary TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    thumbnail VARCHAR(255),
    reference_place VARCHAR(255),
    images TEXT,
    attach_files TEXT,
    author_id BIGINT NOT NULL,
    view_cnt INTEGER DEFAULT 0,
    subcategory_id BIGINT,
    category_id BIGINT NOT NULL,
    FOREIGN KEY (subcategory_id) REFERENCES sub_categories (id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- 4. comments 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    post_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    write_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255),
    parent_comment_id BIGINT,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments (id) ON DELETE CASCADE
);

-- uploadfiles 테이블 생성
CREATE TABLE IF NOT EXISTS upload_files (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    name TEXT,
    original_name TEXT,
    encoding VARCHAR(255),
    mime_type VARCHAR(255),
    size DECIMAL(10,2),
    url TEXT
);

-- users 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    password VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    device_token VARCHAR(255),
    image_url VARCHAR(255),
    sns_id VARCHAR(255)
);

-- updated_at 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 각 테이블에 updated_at 트리거 생성
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sub_categories_updated_at
    BEFORE UPDATE ON sub_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_upload_files_updated_at
    BEFORE UPDATE ON upload_files
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입
INSERT INTO categories (title) VALUES
('Musical&Movie'),
('Life'),
('Cafe&Restrant'),
('Sightseeing');

INSERT INTO sub_categories (title, anonymous_yn, title_yn, content_yn, thumbnail_yn, reference_place_yn, secret_yn, images_yn, attach_files_yn, comment_yn, view_cnt_yn, category_id) VALUES
('Japan', 'N', 'Y', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'N', 'Y', 1),
('Korea', 'N', 'Y', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'N', 'Y', 1),
('Movie', 'N', 'Y', 'Y', 'N', 'N', 'N', 'Y', 'N', 'N', 'Y', 1),
('Others', 'N', 'Y', 'Y', 'N', 'N', 'N', 'Y', 'Y', 'N', 'Y', 1),
('Japan', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('Korea', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('Marriage', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'N', 'N', 'Y', 2),
('Mart Shopping', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 2),
('Others', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'Y', 2),
('Seoul Cafe', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('Seoul Restrant', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('Tokyo Cafe', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('Tokyo Restrant', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 3),
('Others', 'N', 'Y', 'Y', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'Y', 3),
('Others', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'N', 'N', 'Y', 4);