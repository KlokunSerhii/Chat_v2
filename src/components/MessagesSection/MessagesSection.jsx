import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatMessages, TypingIndicator } from '../ChatApp/ChatApp.styled.js';
import MessageItem from '../MessageItem/MessageItem.jsx';

export default function MessagesSection({
  messages,
  username,
  isDarkTheme,
  typingUsers,
  onImageClick,
  messagesEndRef,
  onToggleReaction,
}) {
  const { userId: activeChatUserId } = useParams();

  const visibleTypingUsers = useMemo(() => {
    if (!activeChatUserId) return typingUsers;
    return typingUsers.filter(user => user.userId === activeChatUserId);
  }, [typingUsers, activeChatUserId]);

  const chatTitle = activeChatUserId ? 'Приватний чат' : 'Загальний чат';

  return (
    <>
      <h3 style={{ textAlign: 'center', margin: '10px 0', color: isDarkTheme ? '#fff' : '#000' }}>
        {chatTitle}
      </h3>
      <ChatMessages $dark={isDarkTheme}>
        {messages.map(msg => (
          <MessageItem
            key={msg.id}
            msg={{ ...msg, id: msg.id || msg._id }}
            isOwn={msg.username === username}
            isDarkTheme={isDarkTheme}
            onImageClick={onImageClick}
            username={username}
            onToggleReaction={onToggleReaction}
          />
        ))}

        {visibleTypingUsers.map(user => (
          <TypingIndicator key={user.userId} $dark={isDarkTheme}>
            <em>{user.username} друкує...</em>
          </TypingIndicator>
        ))}

        <div ref={messagesEndRef} />
      </ChatMessages>
    </>
  );
}
