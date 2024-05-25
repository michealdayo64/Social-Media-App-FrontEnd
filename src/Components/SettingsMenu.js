import React, { useRef, useState } from "react";
import "./Styles/settingsmenu.css";
import { useGlobalContext } from "../context";

function SettingsMenu() {
    const {showSetting} = useGlobalContext()
  return (
    <div className={`${showSetting ? "submenu show" : "submenu"}`} onMouseOver={null}>
      <div className="menu-content">
        <span>
            logout
        </span>
      </div>
    </div>
  );
}

export default SettingsMenu;
