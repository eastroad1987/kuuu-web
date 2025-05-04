import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { serializeBigInt } from "../../lib/serializer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId ? Number(postId) : undefined,
        deletedAt: null,
      },
    });

    const serializedComments = serializeBigInt(comments);

    return NextResponse.json({
      data: serializedComments,
      total: comments.length,
      page,
      limit,
      totalPages: Math.ceil(comments.length / limit),
    });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, postId, userId } = body;

    if (!content || !postId || !userId) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        userId: Number(userId),
      },
    });

    const serializedComment = serializeBigInt(comment);

    return NextResponse.json({ data: serializedComment });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
