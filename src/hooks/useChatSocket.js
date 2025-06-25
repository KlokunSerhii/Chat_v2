import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { saveChatMessages, formatTime } from "../utils/utils.js";

const SOCKET_SERVER_URL = "https://chat-v2-server-7.onrender.com";
// const SOCKET_SERVER_URL = "http://localhost:3001";

export function useChatSocket(username, avatar) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!username) return;

    // Якщо вже є сокет — відключити перед створенням нового
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = io(SOCKET_SERVER_URL, {
      query: { username, avatar },
    });
    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("online-users", (users) => setOnlineUsers(users));

    socket.on("user-typing", (u) => {
      if (u === username) return;
      setTypingUsers((prev) =>
        prev.includes(u) ? prev : [...prev, u]
      );
      setTimeout(
        () => setTypingUsers((prev) => prev.filter((x) => x !== u)),
        2500
      );
    });


  socket.on("last-messages", (history) => {
  const restored = history.map((msg) => ({
    ...msg,
    id: msg._id,
  }));
  const trimmed = saveChatMessages(restored, 100);
  setMessages(trimmed);
});


socket.on("message", (msg) => {
  const isOwnMessage = msg.username === username;

  setMessages((prev) => {
    const newMsg = { ...msg, id: msg._id };

    if (isOwnMessage) {
      // замінюємо локальне повідомлення тим, яке надіслав сервер
      return saveChatMessages(
        prev.map((m) =>
          m.local && m.text === msg.text && !m._id
            ? newMsg
            : m
        ),
        100
      );
    } else {
      return saveChatMessages([...prev, newMsg], 100);
    }
  });
});

socket.on("reaction-update", ({ messageId, reactions }) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions }
          : msg
      )
    );
  });


    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [username, avatar]);

  const sendMessage = (msg) => {
    socketRef.current?.emit("message", msg);
  };
  const toggleReaction = ({ messageId, emoji }) => {
  socketRef.current?.emit("toggle-reaction", { messageId, emoji });
};
  return {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage,
    socketRef,
    toggleReaction,
  };
}

// socket.on("user-joined", (u) =>
//   setMessages((prev) => {
//     const next = [
//       ...prev,
//       {
//         id: uuidv4(),
//         sender: "system",
//         text: `${u} приєднався`,
//         timestamp: formatTime(new Date()),
//       },
//     ];

//     return saveChatMessages(next, 100);
//   })
// );

// socket.on("user-left", (u) =>
//   setMessages((prev) => {
//     const next = [
//       ...prev,
//       {
//         id: uuidv4(),
//         sender: "system",
//         text: `${u} покинув`,
//         timestamp: formatTime(new Date()),
//       },
//     ];
//     return saveChatMessages(next, 100);
//   })
// );
