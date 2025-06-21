import styled, { css } from "styled-components";

const darkBg = "#1e1e1e";
const lightBg = "#fafafa";

const darkText = "#eee";
const lightText = "#222";

const primaryColor = "#0088cc";
const errorColor = "#cc3300";

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 4px;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ $dark }) => ($dark ? darkBg : lightBg)};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  position: relative;
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#e0e0e0")};
  padding: 6px 12px;
  font-size: 14px;
  gap: 12px;
`;

export const ConnectionStatus = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $connected }) => ($connected ? "#4caf50" : "#f44336")};
  box-shadow: ${({ $connected }) =>
    $connected ? "0 0 6px #4caf50" : "0 0 6px #f44336"};
`;

export const ChatButton = styled.button`
  background-color: ${({ $dark }) => ($dark ? primaryColor : "#007acc")};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  &:disabled {
    background-color: #999;
    cursor: default;
  }
  &:hover:not(:disabled) {
    background-color: ${({ $dark }) => ($dark ? "#006799" : "#005f99")};
  }
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  padding: 0 6px;
`;

export const UsernameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  gap: 12px;
`;

export const UsernameInput = styled.input`
  padding: 10px 12px;
  font-size: 16px;
  border: 1.5px solid ${({ $dark }) => ($dark ? "#444" : "#ccc")};
  border-radius: 6px;
  background-color: ${({ $dark }) => ($dark ? "#222" : "white")};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  user-select: none;
  object-fit: cover;
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  ${scrollbarStyle}
`;

export const Message = styled.div`
  margin-bottom: 14px;
  max-width: 70%;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $dark, $isOwn, $system }) =>
    $system
      ? "transparent"
      : $isOwn
      ? $dark
        ? "#004466"
        : "#bbdefb"
      : $dark
      ? "#333"
      : "#e0e0e0"};
  color: ${({ $dark, $isOwn, $system }) =>
    $system ? ( $dark ? "#888" : "#666") : $isOwn ? ($dark ? "#b9e1ff" : "#222") : $dark ? "#ddd" : "#222"};
  padding: ${({ $system }) => ($system ? "0" : "10px 14px")};
  border-radius: ${({ $system }) => ($system ? "0" : "12px")};
  font-size: 14px;
  box-shadow: ${({ $system }) => ($system ? "none" : "0 2px 6px rgba(0,0,0,0.15)")};
`;

export const MessageUsername = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 4px;
  color: ${({ $dark, $isOwn }) => ($isOwn ? primaryColor : $dark ? "#aaa" : "#444")};
  user-select: none;
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;

  a {
    color: ${({ $isOwn }) => ($isOwn ? "#004477" : "#0055aa")};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const MessageTime = styled.div`
  font-size: 11px;
  margin-top: 4px;
  color: ${({ $dark, $isOwn }) =>
    $isOwn ? ($dark ? "#a8c8ff" : "#555") : $dark ? "#999" : "#666"};
  text-align: ${({ $isOwn }) => ($isOwn ? "right" : "left")};
  user-select: none;
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  font-size: 13px;
  margin-bottom: 8px;
  color: ${({ $dark }) => ($dark ? "#bbb" : "#555")};
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#fafafa")};
  gap: 8px;
  position: relative;
`;

export const ChatInput = styled.textarea`
  flex-grow: 1;
  min-height: 40px;
  max-height: 100px;
  resize: vertical;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid ${({ $dark }) => ($dark ? "#444" : "#ccc")};
  background-color: ${({ $dark }) => ($dark ? "#222" : "white")};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  font-size: 14px;
  font-family: inherit;
  outline: none;
  &:focus {
    border-color: ${primaryColor};
  }
`;

export const EmojiButton = styled.button`
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  color: ${({ $dark }) => ($dark ? "#ddd" : "#444")};
  padding: 4px 6px;
  border-radius: 6px;
  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#333" : "#eee")};
  }
`;

export const AttachButton = styled(EmojiButton)`
  font-size: 20px;
`;

export const AttachedImagePreview = styled.img`
  max-width: 80px;
  max-height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid ${primaryColor};
`;

export const MessageImage = styled.img`
  margin-top: 6px;
  max-width: 220px;
  border-radius: 8px;
  object-fit: contain;
  user-select: none;
`;

export const OnlineListModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 280px;
  max-height: 400px;
  overflow-y: auto;
  background-color: ${({ $dark }) => ($dark ? darkBg : "white")};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  padding: 20px 16px;
  transform: translate(-50%, -50%);
  z-index: 1500;
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 700;
    user-select: none;
  }
  p {
    user-select: none;
  }
`;

export const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  user-select: none;
  color: ${({ $dark }) => ($dark ? "#ddd" : "#222")};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.35);
  z-index: 1400;
`;

