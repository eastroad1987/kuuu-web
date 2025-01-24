"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onClose);
    } else {
      document.removeEventListener("mousedown", onClose);
    }
    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="side-menu-overlay" />}
      <nav className={`side-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideMenu;
