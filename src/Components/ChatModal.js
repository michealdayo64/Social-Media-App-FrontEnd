import React from "react";
import "./Styles/chatmodal.css";
import { useGlobalContext } from "../context";

function ChatModal() {
  const { isChatModalOpen } = useGlobalContext()
  console.log(isChatModalOpen)
  return (
    <div className={`${isChatModalOpen ? "chat-modal-overlay chat-show-modal": "chat-modal-overlay"}`}>
      <div className="chat-modal-container">
        <h2>Chat Heading</h2>
        <div className="chat-type">
          <h2>Gropu Chat</h2>
          <h2>Private Chat</h2>
        </div>
        <div className="group-chat"><h2>Group Chat</h2></div>
        <div className="private-chat"><h2>Private Chat</h2></div>
      </div>
    </div>
  );
}

export default ChatModal;
