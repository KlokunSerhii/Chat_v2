import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  UsernameInputWrapper,
  UsernameInput,
  AvatarImageButton,
  HidePasswordButton,
} from './LoginSection.styled';
import AvatarUploader from '../AvatarUploader/AvatarUploader.jsx';

export default function LoginSection({
  tempUsername,
  setTempUsername,
  tempPassword,
  setTempPassword,
  handleLogin,
  handleRegister,
  isDarkTheme,
  setAvatar,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <UsernameInputWrapper onSubmit={handleLogin}>
      <UsernameInput
        value={tempUsername}
        onChange={e => setTempUsername(e.target.value)}
        placeholder="Ваше ім'я"
        $dark={isDarkTheme}
      />
      <div style={{ position: 'relative' }}>
        <UsernameInput
          type={showPassword ? 'text' : 'password'}
          value={tempPassword}
          onChange={e => setTempPassword(e.target.value)}
          placeholder="Пароль"
          $dark={isDarkTheme}
          style={{ paddingRight: '40px' }}
        />
        <HidePasswordButton
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          $dark={isDarkTheme}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </HidePasswordButton>
      </div>
      <AvatarUploader isDarkTheme={isDarkTheme} onUpload={url => setAvatar(url)} />
      <AvatarImageButton type="submit">Увійти</AvatarImageButton>
      <AvatarImageButton onClick={handleRegister} disabled={!tempUsername.trim()}>
        Зареєструватися
      </AvatarImageButton>
    </UsernameInputWrapper>
  );
}
