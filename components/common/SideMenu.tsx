"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Crafts",
    href: "/crafts",
    subItems: [
      { title: "Photos", href: "/crafts/photos" },
      { title: "Sewing", href: "/crafts/sewing" },
      { title: "Accessories", href: "/crafts/accessories" },
      { title: "Garlands", href: "/crafts/garlands" },
      { title: "Wreaths", href: "/crafts/wreaths" },
      { title: "Gifts", href: "/crafts/gifts" },
    ],
  },
  {
    title: "Decor + DIY",
    href: "/decor",
    subItems: [
      { title: "Living", href: "/decor/living" },
      { title: "Dining", href: "/decor/dining" },
      { title: "Kitchen", href: "/decor/kitchen" },
      { title: "Bed", href: "/decor/bed" },
      { title: "Bath", href: "/decor/bath" },
      { title: "Office", href: "/decor/office" },
      { title: "Small Spaces", href: "/decor/small-spaces" },
      { title: "Outdoor", href: "/decor/outdoor" },
      { title: "Plants", href: "/decor/plants" },
      { title: "Tours", href: "/decor/tours" },
    ],
  },
  {
    title: "Recipes",
    href: "/recipes",
    subItems: [
      { title: "Breakfast", href: "/recipes/breakfast" },
      { title: "Dinner + Lunch", href: "/recipes/dinner-lunch" },
      { title: "Desserts", href: "/recipes/desserts" },
      { title: "Snacks + Appetizers", href: "/recipes/snacks" },
      { title: "Cocktails", href: "/recipes/cocktails" },
      { title: "Drinks", href: "/recipes/drinks" },
      { title: "Air Fryer", href: "/recipes/air-fryer" },
    ],
  },
  {
    title: "Style",
    href: "/style",
    subItems: [
      { title: "Hair", href: "/style/hair" },
      { title: "Makeup", href: "/style/makeup" },
      { title: "Sister Style", href: "/style/sister-style" },
      { title: "Skin Care", href: "/style/skin-care" },
    ],
  },
];

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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/category/0">Musical & Movie</Link>
          </li>
          <li>
            <Link href="/category/1">Life</Link>
          </li>
          <li>
            <Link href="/category/2">CAFE & Restaurant</Link>
          </li>
          <li>
            <Link href="/category/3">Sightseeing</Link>
          </li>
        </ul>
        <li className="flex w-full flex-row items-end justify-end">
          <Link href="/admin" className="h-[24px] w-[24px]">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          <Link href="/" className="h-[24px] w-[24px]">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
      </nav>
    </>
  );
};

export default SideMenu;
