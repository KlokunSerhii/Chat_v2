import React from "react";
import {
  UsernameInputWrapper,
  UsernameInput,
  AvatarImageButton,
} from "./LoginSection.styled";
import AvatarUploader from "../AvatarUploader/AvatarUploader.jsx";

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
  return (
    <UsernameInputWrapper onSubmit={handleLogin}>
      <UsernameInput
        value={tempUsername}
        onChange={(e) => setTempUsername(e.target.value)}
        placeholder="Ваше ім'я"
        $dark={isDarkTheme}
      />
      <UsernameInput
        type="password"
        value={tempPassword}
        onChange={(e) => setTempPassword(e.target.value)}
        placeholder="Пароль"
        $dark={isDarkTheme}
      />
      <AvatarUploader
        isDarkTheme={isDarkTheme}
        onUpload={(url) => setAvatar(url)}
      />
      <AvatarImageButton type="submit">Увійти</AvatarImageButton>
      <AvatarImageButton
        onClick={handleRegister}
        disabled={!tempUsername.trim()}
      >
        Зареєструватися
      </AvatarImageButton>
    </UsernameInputWrapper>
  );
}
