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
} from "./ChatApp.styled.js";

import { compressImage } from "../../utils/utils.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useChatSocket } from "../../hooks/useChatSocket.js";
import { saveChatMessages } from "../../utils/utils.js";

import LoginSection from "../LoginSection/LoginSection.jsx";
import MessageItem from "../MessageItem/MessageItem.jsx";
import ChatInputSection from "../ChatInputSection/ChatInputSection.jsx";
import OnlineUsersModal from "../OnlineUsersModal/OnlineUsersModal.jsx";

const SOUND_URL = "./notification.mp3";

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
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    "chat_theme",
    false
  );

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
  } = useChatSocket(username, avatar);

  // Звукове сповіщення при новому повідомленні
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Відслідковуємо першу взаємодію користувача
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  // Відтворюємо звук при новому повідомленні, якщо була взаємодія
  useEffect(() => {
    if (!hasUserInteracted || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    // Умови для звукового сповіщення:
    const isFromOtherUser =
      lastMessage.sender === "user" &&
      lastMessage.username !== username;
    const isRealMessage =
      lastMessage.text?.trim().length > 0 || lastMessage.image;

    if (isFromOtherUser && isRealMessage) {
      audioRef.current?.play().catch(() => {});
    }
  }, [messages, hasUserInteracted, username]);

  // Скрол до останнього повідомлення
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleLogin = () => {
    const name = tempUsername.trim();
    if (!name) return;
    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSeed}`;
    setAvatar(url);
    setUsername(name);
  };

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
      return saveChatMessages(next, 100);
    });

    sendSocketMessage(msg);

    setInput("");
    setAttachedImage(null);
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
          <span>Введіть ім'я і оберіть аватар</span>
        )}
      </StatusBar>

      {!username ? (
        <LoginSection
          avatarSeeds={avatarSeeds}
          selectedSeed={selectedSeed}
          setSelectedSeed={setSelectedSeed}
          tempUsername={tempUsername}
          setTempUsername={setTempUsername}
          handleLogin={handleLogin}
          isDarkTheme={isDarkTheme}
          usernameInputRef={usernameInputRef}
        />
      ) : (
        <>
          <ChatMessages $dark={isDarkTheme}>
            {messages.map((msg) => (
              <MessageItem
                key={msg.id}
                msg={msg}
                isOwn={msg.username === username}
                isDarkTheme={isDarkTheme}
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
            addEmoji={addEmoji}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            attachedImage={attachedImage}
            setAttachedImage={setAttachedImage}
            isConnected={isConnected}
          />

          <AnimatePresence>
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme={isDarkTheme ? "dark" : "light"}
                style={{
                  position: "absolute",
                  bottom: 60,
                  right: 20,
                  zIndex: 1000,
                }}
              />
            )}
          </AnimatePresence>

          {isOnlineListOpen && (
            <OnlineUsersModal
              onlineUsers={onlineUsers}
              setIsOnlineListOpen={setIsOnlineListOpen}
              isDarkTheme={isDarkTheme}
            />
          )}

          <audio ref={audioRef} src={SOUND_URL} />
        </>
      )}
    </ChatContainer>
  );
}
