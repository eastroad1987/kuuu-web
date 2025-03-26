"use client";
import React, { useState } from "react";
import Link from "next/link";
import Hamburger from "./Hamburger";

interface HeaderProps {
  isSideMenuOpen?: boolean;
  toggleSideMenu?: () => void;
}

const Header = ({ isSideMenuOpen, toggleSideMenu }: HeaderProps) => {

  return (
    <header className="header">
      <div className="nav-container">
        <div className="main-nav">
          {/* <Hamburger isOpen={isSideMenuOpen} onClick={toggleSideMenu} /> */}
          <Link href="/" className="header-logo">
            <h1 className="header title">{`Kuuu's Blog`}</h1>
          </Link>
          {/* <br /> */}
        </div>

        {/* <nav className="main-nav-categories">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/daily" className="nav-link">
            日常
          </Link>
          <Link href="/food" className="nav-link">
            グルメ
          </Link>
          <Link href="/culture" className="nav-link">
            文化
          </Link>
          <Link href="/other" className="nav-link">
            その他
          </Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
