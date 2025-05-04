"use client";
import { PostResponse } from "@/types/dto";
import { useAppSelector } from "../../../redux/hooks";
import Image from "next/image";

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

  return ( 
    <button
      className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md md:flex"
      onClick={() => onSelected(post?.id as any)}
    >
      <div className="md:flex-shrink-0">
        <Image
          className="h-48 w-full object-cover md:w-48"
          src={post?.thumbnail || "/images/default-thumbnail.jpg"}
          alt="Card image"
          width={192}
          height={192}
        />
      </div>
      <div className="p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
          {category?.title}
        </div>
        <h2 className="mt-1 block text-lg font-medium leading-tight text-black hover:underline">
          {post?.title}
        </h2>
        <p className="mt-2 text-gray-500">{post?.summary}</p>
      </div>
    </button>
  );
}