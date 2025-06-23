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
  handleLogin,
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
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {avatarSeeds.map((s) => {
            const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`;
            return (
              <AvatarImage
                key={s}
                src={url}
                onClick={() => setSelectedSeed(s)}
                style={{
                  border:
                    s === selectedSeed
                      ? "2px solid #0088cc"
                      : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
      <UsernameInput
        value={tempUsername}
        onChange={(e) => setTempUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        placeholder="Ваше ім'я"
        $dark={isDarkTheme}
      />
      {avatar && <AvatarImage src={avatar} alt="Вибраний аватар" />}
      <AvatarImageButton
        onClick={handleLogin}
        disabled={!tempUsername.trim()}
      >
        Увійти
      </AvatarImageButton>
    </UsernameInputWrapper>
  );
}
