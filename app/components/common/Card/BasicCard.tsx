export default function BasicCard() {
  return (
    <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
      <img
        className="h-48 w-full object-cover"
        src="/test/6.jpg"
        alt="Card image"
      />
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold">카드 제목</h2>
        <p className="text-base text-gray-700">
          카드 내용이 들어갈 자리입니다. 원하는 텍스트를 넣어주세요.
        </p>
      </div>
    </div>
  );
};
