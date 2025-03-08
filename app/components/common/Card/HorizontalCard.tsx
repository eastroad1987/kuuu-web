import { PostResponse } from "@/types/dto";
import { useAppSelector } from "../../../redux/hooks";

interface HorizontalCardProps {
  post: PostResponse;
}

export default function HorizontalCard({ post }: HorizontalCardProps) {

  const categories = useAppSelector(
    (store) => (store as any).reducers.Categories.categories,
  );

  const category = categories.find((category: any) => category.id === post.categoryId);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-48 w-full object-cover md:w-48"
          src={post?.thumbnail || ''}
          alt="Card image"
        />
      </div>
      <div className="p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
          {category?.title}
        </div>
        <h2 className="mt-1 block text-lg font-medium leading-tight text-black hover:underline">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-500">
          {post.summary}
        </p>
      </div>
    </div>
  );
}
