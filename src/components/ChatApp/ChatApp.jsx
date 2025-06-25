import React, { useState, useRef, useMemo, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import {
  ChatContainer,
  StatusBar,
  ConnectionStatus,
  ThemeToggle,
  ChatButton,
  ChatMessages,
  TypingIndicator,
  EmojiPickerContainer,
  Header,
} from "./ChatApp.styled.js";
import { compressImage } from "../../utils/utils.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useChatSocket } from "../../hooks/useChatSocket.js";
import { saveChatMessages } from "../../utils/utils.js";
import LoginSection from "../LoginSection/LoginSection.jsx";
import MessageItem from "../MessageItem/MessageItem.jsx";
import ChatInputSection from "../ChatInputSection/ChatInputSection.jsx";
import OnlineUsersModal from "../OnlineUsersModal/OnlineUsersModal.jsx";
import AvatarUploader from "../AvatarUploader/AvatarUploader.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx"; // Імпортуємо компонент ImageModal

const SOUND_URL = "./notification.mp3";
const SERVER_URL = "https://chat-v2-server-7.onrender.com";

export default function ChatApp() {
  const avatarSeeds = useMemo(
    () => Array.from({ length: 5 }, () => uuidv4()),
    []
  );
  const [selectedSeed, setSelectedSeed] = useState(avatarSeeds[0]);
  const [username, setUsername] = useLocalStorage(
    "chat_username",
    ""
  );
  const [avatar, setAvatar] = useLocalStorage(
    "chat_avatar",
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[0]}`
  );
  const [tempUsername, setTempUsername] = useState(username);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOnlineListOpen, setIsOnlineListOpen] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const [attachedAudio, setAttachedAudio] = useState(null);
  const [attachedVideo, setAttachedVideo] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    "chat_theme",
    false
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Стан для модального вікна
  const [modalImageSrc, setModalImageSrc] = useState(null); // Стан для зображення модального вікна
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const usernameInputRef = useRef(null);

  const {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage: sendSocketMessage,
    socketRef,
    toggleReaction,
  } = useChatSocket(username, avatar);
const hasInteracted = useRef(false);
  // Реакція на нове повідомлення
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
      const lastMsg = messages[messages.length - 1];
  if (lastMsg && lastMsg.username !== username) {
    audioRef.current?.play();
  }
  }, [messages]);


useEffect(() => {
  const handleInteraction = () => {
    hasInteracted.current = true;
    window.removeEventListener("click", handleInteraction);
  };

  window.addEventListener("click", handleInteraction);

  return () => {
    window.removeEventListener("click", handleInteraction);
  };
}, []);



useEffect(() => {
  usernameInputRef.current?.focus();
}, []);

  const handleLogin = () => {
    const name = tempUsername.trim();
    if (!name) return;
    setUsername(name);
    const avatarUrl = avatar.startsWith("http")
      ? avatar
      : `https://chat-v2-server-7.onrender.com${avatar}`;

    setAvatar(avatarUrl);
  };

  const sendMessage = () => {
  if ((!input.trim() && !attachedImage) || !isConnected) return;

  const tempId = uuidv4(); // тимчасовий id лише для React

  const localMsg = {
    sender: "user",
    text: input.trim(),
    timestamp: new Date().toISOString(),
    username,
    avatar,
    image: attachedImage || null,
    audio: attachedAudio || null,
    video: attachedVideo || null,
    id: tempId,
    local: true, // позначка локального повідомлення
  };

  setMessages((prev) => saveChatMessages([...prev, localMsg], 100));

  // Надсилаємо без id (або в іншому форматі)
  sendSocketMessage({
    ...localMsg,
    id: undefined, // не потрібно серверу
  });

  setInput("");
  setAttachedImage(null);
};

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileType = file.type;

  try {
    // Завантаження на Cloudinary або інший сервіс
    const formData = new FormData();
    formData.append("file", file);

    
    
    const response = await fetch(`https://chat-v2-server-7.onrender.com/api/send-file`, {
  method: "POST",
  body: formData,
});

    const data = await response.json();

    // Визначаємо тип файлу
    if (fileType.startsWith("image/")) {
      setAttachedImage(data.url);
      setAttachedAudio(null);
      setAttachedVideo(null);
    } else if (fileType.startsWith("audio/")) {
      setAttachedAudio(data.url);
      setAttachedImage(null);
      setAttachedVideo(null);
    } else if (fileType.startsWith("video/")) {
      setAttachedVideo(data.url);
      setAttachedImage(null);
      setAttachedAudio(null);
    }
  } catch (err) {
    console.error("File upload error:", err);
  }
};



  const openImageModal = (src) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc(null);
  };

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
            <ChatButton
              onClick={() => setIsOnlineListOpen(true)}
              $dark={isDarkTheme}
            >
              Онлайн: {onlineUsers.length}
            </ChatButton>
          </>
        ) : (
          <Header>Ласкаво просимо!</Header>
        )}
      </StatusBar>

      {!username ? (
        <>
          <AvatarUploader
            onUpload={(url) => setAvatar(url)}
            isDarkTheme={isDarkTheme}
          />
          <LoginSection
            avatarSeeds={avatarSeeds}
            selectedSeed={selectedSeed}
            setSelectedSeed={setSelectedSeed}
            tempUsername={tempUsername}
            setTempUsername={setTempUsername}
            handleLogin={handleLogin}
            isDarkTheme={isDarkTheme}
            usernameInputRef={usernameInputRef}
            avatar={avatar}
            setIsDarkTheme={setIsDarkTheme}
          />
        </>
      ) : (
        <>
          <ChatMessages $dark={isDarkTheme}>
            {messages.map((msg) => (
              <MessageItem
                key={msg._id}
                msg={{ ...msg, id: msg.id || msg._id }}
                isOwn={msg.username === username}
                isDarkTheme={isDarkTheme}
                onImageClick={openImageModal}
                username={username}
                onToggleReaction={toggleReaction}
              />
            ))}
            {typingUsers.map((u) => (
              <TypingIndicator key={u} $dark={isDarkTheme}>
                <em>{u} друкує...</em>
              </TypingIndicator>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputSection
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isDarkTheme={isDarkTheme}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            attachedImage={attachedImage}
            setAttachedImage={setAttachedImage}
            isConnected={isConnected}
          />

          <AnimatePresence>
            {showEmojiPicker && (
              <EmojiPickerContainer>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) =>
                    setInput((prev) => prev + emoji.native)
                  }
                  theme={isDarkTheme ? "dark" : "light"}
                />
              </EmojiPickerContainer>
            )}
          </AnimatePresence>

          {isOnlineListOpen && (
            <OnlineUsersModal
              onlineUsers={onlineUsers}
              setIsOnlineListOpen={setIsOnlineListOpen}
              isDarkTheme={isDarkTheme}
            />
          )}
        </>
      )}

      <audio ref={audioRef} src={SOUND_URL} />

      {/* Модальне вікно для перегляду зображень */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeImageModal}
      />
    </ChatContainer>
  );
}
