import React from "react";
import "../Components/Styles/sidebar.css";
import { ImCancelCircle } from "react-icons/im";
import { useGlobalContext } from "../context";

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
      }`}
    >
      <ImCancelCircle onClick={closeSidebar} className="cancel-icon" />
    </div>
  );
}

export default Sidebar;
