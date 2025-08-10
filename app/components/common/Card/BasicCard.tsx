import Image from "next/image";
import { CardData } from "@/types/types";

interface BasicCardProps {
  card?: CardData;
}

export default function BasicCard({ card }: BasicCardProps) {
  const defaultCard: CardData = {
    postId: "",
    image: "/test/6.jpg",
    title: "카드 제목",
    subtitle: "부제목",
    description: "카드 내용이 들어갈 자리입니다. 원하는 텍스트를 넣어주세요.",
    badge: "New",
    badgeColor: "bg-blue-500",
  };

  const displayCard = card || defaultCard;

  return (
    <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        {displayCard.badge && (
          <div
            className={`absolute right-2 top-2 z-10 rounded-full ${displayCard.badgeColor || "bg-blue-500"} px-2 py-1 text-xs font-bold text-white`}
          >
            {displayCard.badge}
          </div>
        )}
        <Image
          src={displayCard.image}
          alt={displayCard.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="mb-1 text-xl font-bold">{displayCard.title}</h2>
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-600">
          {displayCard.subtitle}
        </h3>
        <p className="line-clamp-2 text-base text-gray-700">
          {displayCard.description}
        </p>
      </div>
    </div>
  );
}
