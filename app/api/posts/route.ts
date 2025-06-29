import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import {
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
} from "../../types/api";
import { serializeBigInt } from "../../lib/serializer";

// GET /api/posts - 모든 게시글 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const subcategoryId = searchParams.get("subCategoryId");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          deletedAt: null,
          ...(categoryId && { categoryId: Number(categoryId) }),
          ...(subcategoryId && { subcategoryId: Number(subcategoryId) }),
        },
        include: {
          category: true,
          subcategory: true,
          comments: {
            where: {
              deletedAt: null,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({
        where: {
          deletedAt: null,
          ...(categoryId && { categoryId: Number(categoryId) }),
          ...(subcategoryId && { subcategoryId: Number(subcategoryId) }),
        },
      }),
    ]);

    const serializedPosts = serializeBigInt(posts);

    const response: PaginatedResponse<any> = {
      data: serializedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

// POST /api/posts - 새 게시글 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      summary,
      thumbnail,
      publishedAt,
      referencePlace,
      images,
      attachFiles,
      categoryId,
      subcategoryId,
      authorId,
    } = body;

    if (!title || !content || !categoryId || !authorId || !publishedAt) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        summary,
        publishedAt,
        categoryId: Number(categoryId),
        subcategoryId: subcategoryId ? Number(subcategoryId) : null,
        thumbnail,
        referencePlace,
        images,
        attachFiles,
        viewCnt: 0,
        authorId: Number(authorId),
      },
      include: {
        category: true,
        subcategory: true,
      },
    });

    const serializedPost = serializeBigInt(post);

    return NextResponse.json({ data: serializedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
