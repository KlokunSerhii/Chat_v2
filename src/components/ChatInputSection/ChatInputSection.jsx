import { useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdEmojiEmotions } from 'react-icons/md';

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
  setShowEmojiPicker,
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
  socket,
  recipientId,
}) {
  const chatInputRef = useRef(null);

  useEffect(() => {
    chatInputRef.current?.focus();
  }, []);

  const handleInputChange = e => {
    setInput(e.target.value);

    // Надсилаємо подію typing на сервер
    if (socket && socket.connected) {
      socket.emit('typing', { recipientId });
    }
  };

  return (
    <ChatInputWrapper $dark={isDarkTheme}>
      <ChatInput
        ref={chatInputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Напишіть повідомлення..."
        $dark={isDarkTheme}
      />
      <EmojiButton onClick={() => setShowEmojiPicker(p => !p)} $dark={isDarkTheme}>
        <MdEmojiEmotions size={24} color="#fbbf24" />
      </EmojiButton>
      <input
        type="file"
        accept="image/*,audio/*,video/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AttachButton onClick={() => fileInputRef.current.click()} $dark={isDarkTheme}>
        <FaPlus size={20} />
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
