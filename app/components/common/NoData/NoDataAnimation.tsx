// components/NoDataAdvanced.jsx
const NoDataAnimation = () => {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* 애니메이션 아이콘 */}
        <div className="mb-6">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-16 w-16 animate-pulse text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 텍스트 콘텐츠 */}
        <div className="text-center">
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            데이터를 찾을 수 없습니다
          </h3>
          <p className="mb-6 text-gray-500">
            요청하신 데이터가 존재하지 않거나 삭제되었을 수 있습니다.
          </p>

          {/* 액션 버튼들 */}
          <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
            <button
              className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              새로고침
            </button>
            <button
              className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => window.history.back()}
            >
              이전으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataAnimation;
