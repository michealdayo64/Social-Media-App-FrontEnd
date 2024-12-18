import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import chatimage from "../assets/avartar.png";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const [inputText, setInputText] = useState("");
  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/chat/${getRoomId}/` : null,
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
        console.log(data);
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

  console.log(connectionStatus);

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
    setInputText("")
  };

  return (
    <div className="private-chat-header-message-space">
      <div className="private-chat-header-message">
        <div className="head-chat-message">
          <IoIosArrowBack
            className="arrow"
            onClick={() => openPrivateChatMessage()}
          />
          <img src={chatimage} alt="hdhdhd" />
        </div>
        <span>Micheal</span>
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
