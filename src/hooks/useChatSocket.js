import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import { saveChatMessages } from '../utils/utils.js';
import { SERVER_URL } from '../utils/url.js';

export function useChatSocket(username, avatar) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });
    const handleMessage = msg => {
      const isOwnMessage = msg.username === username;
      setMessages(prev => {
        const newMsg = { ...msg, id: msg._id };

        if (isOwnMessage) {
          return saveChatMessages(
            prev.map(m => (m.local && m.text === msg.text && !m._id ? newMsg : m)),
            100,
          );
        } else {
          return saveChatMessages([...prev, newMsg], 100);
        }
      });
    };

    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('online-users', users => setOnlineUsers(users));

    socket.on('user-typing', u => {
      if (u === username) return;
      setTypingUsers(prev => (prev.includes(u) ? prev : [...prev, u]));
      setTimeout(() => setTypingUsers(prev => prev.filter(x => x !== u)), 2500);
    });

    socket.on('last-messages', history => {
      const restored = history.map(msg => ({
        ...msg,
        id: msg._id,
      }));
      const trimmed = saveChatMessages(restored, 100);
      setMessages(trimmed);
    });

    socket.on('message', handleMessage);

    socket.on('reaction-update', ({ messageId, reactions }) => {
      setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, reactions } : msg)));
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
