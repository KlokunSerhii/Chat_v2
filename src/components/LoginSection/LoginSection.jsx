import { ChatButton } from "../ChatApp/ChatApp.styled";
import {
  UsernameInputWrapper,
  UsernameInput,
  AvatarImage,
} from "./LoginSection.styled";

export default function LoginSection({
  avatarSeeds,
  selectedSeed,
  setSelectedSeed,
  tempUsername,
  setTempUsername,
  handleLogin,
  isDarkTheme,
  usernameInputRef,
}) {
  return (
    <UsernameInputWrapper>
      <div style={{ marginBottom: 12 }}>
        <strong>Оберіть аватар:</strong>
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
        ref={usernameInputRef}
        value={tempUsername}
        onChange={(e) => setTempUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        placeholder="Ваше ім'я"
        $dark={isDarkTheme}
      />
      <ChatButton
        onClick={handleLogin}
        disabled={!tempUsername.trim()}
      >
        Увійти
      </ChatButton>
    </UsernameInputWrapper>
  );
}
