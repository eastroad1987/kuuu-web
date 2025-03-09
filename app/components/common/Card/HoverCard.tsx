import Link from "next/link";
import { Post } from "../../../types/entities";

interface InputProps {
  boardName: string;
  post: Post;
}

export default function HoverCard({ boardName, post }: InputProps) {
  if (!post) return null;
  console.log(post);
  return (
    <Link
      href={`/post/${post.id}?boardName=${boardName}`}
      className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        <img
          className="h-48 w-full transform object-cover transition-transform duration-300 hover:scale-110"
          src={post?.thumbnail || ''}
          alt="Card image"
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
