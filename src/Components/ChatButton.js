import React from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import "./Styles/chatbutton.css";

function ChatButton() {
  return (
    <div className="chat-btn">
      <IoChatbubblesSharp className="chat-icon" />
      <span>Chat Box</span>
    </div>
  );
}

export default ChatButton;
