import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { loadUserAccessToken, loadUser } from "./redux_folder/authSlice";
import { jwtDecode } from "jwt-decode";
import {
  loadTotalFriends,
  loadTotalFriendRequest,
  loadAllUsers,
} from "./redux_folder/friendSlice";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [isOpenGroup, setOpenGroup] = useState(false);
  const [isOpenPrivateChat, setOpenPrivateChat] = useState();
  const [showSetting, setShowSettings] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [isOpenPrivateChatMessage, setOpenPrivateChatMessage] = useState(false);
  const [getRoomId, setRoomId] = useState("");

  const dispatch = useDispatch();
  let BASE_URL = "http://127.0.0.1:8000";

  const getLoadUserAccessToken = async (refresh, userdata) => {
    const url = `${BASE_URL}/account/token/refresh/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ refresh: refresh }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(loadUserAccessToken(data));
      userdata["userdata"] = jwtDecode(data.access);
      dispatch(loadUser(userdata));
    }
    return data;
  };

  const getAllUser = async (access) => {
    const url = `${BASE_URL}/friend/get_all_user/`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(loadAllUsers(data));
    }
  };

  const getTotalFriends = async (access) => {
    const url = `${BASE_URL}/friend/friend_count/`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await response.json();
    //console.log(data)
    if (response.status === 200) {
      dispatch(loadTotalFriends(data));
    }
  };

  const getTotalFriendRequest = async (access) => {
    const url = `${BASE_URL}/friend/total_friend_request/`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await response.json();
    //console.log(data)
    if (response.status === 200) {
      dispatch(loadTotalFriendRequest(data));
    }
  };

  const createOrReturnPrivateChat = async (access, id) => {
    const url = `${BASE_URL}/message/create-or-return-private-chat-api/${id}/`;
    const response = await fetch(url, {
      body: null,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await response.json();
    return data;
  };

  const handShowSettings = () => {
    setShowSettings(!showSetting);
    var userdataObject = {};
    var refresh = JSON.parse(localStorage.getItem("token"));
    getLoadUserAccessToken(refresh, userdataObject);
  };

  const displayPhoto = () => {
    if (showVideo === true) {
      setShowVideo(false);
    } else if (showAttachment === true) {
      setShowAttachment(false);
    }
    setShowPhoto(!showPhoto);
  };

  const displayVideo = () => {
    if (showPhoto === true) {
      setShowPhoto(false);
    } else if (showAttachment === true) {
      setShowAttachment(false);
    }
    setShowVideo(!showVideo);
  };

  const displayAttachment = () => {
    if (showPhoto === true) {
      setShowPhoto(false);
    } else if (showVideo === true) {
      setShowVideo(false);
    }
    setShowAttachment(!showAttachment);
  };

  const openSidebar = () => {
    setIsSidebarOpen(false);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(true);
  };

  const openModalWithPhoto = () => {
    openModal();
    displayPhoto();
  };

  const openModalWithVideo = () => {
    openModal();
    displayVideo();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setShowPhoto(false);
    setShowVideo(false);
    setShowAttachment(false);
    setIsModalOpen(false);
  };

  const chatOpenModal = () => {
    setChatModalOpen(!isChatModalOpen);
  };

  const openGroup = () => {
    setOpenGroup(true);
  };

  const closeGroup = () => {
    setOpenGroup(false);
  };

  const openPrivateChat = () => {
    setOpenPrivateChat(true);
  };

  const closePrivateChat = () => {
    setOpenPrivateChat(!isOpenPrivateChat);
  };

  const openPrivateChatMessage = async (access = null, user2_id = null) => {
    setOpenPrivateChatMessage(!isOpenPrivateChatMessage);
    if (user2_id != null && access != null) {
      const room_id = await createOrReturnPrivateChat(access, user2_id);
      setRoomId(room_id["chatroom_id"]);
    } else {
      setRoomId("");
    }
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isModalOpen,
        displayPhoto,
        showPhoto,
        displayAttachment,
        showAttachment,
        displayVideo,
        showVideo,
        isOpenGroup,
        isOpenPrivateChat,
        openModal,
        openModalWithPhoto,
        openModalWithVideo,
        openPrivateChat,
        closePrivateChat,
        closeModal,
        closeGroup,
        openGroup,
        chatOpenModal,
        openPrivateChatMessage,
        isOpenPrivateChatMessage,
        isChatModalOpen,
        handShowSettings,
        showSetting,
        getLoadUserAccessToken,
        getTotalFriends,
        getTotalFriendRequest,
        getAllUser,
        getRoomId,
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
