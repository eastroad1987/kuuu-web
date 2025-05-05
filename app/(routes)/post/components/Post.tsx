import Image from "next/image";
import { Post } from "../../../types/entities";
import CategoryButton from "../../../components/common/CategoryButton";

interface InputProps {
  post: Post;
}

export default function PostContent({ post }: InputProps) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-between overflow-auto">
      <div style={{ textAlign: "center" }}>
        {post && (
          <div className="content-container">
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src={post?.thumbnail || ""}
                alt={post?.title || "Post thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="ql-show">
              <div
                className="ql-editor h-screen w-full"
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
                dangerouslySetInnerHTML={{ __html: post?.content }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
