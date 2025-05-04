import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { ApiResponse } from "../../../types/api";
import { serializeBigInt } from "../../../lib/serializer";

// GET /api/posts/[id] - 특정 게시글 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
      include: {
        category: true,
        subcategory: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const serializedPost = serializeBigInt(post);

    return NextResponse.json({
      data: serializedPost,
    });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

// PUT /api/posts/[id] - 게시글 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, categoryId, subcategoryId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.update({
      where: {
        id: BigInt(id),
      },
      data: {
        title,
        content,
        categoryId: categoryId ? BigInt(categoryId) : undefined,
        subcategoryId: subcategoryId ? BigInt(subcategoryId) : undefined,
      },
    });

    const serializedPost = serializeBigInt(post);

    return NextResponse.json({
      data: serializedPost,
    });
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

// DELETE /api/posts/[id] - 게시글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.update({
      where: {
        id: BigInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    const serializedPost = serializeBigInt(post);

    return NextResponse.json({
      data: serializedPost,
    });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}
