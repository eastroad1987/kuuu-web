"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import ModalTrigger from "./Modal/ModalTrigger";
// import { useAuth } from "../../hooks/useAuth";

interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  subItems?: SubMenuItem[];
}

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    
  return (
    <>
      {isOpen && <div className="side-menu-overlay" onClick={onClose} />}
      <nav className={`side-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/category/0">MUSICAL/MOVIE</Link>
          </li>
          <li>
            <Link href="/category/1">LIFE</Link>
          </li>
          <li>
            <Link href="/category/2">CAFE/RESTAURANT</Link>
          </li>
          <li>
            <Link href="/category/3">SIGHTSEEING</Link>
          </li>
        </ul>
        <li className="flex w-full flex-row items-end justify-end">
          <ModalTrigger href="/admin">
            <div className="h-[24px] w-[24px]">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </ModalTrigger>
          {/* <ModalTrigger href="/auth">
            <div className="h-[24px] w-[24px]">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </ModalTrigger> */}
        </li>
      </nav>
    </>
  );
};

export default SideMenu;
