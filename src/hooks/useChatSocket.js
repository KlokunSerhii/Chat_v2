import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

import { saveChatMessages } from '../utils/utils.js';
import { SERVER_URL } from '../utils/url.js';

export function useChatSocket(username, avatar, activeChatUserId) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadPrivateMessages, setUnreadPrivateMessages] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) return;
    const socket = io(SERVER_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

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
    const handleMessage = msg => {
      const isOwnMessage = msg.username === username;
      const isPrivate = msg.recipientId && msg.senderId !== msg.recipientId;
      const isToCurrentUser = msg.recipientId === currentUserId;
      const isFromAnotherUser = msg.senderId !== currentUserId;

      if (isPrivate && isToCurrentUser && isFromAnotherUser) {
        if (msg.senderId !== activeChatUserId) {
          setUnreadPrivateMessages(prev => ({
            ...prev,
            [msg.senderId]: (prev[msg.senderId] || 0) + 1,
          }));
        } else {
          // очищаємо, бо чат відкритий
          setUnreadPrivateMessages(prev => ({
            ...prev,
            [msg.senderId]: 0,
          }));
        }
      }

      setMessages(prev => {
        let fullReplyTo = null;
        if (msg.replyTo && typeof msg.replyTo === 'string') {
          fullReplyTo = prev.find(m => m.id === msg.replyTo || m._id === msg.replyTo);
        } else if (typeof msg.replyTo === 'object') {
          fullReplyTo = msg.replyTo;
        }

        const newMsg = { ...msg, id: msg._id, replyTo: fullReplyTo || null };

        // Якщо це власне повідомлення, і ми вже додали його локально
        if (isOwnMessage && msg.localId) {
          const localIndex = prev.findIndex(m => m.id === msg.localId);
          if (localIndex !== -1) {
            const updated = [...prev];
            updated[localIndex] = {
              ...msg,
              id: msg._id,
              replyTo: fullReplyTo || null,
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

    const typingTimers = {};

    socket.on('user-typing', user => {
      if (user.username === username) return;

      setTypingUsers(prev => {
        const exists = prev.some(u => u.userId === user.userId);
        if (!exists) return [...prev, user];
        return prev;
      });

      // Скидаємо старий таймер, якщо був
      if (typingTimers[user.userId]) {
        clearTimeout(typingTimers[user.userId]);
      }

      // Ставимо новий
      typingTimers[user.userId] = setTimeout(() => {
        setTypingUsers(prev => prev.filter(u => u.userId !== user.userId));
        delete typingTimers[user.userId];
      }, 1000);
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
      setMessages(prev =>
        prev.map(msg => {
          const sameByMongoId = msg.id === updatedMsg._id;
          const sameByLocalId = updatedMsg.localId && msg.id === updatedMsg.localId;

          if (sameByMongoId || sameByLocalId) {
            return {
              ...msg,
              reactions: updatedMsg.reactions,
            };
          }

          return msg;
        }),
      );
    });

    socket.on('user-joined', ({ username }) => {
      toast.success(`${username} приєднався до чату`, {
        duration: 3000,
        position: 'top-center',
      });
    });

    socket.on('user-left', ({ username }) => {
      toast.success(`${username} вийшов із чату`, {
        duration: 3000,
        position: 'top-center',
      });
    });

    socket.on('message-deleted', ({ id }) => {
      setMessages(prev => prev.filter(msg => msg._id !== id && msg.localId !== id));
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
    unreadPrivateMessages,
    setUnreadPrivateMessages,
  };
}
