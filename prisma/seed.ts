import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 관리자 계정 생성
  // 유저 생성
  const users = await prisma.user.createMany({
    data: [
      {
        email: "kuuu@e-k.io",
        password: await bcrypt.hash("Kurumi)623", 10),
        name: "kato kurumi",
      },
      {
        email: "eastroad@e-k.io",
        password: await bcrypt.hash("Eastroad@784", 10),
        name: "eastroad ",
      },
    ],
  });
  // 카테고리 생성
  const categories = await prisma.category.createMany({
    data: [
      { title: "Musical&Movie" },
      { title: "Life" },
      { title: "Cafe&Restraint" },
      { title: "Sightseeing" },
    ],
  });

  // 서브카테고리 생성
  const subCategories = await prisma.subCategory.createMany({
    data: [
      // Musical&Movie 카테고리의 서브카테고리
      {
        title: "Japan",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "N",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 1,
      },
      {
        title: "Korea",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "N",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 1,
      },
      {
        title: "Movie",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "N",
        referencePlaceYn: "N",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 1,
      },
      {
        title: "Others",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "N",
        referencePlaceYn: "N",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "Y",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 1,
      },
      // Life 카테고리의 서브카테고리
      {
        title: "Japan",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 2,
      },
      {
        title: "Korea",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 2,
      },
      {
        title: "Marriage",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "N",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 2,
      },
      {
        title: "Mart Shopping",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 2,
      },
      {
        title: "Others",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "N",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "Y",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 2,
      },
      // Cafe&Restrant 카테고리의 서브카테고리
      {
        title: "Seoul Cafe",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 3,
      },
      {
        title: "Seoul Restraint",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 3,
      },
      {
        title: "Tokyo Cafe",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 3,
      },
      {
        title: "Tokyo Restraint",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 3,
      },
      {
        title: "Others",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "N",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "Y",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 3,
      },
      // Sightseeing 카테고리의 서브카테고리
      {
        title: "Others",
        anonymousYn: "N",
        titleYn: "Y",
        contentYn: "Y",
        thumbnailYn: "Y",
        referencePlaceYn: "Y",
        secretYn: "N",
        imagesYn: "Y",
        attachFilesYn: "N",
        commentYn: "N",
        viewCntYn: "Y",
        categoryId: 4,
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
