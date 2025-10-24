import React, { useEffect, useState, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import profileImg from "./assets/avatar.png";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const room = getRoomId || "default-room";
  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  //const [user1, setUser1] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

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

        if (data.msg_type === 0) {
          console.log(data.message);
          const msg_data = {
            username: data.username,
            profile_image: data.profile_image,
            message: data.message,
            natural_timestamp: data.natural_timestamp,
          };
          setMessages((prevMessages) => [...prevMessages, msg_data]);
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

  useEffect(() => {
    if (!user) return;
    const handleSocketMessage = (e) => {
      const data = JSON.parse(e.data);

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

        // ✅ Use ref to avoid stale closures
        setMessages([...messagesRef.current, msgData]);
      }
    };

    const ws = new WebSocket(`ws://127.0.0.1:8000/chat/${room}/?token=${accessToken}`);
    ws.onmessage = handleSocketMessage;
    ws.onopen = () => console.log("WebSocket connection established.");
    ws.onclose = () => console.log("WebSocket closed.");

    return () => ws.close();
  }, [user, room, accessToken]);

  const setPageNumber = (pageNumber) => {
    document.getElementById("id_page_number").innerHTML = pageNumber;
  };

  const handleMessagePayload = (messages, pageNumber) => {
    if (messages !== null && messages !== "undefined" && messages !== "None") {
      setPageNumber(pageNumber);
      setMessages((prevMessages) => {
        const newMessages = messages.filter(
          (msg) => !prevMessages.some((m) => m.msg_id === msg.msg_id)
        );
        return [...prevMessages, ...newMessages];
      });
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
    if (inputValue.length > -1) {
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
              <div key={msg_id || index}>
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
