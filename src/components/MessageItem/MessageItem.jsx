// MessageItem.jsx
import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { ReactionsDisplay } from "../ReactionsDisplay/ReactionsDisplay.jsx";
import {
  Message,
  MessageUsername,
  MessageText,
  MessageImage,
  MessageTime,
  StyledMarkdown,
  AvatarImageChat,
} from "./MessageItem.styled";
import { formatTime } from "../../utils/utils";

export default function MessageItem({
  msg,
  isOwn,
  isDarkTheme,
  onImageClick,
  username,
  onReact,
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Message
      $isOwn={isOwn}
      $dark={isDarkTheme}
      $system={msg.sender === "system"}
    >
      {isOwn ? (
        <MessageUsername
          $dark={isDarkTheme}
          $isOwn={isOwn}
          style={{ justifyContent: "flex-end" }}
        >
          {msg.username}
          <AvatarImageChat src={msg.avatar} alt={msg.username} />
        </MessageUsername>
      ) : (
        <MessageUsername $dark={isDarkTheme} $isOwn={isOwn}>
          <AvatarImageChat src={msg.avatar} alt={msg.username} />
          {msg.username}
        </MessageUsername>
      )}

      <MessageText $isOwn={isOwn}>
        <StyledMarkdown>
          {msg.sender === "system" ? (
            <span style={{ fontStyle: "italic" }}>{msg.text}</span>
          ) : (
            msg.text
          )}
        </StyledMarkdown>

        {msg.image && (
          <MessageImage
            src={msg.image}
            alt="attached"
            onClick={() => onImageClick(msg.image)} // Викликаємо onImageClick при натисканні на зображення
            style={{ cursor: "pointer" }}
          />
        )}
      </MessageText>
      <ReactionsDisplay
        reactions={msg.reactions || {}}
        username={username}
        onReact={(emoji, isRemoving) =>
          onReact(msg._id, emoji, isRemoving)
        }
      />
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          style={{
            marginTop: "4px",
            fontSize: "1rem",
            padding: "2px 6px",
            cursor: "pointer",
            backgroundColor: "#eee",
            border: "none",
            borderRadius: "4px",
          }}
        >
          😊
        </button>

        {showPicker && (
          <div style={{ position: "absolute", zIndex: 100 }}>
            <Picker
              data={data}
              onEmojiSelect={(emoji) => {
                setShowPicker(false);
                onReact(msg._id, emoji.native, false); // ✅ додаємо реакцію
              }}
              theme={isDarkTheme ? "dark" : "light"}
            />
          </div>
        )}
      </div>

      <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
        {formatTime(msg.timestamp)}
      </MessageTime>
    </Message>
  );
}
