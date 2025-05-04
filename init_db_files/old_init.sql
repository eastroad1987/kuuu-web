-- 데이터베이스 생성
CREATE DATABASE "kuuu_db"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- 데이터베이스 선택
\c kuuu_db;

-- Board 테이블 생성
CREATE TABLE IF NOT EXISTS Boards (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    board_name VARCHAR(255),
    board_type VARCHAR(128),
    anonymous_yn CHAR(1) CHECK(anonymous_yn IN ('Y', 'N')),
    title_yn CHAR(1) CHECK(title_yn IN ('Y', 'N')),
    content_yn CHAR(1) CHECK(content_yn IN ('Y', 'N')),
    thumbnail_yn CHAR(1) CHECK(thumbnail_yn IN ('Y', 'N')),
    reference_place_yn CHAR(1) CHECK(reference_place_yn IN ('Y', 'N')),
    secret_yn CHAR(1) CHECK(secret_yn IN ('Y', 'N')),
    images_yn CHAR(1) CHECK(images_yn IN ('Y', 'N')),
    attach_files_yn CHAR(1) CHECK(attach_files_yn IN ('Y', 'N')),
    comment_yn CHAR(1) CHECK(comment_yn IN ('Y', 'N')),
    view_cnt_yn CHAR(1) CHECK(view_cnt_yn IN ('Y', 'N'))
);

-- Article 테이블 생성
CREATE TABLE IF NOT EXISTS Articles (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    board_id INTEGER NOT NULL,
    writer_id INTEGER NOT NULL,
    writer_name VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    summary TEXT,
    thumbnail JSONB,
    reference_place JSONB,
    images JSONB,
    attach_files JSONB,
    view_cnt INTEGER DEFAULT 0,
    FOREIGN KEY (board_id) REFERENCES Board(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ArticleComment 테이블 생성
CREATE TABLE IF NOT EXISTS ArticleComments (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    article_id INTEGER NOT NULL,
    writer_id INTEGER,
    writer_name VARCHAR(255),
    comment TEXT,
    file_path VARCHAR(500),
    FOREIGN KEY (article_id) REFERENCES Article(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- UploadFile 테이블 생성
CREATE TABLE IF NOT EXISTS UploadFiles (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    name VARCHAR(255),
    original_name VARCHAR(255),
    encoding VARCHAR(255),
    mime_type VARCHAR(255),
    size DECIMAL(10,2),
    url VARCHAR(255)
);

-- 먼저 ROLE enum 타입 생성
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- users 테이블 생성
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    access_token VARCHAR(255) NULL,
    refresh_token VARCHAR(255) NULL,
    device_token VARCHAR(255) NULL,
    image_url VARCHAR(255) NULL,
    sns_id VARCHAR(255) NULL
);

-- updated_at 컬럼을 자동으로 업데이트하기 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 자동 업데이트를 위한 트리거 생성
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON Users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성 (검색 성능 향상을 위해)
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_deleted_at ON Users(deleted_at);
CREATE INDEX IF NOT EXISTS idx_article_boardId ON Article(board_id);
CREATE INDEX IF NOT EXISTS idx_article_writerId ON Article(writer_id);
CREATE INDEX IF NOT EXISTS idx_comment_articleId ON ArticleComment(article_id);
CREATE INDEX IF NOT EXISTS idx_comment_writerId ON ArticleComment(writer_id);
CREATE INDEX IF NOT EXISTS idx_uploadfile_name ON UploadFile(name);