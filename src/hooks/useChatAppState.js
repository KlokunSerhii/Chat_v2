// hooks/useChatAppState.js
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';

export function useChatAppState() {
  const avatarSeeds = useMemo(() => Array.from({ length: 5 }, () => uuidv4()), []);
  const [selectedSeed, setSelectedSeed] = useState(avatarSeeds[0]);
  const [username, setUsername] = useLocalStorage('chat_username', '');
  const [avatar, setAvatar] = useLocalStorage(
    'chat_avatar',
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[0]}`,
  );
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('chat_theme', false);

  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOnlineListOpen, setIsOnlineListOpen] = useState(false);

  const [attachedImage, setAttachedImage] = useState(null);
  const [attachedAudio, setAttachedAudio] = useState(null);
  const [attachedVideo, setAttachedVideo] = useState(null);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  return {
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
  };
}
