import Image from "next/image";
import { Post } from "../../../../types/types";
import CategoryButton from "@/components/common/CategoryButton";

interface InputProps {
  post: Post;
}

export default function PostContent({ post }: InputProps) {
  return (
    <section className="flex h-[450px] w-full flex-row items-center justify-between">
      <div style={{ textAlign: "center" }}>
        <Image
          src="/images/korea.png"
          alt="Main Image"
          width={400}
          height={400}
          style={{ borderRadius: "8px" }}
        />
      </div>
      <CategoryButton title="SEOUL CAFE" isActive={true} />
      <CategoryButton title="SEOUL RESTAURANT" />
      <CategoryButton title="OTHERS" />
    </section>
  );
}
