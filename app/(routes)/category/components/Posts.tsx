import NoData from "@/components/common/NoData/NoData";
import HoverCard from "../../../components/common/Card/HoverCard";
import { Post } from "../../../types/entities";

interface InputProps {
  boardName: string;
  posts: Post[];
}

export default function CategoryPosts({ posts, boardName }: InputProps) {
  return (
    <section className="mb-32 flex w-full flex-col items-start justify-stretch">
      <div className="flex w-full flex-col items-center justify-start">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {posts.map((post, idx) => (
              <HoverCard key={idx} post={post} boardName={boardName} />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <NoData />
          </div>
        )}
      </div>
    </section>
  );
}
