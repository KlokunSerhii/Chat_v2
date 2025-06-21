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
} from "./MessageItem.styled";
import { formatTime } from "../../utils/utils";

export default function MessageItem({ msg, isOwn, isDarkTheme }) {
  return (
    <Message
      $isOwn={isOwn}
      $dark={isDarkTheme}
      $system={msg.sender === "system"}
    >
      {msg.sender !== "system" && (
        <MessageUsername $dark={isDarkTheme} $isOwn={isOwn}>
          <AvatarImage src={msg.avatar} alt={msg.username} />
          {msg.username}
        </MessageUsername>
      )}
      <MessageText $isOwn={isOwn}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {msg.text}
        </ReactMarkdown>
        {msg.image && <MessageImage src={msg.image} alt="attached" />}
      </MessageText>
      <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
        {formatTime(msg.timestamp)}
      </MessageTime>
    </Message>
  );
}
