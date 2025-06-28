import React, { useRef, useEffect } from 'react';
import { ChatButton, Loader } from '../ChatApp/ChatApp.styled';
import {
  ChatInputWrapper,
  ChatInput,
  EmojiButton,
  AttachButton,
  AttachedImagePreview,
  AttachedVideoPreview,
  AttachedAudioPreview,
} from './ChatInputSection.styled';

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
  attachedImage,
  attachedVideo,
  attachedAudio,
  setAudioLoading,
  setImageLoading,
  setVideoLoading,
  imageLoading,
  videoLoading,
  audioLoading,
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
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Напишіть повідомлення..."
        $dark={isDarkTheme}
      />
      <EmojiButton onClick={() => setShowEmojiPicker(p => !p)} $dark={isDarkTheme}>
        😃
      </EmojiButton>
      <input
        type="file"
        accept="image/*,audio/*,video/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AttachButton onClick={() => fileInputRef.current.click()} $dark={isDarkTheme}>
        📎
      </AttachButton>
      {attachedImage && (
        <>
          {imageLoading && <Loader isDarkTheme={isDarkTheme} />}
          <AttachedImagePreview
            src={attachedImage}
            alt="preview"
            onLoad={() => setImageLoading(false)}
            style={{ display: imageLoading ? 'none' : 'block' }}
            onClick={() => setAttachedImage(null)}
          />
        </>
      )}
      {attachedVideo && (
        <>
          {videoLoading && <Loader isDarkTheme={isDarkTheme} />}
          <AttachedVideoPreview
            src={attachedVideo}
            alt="preview"
            controls
            onLoadedData={() => setVideoLoading(false)}
            style={{ display: videoLoading ? 'none' : 'block' }}
            onClick={() => setAttachedVideo(null)}
          />
        </>
      )}

      {attachedAudio && (
        <>
          {audioLoading && <Loader isDarkTheme={isDarkTheme} />}
          <AttachedAudioPreview
            src={attachedAudio}
            alt="preview"
            controls
            onLoadedData={() => setAudioLoading(false)}
            style={{ display: audioLoading ? 'none' : 'block' }}
            onClick={() => setAttachedAudio(null)}
          />
        </>
      )}
      <ChatButton
        onClick={sendMessage}
        disabled={
          (!input.trim() && !attachedImage && !attachedVideo && !attachedAudio) || !isConnected
        }
        $dark={isDarkTheme}
      >
        Надіслати
      </ChatButton>
    </ChatInputWrapper>
  );
}
