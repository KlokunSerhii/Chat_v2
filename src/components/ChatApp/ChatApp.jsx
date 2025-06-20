import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import {
  ChatContainer,
  StatusBar,
  ChatButton,
  ChatInput,
  ChatMessages,
  MessageText,
  MessageTime,
  ChatInputWrapper,
  Message,
  ThemeToggle,
  UsernameInputWrapper,
  UsernameInput,
TypingIndicator
} from "./ChatApp.styled.js";

const SOCKET_SERVER_URL = "https://chat-v2-server-7.onrender.com";
const SOUND_URL = "/notification.mp3";

const ChatApp = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [username, setUsername] = useState(
    () => localStorage.getItem("chat_username") || ""
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem("chat_theme");
    return saved ? saved === "dark" : false;
  });

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const usernameInputRef = useRef(null);
  const chatInputRef = useRef(null);
 
  useEffect(() => {
    if (!username.trim()) return;

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { username },
    });

    socketRef.current.on("connect", () => setIsConnected(true));
    socketRef.current.on("disconnect", () => setIsConnected(false));
    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setIsConnected(false);
    });
    socketRef.current.on("user-typing", (typingUsername) => {
      if (typingUsername === username) return;

      setTypingUsers((prev) => {
        if (!prev.includes(typingUsername)) {
          return [...prev, typingUsername];
        }
        return prev;
      });

      // Прибрати через 2.5 сек
      setTimeout(() => {
        setTypingUsers((prev) =>
          prev.filter((u) => u !== typingUsername)
        );
      }, 2500);
    });

    socketRef.current.on("last-messages", (lastMessages) => {
      setMessages(
        lastMessages.map((msg) => ({
          id: uuidv4(),
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          username: msg.username,
        }))
      );
    });

    socketRef.current.on("message", (data) => {
      // Уникай дублювання власних повідомлень
      if (data.username === username && data.sender === "user")
        return;

      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            id: uuidv4(),
            text: data.text,
            sender: data.sender,
            timestamp: new Date(data.timestamp).toLocaleTimeString(),
            username: data.username,
          },
        ];
        localStorage.setItem(
          "chat_messages",
          JSON.stringify(newMessages)
        );
        return newMessages;
      });

      audioRef.current?.play();
    });

    socketRef.current.on("user-joined", (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: `${user} приєднався до чату`,
          sender: "system",
          timestamp: new Date().toLocaleTimeString(),
          username: null,
        },
      ]);
    });

    socketRef.current.on("user-left", (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: `${user} покинув чат`,
          sender: "system",
          timestamp: new Date().toLocaleTimeString(),
          username: null,
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [username]);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
}, [messages]);

  useEffect(() => {
    localStorage.setItem("chat_username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem(
      "chat_theme",
      isDarkTheme ? "dark" : "light"
    );
  }, [isDarkTheme]);

useEffect(() => {
    if (username.trim() && isConnected) {
      chatInputRef.current?.focus();
    }
  }, [username, isConnected]);

  const sendMessage = () => {
 if (!input.trim() || !isConnected) return;

    const userMsg = {
      id: uuidv4(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      username,
    };

    setMessages((prev) => {
      const newMessages = [...prev, userMsg];
      localStorage.setItem(
        "chat_messages",
        JSON.stringify(newMessages)
      );
      return newMessages;
    });

    socketRef.current.emit("message", {
      text: input.trim(),
      username,
    });

   setInput("");
 if (document.activeElement) document.activeElement.blur();
 chatInputRef.current?.focus(); // ← фокус після відправки
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };


// фокус на інпут залежно від стану username
 useEffect(() => {
   if (!username.trim()) {
    usernameInputRef.current?.focus();
  } else {
     chatInputRef.current?.focus();
   }
 }, [username]);

 


  return (
    <ChatContainer $dark={isDarkTheme}>
      <StatusBar $connected={isConnected} $dark={isDarkTheme}>
        Статус: <span>{isConnected ? "Онлайн" : "Офлайн"}</span>
        <ThemeToggle
          onClick={() => setIsDarkTheme((prev) => !prev)}
          title="Перемкнути тему"
          aria-label="Toggle theme"
          $dark={isDarkTheme}
        >
          {isDarkTheme ? "🌞" : "🌙"}
        </ThemeToggle>
      </StatusBar>

      {!username.trim() ? (
        <UsernameInputWrapper>
          <UsernameInput
            autoFocus
            ref={usernameInputRef}
            type="text"
            placeholder="Введіть ваше ім'я..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && username.trim()) {
                setUsername(username.trim());
              }
            }}
          />
          <ChatButton
            onClick={() =>
              username.trim() && setUsername(username.trim())
            }
            disabled={!username.trim()}
          >
            Увійти
          </ChatButton>
        </UsernameInputWrapper>
      ) : (
        <>
          <ChatMessages ref={chatContainerRef} $dark={isDarkTheme}>
            {messages.map((msg) => (
              <Message
                $sage
                key={msg.id}
                $sender={msg.sender}
                $dark={isDarkTheme}
                $system={msg.sender === "system"}
                $isOwn={msg.username === username} // Ось ця пропса!
              >
                {msg.sender !== "system" && (
                  <strong>{msg.username || "Користувач"}: </strong>
                )}
                <MessageText>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </MessageText>
                <MessageTime>{msg.timestamp}</MessageTime>
              </Message>
            ))}
            {typingUsers.map((user) => (
              <TypingIndicator key={user} $dark={isDarkTheme}>
                <em>
                  {user} друкує<span>.</span>
                  <span>.</span>
                  <span>.</span>
                </em>
              </TypingIndicator>
            ))}

            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputWrapper $dark={isDarkTheme}>
            <ChatInput
              ref={chatInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isConnected
                  ? "Введіть повідомлення..."
                  : "Не підключено"
              }
              disabled={!isConnected}
              autoComplete="off"
              spellCheck="false"
            />
            <ChatButton
              onClick={sendMessage}
              disabled={!isConnected || !input.trim()}
            >
              Надіслати
            </ChatButton>
          </ChatInputWrapper>
        </>
      )}

      <audio ref={audioRef} src={SOUND_URL} preload="auto" />
    </ChatContainer>
  );
};

export default ChatApp;
