// MessageItem.jsx
import CustomAudioPlayer from "../CustomAudioPlayer/CustomAudioPlayer.jsx";
import "react-h5-audio-player/lib/styles.css";
import {
  Message,
  MessageUsername,
  MessageText,
  MessageImage,
  MessageTime,
  StyledMarkdown,
  AvatarImageChat,
  FileLabel,
  FileLabelContainer,
  FileLabelContainerPlayer
} from "./MessageItem.styled";
import { formatTime } from "../../utils/utils";

export default function MessageItem({
  msg,
  isOwn,
  isDarkTheme,
  onImageClick,
  username,
  onToggleReaction,
}) {

  function extractFilename(url) {
  try {
    const lastPart = url.split("/").pop(); // Наприклад: chatgpt-sound-xyz-12345678.wav
    const [nameWithoutExt] = lastPart.split("."); // Відділяємо розширення
    const parts = nameWithoutExt.split("-");
    if (parts.length > 1) {
      parts.pop(); // Видаляємо timestamp
      return parts.join("-"); // Повертаємо основну назву
    }
    return nameWithoutExt;
  } catch {
    return "audio file";
  }
}
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
        {msg.text?.trim() && (
  <StyledMarkdown>{msg.text}</StyledMarkdown>
)}

        {msg.image && (
          <FileLabelContainer>
  
            <MessageImage
            src={msg.image}
            alt="attached"
            onClick={() => onImageClick(msg.image)}
            style={{ cursor: "pointer" }}
          />
          </FileLabelContainer>
          
        )}

        {msg.video && (
          <FileLabelContainer>

            <video
            controls
            style={{
              maxWidth: "300px",
              borderRadius: "12px",

            }}
          >
            <source src={msg.video} type="video/mp4" />
            Ваш браузер не підтримує відео.
          </video>
          </FileLabelContainer>
          
        )}

        {msg.audio && (
  <FileLabelContainerPlayer >
    <FileLabel
      $dark={isDarkTheme}
      $isOwn={isOwn}
    >
      {extractFilename(msg.audio)}
    </FileLabel>
     <CustomAudioPlayer
    src={msg.audio}
    isOwn={isOwn}
    isDarkTheme={isDarkTheme}
  />
  </FileLabelContainerPlayer>
)}

      </MessageText>
      <div style={{ display: "flex", gap: "6px", marginTop: "5px" }}>
        {["❤️", "😂", "👍", "🔥", "😮"].map((emoji) => {
          const count =
            msg.reactions?.filter((r) => r.emoji === emoji).length ||
            0;
          const reactedByUser = msg.reactions?.some(
            (r) => r.emoji === emoji && r.username === username
          );

          return (
            <span
              key={emoji}
              onClick={() => {
                if (msg.id) {
                  onToggleReaction({ messageId: msg.id, emoji });
                }
              }}
              style={{
                cursor: "pointer",
                background: reactedByUser ? "#ffd54f" : "transparent",
                borderRadius: "12px",
                padding: "2px 6px",
                fontSize: "18px",
                userSelect: "none",
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
