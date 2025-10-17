import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import profileImg from "./assets/avatar.png";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const room = getRoomId || "default-room";
  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  //const [user1, setUser1] = useState(false);
  const [getMessages, setMessages] = useState([]);

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
          getRoomChatMessages();
          //setUser1(true);
        }
        if (data.user_info) {
          setUserInfo(data.user_info);
        }

        if (data.messages_payload) {
          //console.log(data.messages);
          handleMessagePayload(data.messages, data.new_page_number);
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const setPageNumber = (pageNumber) => {
    document.getElementById("id_page_number").innerHTML = pageNumber;
  };

  const handleMessagePayload = (messages, pageNumber) => {
    if (messages !== null && messages !== "undefined" && messages !== "None") {
      setPageNumber(pageNumber);
        setMessages(messages);
    }
  };

  const getRoomChatMessages = () => {
    var pageNumber = document.getElementById("id_page_number").innerHTML;
    if (pageNumber !== "-1") {
      setPageNumber("-1");
      sendJsonMessage({
        command: "get_room_chat_messages",
        room_id: getRoomId,
        page_number: pageNumber,
      });
    }
  };

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
console.log(getMessages)
  

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
        {getMessages &&
          getMessages.map((mmsg) => {
            const { msg_type, msg_id, user1, user2, user_id, username, message, natural_timestamp } = mmsg;
            return (
              <div>
                <div className={user1 === username ? "msg-details": "msg-details-user"} key={msg_id}>
                  <img src={profileImg} alt="profile-img" />
                  <div className="name-msg">
                    <span className="user"> {username}: {natural_timestamp}</span>
                    <span className="msg-text">{message}</span>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
      </div>
      <div className="message-input">
        <span className="page-number" id="id_page_number">
          1
        </span>
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
