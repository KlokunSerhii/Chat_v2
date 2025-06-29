import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import { saveChatMessages } from '../utils/utils';

export function useSendMessage({ username, avatar, setMessages, sendSocketMessage }) {
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
  }) => {
    const trimmedText = input.trim();
    const hasMedia = attachedImage || attachedAudio || attachedVideo;

    if (!trimmedText && !hasMedia) return;

    const tempId = uuidv4();
    const timestamp = new Date().toISOString();

    const localMsg = {
      sender: 'user',
      text: trimmedText,
      timestamp,
      username,
      avatar,
      image: attachedImage || null,
      audio: attachedAudio || null,
      video: attachedVideo || null,
      id: tempId,
      local: false,
      senderId: currentUserId,
      recipientId: recipientId,
    };

    // Локально додаємо повідомлення
    setMessages(prev => saveChatMessages([...prev, localMsg], 100));

    // Надсилаємо на сервер (без id і local)
    const { id, local, ...serverMsg } = localMsg;

    sendSocketMessage({
      ...serverMsg,
      localId: tempId,
      senderId: currentUserId,
    });

    // Очистка полів
    if (typeof onClear === 'function') {
      onClear();
    }
  };

  return { sendMessage };
}
