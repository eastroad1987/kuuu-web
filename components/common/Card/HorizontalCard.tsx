export default function HorizontalCard() {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-48 w-full object-cover md:w-48"
          src="/test/7.jpg"
          alt="Card image"
        />
      </div>
      <div className="p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
          카테고리
        </div>
        <h2 className="mt-1 block text-lg font-medium leading-tight text-black hover:underline">
          카드 제목
        </h2>
        <p className="mt-2 text-gray-500">
          카드의 상세 내용이 들어갈 자리입니다. 필요한 만큼 텍스트를 넣어주세요.
        </p>
      </div>
    </div>
  );
}
