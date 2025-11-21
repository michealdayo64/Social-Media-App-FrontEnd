import React, { useEffect, useState, useRef, useCallback } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import profileImg from "./assets/avatar.png";

function useWebSocket({ roomId, token, onMessage }) {
  const wsRef = useRef(null);

  useEffect(() => {
    // If no room or token, do nothing
    if (!roomId || !token) {
      return () => {};
    }

    const url = `ws://127.0.0.1:8000/chat/${roomId}/?token=${token}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    const handleOpen = () => {
      console.log("WebSocket OPEN for room:", roomId);
      // join the room as soon as connection opens
      ws.send(JSON.stringify({ command: "join", room: roomId }));
    };

    const handleMessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        onMessage && onMessage(data);
      } catch (err) {
        console.error("Failed to parse ws message", err);
      }
    };

    const handleError = (err) => {
      console.error("WebSocket error for room", roomId, err);
    };

    const handleClose = (ev) => {
      console.log("WebSocket closed for room:", roomId, ev?.code);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    return () => {
      // cleanup listeners and close socket when roomId/token changes or component unmounts
      try {
        ws.removeEventListener("open", handleOpen);
        ws.removeEventListener("message", handleMessage);
        ws.removeEventListener("error", handleError);
        ws.removeEventListener("close", handleClose);
      } catch (err) {
        // ignore
      }
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, [roomId, token, onMessage]);

  // send helper
  const send = (payload) => {
    const ws = wsRef.current;
    if (!ws) {
      console.warn("WebSocket not connected");
      return false;
    }
    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not open (readyState = ", ws.readyState, ")");
      return false;
    }
    try {
      ws.send(JSON.stringify(payload));
      return true;
    } catch (err) {
      console.error("Failed to send websocket message", err);
      return false;
    }
  };

  return { wsRef, send };
}

function ChatMessage({ user, getRoomId, openPrivateChatMessage, accessToken }) {
  const [inputText, setInputText] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [pageNumber] = useState("1");

  //const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch initial messages for a room
  const getRoomChatMessages = useCallback(
    async (roomId) => {
      if (!roomId || !accessToken) return;
      try {
        const url = `http://127.0.0.1:8000/message/get-room-chat-messages/${roomId}/?page=${pageNumber}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          console.warn("Failed to fetch messages:", response.status);
          return;
        }
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    },
    [accessToken, pageNumber]
  );

  // Handler to be called for every incoming websocket message
  const handleIncomingMessage = useCallback((data) => {
    // Only append actual chat messages (msg_type === 0 per your backend)
    if (data && data.msg_type === 0) {
      console.log("Received ws message:", data);
      setMessages((prev) => [...prev, data]);
    } else if (data && data.messages_payload) {
      // if you ever send a full payload from server, handle it
      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } else {
      // handle other message types if needed (join/leave etc.)
      // console.log("Other ws message:", data);
    }
  }, []);

  // Create/use the websocket connection and reconnect when room changes
  const { wsRef, send } = useWebSocket({
    roomId: getRoomId,
    token: accessToken,
    onMessage: handleIncomingMessage,
  });

  /**useEffect(() => {
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/chat/${getRoomId}/?token=${accessToken}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Private ChatSocket OPEN");
      // join chat room
      if (user) {
        ws.send(
          JSON.stringify({
            command: "join",
            room: getRoomId,
          })
        );
      }
      //setSocketConnection(ws);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      //console.log(data);
      if (data.msg_type === 0) {
        console.log(data.message);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };
    ws.onerror = (err) => console.error("WS ERROR:", err);

    ws.onclose = () => console.log("WS CLOSED");

    return () => ws.close();
  }, []);**/

  // When roomId or user change, fetch messages and set userInfo
  useEffect(() => {
    setUserInfo(user || {});
    if (!getRoomId) {
      // clear messages when there's no room selected
      setMessages([]);
      return;
    }
    // clear old messages while new fetch is in progress (optional user experience choice)
    setMessages([]);
    getRoomChatMessages(getRoomId);
  }, [user, getRoomId, getRoomChatMessages]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    if (inputValue.length > -1) {
      setInputText(inputValue);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // optimistic message object — will be replaced/duplicated when server echoes the message
    const optimisticMessage = {
      msg_type: 0,
      username: user?.username || "You",
      user_id: user?.id || null,
      profile_image: user?.profile_image || "",
      message: inputText,
      natural_timestamp: "now",
      // msg_id intentionally omitted — server will provide canonical id later
    };

    console.log("Submitting message:", optimisticMessage);

    // 1) update UI immediately (optimistic)
    setMessages((prev) => [...prev, optimisticMessage]);

    // 2) send via websocket
    const payload = {
      command: "send",
      message: inputText,
      room: getRoomId,
    };

    const sent = send(payload);

    if (!sent) {
      // If send fails, you may want to remove optimistic message or mark it as unsent
      console.warn("Message not sent, will retry or show error");
      // Optional: show feedback to user
    }

    setInputText("");
  };

  return (
    <div className="private-chat-header-message-space">
      <div className="private-chat-header-message">
        <div className="head-chat-message">
          <IoIosArrowBack
            className="arrow"
            onClick={() => openPrivateChatMessage()}
          />
          <img src={userInfo.profile_image || ""} alt="hdhdhd" />
        </div>
        <span>{userInfo.username || ""}</span>
        <span className="head-chat-message-icon">
          <SlOptionsVertical />
        </span>
      </div>
      <div className="message-container">
        {messages &&
          messages.map((mmsg, index) => {
            const {
              msg_type,
              msg_id,
              user1,
              user2,
              user_id,
              username,
              message,
              natural_timestamp,
            } = mmsg;
            return (
              <div
                key={`${msg_id ?? `${username}-${natural_timestamp}-${index}`}`}
              >
                <div
                  className={
                    user1 === username ? "msg-details" : "msg-details-user"
                  }
                >
                  <img src={profileImg} alt="profile-img" />
                  <div className="name-msg">
                    <span className="user">
                      {" "}
                      {username}: {natural_timestamp}
                    </span>
                    <span className="msg-text">{message}</span>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
      </div>
      <div className="message-input">
        <span className="page-number" id="id_page_number">
          {pageNumber}
        </span>
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
