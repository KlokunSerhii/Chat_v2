import React, { useRef, useEffect } from "react";
import { ChatButton } from "../ChatApp/ChatApp.styled";
import {
  ChatInputWrapper,
  ChatInput,
  EmojiButton,
  AttachButton,
  AttachedImagePreview,
  AttachedVideoPreview,
  AttachedAudioPreview,
} from "./ChatInputSection.styled";

export default function ChatInputSection({
  input,
  setInput,
  sendMessage,
  isDarkTheme,
  showEmojiPicker,
  setShowEmojiPicker,
  addEmoji,
  fileInputRef,
  handleFileChange,
  setAttachedVideo,
  setAttachedAudio,
  setAttachedImage,
  attachedImage, // ✅ ДОДАТИ
  attachedVideo, // ✅ ДОДАТИ
  attachedAudio, // ✅ ДОДАТИ
  isConnected,
}) {
  const chatInputRef = useRef(null);

  useEffect(() => {
    chatInputRef.current?.focus();
  }, []);

  return (
    <ChatInputWrapper $dark={isDarkTheme}>
      <ChatInput
        ref={chatInputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Напишіть повідомлення..."
        $dark={isDarkTheme}
      />
      <EmojiButton
        onClick={() => setShowEmojiPicker((p) => !p)}
        $dark={isDarkTheme}
      >
        😃
      </EmojiButton>
      <input
        type="file"
        accept="image/*,audio/*,video/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AttachButton
        onClick={() => fileInputRef.current.click()}
        $dark={isDarkTheme}
      >
        📎
      </AttachButton>
      {attachedImage && (
        <AttachedImagePreview
          src={attachedImage}
          alt="preview"
          onClick={() => setAttachedImage(null)}
        />
      )}
      {attachedVideo && (
        <AttachedVideoPreview
          src={attachedVideo}
          alt="preview"
          onClick={() => setAttachedVideo(null)}
        />
      )}
      {attachedAudio && (
        <AttachedAudioPreview
          src={attachedAudio}
          alt="preview"
          onClick={() => setAttachedAudio(null)}
        />
      )}
      <ChatButton
        onClick={sendMessage}
        disabled={
          (!input.trim() &&
            !attachedImage &&
            !attachedVideo &&
            !attachedAudio) ||
          !isConnected
        }
        $dark={isDarkTheme}
      >
        Надіслати
      </ChatButton>
    </ChatInputWrapper>
  );
}
