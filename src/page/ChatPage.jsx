import React, { useEffect, useRef } from 'react';

import { ChatContainer, Loader } from '../components/ChatApp/ChatApp.styled.js';
import { useChatSocket } from '../hooks/useChatSocket.js';
import { useSendMessage } from '../hooks/useSendMessage';
import { useFileUpload } from '../hooks/useFileUpload.js';
import { useChatAppState } from '../hooks/useChatAppState';
import { useChatEffects } from '../hooks/useChatEffects';
import { useAuth } from '../context/AuthContext';
import { useImageModal } from '../hooks/useImageModal';
import { useAutoFocus } from '../hooks/useAutoFocus';

import ChatInputSection from '../components/ChatInputSection/ChatInputSection.jsx';
import MessagesSection from '../components/MessagesSection/MessagesSection.jsx';
import StatusBarSection from '../components/StatusBarSection/StatusBarSection.jsx';
import EmojiPickerSection from '../components/EmojiPickerSection/EmojiPickerSection.jsx';
import ModalsContainer from '../components/ModalsContainer/ModalsContainer';

import { SOUND_URL } from '../utils/sound.js';

export default function ChatPage() {
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  const state = useChatAppState();
  const {
    input,
    setInput,
    isDarkTheme,
    setIsDarkTheme,
    showEmojiPicker,
    setShowEmojiPicker,
    attachedImage,
    setAttachedImage,
    attachedAudio,
    setAttachedAudio,
    attachedVideo,
    setAttachedVideo,
    isOnlineListOpen,
    setIsOnlineListOpen,
    isImageModalOpen,
    setIsImageModalOpen,
    modalImageSrc,
    setModalImageSrc,
    usernameInputRef,
  } = state;

  const { isAuthChecked, isLoggedIn, handleLogout, username, avatar } = useAuth();

  const {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage: sendSocketMessage,
    toggleReaction,
  } = useChatSocket();

  const { sendMessage } = useSendMessage({
    username,
    avatar,
    setMessages,
    sendSocketMessage,
  });

  const {
    handleFileChange,
    imageLoading,
    audioLoading,
    videoLoading,
    setImageLoading,
    setAudioLoading,
    setVideoLoading,
  } = useFileUpload({
    setAttachedImage,
    setAttachedAudio,
    setAttachedVideo,
  });

  useAutoFocus(usernameInputRef);

  const handleSendMessage = () => {
    sendMessage({
      input,
      attachedImage,
      attachedAudio,
      attachedVideo,
      onClear: () => {
        setInput('');
        setAttachedImage(null);
        setAttachedAudio(null);
        setAttachedVideo(null);
      },
    });
  };

  const { openImageModal, closeImageModal } = useImageModal(setIsImageModalOpen, setModalImageSrc);
  useChatEffects({ messages, username, audioRef, messagesEndRef, hasInteracted });

  if (!isAuthChecked) return <Loader />;

  return (
    <ChatContainer $dark={isDarkTheme} $isLogin={false}>
      <StatusBarSection
        isDarkTheme={isDarkTheme}
        isLoggedIn={isLoggedIn}
        isConnected={isConnected}
        onlineUsers={onlineUsers}
        onToggleTheme={() => setIsDarkTheme(d => !d)}
        onLogout={handleLogout}
        onOpenOnlineUsers={() => setIsOnlineListOpen(true)}
      />

      <MessagesSection
        messages={messages}
        username={username}
        isDarkTheme={isDarkTheme}
        typingUsers={typingUsers}
        onImageClick={openImageModal}
        messagesEndRef={messagesEndRef}
        onToggleReaction={toggleReaction}
      />
      <ChatInputSection
        input={input}
        setInput={setInput}
        sendMessage={handleSendMessage}
        isDarkTheme={isDarkTheme}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        setAttachedAudio={setAttachedAudio}
        setAttachedVideo={setAttachedVideo}
        setAttachedImage={setAttachedImage}
        attachedImage={attachedImage}
        attachedVideo={attachedVideo}
        attachedAudio={attachedAudio}
        setAudioLoading={setAudioLoading}
        setImageLoading={setImageLoading}
        setVideoLoading={setVideoLoading}
        audioLoading={audioLoading}
        imageLoading={imageLoading}
        videoLoading={videoLoading}
        isConnected={isConnected}
      />
      <EmojiPickerSection
        showEmojiPicker={showEmojiPicker}
        isDarkTheme={isDarkTheme}
        setInput={setInput}
      />
      <ModalsContainer
        isOnlineListOpen={isOnlineListOpen}
        setIsOnlineListOpen={setIsOnlineListOpen}
        onlineUsers={onlineUsers}
        isDarkTheme={isDarkTheme}
        isImageModalOpen={isImageModalOpen}
        modalImageSrc={modalImageSrc}
        closeImageModal={closeImageModal}
      />
      <audio ref={audioRef} src={SOUND_URL} />
    </ChatContainer>
  );
}
