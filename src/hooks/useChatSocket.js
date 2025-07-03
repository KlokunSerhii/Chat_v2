import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

import { saveChatMessages } from '../utils/utils.js';
import { SERVER_URL } from '../utils/url.js';

function getChatId(userA, userB) {
  return [userA, userB].filter(Boolean).sort().join('_');
}

export function useChatSocket(username, avatar, activeChatUserId) {
  const [messagesByChat, setMessagesByChat] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadPrivateMessages, setUnreadPrivateMessages] = useState({});
  const socketRef = useRef(null);

  const currentUserIdRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) return;

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      currentUserIdRef.current = decoded.id;
    } catch (error) {
      console.error('❌ Помилка при декодуванні токена:', error);
    }

    const socket = io(SERVER_URL, {
      auth: { token: localStorage.getItem('token') },
    });

    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('online-users', users => setOnlineUsers(users));

    const typingTimers = {};

    socket.on('user-typing', user => {
      if (user.username === username) return;

      setTypingUsers(prev => {
        if (!prev.some(u => u.userId === user.userId)) {
          return [...prev, user];
        }
        return prev;
      });

      if (typingTimers[user.userId]) {
        clearTimeout(typingTimers[user.userId]);
      }

      typingTimers[user.userId] = setTimeout(() => {
        setTypingUsers(prev => prev.filter(u => u.userId !== user.userId));
        delete typingTimers[user.userId];
      }, 1000);
    });

    socket.on('last-messages', history => {
      const currentUserId = currentUserIdRef.current;
      // Відфільтруємо повідомлення що належать нам: приватні (де sender або recipient ми), або публічні
      const filtered = history.filter(
        msg =>
          !msg.recipientId ||
          msg.senderId === currentUserId ||
          msg.recipientId === currentUserId,
      );

      // Реструктуруємо в обʼєкт messagesByChat
      const grouped = {};

      filtered.forEach(msg => {
        const chatId = msg.recipientId
          ? getChatId(msg.senderId, msg.recipientId)
          : 'public'; // для загального чату

        const formattedMsg = { ...msg, id: msg._id };

        if (!grouped[chatId]) grouped[chatId] = [];
        grouped[chatId].push(formattedMsg);
      });

      // Зберігаємо у стейт обмежуючи довжину
      Object.keys(grouped).forEach(chatId => {
        grouped[chatId] = saveChatMessages(grouped[chatId], 100);
      });

      setMessagesByChat(grouped);
    });

    socket.on('message', msg => {
      const chatId = msg.recipientId
        ? getChatId(msg.senderId, msg.recipientId)
        : 'public';

      setMessagesByChat(prev => {
        const oldMsgs = prev[chatId] || [];

        // Перевірка дубліката по id або localId
        if (
          oldMsgs.some(
            m => m.id === msg._id || (msg.localId && m.id === msg.localId),
          )
        ) {
          return prev;
        }

        const fullReplyTo =
          msg.replyTo && typeof msg.replyTo === 'string'
            ? oldMsgs.find(m => m.id === msg.replyTo || m._id === msg.replyTo)
            : msg.replyTo || null;

        const newMsg = { ...msg, id: msg._id, replyTo: fullReplyTo };

        return {
          ...prev,
          [chatId]: saveChatMessages([...oldMsgs, newMsg], 100),
        };
      });

      // Якщо це приватне повідомлення іншого чату, збільшуємо лічильник непрочитаних
      const currentUserId = currentUserIdRef.current;
      if (
        msg.recipientId &&
        msg.recipientId === currentUserId &&
        msg.senderId !== activeChatUserId
      ) {
        setUnreadPrivateMessages(prev => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }

      // Якщо ми в активному чаті — скидаємо лічильник
      if (msg.recipientId && msg.senderId === activeChatUserId) {
        setUnreadPrivateMessages(prev => ({
          ...prev,
          [msg.senderId]: 0,
        }));
      }
    });

    socket.on('reaction-update', updatedMsg => {
      setMessagesByChat(prev => {
        // Знаходимо чат для цього повідомлення
        let foundChatId = null;
        Object.entries(prev).some(([chatId, msgs]) => {
          if (
            msgs.some(
              m =>
                m.id === updatedMsg._id ||
                (updatedMsg.localId && m.id === updatedMsg.localId),
            )
          ) {
            foundChatId = chatId;
            return true;
          }
          return false;
        });

        if (!foundChatId) return prev;

        const updatedMsgs = prev[foundChatId].map(m => {
          if (
            m.id === updatedMsg._id ||
            (updatedMsg.localId && m.id === updatedMsg.localId)
          ) {
            return {
              ...m,
              reactions: updatedMsg.reactions,
            };
          }
          return m;
        });

        return {
          ...prev,
          [foundChatId]: updatedMsgs,
        };
      });
    });

    socket.on('message-deleted', ({ id }) => {
      setMessagesByChat(prev => {
        const updatedChats = {};
        Object.entries(prev).forEach(([chatId, msgs]) => {
          updatedChats[chatId] = msgs.filter(
            msg => msg._id !== id && msg.localId !== id,
          );
        });
        return updatedChats;
      });
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

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [username, avatar, activeChatUserId]);

  const sendMessage = msg => {
    const chatId = msg.recipientId
      ? getChatId(msg.senderId, msg.recipientId)
      : 'public';

    setMessagesByChat(prev => {
      const oldMsgs = prev[chatId] || [];

      if (oldMsgs.some(m => m.localId === msg.localId)) return prev;

      return {
        ...prev,
        [chatId]: saveChatMessages([...oldMsgs, msg], 100),
      };
    });

    socketRef.current?.emit('message', msg);
  };

  const toggleReaction = ({ messageId, emoji }) => {
    socketRef.current?.emit('toggle-reaction', { messageId, emoji });
  };

  return {
    messagesByChat,
    setMessagesByChat,
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
