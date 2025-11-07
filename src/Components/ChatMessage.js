import React, { useEffect, useState, useRef, useCallback } from "react";
//import useWebSocket, { ReadyState } from "react-use-websocket";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import profileImg from "./assets/avatar.png";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const room = getRoomId || "default-room";
  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [pageNumber, setPageNumber] = useState("1");
  const [messages, setMessages] = useState([]);
  const [socketConnection, setSocketConnection] = useState("");

  //let socketRef = useRef(null);

  const getRoomChatMessages = useCallback(() => {
    if (pageNumber !== "-1") {
      setPageNumber("-1");
      socketConnection.send(
        JSON.stringify({
          command: "get_room_chat_messages",
          room_id: getRoomId,
          page_number: pageNumber,
        })
      );
    }
  }, [getRoomId, pageNumber, socketConnection]);

  const getUserInfo = useCallback(() => {
    socketConnection.send(
      JSON.stringify({
        command: "get_user_info",
        room_id: getRoomId,
      })
    );
  }, [getRoomId, socketConnection]);

  const handleMessagePayload = useCallback((messages, pageNumber) => {
    if (messages !== null && messages !== "undefined" && messages !== "None") {
      setPageNumber(pageNumber);
      setMessages(messages);
    }
  }, []);

  /**const connect_messages = useCallback(() => {}, [
    room,
    accessToken,
    getUserInfo,
    getRoomChatMessages,
    handleMessagePayload,
  ]);**/

  useEffect(() => {
    if (!room || !accessToken) return;
    let socketUrl = `ws://127.0.0.1:8000/chat/${room}/?token=${accessToken}`;
    let socket = new WebSocket(socketUrl);
    //socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
      socket.send(JSON.stringify({ command: "join", room: room }));
      setSocketConnection(socket);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      //console.log(data);

      if (data.join) {
        getUserInfo();
        getRoomChatMessages();
      }

      if (data.user_info) setUserInfo(data.user_info);

      if (data.messages_payload) {
        handleMessagePayload(data.messages, data.new_page_number);
      }

      if (data.msg_type === 0) {
        const msgData = {
          username: data.username,
          profile_image: data.profile_image,
          message: data.message,
          natural_timestamp: data.natural_timestamp,
        };
        console.log(msgData);
        setMessages((prev) => [...prev, msgData]);
      }
    };

    socket.onclose = (e) => {
      console.log("❌ Socket closed, reconnecting...", e.reason);
      //setTimeout(() => connect_messages(), 2000);
    };

    socket.onerror = (err) => {
      console.error("⚠️ Socket error:", err);
      socket.close();
    };
    //connect_messages();
    //return () => socketRef.current?.close();
  }, [
    room,
    accessToken
  ]);

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    if (inputValue.length > -1) {
      setInputText(inputValue);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (socketConnection && inputText.trim()) {
      socketConnection.send(
        JSON.stringify({
          command: "send",
          message: inputText,
          room: room,
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
