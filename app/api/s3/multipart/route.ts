import { NextRequest, NextResponse } from "next/server";
import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 멀티파트 업로드 시작
export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "fileName and fileType are required" },
        { status: 400 }
      );
    }

    const key = `uploads/${Date.now()}-${fileName}`;
    const command = new CreateMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const { UploadId } = await s3Client.send(command);

    return NextResponse.json({
      data: {
        uploadId: UploadId,
        key,
      },
    });
  } catch (error) {
    console.error("Error creating multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to create multipart upload" },
      { status: 500 }
    );
  }
}

// 멀티파트 업로드 완료
export async function PUT(request: NextRequest) {
  try {
    const { uploadId, key, parts } = await request.json();

    if (!uploadId || !key || !parts) {
      return NextResponse.json(
        { error: "uploadId, key, and parts are required" },
        { status: 400 }
      );
    }

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    });

    await s3Client.send(command);

    return NextResponse.json({
      data: {
        key,
      },
    });
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to complete multipart upload" },
      { status: 500 }
    );
  }
}

// 멀티파트 업로드 중단
export async function DELETE(request: NextRequest) {
  try {
    const { uploadId, key } = await request.json();

    if (!uploadId || !key) {
      return NextResponse.json(
        { error: "uploadId and key are required" },
        { status: 400 }
      );
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      UploadId: uploadId,
    });

    await s3Client.send(command);

    return NextResponse.json({
      data: {
        message: "Multipart upload aborted successfully",
      },
    });
  } catch (error) {
    console.error("Error aborting multipart upload:", error);
    return NextResponse.json(
      { error: "Failed to abort multipart upload" },
      { status: 500 }
    );
  }
} 