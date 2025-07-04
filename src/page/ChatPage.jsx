import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
import SidebarUsers from '../components/SidebarUsers/SidebarUsers';
import { FlexWrapper } from '../components/ChatApp/ChatApp.styled';
import { SOUND_URL } from '../utils/sound.js';
import { SERVER_URL } from '../utils/url.js';

export default function ChatPage() {
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageRefs = useRef({});
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);
  const { userId } = useParams();
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${SERVER_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();

        setAllUsers(data.users);
      } catch (err) {
        console.error('Помилка при завантаженні користувачів:', err);
      }
    };

    fetchUsers();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.id;
    } catch (error) {
      console.error('❌ Помилка при декодуванні токена:', error);
    }
  }
  const routeUserId = String(userId || '');

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

  const chatSocket = useChatSocket(username, avatar, routeUserId);
    const socket = chatSocket.socketRef.current;

  const {
    messagesByChat,
    setMessagesByChat,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage: sendSocketMessage,
    toggleReaction,
    unreadPrivateMessages,
    setUnreadPrivateMessages,
  } = chatSocket;

  const { sendMessage } = useSendMessage({
    username,
    avatar,
    setMessagesByChat,
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
      recipientId: userId || null,
      replyTo: replyToMessage,
      onClear: () => {
        setInput('');
        setAttachedImage(null);
        setAttachedAudio(null);
        setAttachedVideo(null);
        setReplyToMessage(null);
      },
    });
  };

  const { openImageModal, closeImageModal } = useImageModal(setIsImageModalOpen, setModalImageSrc);
  useChatEffects({ messages: messagesByChat[routeUserId ? [currentUserId, routeUserId].sort().join('_') : 'public'] || [], username, audioRef, messagesEndRef, hasInteracted });

  const isPrivateChat = !!userId;

  // Відфільтровуємо повідомлення поточного чату для рендеру
  const currentChatId = userId ? [currentUserId, routeUserId].filter(Boolean).sort().join('_') : 'public';
  const filteredMessages = messagesByChat[currentChatId] || [];

  useEffect(() => {
    if (userId && unreadPrivateMessages[userId]) {
      setUnreadPrivateMessages(prev => ({
        ...prev,
        [userId]: 0,
      }));
    }
  }, [userId, unreadPrivateMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [userId, filteredMessages]);

  const handleScrollToMessage = id => {
    const ref = messageRefs.current?.[id];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isAuthChecked) return <Loader />;

  return (
    <ChatContainer $dark={isDarkTheme} $isLogin={false}>
      <FlexWrapper>
        <SidebarUsers
          allUsers={allUsers}
          onlineUsers={onlineUsers}
          isDarkTheme={isDarkTheme}
          isConnected={isConnected}
          unreadPrivateMessages={unreadPrivateMessages}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            messages={filteredMessages}
            username={username}
            isDarkTheme={isDarkTheme}
            typingUsers={typingUsers}
            onImageClick={openImageModal}
            messagesEndRef={messagesEndRef}
            onToggleReaction={toggleReaction}
            onReplyMessage={setReplyToMessage}
            messageRefs={messageRefs}
            handleScrollToMessage={handleScrollToMessage}
            setMessages={setMessagesByChat} // Передаємо новий сеттер
            // chatId={chatId} 
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
            socket={socket}
            recipientId={userId || null}
            replyToMessage={replyToMessage}
            setReplyToMessage={setReplyToMessage}
          />
          <EmojiPickerSection
            showEmojiPicker={showEmojiPicker}
            isDarkTheme={isDarkTheme}
            setInput={setInput}
          />
        </div>
      </FlexWrapper>
      <ModalsContainer
        isOnlineListOpen={isOnlineListOpen}
        setIsOnlineListOpen={setIsOnlineListOpen}
        onlineUsers={onlineUsers}
        isDarkTheme={isDarkTheme}
        isImageModalOpen={isImageModalOpen}
        modalImageSrc={modalImageSrc}
        closeImageModal={closeImageModal}
        unreadPrivateMessages={unreadPrivateMessages}
        allUsers={allUsers}
      />
      <audio ref={audioRef} src={SOUND_URL} preload="auto" />
    </ChatContainer>
  );
}
