import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serializeBigInt } from "../../lib/serializer";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

// 토큰 생성 함수
const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const users = await prisma.user.findMany({
      where: {
        email: email ? { contains: email } : undefined,
        deletedAt: null,
      },
    });

    const serializedUsers = serializeBigInt(users);

    return NextResponse.json({
      data: serializedUsers,
      total: users.length,
      page,
      limit,
      totalPages: Math.ceil(users.length / limit),
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// POST /api/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // 필수 필드 검증
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "이메일, 비밀번호, 이름은 필수입니다." },
        { status: 400 }
      );
    }

    // 이메일 중복 검사
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 존재하는 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 토큰 생성
    const { accessToken, refreshToken } = generateTokens(1); // 임시 userId

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        accessToken,
        refreshToken,
      },
    });

    // 실제 userId로 토큰 재생성
    const finalTokens = generateTokens(Number(user.id));
    
    // 토큰 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken: finalTokens.accessToken,
        refreshToken: finalTokens.refreshToken,
      },
    });

    const serializedUser = serializeBigInt(updatedUser);

    return NextResponse.json({ 
      data: serializedUser,
      message: "사용자가 성공적으로 생성되었습니다."
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "사용자 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
