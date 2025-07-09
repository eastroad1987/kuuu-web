"use client";
import { PostResponse } from "@/types/dto";
import { useAppSelector } from "../../../redux/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface HorizontalCardProps {
  post: PostResponse | null;
  onSelected: (postId: string) => void;
}

export default function HorizontalCard({
  post,
  onSelected,
}: HorizontalCardProps) {
  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const category = categories.find(
    (category: any) => category.id === post?.categoryId,
  );

  const [isHovered, setIsHovered] = useState(false);

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" },
    tap: { scale: 0.98 }
  };

  // Content animation variants
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2 } },
    hover: { x: 5 }
  };

  // Image animation variants
  const imageVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 }
  };

  return (
    <motion.button
      className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md md:flex"
      onClick={() => onSelected(post?.id as any)}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <div className="relative md:flex-shrink-0 overflow-hidden">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.5 }}
        >
          <Image
            className="h-48 w-full object-cover md:w-48"
            src={post?.thumbnail || "/images/default-thumbnail.jpg"}
            alt="Card image"
            width={192}
            height={192}
          />
        </motion.div>
      </div>
      <motion.div 
        className="p-8"
        variants={contentVariants}
      >
        <motion.div 
          className="text-sm font-semibold uppercase tracking-wide text-indigo-500"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.7 }}
        >
          {category?.title}
        </motion.div>
        <motion.h2 
          className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
        >
          {post?.title}
        </motion.h2>
        <motion.p 
          className="mt-2 text-gray-500"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {post?.summary}
        </motion.p>
      </motion.div>
    </motion.button>
  );
}