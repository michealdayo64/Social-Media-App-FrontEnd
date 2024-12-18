import React from "react";

function ChatList({ privateChatFriends, openPrivateChatMessage, accessToken }) {
  return (
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
                  className="content-image-chat-space"
                  onClick={() =>
                    openPrivateChatMessage(accessToken, user.friend.pk)
                  }
                >
                  <div className="content-image-chat">
                    <img src={user.friend.profile_image} alt="chatimage" />
                    <div className="content-chat">
                      <span className="name">{user.friend.username}</span>
                      <span className="mychat">hhshhhahajahagaggaga</span>
                    </div>
                  </div>
                  <div className="chat-time">
                    <span>2:44</span>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatList;
