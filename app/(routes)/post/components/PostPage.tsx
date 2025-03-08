import Image from "next/image";
import { Post } from "../../../types/entities";
import CategoryButton from "../../../components/common/CategoryButton";

interface InputProps {
  post: Post;
}

export default function PostContent({ post }: InputProps) {
  return (
    <section className="flex h-[450px] w-full flex-col items-center justify-between">
      <div style={{ textAlign: "center" }}>
        <div className="content-container">
          <img src={post?.thumbnail || ''} alt="Main Image" />
          <div className="ql-show">
            <div
              className="ql-editor"
              style={{
                fontFamily: "Pretendard",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "24px",
              }}
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
