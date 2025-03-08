// components/NoData.jsx
export default function NoData() {
  function handleClickReload() {
    window.location.reload();
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="text-center">
        {/* 아이콘 */}
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        {/* 텍스트 */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          데이터가 없습니다
        </h3>
        <p className="mb-4 text-gray-500">표시할 데이터를 찾을 수 없습니다</p>

        {/* 버튼 */}
        {/* <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleClickReload}
        >
          새로고침
        </button> */}
      </div>
    </div>
  );
};
