import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import chatimage from "../assets/avartar.png";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const room = getRoomId || "default-room";
  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/chat/${room}/` : null,
    {
      queryParams: {
        token: user ? accessToken : "",
      },

      onOpen: () => {
        console.log(`Connected! to Room`);
        sendJsonMessage({
          command: "join",
          room: getRoomId,
        });
      },

      onClose: () => {
        console.log("Disconnected!");
      },

      onMessage: (e) => {
        const data = JSON.parse(e.data);
        //console.log(data);
        if (data.join) {
          getUserInfo();
        }
        if (data.user_info) {
          setUserInfo(data.user_info);
        }
      },
    }
  );

  console.log(userInfo);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const getUserInfo = () => {
    sendJsonMessage({
      command: "get_user_info",
      room_id: getRoomId,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    if (inputValue) {
      setInputText(inputValue);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({
      command: "send",
      message: inputText,
      room: getRoomId,
    });
    setInputText("");
  };

  return (
    <div className="private-chat-header-message-space">
      <div className="private-chat-header-message">
        <div className="head-chat-message">
          <IoIosArrowBack
            className="arrow"
            onClick={() => openPrivateChatMessage()}
          />
          <img src={userInfo.profile_image || ""} alt="hdhdhd" />
        </div>
        <span>{userInfo.username || ""}</span>
        <span className="head-chat-message-icon">
          <SlOptionsVertical />
        </span>
      </div>
      <div className="message-container">
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
      </div>
      <div className="message-input">
        <form>
          <input
            type="text"
            placeholder="Enter Message"
            onChange={handleChange}
            value={inputText}
          />
          <button onClick={submitMessage}>send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatMessage;
