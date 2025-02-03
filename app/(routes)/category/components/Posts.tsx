import HoverCard from "@/components/common/Card/HoverCard";
import { Post } from "../../../../types/entities";

interface InputProps {
  posts: Post[];
}

export default function CategoryPosts({ posts }: InputProps) {
  console.log(posts);

  return (
    <section className="mb-32 flex w-full flex-col items-start justify-stretch">
      <div className="flex w-full flex-col items-center justify-start">
        <div className="grid grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, idx) => (
            <HoverCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
