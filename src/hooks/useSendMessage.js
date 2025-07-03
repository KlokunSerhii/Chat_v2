import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';

import { saveChatMessages } from '../utils/utils';

export function useSendMessage({ username, avatar, setMessagesByChat, sendSocketMessage }) {
  const token = localStorage.getItem('token');
  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.id;
    } catch (error) {
      console.error('❌ Помилка при декодуванні токена:', error);
    }
  }

  const sendMessage = ({
    input,
    attachedImage,
    attachedAudio,
    attachedVideo,
    onClear,
    recipientId = null,
    replyTo = null,
  }) => {
    const trimmedText = input.trim();
    const hasMedia = attachedImage || attachedAudio || attachedVideo;

    if (!trimmedText && !hasMedia) return;

    const tempId = uuidv4();
    const timestamp = new Date().toISOString();

    const replyObject = replyTo
      ? {
          id: replyTo.id,
          text: replyTo.text,
          username: replyTo.username,
        }
      : null;

    const localMsg = {
      sender: 'user',
      text: trimmedText,
      timestamp,
      username,
      avatar,
       image: attachedImage && !attachedImage.startsWith('blob:') ? attachedImage : null,
  audio: attachedAudio && !attachedAudio.startsWith('blob:') ? attachedAudio : null,
  video: attachedVideo && !attachedVideo.startsWith('blob:') ? attachedVideo : null,
      id: tempId,
      local: false,
      senderId: currentUserId,
      recipientId: recipientId,
      replyTo: replyObject,
      localId: tempId,
    };

    setMessagesByChat(prev => {
      const chatId = recipientId ? [currentUserId, recipientId].filter(Boolean).sort().join('_') : 'public';
      const oldMsgs = prev[chatId] || [];
      return {
        ...prev,
        [chatId]: saveChatMessages([...oldMsgs, localMsg], 100),
      };
    });

    // Відправляємо на сервер без id і local
    const { id, local, ...serverMsg } = localMsg;

    sendSocketMessage({
      ...serverMsg,
      localId: tempId,
      senderId: currentUserId,
      recipientId,
      replyTo: replyObject,
    });

    if (typeof onClear === 'function') {
      onClear();
    }
  };

  return { sendMessage };
}
