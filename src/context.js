import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSetting, setShowSettings] = useState(false);
  //const container = useRef(null);

  const handShowSettings = () => {
    setShowSettings(true);
  };

  const openSidebar = () => {
    setIsSidebarOpen(false);
    console.log(isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(true);
    console.log(isSidebarOpen);
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
        showSetting
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
