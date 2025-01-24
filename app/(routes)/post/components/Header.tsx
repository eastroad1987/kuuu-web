import Hamburger from "@/components/common/Hamburger";

interface InputProps {
  toggleSideMenu?: () => void;
  boardName: string;
  title: string;
  color: string;
  date: Date;
}

export default function PostHeader({
  toggleSideMenu,
  boardName,
  title,
  color,
  date,
}: InputProps) {
  console.log(color);

  return (
    <header
      className={`flex h-[230px] w-full flex-row items-center justify-between bg-[${color}]`}
    >
      <div className="flex flex-col items-start justify-start h-full">
        <h1 className="text-[24px] font-bold text-white">{boardName}</h1>
      </div>
      <h1 className="text-[24px] font-bold text-white">{title}</h1>
      <div
        className={`flex h-full flex-col items-end justify-between`}
      >
        <Hamburger onClick={toggleSideMenu} />
        <h1 className="text-[24px] font-bold text-white">{date.toLocaleDateString()}</h1>
      </div>
    </header>
  );
}
