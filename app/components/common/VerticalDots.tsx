
interface VerticalDotsProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

function VerticalDots({ total, current, onPageChange }: VerticalDotsProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 transform">
      {Array.from({ length: total }, (_, i) => i).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`my-2 block h-3 w-3 rounded-full transition-all duration-300 ${current === pageNum ? "scale-125 bg-black" : "bg-gray-400"}`}
        />
      ))}
    </div>
  );
}

export default VerticalDots;
