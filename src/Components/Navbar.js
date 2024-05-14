import React from "react";
import "../Components/Styles/navbar.css";
import profileImg from "./assets/mikky.jpeg";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLine } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import { useGlobalContext } from "../context";

function Navbar() {
  const { openSidebar } = useGlobalContext();
  return (
    <div className="nav-container">
      <nav>
        <div className="icon-search">
          <div className="icon-img">
            <PiPencilSimpleLine />
          </div>
          <div className="search">
            <CiSearch className="ser-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="menus">
          <span>Home</span>
          <span>Friends</span>
          <span>Groups</span>
          <span>Notifications</span>
        </div>
        <div className="right">
          <div className="messnot">
            <TbMessage className="mess" />
            <GoDotFill className="not" />
          </div>
          <MdOutlineSettings className="sett" />
          <div className="bellnot">
            <FaRegBell className="bell" />
            <GoDotFill className="not" />
          </div>
          <img src={profileImg} alt="profile-img" />
        </div>
        <GiHamburgerMenu className="ham" onClick={openSidebar} />
      </nav>
    </div>
  );
}

export default Navbar;
