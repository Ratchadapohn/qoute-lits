"use client";

import React from "react";
import "./Navbar.css";
import LoginForm from "../LoginForm/LoginForm";
import SearchForm from "../searchForm/SearchForm";
import { CiSearch } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import ChartPopup from "../chartpopup/ChartPopup"; // Import the chart popup component

interface NavbarProps {
  onRankClick: () => void;
  showChart: boolean;
  onCloseChart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onRankClick,
  showChart,
  onCloseChart,
}) => {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <div className="navbar">
      <div className="logo">
        <a href="/"> Your Quotes</a>
      </div>
      <ul className="nav-about">
        <li>Home</li>
        <li>
          <a onClick={onRankClick}>About</a>
        </li>
        <li>
          <a href="#footer">Quote of the day</a>
        </li>
        <li>
          <a href="#footer">Contact me</a>
        </li>
      </ul>

      <div className="right-bar">
        <div className="input-nav">
          <div className="input-nav-left">
            <CiSearch />
          </div>
          <div className="input-nav-right">
            <input
              type="text"
              placeholder="search..."
              onFocus={() => setShowSearch(true)}
            />
          </div>
        </div>
        <div className="nav-icon">
          <div className="nav-icon-like">
            <IoHeart />
          </div>
          <div className="nav-icon-account" onClick={() => setShowLogin(true)}>
            <MdAccountBox />
          </div>
        </div>
        {showLogin && <LoginForm setShowLogin={setShowLogin} />}
        {showSearch && <SearchForm setShowSearch={setShowSearch} />}
        {showChart && (
          <ChartPopup onClose={onCloseChart} data={[]} labels={[]} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
