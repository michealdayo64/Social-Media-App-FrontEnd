import React from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import "./Styles/chatbutton.css";
import { useGlobalContext } from "../context";


function ChatButton() {
  const { chatOpenModal } = useGlobalContext()
  return (
    <div className="chat-btn" onClick={chatOpenModal}>
      <IoChatbubblesSharp className="chat-icon" />
      <span>Chat Box</span>
    </div>
  );
}

export default ChatButton;
