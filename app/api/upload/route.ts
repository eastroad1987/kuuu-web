import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일 저장 경로 설정
    const uploadDir = join(process.cwd(), "public", "uploads");
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, fileName);

    // 파일 저장
    await writeFile(filePath, buffer);

    // 데이터베이스에 파일 정보 저장
    const uploadFile = await prisma.uploadFile.create({
      data: {
        name: fileName,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`,
      },
    });

    return NextResponse.json(uploadFile);
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
