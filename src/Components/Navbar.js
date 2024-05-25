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
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux_folder/authSlice";

function Navbar() {
  const { openSidebar, handShowSettings } = useGlobalContext();
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogoutBtn = async () => {
    const url = "http://127.0.0.1:8000/account/logout_api/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuth.access}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(logout(data));
    } else {
      console.log("logout");
    }
  };

  /**const openSettingsMenu = (e)=>{
    const size = e.target.getBoundingClientRect();
    console.log(size)
  }**/

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
          <div className="bellnot">
            <FaRegBell className="bell" />
            <GoDotFill className="not" />
          </div>
          <MdOutlineSettings onMouseOver={() => handShowSettings()} className="sett" />

          <img src={profileImg} onClick={handleLogoutBtn} alt="profile-img" />
        </div>
        <GiHamburgerMenu className="ham" onClick={openSidebar} />
      </nav>
    </div>
  );
}

export default Navbar;
