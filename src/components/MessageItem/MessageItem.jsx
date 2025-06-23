// MessageItem.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AvatarImage } from "../LoginSection/LoginSection.styled";
import {
  Message,
  MessageUsername,
  MessageText,
  MessageImage,
  MessageTime,
  StyledMarkdown,
} from "./MessageItem.styled";
import { formatTime } from "../../utils/utils";

export default function MessageItem({
  msg,
  isOwn,
  isDarkTheme,
  onImageClick, // Передаємо функцію для відкриття зображення
}) {
  return (
    <Message
      $isOwn={isOwn}
      $dark={isDarkTheme}
      $system={msg.sender === "system"}
    >
      {isOwn ? (
        <MessageUsername $dark={isDarkTheme} $isOwn={isOwn}>
          {msg.username}
          <AvatarImage src={msg.avatar} alt={msg.username} />
        </MessageUsername>
      ) : (
        <MessageUsername $dark={isDarkTheme} $isOwn={isOwn}>
          <AvatarImage src={msg.avatar} alt={msg.username} />
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

      <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
        {formatTime(msg.timestamp)}
      </MessageTime>
    </Message>
  );
}
