// components/MessagesSection.jsx
import React from 'react';
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
  return (
    <ChatMessages $dark={isDarkTheme}>
      {messages
        .filter(msg => msg.sender !== 'system')
        .map(msg => (
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

      {typingUsers.map(user => (
        <TypingIndicator key={user} $dark={isDarkTheme}>
          <em>{user} друкує...</em>
        </TypingIndicator>
      ))}

      <div ref={messagesEndRef} />
    </ChatMessages>
  );
}
