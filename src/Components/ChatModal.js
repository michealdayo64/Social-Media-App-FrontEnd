import React from "react";
import "./Styles/chatmodal.css";

function ChatModal() {
  return (
    <div className="modal-overlay show-modal">
      <div className="modal-container">
        <h2>Chat Heading</h2>
        <div className="chat-type">
          <h2>Gropu Chat</h2>
          <h2>Private Chat</h2>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
