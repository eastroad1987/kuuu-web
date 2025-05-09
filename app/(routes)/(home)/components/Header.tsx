import Hamburger from "../../../components/common/Hamburger";

interface InputProps {
  toggleSideMenu: () => void;
}

export default function HomeHeader({ toggleSideMenu }: InputProps) {
  return (
    <header className="fixed top-0 z-50 flex h-[78px] w-full flex-row items-center justify-end">
      <div className={`flex h-full flex-col items-end justify-center`}>
        <Hamburger onClick={toggleSideMenu} />
      </div>
    </header>
  );
}
