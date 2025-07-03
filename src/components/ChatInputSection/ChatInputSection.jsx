import { useRef, useEffect, useState } from 'react';
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
  ModalButton,
  ModalContent ,
  ModalOverlay,
  GlobalModalAnimations,
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
  replyToMessage,
  setReplyToMessage,
}) {
  const chatInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFileModal = () => {
    setIsModalOpen(true);
  };
  const handleFileTypeSelect = type => {
    if (type === 'media') {
      fileInputRef.current.setAttribute('accept', 'image/*,video/*');
    } else {
      fileInputRef.current.setAttribute('accept', '.mp3,.wav,.m4a,.aac');
    }
    setIsModalOpen(false);
    fileInputRef.current.click();
  };

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
    <>
      {replyToMessage && (
        <div
          style={{
            background: isDarkTheme ? '#333' : '#f3f3f3',
            padding: '8px 12px',
            borderRadius: '8px',
            marginBottom: '8px',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <strong>{replyToMessage.username}</strong>
            <div style={{ fontSize: '14px' }}>{replyToMessage.text}</div>
          </div>
          <button
            onClick={() => setReplyToMessage(null)}
            style={{
              marginLeft: '12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ×
          </button>
        </div>
      )}
      <ChatInputWrapper $dark={isDarkTheme}>
        <ChatInput
          ref={chatInputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Напишіть повідомлення..."
          $dark={isDarkTheme}
        />
        <EmojiButton onClick={() => setShowEmojiPicker(p => !p)} $dark={isDarkTheme}>
          <MdEmojiEmotions size={24} color="#fbbf24" />
        </EmojiButton>

        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <AttachButton onClick={openFileModal} $dark={isDarkTheme}>
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
          onClick={() => {
            setShowEmojiPicker(false);
            sendMessage();
          }}
          disabled={
            (!input.trim() && !attachedImage && !attachedVideo && !attachedAudio) || !isConnected
          }
          $dark={isDarkTheme}
        >
          Надіслати
        </ChatButton>
        <GlobalModalAnimations />

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent $dark={isDarkTheme}>
              <h3>Що хочеш надіслати?</h3>
              <ModalButton  onClick={() => handleFileTypeSelect('media')}>📷 Фото / Відео</ModalButton >
              <ModalButton  onClick={() => handleFileTypeSelect('audio')}>🎵 Аудіо</ModalButton >
              <ModalButton  onClick={() => setIsModalOpen(false)}>❌ Скасувати</ModalButton >
            </ModalContent>
          </ModalOverlay>
        )}
      </ChatInputWrapper>
    </>
  );
}
