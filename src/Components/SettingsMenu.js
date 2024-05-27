import React from "react";
import "./Styles/settingsmenu.css";
import { useGlobalContext } from "../context";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux_folder/authSlice";

function SettingsMenu() {
    const {showSetting, handShowSettings, handleCloseSettings} = useGlobalContext()
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth);

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

  return (
    <div className={`${showSetting ? "submenu show" : "submenu"}` } onMouseOver={handShowSettings} onMouseOut={handleCloseSettings}>
      <div className="menu-content">
        <span onClick={handleLogoutBtn}>
            Logout
        </span>
      </div>
    </div>
  );
}

export default SettingsMenu;
