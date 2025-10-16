import React from "react";
import "./Styles/chatmodal.css";
import { useGlobalContext } from "../context";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";

function ChatModal() {
  const { isChatModalOpen, isOpenPrivateChatMessage, openPrivateChatMessage, getRoomId } =
    useGlobalContext();
  const privateChatState = useSelector((state) => state.private_chat);
  const privateChatFriends = privateChatState.chatFriends;
  
  const authState = useSelector((state) => state.auth);
  const accessToken = authState.access;
  const user = authState.user;
  return (
    <div
      className={`${
        isChatModalOpen
          ? "chat-modal-overlay chat-show-modal"
          : "chat-modal-overlay"
      }`}
    >
      <div className="chat-modal-container">
        {!isOpenPrivateChatMessage ? (
          <ChatList
            privateChatFriends={privateChatFriends}
            openPrivateChatMessage={openPrivateChatMessage}
            accessToken={accessToken}
          />
        ) : (
          <ChatMessage
            user={user}
            getRoomId={getRoomId}
            openPrivateChatMessage={openPrivateChatMessage}
            accessToken={accessToken}
          />
        )}
      </div>
    </div>
  );
}

export default ChatModal;
