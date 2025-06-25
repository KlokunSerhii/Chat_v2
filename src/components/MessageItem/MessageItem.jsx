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
  onToggleReaction
}) {
console.log("MessageItem msg:", msg);
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
<div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
  {["❤️", "😂", "👍", "🔥", "😮"].map((emoji) => {
    const count = msg.reactions?.filter(r => r.emoji === emoji).length || 0;
    const reactedByUser = msg.reactions?.some(
      r => r.emoji === emoji && r.username === username
    );

    return (
      <span
        key={emoji}
          onClick={() => {
    console.log("reacting to", msg.id); // msg.id повинен бути валідним _id
    if (msg.id) {
      onToggleReaction({ messageId: msg.id, emoji });
    }
  }}
        style={{
          cursor: 'pointer',
          background: reactedByUser ? '#ffd54f' : 'transparent',
          borderRadius: '12px',
          padding: '2px 6px',
          fontSize: '18px',
          userSelect: 'none'
        }}
      >
        {emoji} {count > 0 ? count : ""}
      </span>
    );
  })}
</div>
      <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
        {formatTime(msg.timestamp)}
      </MessageTime>
    </Message>
  );
}
