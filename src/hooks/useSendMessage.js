import { v4 as uuidv4 } from 'uuid';
import { saveChatMessages } from '../utils/utils';

export function useSendMessage({ username, avatar, setMessages, sendSocketMessage }) {
  const sendMessage = ({ input, attachedImage, attachedAudio, attachedVideo, onClear }) => {
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
    };

    // Локально додаємо повідомлення
    setMessages(prev => saveChatMessages([...prev, localMsg], 100));

    // Надсилаємо на сервер (без id і local)
    const { id, local, ...serverMsg } = localMsg;

    sendSocketMessage({
      ...serverMsg,
      localId: tempId,
    });

    // Очистка полів
    if (typeof onClear === 'function') {
      onClear();
    }
  };

  return { sendMessage };
}
