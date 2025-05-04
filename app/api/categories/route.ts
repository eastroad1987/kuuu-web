import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import {
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
} from "../../types/api";
import { serializeBigInt } from "../../lib/serializer";

// GET /api/categories - 모든 카테고리 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        subCategories: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    // BigInt 직렬화 적용
    const serializedCategories = serializeBigInt(categories);

    const response: PaginatedResponse<any> = {
      data: serializedCategories,
      total: categories.length,
      page,
      limit,
      totalPages: Math.ceil(categories.length / limit),
    };
    // console.log(response);
    const res = NextResponse.json(response);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// POST /api/categories - 새 카테고리 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        title,
      },
    });

    // BigInt 직렬화 적용
    const serializedCategory = serializeBigInt(category);

    return NextResponse.json({ data: serializedCategory });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
