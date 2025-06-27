import React from 'react';
import { StatusBar, ChatButton, ConnectionStatus, ThemeToggle } from '../ChatApp/ChatApp.styled.js';

export default function StatusBarSection({
  isDarkTheme,
  isLoggedIn,
  isConnected,
  onlineUsers,
  onToggleTheme,
  onLogout,
  onOpenOnlineUsers,
}) {
  return (
    <StatusBar $dark={isDarkTheme}>
      {isLoggedIn ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ChatButton onClick={onOpenOnlineUsers} $dark={isDarkTheme}>
              <ConnectionStatus $connected={isConnected} />
              Онлайн: {onlineUsers.length}
            </ChatButton>
          </div>

          <ThemeToggle
            $dark={isDarkTheme}
            onClick={onToggleTheme}
            title="Toggle theme"
          >
            {isDarkTheme ? ' ' : ' '}
          </ThemeToggle>

          <ChatButton onClick={onLogout} $dark={isDarkTheme}>
            Вийти
          </ChatButton>
        </>
      ) : (
        <ThemeToggle
          $dark={isDarkTheme}
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {isDarkTheme ? ' ' : ' '}
        </ThemeToggle>
      )}
    </StatusBar>
  );
}
