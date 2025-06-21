import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { io } from "socket.io-client";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";

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
  TypingIndicator,
  MessageUsername,
  ConnectionStatus,
  EmojiButton,
  OnlineUser,
  AvatarImage,
  OnlineListModal,
  ModalOverlay,
AttachedImagePreview,
MessageImage,
  AttachButton
} from "./ChatApp.styled.js";

const SOCKET_SERVER_URL = "https://chat-v2-server-7.onrender.com";
const SOUND_URL = "./notification.mp3";

export default function ChatApp() {
  // Avatar selection
  const avatarSeeds = useMemo(
    () => Array.from({ length: 5 }, () => uuidv4()),
    []
  );
  const [selectedSeed, setSelectedSeed] = useState(avatarSeeds[0]);
  const [avatar, setAvatar] = useState(
    () =>
      localStorage.getItem("chat_avatar") ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[0]}`
  );

  // User state
  const [username, setUsername] = useState(
    () => localStorage.getItem("chat_username") || ""
  );
  const [tempUsername, setTempUsername] = useState(username);

  // Chat state
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(
    () => localStorage.getItem("chat_theme") === "dark"
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Новий стан для показу бокової панелі онлайн користувачів
  const [isOnlineListOpen, setIsOnlineListOpen] = useState(false);
const [attachedImage, setAttachedImage] = useState(null);
const fileInputRef = useRef(null);

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  // Refs and socket
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const audioRef = useRef(null);
  const usernameInputRef = useRef(null);

  // Форматування часу (з твого коду)
  const formatTime = (input) => {
    const d = new Date(input);
    if (isNaN(d.getTime())) return "??:??";
    return new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Kiev",
    }).format(d);
  };

  // Login handler
  const handleLogin = () => {
    const name = tempUsername.trim();
    if (!name) return;
    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSeed}`;
    setAvatar(url);
    setUsername(name);
    localStorage.setItem("chat_username", name);
    localStorage.setItem("chat_avatar", url);
  };

  // Socket logic
  useEffect(() => {
    if (!username) return;
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
      setMessages(
        history.map((msg) => ({
          id: uuidv4(),
          ...msg,
        }))
      );
    });

    socket.on("message", (msg) => {
      if (msg.username === username && msg.sender === "user") return;
      setMessages((prev) => {
        const next = [...prev, { id: uuidv4(), ...msg }];
        localStorage.setItem("chat_messages", JSON.stringify(next));
        return next;
      });
      audioRef.current?.play();
    });

    socket.on("user-joined", (u) =>
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sender: "system",
          text: `${u} приєднався`,
          timestamp: formatTime(new Date()),
        },
      ])
    );
    socket.on("user-left", (u) =>
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sender: "system",
          text: `${u} покинув`,
          timestamp: formatTime(new Date()),
        },
      ])
    );

    return () => socket.disconnect();
  }, [username, avatar]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem(
      "chat_theme",
      isDarkTheme ? "dark" : "light"
    );
  }, [isDarkTheme]);

 const sendMessage = () => {
  if ((!input.trim() && !attachedImage) || !isConnected) return;

  const msg = {
    sender: "user",
    text: input.trim(),
    timestamp: new Date().toISOString(),
    username,
    avatar,
    image: attachedImage || null, // додаємо сюди
  };

  setMessages((prev) => {
    const next = [...prev, { id: uuidv4(), ...msg }];
    localStorage.setItem("chat_messages", JSON.stringify(next));
    return next;
  });

  socketRef.current.emit("message", msg);

  setInput("");
  setAttachedImage(null);
  chatInputRef.current?.focus();
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Перевірка розміру і типу (опційно)
  if (!file.type.startsWith("image/")) {
    alert("Будь ласка, виберіть зображення");
    return;
  }

  // Зчитування файлу у base64
  const reader = new FileReader();
  reader.onload = () => {
    setAttachedImage(reader.result);
  };
  reader.readAsDataURL(file);

  // Очистити інпут, щоб можна було вибрати той самий файл знову
  e.target.value = null;
};

  // Render
  return (
    <ChatContainer $dark={isDarkTheme}>
      <StatusBar $connected={isConnected} $dark={isDarkTheme}>
        {username ? (
          <>
            Статус:{" "}
            <ConnectionStatus $connected={isConnected}>
              {isConnected ? "🟢 Онлайн" : "🔴 Офлайн"}
            </ConnectionStatus>

            {/* Кнопка для відкриття бокової панелі онлайн */}
            <ChatButton onClick={() => setIsOnlineListOpen(true)}>
              Онлайн користувачі
            </ChatButton>

            <ThemeToggle
              onClick={() => setIsDarkTheme((p) => !p)}
              $dark={isDarkTheme}
            >
              {isDarkTheme ? " " : " "}
            </ThemeToggle>
          </>
        ) : (
          <span>Введіть ім'я і оберіть аватар</span>
        )}
      </StatusBar>

      {!username ? (
        <UsernameInputWrapper>
          <div style={{ marginBottom: 12 }}>
            <strong>Оберіть аватар:</strong>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {avatarSeeds.map((s) => {
                const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`;
                return (
                  <AvatarImage
                    key={s}
                    src={url}
                    onClick={() => setSelectedSeed(s)}
                    style={{
                      border:
                        s === selectedSeed
                          ? "2px solid #0088cc"
                          : "2px solid transparent",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <UsernameInput
            ref={usernameInputRef}
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Ваше ім'я"
            $dark={isDarkTheme}
          />
          <ChatButton
            onClick={handleLogin}
            disabled={!tempUsername.trim()}
          >
            Увійти
          </ChatButton>
        </UsernameInputWrapper>
      ) : (
        <>
          {/* ВИКЛЮЧАЄМО старий OnlineList */}
          {/* <OnlineList $dark={isDarkTheme}>
            <strong>Онлайн:</strong>
            {onlineUsers.map((u) => (
              <OnlineUser key={u.username}>
                <AvatarImage src={u.avatar} alt={u.username} />
                {u.username}
              </OnlineUser>
            ))}
          </OnlineList> */}

          <ChatMessages $dark={isDarkTheme}>
            {messages.map((msg) => (
              <Message
                key={msg.id}
                $isOwn={msg.username === username}
                $dark={isDarkTheme}
                $system={msg.sender === "system"}
              >
                {msg.sender !== "system" && (
                  <MessageUsername
                    $dark={isDarkTheme}
                    $isOwn={msg.username === username}
                  >
                    <AvatarImage
                      src={msg.avatar}
                      alt={msg.username}
                    />
                    {msg.username}
                  </MessageUsername>
                )}
              <MessageText $isOwn={msg.username === username}>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {msg.text}
  </ReactMarkdown>
  {msg.image && (
    <MessageImage src={msg.image} alt="attached" />
  )}
</MessageText>
                <MessageTime
                  $dark={isDarkTheme}
                  $isOwn={msg.username === username}
                  $delivered
                >
                  {formatTime(msg.timestamp)}
                </MessageTime>
              </Message>
            ))}
            {typingUsers.map((u) => (
              <TypingIndicator key={u} $dark={isDarkTheme}>
                <em>{u} друкує...</em>
              </TypingIndicator>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputWrapper $dark={isDarkTheme}>
            <ChatInput
              ref={chatInputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Напишіть повідомлення..."
              $dark={isDarkTheme}
            />
            <EmojiButton
              onClick={() => setShowEmojiPicker((p) => !p)}
              $dark={isDarkTheme}
            >
              😃
            </EmojiButton>
            <input
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  ref={fileInputRef}
  onChange={handleFileChange}
/>
<AttachButton
  onClick={() => fileInputRef.current.click()}
  $dark={isDarkTheme}
>
  📎
</AttachButton>
{attachedImage && (
  <AttachedImagePreview>
    <img src={attachedImage} alt="preview" />
    <button onClick={() => setAttachedImage(null)}>✖</button>
  </AttachedImagePreview>
)}
            <ChatButton
              onClick={sendMessage}
              disabled={!input.trim() || !isConnected}
            >
              Надіслати
            </ChatButton>
            <AnimatePresence>
              {showEmojiPicker && (
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme={isDarkTheme ? "dark" : "light"}
                />
              )}
            </AnimatePresence>
          </ChatInputWrapper>
        </>
      )}

      {/* Модалка списку онлайн */}
      <ModalOverlay
        $open={isOnlineListOpen}
        onClick={() => setIsOnlineListOpen(false)}
      />
      <OnlineListModal $open={isOnlineListOpen} $dark={isDarkTheme}>
        <h3>Онлайн користувачі</h3>
        {onlineUsers.length === 0 && <p>Немає користувачів онлайн</p>}
        {onlineUsers.map((u) => (
          <OnlineUser key={u.username}>
            <AvatarImage src={u.avatar} alt={u.username} />
            {u.username}
          </OnlineUser>
        ))}
        <ChatButton onClick={() => setIsOnlineListOpen(false)}>Закрити</ChatButton>
      </OnlineListModal>

      <audio ref={audioRef} src={SOUND_URL} preload="auto" />
    </ChatContainer>
  );
}
