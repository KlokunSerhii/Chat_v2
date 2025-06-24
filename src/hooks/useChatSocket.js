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
        id: msg._id,
        ...msg,
      }));
      const trimmed = saveChatMessages(restored, 100);
      setMessages(trimmed);
    });

    socket.on("message", (msg) => {
      const isOwnMessage = msg.username === username;
      if (isOwnMessage) return;

      setMessages((prev) => {
        const next = [...prev, { id: msg._id, ...msg }];
        const trimmed = saveChatMessages(next, 100);
        return trimmed;
      });
    });

    socket.on("reaction-updated", ({ messageId, reactions }) => {
      console.log("🔥 Оновлено реакції:", messageId, reactions);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId 
            ? { ...msg, reactions }
            : msg
        )
      );
    });
    socket.on("react", ({ messageId, emoji, username, remove }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id !== messageId)
            return msg;

          const prevReactions = msg.reactions || {};
          const updatedReactions = { ...prevReactions };

          if (!updatedReactions[emoji]) {
            updatedReactions[emoji] = [];
          }

          if (remove) {
            updatedReactions[emoji] = updatedReactions[emoji].filter(
              (u) => u !== username
            );
            if (updatedReactions[emoji].length === 0) {
              delete updatedReactions[emoji];
            }
          } else {
            if (!updatedReactions[emoji].includes(username)) {
              updatedReactions[emoji].push(username);
            }
          }

          return {
            ...msg,
            reactions: updatedReactions,
          };
        })
      );
    });

    return () => {
      socket.off("reaction-updated");
      socket.off("react");
      socket.disconnect();
    };
  }, [username, avatar]); // avatar тепер тригерить перепідключення

  const sendMessage = (msg) => {
    socketRef.current?.emit("message", msg);
  };

  return {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage,
    socketRef,
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
