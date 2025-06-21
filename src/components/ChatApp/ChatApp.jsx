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
  AttachButton,
} from "./ChatApp.styled.js";

const SOCKET_SERVER_URL = "https://chat-v2-server-7.onrender.com";
const SOUND_URL = "./notification.mp3";

// Функція обрізання та безпечного збереження повідомлень у localStorage
function saveChatMessages(messages, maxMessages = 100) {
  let trimmed = messages;
  if (messages.length > maxMessages) {
    trimmed = messages.slice(-maxMessages);
  }
  try {
    localStorage.setItem("chat_messages", JSON.stringify(trimmed));
  } catch (e) {
    console.error("Помилка запису chat_messages у localStorage:", e);
  }
  return trimmed;
}

// Функція стиснення зображення
function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
    };

    image.onload = () => {
      let { width, height } = image;

      // Зберігаємо пропорції і масштаб до maxWidth/maxHeight
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);

      // Отримуємо стиснене base64 (jpeg, quality 0.7)
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    reader.onerror = (err) => reject(err);
    image.onerror = (err) => reject(err);

    reader.readAsDataURL(file);
  });
}

export default function ChatApp() {
  // Avatar selection
  const avatarSeeds = useMemo(() => Array.from({ length: 5 }, () => uuidv4()), []);
  const [selectedSeed, setSelectedSeed] = useState(avatarSeeds[0]);
  const [avatar, setAvatar] = useState(
    () =>
      localStorage.getItem("chat_avatar") ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[0]}`
  );

  // User state
  const [username, setUsername] = useState(() => localStorage.getItem("chat_username") || "");
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
  const [isDarkTheme, setIsDarkTheme] = useState(() => localStorage.getItem("chat_theme") === "dark");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [isOnlineListOpen, setIsOnlineListOpen] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const fileInputRef = useRef(null);

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const audioRef = useRef(null);
  const usernameInputRef = useRef(null);

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

  const handleLogin = () => {
    const name = tempUsername.trim();
    if (!name) return;
    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSeed}`;
    setAvatar(url);
    setUsername(name);
    localStorage.setItem("chat_username", name);
    localStorage.setItem("chat_avatar", url);
  };

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
      setTypingUsers((prev) => (prev.includes(u) ? prev : [...prev, u]));
      setTimeout(() => setTypingUsers((prev) => prev.filter((x) => x !== u)), 2500);
    });

    socket.on("last-messages", (history) => {
      const restored = history.map((msg) => ({
        id: uuidv4(),
        ...msg,
      }));
      const trimmed = saveChatMessages(restored, 100);
      setMessages(trimmed);
    });

    socket.on("message", (msg) => {
      if (msg.username === username && msg.sender === "user") return;

      setMessages((prev) => {
        const next = [...prev, { id: uuidv4(), ...msg }];
        const trimmed = saveChatMessages(next, 100);
        return trimmed;
      });

      audioRef.current?.play();
    });

    socket.on("user-joined", (u) =>
      setMessages((prev) => {
        const next = [
          ...prev,
          {
            id: uuidv4(),
            sender: "system",
            text: `${u} приєднався`,
            timestamp: formatTime(new Date()),
          },
        ];
        return saveChatMessages(next, 100);
      })
    );

    socket.on("user-left", (u) =>
      setMessages((prev) => {
        const next = [
          ...prev,
          {
            id: uuidv4(),
            sender: "system",
            text: `${u} покинув`,
            timestamp: formatTime(new Date()),
          },
        ];
        return saveChatMessages(next, 100);
      })
    );

    return () => socket.disconnect();
  }, [username, avatar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chat_theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const sendMessage = () => {
    if ((!input.trim() && !attachedImage) || !isConnected) return;

    const msg = {
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toISOString(),
      username,
      avatar,
      image: attachedImage || null,
    };

    setMessages((prev) => {
      const next = [...prev, { id: uuidv4(), ...msg }];
      const trimmed = saveChatMessages(next, 100);
      return trimmed;
    });

    socketRef.current.emit("message", msg);

    setInput("");
    setAttachedImage(null);
    chatInputRef.current?.focus();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Будь ласка, виберіть зображення");
      return;
    }

    try {
      const compressedImage = await compressImage(file);
      setAttachedImage(compressedImage);
    } catch (err) {
      alert("Помилка обробки зображення");
      console.error(err);
    }

    e.target.value = null;
  };

  // Рендер
  return (
    <ChatContainer $dark={isDarkTheme}>
      <StatusBar $dark={isDarkTheme}>
        {username ? (
          <>
            <ConnectionStatus $connected={isConnected} />
            <ThemeToggle
              $dark={isDarkTheme}
              onClick={() => setIsDarkTheme((d) => !d)}
              title="Toggle theme"
            >
              {isDarkTheme ? " " : " "}
            </ThemeToggle>
            <ChatButton onClick={() => setIsOnlineListOpen(true)} $dark={isDarkTheme}>
              Онлайн: {onlineUsers.length}
            </ChatButton>
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
                      border: s === selectedSeed ? "2px solid #0088cc" : "2px solid transparent",
                      cursor: "pointer",
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
          <ChatButton onClick={handleLogin} disabled={!tempUsername.trim()}>
            Увійти
          </ChatButton>
        </UsernameInputWrapper>
      ) : (
        <>
          <ChatMessages $dark={isDarkTheme}>
            {messages.map((msg) => (
              <Message
                key={msg.id}
                $isOwn={msg.username === username}
                $dark={isDarkTheme}
                $system={msg.sender === "system"}
              >
                {msg.sender !== "system" && (
                  <MessageUsername $dark={isDarkTheme} $isOwn={msg.username === username}>
                    <AvatarImage src={msg.avatar} alt={msg.username} />
                    {msg.username}
                  </MessageUsername>
                )}
                <MessageText $isOwn={msg.username === username}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  {msg.image && <MessageImage src={msg.image} alt="attached" />}
                </MessageText>
                <MessageTime $dark={isDarkTheme} $isOwn={msg.username === username} $delivered>
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
            <EmojiButton onClick={() => setShowEmojiPicker((p) => !p)} $dark={isDarkTheme}>
              😃
            </EmojiButton>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <AttachButton onClick={() => fileInputRef.current.click()} $dark={isDarkTheme}>
              📎
            </AttachButton>
            {attachedImage && (
              <AttachedImagePreview src={attachedImage} alt="preview" onClick={() => setAttachedImage(null)} />
            )}
            <ChatButton
              onClick={sendMessage}
              disabled={(!input.trim() && !attachedImage) || !isConnected}
              $dark={isDarkTheme}
            >
              Надіслати
            </ChatButton>
          </ChatInputWrapper>

          <AnimatePresence>
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme={isDarkTheme ? "dark" : "light"}
                style={{ position: "absolute", bottom: 60, right: 20, zIndex: 1000 }}
              />
            )}
          </AnimatePresence>

          {isOnlineListOpen && (
            <>
              <ModalOverlay onClick={() => setIsOnlineListOpen(false)} />
              <OnlineListModal $dark={isDarkTheme}>
                <h3>Користувачі онлайн</h3>
                {onlineUsers.map((user) => (
                  <OnlineUser key={user.username} $dark={isDarkTheme}>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    {user.username}
                  </OnlineUser>
                ))}
              </OnlineListModal>
            </>
          )}
          <audio ref={audioRef} src={SOUND_URL} />
        </>
      )}
    </ChatContainer>
  );
}
