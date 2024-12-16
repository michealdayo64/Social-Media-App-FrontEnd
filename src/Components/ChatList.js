import React from "react";
import { useGlobalContext } from "../context";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

function ChatList({ privateChatFriends, openPrivateChatMessage }) {
  const { getRoomId } = useGlobalContext();
  const authState = useSelector((state) => state.auth);
  const accessToken = authState.access;
  const user = authState.user;

  const { readyState, sendJsonMessage } = useWebSocket(
    user ? `ws://127.0.0.1:8000/chat/${getRoomId}/` : null,
    {
      queryParams: {
        token: user ? accessToken : "",
      },
    },
    {
      onOpen: () => {
        console.log(`Connected! to Room`);
        /*sendJsonMessage({
          command: "join",
          room: getRoomId,
        });*/
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
