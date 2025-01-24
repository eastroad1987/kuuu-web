import Image from "next/image";
import { Board, SubBoard } from "../../../../types/types";
import CategoryButton from "@/components/common/CategoryButton";

interface InputProps {
  id: string;
  board: Board;
  subBoards: SubBoard[];
}

export default function CategoryBoards({ id, board, subBoards }: InputProps) {
  return (
    <section className="flex w-full flex-row items-center justify-between pb-10 pt-10">
      <div className="grid grid-cols-1 items-center justify-items-start gap-5 sm:grid-cols-[400px_minmax(0,_1fr)] md:grid-cols-[400px_minmax(0,_1fr)] lg:grid-cols-[400px_minmax(0,_1fr)]">
        <div className="w-[400px] flex-shrink-0 overflow-hidden text-center">
          <Image
            src="/images/korea.png"
            alt="Main Image"
            width={400}
            height={400}
            objectFit="cover"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div className="flex w-full flex-grow flex-row items-start justify-start gap-5 overflow-auto">
          <CategoryButton title="SEOUL CAFE" isActive={true} />
          <CategoryButton title="SEOUL RESTAURANT" />
          <CategoryButton title="OTHERS" />
          <CategoryButton title="OTHERS" />
          <CategoryButton title="OTHERS" />
          <CategoryButton title="OTHERS" />
        </div>
      </div>
    </section>
  );
}
