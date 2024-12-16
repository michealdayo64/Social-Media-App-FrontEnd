import React from "react";
import "./Styles/chatmodal.css";
import chatimage from "../assets/avartar.png";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { useGlobalContext } from "../context";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";

function ChatModal() {
  const { isChatModalOpen, isOpenPrivateChatMessage, openPrivateChatMessage } =
    useGlobalContext();
  const privateChatState = useSelector((state) => state.private_chat);
  const privateChatFriends = privateChatState.chatFriends;
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
          />
        ) : (
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
                <input type="text" placeholder="Enter Message" />
                <button>send</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
