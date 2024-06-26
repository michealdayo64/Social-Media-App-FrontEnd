import React from "react";
import "../Components/Styles/navbar.css";
//import profileImg from "./assets/mikky.jpeg";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLine } from "react-icons/pi";
import { TbMessage } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import { useGlobalContext } from "../context";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Navbar() {
  const { openSidebar, handShowSettings  } = useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  const userData = isAuth.user;


  if (isAuth.isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
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
          <Link to="/"><span>Home</span></Link>
          <Link to="/friends"><span>Friends</span></Link>
          <Link to="/group"><span>Groups</span></Link>
         <Link to="/notifications"><span>Notifications</span></Link>
          
        </div>
        <div className="right">
          <div className="messnot">
            <TbMessage className="mess" />
            <GoDotFill className="not" />
          </div>
          <div className="bellnot">
            <FaRegBell className="bell" />
            <GoDotFill className="not" />
          </div>
          <MdOutlineSettings onClick={() => handShowSettings()} className="sett" />

          <img src={userData?.profile_pic} alt="profile-img" />
        </div>
        <GiHamburgerMenu className="ham" onClick={openSidebar} />
      </nav>
    </div>
  );
}

export default Navbar;
