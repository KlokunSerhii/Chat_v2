import React, { useRef } from 'react';

import { ChatContainer, Loader } from './ChatApp.styled.js';

import { useChatSocket } from '../../hooks/useChatSocket.js';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useChatAppState } from '../../hooks/useChatAppState';
import { useChatEffects } from '../../hooks/useChatEffects';
import { useAuth } from '../../hooks/useAuth.js';
import { useImageModal } from '../../hooks/useImageModal';
import { useAutoFocus } from '../../hooks/useAutoFocus';

import LoginSection from '../LoginSection/LoginSection.jsx';
import ChatInputSection from '../ChatInputSection/ChatInputSection.jsx';
import MessagesSection from '../MessagesSection/MessagesSection.jsx';
import StatusBarSection from '../StatusBarSection/StatusBarSection.jsx';
import EmojiPickerSection from '../EmojiPickerSection/EmojiPickerSection.jsx';
import ModalsContainer from '../ModalsContainer/ModalsContainer';

import { SOUND_URL } from '../../utils/sound.js';

export default function ChatApp() {
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  const {
    avatarSeeds,
    selectedSeed,
    setSelectedSeed,
    username,
    setUsername,
    avatar,
    setAvatar,
    isDarkTheme,
    setIsDarkTheme,
    input,
    setInput,
    showEmojiPicker,
    setShowEmojiPicker,
    isOnlineListOpen,
    setIsOnlineListOpen,
    attachedImage,
    setAttachedImage,
    attachedAudio,
    setAttachedAudio,
    attachedVideo,
    setAttachedVideo,
    isImageModalOpen,
    setIsImageModalOpen,
    modalImageSrc,
    setModalImageSrc,
  } = useChatAppState();

  const {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage: sendSocketMessage,
    toggleReaction,
  } = useChatSocket(username, avatar);

  const {
    isAuthChecked,
    isLoggedIn,
    handleLogin,
    handleRegister,
    handleLogout,
    tempUsername,
    setTempUsername,
    tempPassword,
    setTempPassword,
    usernameInputRef,
  } = useAuth({ setUsername, setAvatar });

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

  useAutoFocus(usernameInputRef);

  const { openImageModal, closeImageModal } = useImageModal(setIsImageModalOpen, setModalImageSrc);
  useChatEffects({
    messages,
    username,
    audioRef,
    messagesEndRef,
    hasInteracted,
  });

  if (!isAuthChecked) {
    return <Loader />;
  }
  return (
    <ChatContainer $dark={isDarkTheme} $isLogin={!isLoggedIn}>
      <StatusBarSection
        isDarkTheme={isDarkTheme}
        isLoggedIn={isLoggedIn}
        isConnected={isConnected}
        onlineUsers={onlineUsers}
        onToggleTheme={() => setIsDarkTheme(d => !d)}
        onLogout={handleLogout}
        onOpenOnlineUsers={() => setIsOnlineListOpen(true)}
      />
      {!isLoggedIn ? (
        <>
          <LoginSection
            avatarSeeds={avatarSeeds}
            selectedSeed={selectedSeed}
            setSelectedSeed={setSelectedSeed}
            tempUsername={tempUsername}
            setTempUsername={setTempUsername}
            tempPassword={tempPassword}
            setTempPassword={setTempPassword}
            handleLogin={handleLogin}
            handleRegister={(e) => handleRegister(e, avatar)}
            isDarkTheme={isDarkTheme}
            usernameInputRef={usernameInputRef}
            avatar={avatar}
            setIsDarkTheme={setIsDarkTheme}
            setAvatar={setAvatar}
          />
        </>
      ) : (
        <>
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
        </>
      )}

      <audio ref={audioRef} src={SOUND_URL} />
    </ChatContainer>
  );
}
