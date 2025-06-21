import styled, { css, keyframes } from "styled-components";

const darkBg = "#1e1e1e";
const lightBg = "#fafafa";
const darkText = "#eee";
const lightText = "#222";
const primaryColor = "#0088cc";
const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${fadeIn} 0.4s ease-in;

  @media (max-width: 600px) {
    max-width: 100%;
    padding-bottom: 60px;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#e0e0e0")};
  padding: 8px 16px;
  font-size: 14px;
  gap: 12px;
`;

export const ConnectionStatus = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $connected }) => ($connected ? "#4caf50" : "#f44336")};
  box-shadow: 0 0 6px ${({ $connected }) => ($connected ? "#4caf50" : "#f44336")};
`;

export const ChatButton = styled.button`
  background-color: ${({ $dark }) => ($dark ? primaryColor : "#007acc")};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
  &:hover:not(:disabled) {
    background-color: ${({ $dark }) => ($dark ? "#006799" : "#005f99")};
    transform: scale(1.03);
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  transition: transform 0.2s ease;
  &:hover {
    transform: rotate(15deg);
  }
`;

export const UsernameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  gap: 12px;
`;

export const UsernameInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid ${({ $dark }) => ($dark ? "#444" : "#ccc")};
  border-radius: 8px;
  background-color: ${({ $dark }) => ($dark ? "#222" : "white")};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  ${scrollbarStyle};
`;

export const Message = styled.div`
  margin-bottom: 14px;
  max-width: 70%;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $dark, $isOwn }) =>
    $isOwn ? ($dark ? "#004466" : "#bbdefb") : $dark ? "#333" : "#e0e0e0"};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  padding: 10px 14px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MessageTime = styled.div`
  font-size: 11px;
  margin-top: 6px;
  opacity: 0.6;
  text-align: right;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#fafafa")};
  gap: 10px;
  border-top: 1px solid ${({ $dark }) => ($dark ? "#333" : "#ccc")};
  @media (max-width: 600px) {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

export const ChatInput = styled.textarea`
  flex-grow: 1;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ $dark }) => ($dark ? "#222" : "white")};
  color: ${({ $dark }) => ($dark ? darkText : lightText)};
  border: 1px solid ${({ $dark }) => ($dark ? "#444" : "#ccc")};
  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export const EmojiButton = styled.button`
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${({ $dark }) => ($dark ? "#ddd" : "#444")};
  &:hover {
    color: ${primaryColor};
  }
`;

export const OnlineUser = styled.div`
  padding: 8px;
  font-weight: bold;
  color: ${({ $dark }) => ($dark ? "#eee" : "#111")};
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  user-select: none;
`;

export const OnlineListModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ $dark }) => ($dark ? darkBg : "white")};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  z-index: 999;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-in;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 998;
`

export const AttachedImagePreview = styled.img`
  max-width: 80px;
  max-height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid ${primaryColor};
`;

export const MessageImage = styled.img`
  margin-top: 6px;
  max-width: 220px;
  border-radius: 8px;
  object-fit: contain;
  user-select: none;
`

export const AttachButton = styled(EmojiButton)`
  font-size: 20px;
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  font-size: 13px;
  color: ${({ $dark }) => ($dark ? "#bbb" : "#555")};
  padding-left: 12px;
`;

export const MessageUsername = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#333")};
  margin-bottom: 4px;
`;
