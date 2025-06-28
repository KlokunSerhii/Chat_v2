import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatAppState } from '../hooks/useChatAppState';
import { ChatContainer, Loader } from '../components/ChatApp/ChatApp.styled.js';
import LoginSection from '../components/LoginSection/LoginSection.jsx';

export default function LoginPage() {
  const {
    avatarSeeds,
    selectedSeed,
    setSelectedSeed,
    usernameInputRef,
    avatar,
    setAvatar,
    isDarkTheme,
    setIsDarkTheme,
  } = useChatAppState();

  const {
    isAuthChecked,
    isLoggedIn,
    handleLogin,
    handleRegister,
    tempUsername,
    setTempUsername,
    tempPassword,
    setTempPassword,
  } = useAuth({
    setUsername: () => {},
    setAvatar,
  });

  if (!isAuthChecked) return <Loader />;
  return (
    <ChatContainer $dark={isDarkTheme} $isLogin={true}>
      <LoginSection
        avatarSeeds={avatarSeeds}
        selectedSeed={selectedSeed}
        setSelectedSeed={setSelectedSeed}
        tempUsername={tempUsername}
        setTempUsername={setTempUsername}
        tempPassword={tempPassword}
        setTempPassword={setTempPassword}
        handleLogin={handleLogin}
        handleRegister={e => handleRegister(e, avatar)}
        isDarkTheme={isDarkTheme}
        usernameInputRef={usernameInputRef}
        avatar={avatar}
        setIsDarkTheme={setIsDarkTheme}
        setAvatar={setAvatar}
      />
    </ChatContainer>
  );
}
