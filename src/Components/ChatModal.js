import React from "react";
import "./Styles/chatmodal.css";
import chatimage from "../assets/avartar.png";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { useGlobalContext } from "../context";
import { useSelector, useDispatch } from "react-redux";

function ChatModal() {
  const { isChatModalOpen, isOpenPrivateChatMessage, openPrivateChatMessage } =
    useGlobalContext();
  const all = useSelector((state) => state.friend);
  const authState = useSelector((state) => state.auth);
  const privateChatState = useSelector((state) => state.private_chat)
  const dispatch = useDispatch();
  const allUsers = all.users;
  const privateChatFriends = privateChatState.chatFriends

  console.log(privateChatFriends)

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
          <div>
            <div className="private-chat-header">
              <span className="head-chat">Chat List</span>
            </div>

            <div className="chat-type">
              {privateChatFriends &&
                privateChatFriends.map((user) => {
                  return (
                    <div key={user.friend.pk}> 
                      <div
                        className="content-image-chat"
                        onClick={openPrivateChatMessage}
                      >
                        <img src={user.friend.profile_image} alt="chatimage" />
                        <div className="content-chat">
                          <span className="name">{user.friend.username}</span>
                          <span className="mychat">hhshhhahajahagaggaga</span>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>
            <div className="private-chat-header-message">
              <div className="head-chat-message">
                <IoIosArrowBack className="arrow" onClick={openPrivateChatMessage} />
                <img src={chatimage} alt="hdhdhd" />
              </div>
              <span>Micheal</span>
              <span className="head-chat-message-icon"><SlOptionsVertical /></span>
            </div>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>

            <p>ncncincniiwincwc</p>

            <p>ncncincniiwincwc</p>
            <p>ncncincniiwincwc</p>

            <p>ncncincniiwincwc</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
