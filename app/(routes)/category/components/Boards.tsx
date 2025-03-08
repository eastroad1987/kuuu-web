import Image from "next/image";
import CategoryButton from "../../../components/common/CategoryButton";
import { Category, SubCategory } from "../../../types/entities";

interface InputProps {
  id: string;
  board: Category;
  currentSubBoard: SubCategory;
  subBoards: SubCategory[];
  onClickSubCategory: (subBoard: SubCategory) => void;
}

export default function CategoryBoards({
  id,
  board,
  subBoards,
  currentSubBoard,
  onClickSubCategory,
}: InputProps) {
  const color =
    id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28";

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
          {subBoards.map((subBoard) => (
            <CategoryButton
              key={subBoard.id}
              color={color}
              title={subBoard.title}
              isActive={currentSubBoard?.id === subBoard.id}
              onClick={() => onClickSubCategory(subBoard)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
