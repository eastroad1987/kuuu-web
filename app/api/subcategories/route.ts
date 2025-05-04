import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { serializeBigInt } from "../../lib/serializer";

interface SubcategoryResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CreateSubcategoryRequest {
  title: string;
  categoryId: string | number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [subcategories, total] = await Promise.all([
      prisma.subCategory.findMany({
        where: {
          categoryId: categoryId ? Number(categoryId) : undefined,
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.subCategory.count({
        where: {
          categoryId: categoryId ? Number(categoryId) : undefined,
          deletedAt: null,
        },
      }),
    ]);

    const serializedSubcategories = serializeBigInt(subcategories);

    const response: SubcategoryResponse = {
      data: serializedSubcategories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateSubcategoryRequest;
    const { title, categoryId } = body;

    if (!title?.trim() || !categoryId) {
      return NextResponse.json(
        { error: "Title and category ID are required" },
        { status: 400 },
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    const subcategory = await prisma.subCategory.create({
      data: {
        title: title.trim(),
        categoryId: Number(categoryId),
      },
    });

    const serializedSubcategory = serializeBigInt(subcategory);

    return NextResponse.json({ data: serializedSubcategory });
  } catch (error) {
    console.error("Failed to create subcategory:", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 },
    );
  }
}
