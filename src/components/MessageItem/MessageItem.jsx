// MessageItem.jsx
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
}) {

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

      <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
        {formatTime(msg.timestamp)}
      </MessageTime>
    </Message>
  );
}
