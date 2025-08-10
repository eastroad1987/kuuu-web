"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface LeftImageCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  onClick?: () => void;
  badge?: string;
  badgeColor?: string;
  height?: number;
}

export default function HorizontalCard({
  image,
  title,
  subtitle,
  description,
  onClick,
  badge,
  badgeColor = "bg-indigo-500",
  height,
}: LeftImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)" },
    tap: { scale: 0.98 },
  };

  // Content animation variants
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2 } },
    hover: { x: 5 },
  };

  // Image animation variants
  const imageVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 },
  };

  return (
    <motion.div
      className="flex h-full overflow-hidden rounded-xl bg-white shadow-md"
      onClick={onClick}
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
      {/* Left side - Image */}
      <div className="relative w-1/3 overflow-hidden">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Image
            className="h-full w-full object-cover"
            src={image || "/images/default-thumbnail.jpg"}
            alt={title}
            width={300}
            height={300}
          />
        </motion.div>
      </div>

      {/* Right side - Content */}
      <motion.div
        className="flex w-2/3 flex-col justify-center p-6"
        variants={contentVariants}
      >
        {badge && (
          <motion.div
            className={`mb-2 inline-block rounded-full ${badgeColor} px-3 py-1 text-xs font-semibold text-white`}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.7 }}
          >
            {badge}
          </motion.div>
        )}

        {subtitle && (
          <motion.div
            className="text-sm font-medium text-gray-600"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.7 }}
          >
            {subtitle}
          </motion.div>
        )}

        <motion.h2 className="mt-1 text-xl font-bold text-gray-900">
          {title}
        </motion.h2>

        {description && (
          <motion.p
            className="mt-3 text-base text-gray-600 line-clamp-2"
            animate={{ opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
