"use client";
import CategoryLayout from "@/context/category/CategoryLayout";
import { Board, Post, SubBoard, YNEnum } from "../../../../types/types";
import PostLayout from "@/context/post/PostLayout";
import { useEffect, useRef, useState } from "react";

interface PageProps {
  id: string;
  boardName: string;
}

const PostPage = ({ params }: { params: PageProps }) => {
  const { id, boardName } = params;
  const board =
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
  const post: Post = {
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
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PostLayout id={id} color={color}>
      <PostLayout.Header boardName={board} title={post.title} color={color} date={post.created_at} toggleSideMenu={() => setIsOpen(!isOpen)} />
      <PostLayout.Post post={post} />
      <PostLayout.SideMenu isOpen={isOpen} onClose={() => setIsOpen(false) } />
    </PostLayout>
  );
};

export default PostPage;
