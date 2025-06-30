import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

import { saveChatMessages } from '../utils/utils.js';
import { SERVER_URL } from '../utils/url.js';

export function useChatSocket(username, avatar) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) return;
    const socket = io(SERVER_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });
    const handleMessage = msg => {
      const isOwnMessage = msg.username === username;

      setMessages(prev => {
        const newMsg = { ...msg, id: msg._id };

        // Якщо це власне повідомлення, і ми вже додали його локально
        if (isOwnMessage && msg.localId) {
          const localIndex = prev.findIndex(m => m.id === msg.localId);
          if (localIndex !== -1) {
            const updated = [...prev];
            updated[localIndex] = {
              ...msg,
              id: msg._id,
            };
            return saveChatMessages(updated, 100);
          }
        }
        // Якщо вже є повідомлення з таким id (наприклад, двічі прилетіло) — ігноруємо
        if (prev.some(m => m.id === newMsg.id || (msg.localId && m.id === msg.localId))) {
          return prev;
        }

        // Інакше додаємо нове
        return saveChatMessages([...prev, newMsg], 100);
      });
    };

    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('online-users', users => setOnlineUsers(users));

    socket.on('user-typing', u => {
      if (u === username) return;
      setTypingUsers(prev => (prev.includes(u) ? prev : [...prev, u]));
      setTimeout(() => setTypingUsers(prev => prev.filter(x => x !== u)), 1000);
    });

    socket.on('last-messages', history => {
      const currentUserId = jwtDecode(localStorage.getItem('token')).id;

      const filtered = history.filter(
        msg =>
          !msg.recipientId || msg.senderId === currentUserId || msg.recipientId === currentUserId,
      );
      const restored = history.map(msg => ({
        ...msg,
        id: msg._id,
      }));
      const trimmed = saveChatMessages(restored, 100);
      setMessages(trimmed);
    });

    socket.on('message', handleMessage);

    socket.on('reaction-update', updatedMsg => {
      setMessages(prev => {
        const exists = prev.some(msg => msg.id === updatedMsg.id);
        if (!exists) {
          return [...prev, updatedMsg]; // або ігноруємо, якщо не хочемо додавати
        }

        return prev.map(msg => (msg.id === updatedMsg.id ? updatedMsg : msg));
      });
    });

    socket.on('user-joined', ({ username, avatar, timestamp }) => {
      toast.success(`${username} приєднався до чату`, {
        duration: 3000,
        position: 'top-center',
      });
      setMessages(prev => {
        const next = [
          ...prev,
          {
            id: uuidv4(),
            sender: 'system',
            username,
            avatar,
            text: `${username} приєднався`,
            timestamp,
          },
        ];
        return saveChatMessages(next, 100);
      });
    });

    socket.on('user-left', ({ username, avatar, timestamp }) => {
      toast.success(`${username} вийшов із чату`, {
        duration: 3000,
        position: 'top-center',
      });
      setMessages(prev => {
        const next = [
          ...prev,
          {
            id: uuidv4(),
            sender: 'system',
            username,
            avatar,
            text: `${username} покинув`,
            timestamp,
          },
        ];
        return saveChatMessages(next, 100);
      });
    });

    return () => {
      socket.off('message', handleMessage);
      socket.off();
      socket.disconnect();
    };
  }, [username, avatar]);

  const sendMessage = msg => {
    socketRef.current?.emit('message', msg);
  };
  const toggleReaction = ({ messageId, emoji }) => {
    socketRef.current?.emit('toggle-reaction', { messageId, emoji });
  };
  return {
    messages,
    setMessages,
    onlineUsers,
    typingUsers,
    isConnected,
    sendMessage,
    socketRef,
    toggleReaction,
  };
}
