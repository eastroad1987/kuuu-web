interface InputProps {
  title: string;
  color: string;
}

export default function CategoryHeader({
  title,
  color = "#000000",
}: InputProps) {

  return (
    <header className="flex h-[78px] w-full flex-row items-center justify-between">
      <div
        style={{ backgroundColor: color }}
        className={`flex h-full w-[60%] flex-row items-center justify-end pr-[50px]`}
      >
        <h1 className="text-[24px] font-bold text-white">{title}</h1>
      </div>
    </header>
  );
}
