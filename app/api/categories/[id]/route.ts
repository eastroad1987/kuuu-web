import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { ApiResponse } from "../../../types/api";

// GET /api/categories/[id] - 특정 카테고리 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!params.id || isNaN(Number(params.id))) {
    return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
  }
  try {
    const category = await prisma.category.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        subCategories: true,
        posts: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 },
    );
  }
}

// PUT /api/categories/[id] - 카테고리 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const category = await prisma.category.update({
      where: { id: BigInt(params.id) },
      data: { title },
    });

    return NextResponse.json({ data: category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 },
    );
  }
}

// DELETE /api/categories/[id] - 카테고리 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.category.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
