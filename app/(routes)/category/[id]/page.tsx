"use client";
import CategoryLayout from "@/context/category/CategoryLayout";
import { Board, Post, SubBoard, YNEnum } from "../../../../types/types";
import { useState } from "react";

interface PageProps {
  id: string;
}

const CategoryPage = ({ params }: { params: PageProps }) => {
  const { id } = params;
  const title =
    id === "0"
      ? "MUSICAL&MOVIE"
      : id === "1"
        ? "LIFE"
        : id === "2"
          ? "CAFE&RESTAURANT"
          : "SIGHTSEEING";
  const color =
    id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28";

  // Dummy Data
  const boards: Board[] = [
    { board_name: "General Discussion" },
    { board_name: "Tech News" },
    { board_name: "Lifestyle" },
  ];

  const subBoards: SubBoard[] = [
    {
      board_name: "General Discussion",
      anonymous_yn: YNEnum.Y,
      title_yn: YNEnum.Y,
      content_yn: YNEnum.Y,
      thumbnail_yn: YNEnum.N,
      reference_place_yn: YNEnum.N,
      secret_yn: YNEnum.Y,
      images_yn: YNEnum.Y,
      attach_files_yn: YNEnum.Y,
      comment_yn: YNEnum.Y,
      view_cnt_yn: YNEnum.Y,
    },
    {
      board_name: "Tech News",
      anonymous_yn: YNEnum.N,
      title_yn: YNEnum.Y,
      content_yn: YNEnum.Y,
      thumbnail_yn: YNEnum.Y,
      reference_place_yn: YNEnum.N,
      secret_yn: YNEnum.N,
      images_yn: YNEnum.Y,
      attach_files_yn: YNEnum.N,
      comment_yn: YNEnum.Y,
      view_cnt_yn: YNEnum.Y,
    },
    {
      board_name: "Lifestyle",
      anonymous_yn: YNEnum.Y,
      title_yn: YNEnum.Y,
      content_yn: YNEnum.Y,
      thumbnail_yn: YNEnum.Y,
      reference_place_yn: YNEnum.Y,
      secret_yn: YNEnum.Y,
      images_yn: YNEnum.N,
      attach_files_yn: YNEnum.N,
      comment_yn: YNEnum.Y,
      view_cnt_yn: YNEnum.Y,
    },
  ];

  const posts: Post[] = [
    {
      id: 1,
      created_at: new Date("2025-01-12T10:00:00"),
      writer_id: 101,
      writer_name: "John Doe",
      title: "Welcome to General Discussion",
      content: "Feel free to discuss anything here!",
      summary: "A place for open discussion.",
      thumbnail: "",
      reference_place: "",
      board_id: 1,
    },
    {
      id: 2,
      created_at: new Date("2025-01-12T11:00:00"),
      writer_id: 102,
      writer_name: "Jane Smith",
      title: "Latest Tech Trends in 2025",
      content: "Here's a detailed analysis of upcoming trends in technology.",
      summary: "Tech trends to watch in 2025.",
      thumbnail: "tech_trends.jpg",
      reference_place: "",
      board_id: 2,
    },
    {
      id: 3,
      created_at: new Date("2025-01-12T12:00:00"),
      writer_id: 103,
      writer_name: "Alice Johnson",
      title: "Healthy Living Tips",
      content: "Discover the best practices for a healthy lifestyle.",
      summary: "Tips for a healthier you.",
      thumbnail: "healthy_tips.jpg",
      reference_place: "Lifestyle Magazine",
      board_id: 3,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <CategoryLayout id={id}>
      <CategoryLayout.Header title={title} color={color} toggleSideMenu={() => setIsOpen(!isOpen)} />
      <CategoryLayout.Boards id={id} board={boards[parseInt(id)]} subBoards={subBoards} />
      <CategoryLayout.Posts posts={posts} />
      <CategoryLayout.SideMenu isOpen={isOpen} onClose={() => setIsOpen(false) } />
    </CategoryLayout>
  );
};

export default CategoryPage;
