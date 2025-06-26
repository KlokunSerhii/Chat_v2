import React from "react";
import {
  UsernameInputWrapper,
  UsernameInput,
  AvatarImage,
  AvatarImageButton,
} from "./LoginSection.styled";
import { ThemeToggle } from "../ChatApp/ChatApp.styled";

export default function LoginSection({
  avatarSeeds,
  selectedSeed,
  setSelectedSeed,
  tempUsername,
  setTempUsername,
  tempPassword,
  setTempPassword,
  handleLogin,
  handleRegister,
  isDarkTheme,
  avatar,
  setIsDarkTheme,
}) {
  return (
    <UsernameInputWrapper>
      <ThemeToggle
        $dark={isDarkTheme}
        onClick={() => setIsDarkTheme((d) => !d)}
        title="Toggle theme"
      >
        {isDarkTheme ? " " : " "}
      </ThemeToggle>

      <UsernameInput
        value={tempUsername}
        onChange={(e) => setTempUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        placeholder="Ваше ім'я"
        $dark={isDarkTheme}
      />
      <UsernameInput
        type="password"
        value={tempPassword}
        onChange={(e) => setTempPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        placeholder="Пароль"
        $dark={isDarkTheme}
      />

      <AvatarImageButton
        onClick={handleLogin}
        disabled={!tempUsername.trim()}
      >
        Увійти
      </AvatarImageButton>
      <AvatarImageButton
        onClick={handleRegister}
        disabled={!tempUsername.trim()}
      >
        Зареєструватися
      </AvatarImageButton>
    </UsernameInputWrapper>
  );
}
