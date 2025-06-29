import { PrismaClient, YnEnum } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 관리자 계정 생성 (upsert)
  const userData = [
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
  ];
  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { ...user },
      create: { ...user },
    });
  }

  // 카테고리 생성 (upsert)
  const categoryData = [
    { title: "Musical&Movie" },
    { title: "Life" },
    { title: "Cafe&Restraint" },
    { title: "Sightseeing" },
  ];
  for (const category of categoryData) {
    await prisma.category.upsert({
      where: { title: category.title },
      update: { ...category },
      create: { ...category },
    });
  }

  // 카테고리 id 매핑
  const categories = await prisma.category.findMany();
  const categoryMap: Record<string, number> = {};
  categories.forEach((cat) => {
    categoryMap[cat.title] = Number(cat.id);
  });

  // 서브카테고리 생성 (upsert)
  const subCategoryData = [
    // Musical&Movie 카테고리의 서브카테고리
    {
      title: "Japan",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.N,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Musical&Movie"],
    },
    {
      title: "Korea",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.N,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Musical&Movie"],
    },
    {
      title: "Movie",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.N,
      referencePlaceYn: YnEnum.N,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Musical&Movie"],
    },
    {
      title: "Others",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.N,
      referencePlaceYn: YnEnum.N,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.Y,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Musical&Movie"],
    },
    // Life 카테고리의 서브카테고리
    {
      title: "Japan",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Life"],
    },
    {
      title: "Korea",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Life"],
    },
    {
      title: "Marriage",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.N,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Life"],
    },
    {
      title: "Mart Shopping",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Life"],
    },
    {
      title: "Others",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.N,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.Y,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Life"],
    },
    // Cafe&Restrant 카테고리의 서브카테고리
    {
      title: "Seoul Cafe",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Cafe&Restraint"],
    },
    {
      title: "Seoul Restraint",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Cafe&Restraint"],
    },
    {
      title: "Tokyo Cafe",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Cafe&Restraint"],
    },
    {
      title: "Tokyo Restraint",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Cafe&Restraint"],
    },
    {
      title: "Others",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.N,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.Y,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Cafe&Restraint"],
    },
    // Sightseeing 카테고리의 서브카테고리
    {
      title: "Others",
      anonymousYn: YnEnum.N,
      titleYn: YnEnum.Y,
      contentYn: YnEnum.Y,
      thumbnailYn: YnEnum.Y,
      referencePlaceYn: YnEnum.Y,
      secretYn: YnEnum.N,
      imagesYn: YnEnum.Y,
      attachFilesYn: YnEnum.N,
      commentYn: YnEnum.N,
      viewCntYn: YnEnum.Y,
      categoryId: categoryMap["Sightseeing"],
    },
  ];
  for (let i = 0; i < subCategoryData.length; i++) {
    const sub = subCategoryData[i];
    await prisma.subCategory.upsert({
      where: { id: i + 1 },
      update: { ...sub },
      create: { ...sub },
    });
  }

  // 게시글 추가
  await prisma.post.create({
    data: {
      title: "afsddfas",
      publishedAt: new Date("2025-06-02T15:00:00.000Z"),
      content: "<p>fdasadfsafdsafds</p>",
      summary: "",
      thumbnail: "https://s3-kuuu.s3.ap-northeast-2.amazonaws.com/506a0f63-91e0-4f48-9428-8906c649280b-c_373116_446195_2123.jpg",
      referencePlace: "",
      images: "",
      attachFiles: "",
      categoryId: 3,
      subcategoryId: 10,
      authorId: 1,
    },
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
