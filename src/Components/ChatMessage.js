import React, { useEffect, useState, useRef, useCallback } from "react";
//import useWebSocket, { ReadyState } from "react-use-websocket";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import profileImg from "./assets/avatar.png";
import { useSelector } from "react-redux";
import { use } from "react";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const room = getRoomId || "default-room";

  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [pageNumber, setPageNumber] = useState("1");
  const [messages, setMessages] = useState([]);
  //const [socketConnection, setSocketConnection] = useState("");
  //const privateChatState = useSelector((state) => state.private_chat);
  //const msggs = privateChatState.messages;
  //console.log(msggs);
  //let socketRef = useRef(null);

  let socketUrl = `ws://127.0.0.1:8000/chat/${getRoomId}/?token=${accessToken}`;
  let socket = new WebSocket(socketUrl);

  

  useEffect(() => {
    const getRoomChatMessages = async (access, room_id) => {
      const url = `http://127.0.0.1:8000/message/get-room-chat-messages/${room_id}/?page=${pageNumber}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.json();
      setMessages(data["messages"]);
      //return data;
    };

    setUserInfo(user);

    getRoomChatMessages(accessToken, getRoomId);
  }, [accessToken, getRoomId, user, pageNumber]);

  useEffect(() => {
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    };
  }, []);

  

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    if (inputValue.length > -1) {
      setInputText(inputValue);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (socket && inputText.trim()) {
      socket.send(
        JSON.stringify({
          command: "send",
          message: inputText,
          room: getRoomId,
        })
      );
      setInputText("");
    }
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
        {messages &&
          messages.map((mmsg, index) => {
            const {
              msg_type,
              msg_id,
              user1,
              user2,
              user_id,
              username,
              message,
              natural_timestamp,
            } = mmsg;
            return (
              <div
                key={`${msg_id ?? `${username}-${natural_timestamp}-${index}`}`}
              >
                <div
                  className={
                    user1 === username ? "msg-details" : "msg-details-user"
                  }
                >
                  <img src={profileImg} alt="profile-img" />
                  <div className="name-msg">
                    <span className="user">
                      {" "}
                      {username}: {natural_timestamp}
                    </span>
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
          {pageNumber}
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
