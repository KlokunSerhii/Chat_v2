import styled, { keyframes, css } from "styled-components";

export const ChatContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  height: 85vh;
  border-radius: 10px;
  background: ${({ $dark }) => ($dark ? "#1e1e2f" : "#e3f2fd")};
  box-shadow: ${({ $dark }) =>
    $dark ? "0 0 10px #333" : "0 0 10px #ccc"};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};

  @media (max-width: 600px) {
    max-width: 100%;
    height: 90vh;
    margin: 10px;
  }
`;

export const StatusBar = styled.div`
  padding: 10px 16px;
  background-color: ${({ $dark }) => ($dark ? "#27293d" : "#eee")};
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${({ $connected, $dark }) =>
      $connected
        ? $dark
          ? "#4ade80"
          : "green"
        : $dark
        ? "#f87171"
        : "red"};
  }
`;

export const ThemeToggle = styled.button`
  font-size: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};
  transition: color 0.3s;

  &:hover {
    color: ${({ $dark }) => ($dark ? "#a3a3ff" : "#5555ff")};
  }
`;

export const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ $dark }) => ($dark ? "#2a2a44" : "#ffffff")};
  scroll-behavior: smooth;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const messageAppear = keyframes`
  from {opacity: 0; transform: translateY(15px);}
  to {opacity: 1; transform: translateY(0);}
`;

Мexport const Message = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  font-size: 15px;
  line-height: 1.4;
  border-radius: 18px;
  background-color: ${({ $dark }) => ($dark ? "#2f2f49" : "#f1f0f0")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  position: relative;
  animation: ${messageAppear} 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  ${({ $isOwn }) =>
    $isOwn &&
    css`
      background-color: #0088cc;
      color: white;
      border-bottom-right-radius: 4px;
    `}

  ${({ $system }) =>
    $system &&
    css`
      background: transparent;
      color: gray;
      text-align: center;
      border-radius: 0;
      font-size: 13px;
      margin: 12px 0;
      max-width: 100%;
    `}

  strong {
    display: block;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 4px;
    color: ${({ $dark, $isOwn }) =>
      $isOwn ? "#cceaff" : $dark ? "#aaa" : "#333"};
  }

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 8px 12px;
    max-width: 85%;
  }
`;

export const MessageText = styled.div``;

export const MessageTime = styled.div`
  font-size: 11px;
  color: ${({ $dark, $isOwn }) =>
    $isOwn ? ($dark ? "#d2e3ff" : "#dfefff") : $dark ? "#888" : "#666"};
  margin-top: 6px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;

  &::after {
    content: ${({ $delivered }) => ($delivered ? '"✓✓"' : '"✓"')};
    font-size: 12px;
    color: ${({ $isOwn }) => ($isOwn ? "#d0f0ff" : "transparent")};
    opacity: ${({ $isOwn }) => ($isOwn ? 0.7 : 0)};
    transition: opacity 0.2s;
  }

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;


const blinkDots = keyframes`
  0%, 20% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  color: ${({ $dark }) => ($dark ? "#ccc" : "#555")};
  max-width: 75%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ $dark }) => ($dark ? "#3b3f72" : "#e5e5ea")};
  align-self: flex-start;
  display: flex;
  gap: 4px;
  font-size: 15px;

  span {
    display: inline-block;
    animation-name: ${blinkDots};
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    opacity: 0.3;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @media (max-width: 600px) {
    max-width: 90%;
    font-size: 13px;
    padding: 8px 12px;
  }
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 15px 20px;
  background-color: ${({ $dark }) => ($dark ? "#27293d" : "#fafafa")};
  border-radius: 0 0 10px 10px;
  gap: 10px;

  @media (max-width: 600px) {
    padding: 12px 15px;
  }
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 12px 18px;
  font-size: 15px;
  border: 1px solid ${({ $dark }) => ($dark ? "#555" : "#ccc")};
  border-radius: 10px;
  outline: none;
  background-color: ${({ $dark }) => ($dark ? "#2f2f49" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};
  transition: border-color 0.25s ease;

  &:focus {
    border-color: ${({ $dark }) => ($dark ? "#a3a3ff" : "#007bff")};
  }

  &:disabled {
    background-color: ${({ $dark }) => ($dark ? "#1e1e2f" : "#eee")};
    color: ${({ $dark }) => ($dark ? "#666" : "#999")};
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

export const ChatButton = styled.button`
  padding: 12px 25px;
  font-size: 15px;
  font-weight: 600;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #3c32b8;
  }

  @media (max-width: 600px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const ConnectionStatus = styled.span`
  font-weight: 700;
`;

export const UsernameInputWrapper = styled.div`
  display: flex;
  padding: 30px 20px;
  justify-content: center;
  gap: 10px;
  background-color: ${({ $dark }) => ($dark ? "#27293d" : "#fafafa")};
  border-radius: 0 0 10px 10px;

  @media (max-width: 600px) {
    padding: 25px 15px;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const UsernameInput = styled.input`
  flex-grow: 1;
  padding: 14px 18px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid ${({ $dark }) => ($dark ? "#555" : "#ccc")};
  outline: none;
  background-color: ${({ $dark }) => ($dark ? "#2f2f49" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#eee" : "#222")};

  &:focus {
    border-color: ${({ $dark }) => ($dark ? "#a3a3ff" : "#007bff")};
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 12px 14px;
  }
`;
