import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#e5ddd5")};
  color: ${({ $dark }) => ($dark ? "#e5ddd5" : "#222")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const StatusBar = styled.div`
  padding: 14px 20px;
  background-color: ${({ $dark }) => ($dark ? "#1f1f1f" : "#f7f7f7")};
  color: ${({ $dark }) => ($dark ? "#aaa" : "#555")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${({ $dark }) => ($dark ? "#333" : "#ddd")};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    font-size: 13px;
    padding: 10px;
  }
`;

export const ThemeToggle = styled.button`
  width: 60px;
  height: 32px;
  border: none;
  border-radius: 50px;
  background-color: ${({ $dark }) => ($dark ? "#4b5563" : "#fbbf24")};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  padding: 4px;

  .slider {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${({ $dark }) =>
      $dark ? "#4b5563" : "#fbbf24"};
    position: absolute;
    top: 4px;
    left: ${({ $dark }) => ($dark ? "32px" : "4px")};
    transition: left 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .sun,
  .moon {
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .sun {
    opacity: ${({ $dark }) => ($dark ? 0 : 1)};
    left: 8px;
  }

  .moon {
    opacity: ${({ $dark }) => ($dark ? 1 : 0)};
    right: 8px;
  }
`;

export const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
  gap: 8px;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#fff")};
  scrollbar-width: thin;
  scrollbar-color: ${({ $dark }) =>
    $dark ? "#555 #222" : "#ccc #f1f1f1"};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ $dark }) => ($dark ? "#222" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ $dark }) => ($dark ? "#555" : "#ccc")};
    border-radius: 3px;
  }
`;

export const Message = styled.div`
  flex-direction: column;
  align-items: flex-start;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  min-width: 10%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.4;
  position: relative;
  overflow-wrap: break-word;
  word-break: break-word;
  background-color: ${({ $dark, $isOwn, $system }) => {
    if ($system) return $dark ? "#2f3136" : "#f0f0f0";
    return $isOwn
      ? $dark
        ? "#054d40"
        : "#dcf8c6"
      : $dark
      ? "#262626"
      : "#b8f57f";
  }};
  color: ${({ $dark, $isOwn, $system }) => {
    if ($system) return $dark ? "#999" : "#666";
    return $isOwn
      ? $dark
        ? "#b9f6ca"
        : "#202020"
      : $dark
      ? "#ddd"
      : "#222";
  }};
  box-shadow: ${({ $isOwn, $dark }) =>
    $isOwn
      ? $dark
        ? "0 1px 3px rgba(5, 77, 64, 0.7)"
        : "0 1px 3px rgba(0, 92, 75, 0.5)"
      : "0 1px 1px rgba(0,0,0,0.1)"};

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

export const MessageUsername = styled.div`
  display: block;
  text-align: ${({ $isOwn }) => ($isOwn ? "right" : "left")};
  font-weight: 700;
  font-size: 13px;
  line-height: 1.2;
  margin-bottom: 4px;
  color: ${({ $dark }) => ($dark ? "#8ab4f8" : "#0088cc")};
  user-select: none;
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
  text-align: ${({ $isOwn }) => ($isOwn ? "right" : "left")};
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
`;
export const MessageTime = styled.span`
  position: absolute;
  bottom: 6px;
  ${({ $isOwn }) => ($isOwn ? "right: 12px;" : "left: 12px;")}
  font-size: 10px;
  color: ${({ $dark }) =>
    $dark ? "rgba(255, 255, 255, 0.4)" : "#999"};
  user-select: none;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  background-color: ${({ $dark }) => ($dark ? "#1f1f1f" : "#f7f7f7")};
  border-top: 1px solid ${({ $dark }) => ($dark ? "#333" : "#ddd")};

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  background-color: ${({ $dark }) => ($dark ? "#262626" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};
  outline: none;
  box-shadow: inset 0 0 5px
    ${({ $dark }) =>
      $dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)"};

  &::placeholder {
    color: ${({ $dark }) => ($dark ? "#999" : "#aaa")};
  }
`;

export const ChatButton = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? "#9e9e9e" : "#0088cc"};
  border: none;
  color: white;
  font-weight: 600;
  padding: 0 20px;
  margin-left: 12px;
  border-radius: 20px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#9e9e9e" : "#006699"};
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const UsernameInputWrapper = styled.div`
  display: flex;
  padding: 40px 20px;
  justify-content: center;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#f0f0f0")};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
  }
`;

export const UsernameInput = styled.input`
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid ${({ $dark }) => ($dark ? "#444" : "#ccc")};
  font-size: 16px;
  width: 320px;
  margin-right: 12px;
  outline: none;
  background-color: ${({ $dark }) => ($dark ? "#222" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};

  &::placeholder {
    color: ${({ $dark }) => ($dark ? "#999" : "#aaa")};
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  font-size: 14px;
  margin: 0 0 10px 8px;
  color: ${({ $dark }) => ($dark ? "#bbb" : "#555")};
`;
export const ConnectionStatus = styled.span`
  color: ${({ $connected }) =>
    $connected ? "#4caf50" : "#f44336"}; // зелений або червоний
  font-weight: 700;
`;
export const EmojiButton = styled.button`
  font-size: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  transition: transform 0.2s ease, color 0.2s ease;
  color: ${({ $dark }) => ($dark ? "#ffd740" : "#0088cc")};

  &:hover {
    color: ${({ $dark }) => ($dark ? "#fff176" : "#005577")};
    transform: scale(1.2);
  }
`;

export const OnlineList = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  background: ${({ $dark }) => ($dark ? "#1f1f1f" : "#f0f0f0")};
  border-bottom: 1px solid ${({ $dark }) => ($dark ? "#333" : "#ddd")};
  color: ${({ $dark }) => ($dark ? "#bbb" : "#333")};
`;

export const OnlineUser = styled.div`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "🟢";
    font-size: 10px;
  }
`;
