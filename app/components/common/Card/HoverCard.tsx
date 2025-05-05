import Link from "next/link";
import { Post } from "../../../types/entities";
import Image from "next/image";

interface InputProps {
  boardName: string;
  post: Post;
}

export default function HoverCard({ boardName, post }: InputProps) {
  if (!post) return null;
  return (
    <Link
      href={`/post/${post.id}?boardName=${boardName}`}
      className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post?.thumbnail || ''}
          alt={post?.title || ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-110"
          priority={true}
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold text-black hover:text-blue-600">
          {post?.title}
        </h2>
        <p className="text-base text-gray-700">
          {post?.summary}
        </p>
      </div>
      {/* <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #태그1
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #태그2
        </span>
      </div> */}
    </Link>
  );
}
