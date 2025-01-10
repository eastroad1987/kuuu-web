
import HorizontalCard from "@/components/common/Card/HorizontalCard";
import HoverCard from "@/components/common/Card/HoverCard"; 
import BasicCard from "@/components/common/Card/BasicCard";

export default function CardGrid() {
  const cards = [
    { id: 1, title: "카드 1", image: "/test/1.jpg", description: "설명 1" },
    { id: 2, title: "카드 2", image: "/test/2.jpg", description: "설명 2" },
    { id: 3, title: "카드 3", image: "/test/3.jpg", description: "설명 3" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src={card.image}
                alt={card.title}
              />
              <div className="absolute right-0 top-0 p-2">
                <button className="text-white hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
            <div className="px-4 pb-4">
              <button className="w-full rounded-lg bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
                자세히 보기
              </button>
            </div>
          </div>
        ))}
        <HoverCard />
        <BasicCard />
      </div>
      <HorizontalCard />
    </div>
  );
}
