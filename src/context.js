import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { loadUserAccessToken, loadUser } from "./redux_folder/authSlice";
import { jwtDecode } from "jwt-decode";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSetting, setShowSettings] = useState(false);
  const dispatch = useDispatch()
  var userdataObject = {};
  const refresh = JSON.parse(localStorage.getItem("token"));

  const getLoadUserAccessToken = async (refresh, userdata) => {
    const url = "http://127.0.0.1:8000/account/token/refresh/";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ refresh: refresh }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data)
      dispatch(loadUserAccessToken(data));
      userdata["userdata"] = jwtDecode(data.access);
      dispatch(loadUser(userdata));
    }
  };

  const handShowSettings = () => {
    setShowSettings(!showSetting);
    getLoadUserAccessToken(refresh, userdataObject)
  };

  const openSidebar = () => {
    setIsSidebarOpen(false);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isModalOpen,
        openModal,
        closeModal,
        handShowSettings,
        showSetting,
        getLoadUserAccessToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
