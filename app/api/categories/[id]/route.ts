import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { ApiResponse } from "../../../types/api";

// GET /api/categories/[id] - 특정 카테고리 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        subCategories: true,
        posts: true,
      },
    });

    if (!category) {
      return NextResponse.json<ApiResponse<null>>(
        { 
          data: null,
          error: "Category not found",
          message: "Category not found"
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<any>>(
      { 
        data: category,
        error: undefined,
        message: undefined
      }
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json<ApiResponse<null>>(
      { 
        data: null,
        error: "Failed to fetch category",
        message: "Failed to fetch category"
      },
      { status: 500 }
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
      return NextResponse.json<ApiResponse<null>>(
        { 
          data: null,
          error: "Title is required",
          message: "Title is required"
        },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id: BigInt(params.id) },
      data: { title },
    });

    return NextResponse.json<ApiResponse<any>>(
      { 
        data: category,
        error: undefined,
        message: undefined
      }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json<ApiResponse<null>>(
      { 
        data: null,
        error: "Failed to update category",
        message: "Failed to update category"
      },
      { status: 500 }
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

    return NextResponse.json<ApiResponse<null>>(
      { 
        data: null,
        error: undefined,
        message: "Category deleted successfully"
      }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json<ApiResponse<null>>(
      { 
        data: null,
        error: "Failed to delete category",
        message: "Failed to delete category"
      },
      { status: 500 }
    );
  }
}
