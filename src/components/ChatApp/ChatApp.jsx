import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  Message,
  MessageText,
  MessageTime,
  MessageSender,
  ChatInput,
  Input,
  SendButton,
  TypingIndicator,
  Avatar,
  EmojiButton,
  EmojiPickerContainer,
  ThemeToggle,
  UsernameInput,
  LoginContainer,
  LoginButton,
  AvatarSelector,
  AvatarOption,
  FileInput,
  ImagePreview,
  OnlineListButton,
  OnlineListModal,
  ModalOverlay,
  AttachedImagePreview,
  MessageImage,
  AttachButton
} from "./ChatApp.styled.js";

const socket = io("http://localhost:3001");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!username);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "/avatars/avatar1.png"
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOnlineList, setShowOnlineList] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [attachedImage, setAttachedImage] = useState(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeouts = useRef({});

  useEffect(() => {
    socket.on("message", (msg) => {
      addMessage(msg);
      audioRef.current?.play();
    });

    socket.on("history", (history) => {
      const restored = history.map((msg) => ({
        id: uuidv4(),
        ...msg,
      }));
      setMessages(restored);
      localStorage.setItem("chat_messages", JSON.stringify(restored));
    });

    socket.on("user-typing", (u) => {
      if (u === username) return;
      setTypingUsers((prev) => (prev.includes(u) ? prev : [...prev, u]));

      clearTimeout(typingTimeouts.current[u]);
      typingTimeouts.current[u] = setTimeout(() => {
        setTypingUsers((prev) => prev.filter((x) => x !== u));
      }, 2500);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prev) => {
      const next = [...prev, { id: uuidv4(), ...msg }];
      localStorage.setItem("chat_messages", JSON.stringify(next));
      return next;
    });
  };

  const sendMessage = () => {
    if (!input.trim() && !attachedImage) return;
    const message = {
      username,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar,
      image: attachedImage ? URL.createObjectURL(attachedImage) : null,
    };
    socket.emit("message", message);
    addMessage(message);
    setInput("");
    setAttachedImage(null);
    fileInputRef.current.value = "";
    setShowEmojiPicker(false);
  };

  const handleLogin = () => {
    if (!username.trim()) return;
    setIsLoggedIn(true);
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    socket.emit("login", username);
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    socket.emit("typing", username);
  };

  if (!isLoggedIn) {
    return (
      <LoginContainer>
        <UsernameInput
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AvatarSelector>
          {[1, 2, 3, 4].map((i) => (
            <AvatarOption
              key={i}
              src={`/avatars/avatar${i}.png`}
              alt={`Avatar ${i}`}
              onClick={() => setAvatar(`/avatars/avatar${i}.png`)}
              style={{ border: avatar === `/avatars/avatar${i}.png` ? "2px solid #333" : "none" }}
            />
          ))}
        </AvatarSelector>
        <LoginButton onClick={handleLogin}>Join Chat</LoginButton>
      </LoginContainer>
    );
  }

  return (
    <ChatContainer $dark={isDarkTheme}>
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      <ChatHeader>
        <div>
          <Avatar src={avatar} alt="User Avatar" />
          {username}
        </div>
        <div>
          <ThemeToggle onClick={() => setIsDarkTheme((p) => !p)} $dark={isDarkTheme}>
            {isDarkTheme ? "🌙" : "☀️"}
          </ThemeToggle>
          <OnlineListButton onClick={() => setShowOnlineList(true)}>
            Users Online
          </OnlineListButton>
        </div>
      </ChatHeader>
      <ChatMessages>
        {messages.map((msg) => {
          const isOwn = msg.username === username;
          return (
            <Message key={msg.id} $isOwn={isOwn}>
              <Avatar src={msg.avatar} alt="Avatar" />
              <div>
                <MessageSender>{msg.username}</MessageSender>
                {msg.image && <MessageImage src={msg.image} alt="attachment" />}
                <MessageText $isOwn={isOwn}>{msg.text}</MessageText>
                <MessageTime $isOwn={isOwn}>{msg.time}</MessageTime>
              </div>
            </Message>
          );
        })}
        {typingUsers.map((u) => (
          <TypingIndicator key={u}>{u} is typing...</TypingIndicator>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInput>
        <AttachButton onClick={() => fileInputRef.current.click()}>📎</AttachButton>
        <FileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files[0]) {
              setAttachedImage(e.target.files[0]);
            }
          }}
        />
        {attachedImage && (
          <AttachedImagePreview src={URL.createObjectURL(attachedImage)} alt="Preview" />
        )}
        <Input
          value={input}
          onChange={handleTyping}
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </EmojiButton>
        {showEmojiPicker && (
          <EmojiPickerContainer>
            <Picker
              data={data}
              onEmojiSelect={(emoji) => setInput((prev) => prev + emoji.native)}
            />
          </EmojiPickerContainer>
        )}
        <SendButton onClick={sendMessage}>Send</SendButton>
      </ChatInput>
      {showOnlineList && (
        <>
          <ModalOverlay onClick={() => setShowOnlineList(false)} />
          <OnlineListModal>
            <h3>Online Users</h3>
            <ul>
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </OnlineListModal>
        </>
      )}
    </ChatContainer>
  );
};

export default ChatApp;
