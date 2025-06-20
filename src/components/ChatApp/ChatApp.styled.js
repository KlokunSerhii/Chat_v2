import styled, { css } from "styled-components";

const transition = "background-color 0.3s ease, color 0.3s ease";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => (props.$dark ? "#121212" : "#ffffff")};
  color: ${(props) => (props.$dark ? "#e0e0e0" : "#111")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: ${transition};
`;

export const StatusBar = styled.div`
  padding: 12px 20px;
  background-color: ${(props) => (props.$dark ? "#1e1e1e" : "#f7f7f7")};
  color: ${(props) => (props.$dark ? "#bbb" : "#444")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => (props.$dark ? "#333" : "#ddd")};
  transition: ${transition};

  span {
    color: ${(props) => (props.$connected ? "#4caf50" : props.$dark ? "#f44336" : "#d32f2f")};
    font-weight: 700;
  }
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: ${(props) => (props.$dark ? "#ffd740" : "#555")};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.$dark ? "#fff176" : "#000")};
  }
`;

export const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${(props) => (props.$dark ? "#181818" : "#f9f9f9")};
  transition: ${transition};
`;

export const Message = styled.div`
  max-width: 70%;
  margin-bottom: 14px;
  padding: 12px 18px;
  border-radius: 18px;
  box-shadow: 0 1.5px 4px rgba(0,0,0,0.15);
  font-size: 14.5px;
  line-height: 1.5;
  position: relative;
  word-wrap: break-word;
  transition: background-color 0.3s ease, color 0.3s ease;

  /* Власні повідомлення */
  ${(props) =>
    props.$isOwn &&
    css`
      background-color: ${props.$dark ? "#005c99" : "#daf1ff"};
      margin-left: auto;
      color: ${props.$dark ? "#cce6ff" : "#004a8f"};
      border-bottom-right-radius: 6px;
      box-shadow: 0 2px 6px rgba(0, 92, 153, 0.6);
    `}

  /* Системні повідомлення */
  ${(props) =>
    props.$system &&
    css`
      background-color: ${props.$dark ? "#2e2e2e" : "#eee"};
      color: ${props.$dark ? "#999" : "#666"};
      font-style: italic;
      max-width: 90%;
      margin: 12px auto;
      text-align: center;
      border-radius: 14px;
      box-shadow: none;
    `}

  /* Повідомлення інших користувачів */
  ${(props) =>
    !props.$isOwn && !props.$system &&
    css`
      background-color: ${props.$dark ? "#252525" : "#fff"};
      color: ${props.$dark ? "#ddd" : "#333"};
      border-bottom-left-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    `}
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
  font-size: 14.5px;
  line-height: 1.5;
`;

export const MessageTime = styled.span`
  position: absolute;
  bottom: 6px;
  right: 14px;
  font-size: 11px;
  color: ${(props) => (props.$dark ? "rgba(255,255,255,0.5)" : "#888")};
  user-select: none;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  background-color: ${(props) => (props.$dark ? "#1e1e1e" : "#f7f7f7")};
  border-top: 1px solid ${(props) => (props.$dark ? "#333" : "#ddd")};
  transition: ${transition};
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px 16px;
  border-radius: 25px;
  border: 1.5px solid ${(props) => (props.$dark ? "#555" : "#ccc")};
  background-color: ${(props) => (props.$dark ? "#222" : "#fff")};
  color: ${(props) => (props.$dark ? "#eee" : "#111")};
  font-size: 15px;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:focus {
    border-color: ${(props) => (props.$dark ? "#40c4ff" : "#0078d4")};
  }

  &:disabled {
    background-color: ${(props) => (props.$dark ? "#2a2a2a" : "#ddd")};
    cursor: not-allowed;
    color: ${(props) => (props.$dark ? "#666" : "#999")};
  }
`;

export const ChatButton = styled.button`
  margin-left: 14px;
  padding: 10px 22px;
  border-radius: 25px;
  border: none;
  background-color: #0078d4;
  color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #005a9e;
  }
`;

export const UsernameInputWrapper = styled.div`
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UsernameInput = styled.input`
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 25px;
  border: 1.5px solid ${(props) => (props.$dark ? "#555" : "#ccc")};
  background-color: ${(props) => (props.$dark ? "#222" : "#fff")};
  color: ${(props) => (props.$dark ? "#eee" : "#111")};
  outline: none;
  width: 280px;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:focus {
    border-color: ${(props) => (props.$dark ? "#40c4ff" : "#0078d4")};
  }
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  color: ${(props) => (props.$dark ? "#999" : "#666")};
  margin-bottom: 14px;
  font-size: 14px;
  transition: color 0.3s ease;

  span {
    animation: blink 1.5s infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.3s;
  }

  span:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes blink {
    0%, 20% { opacity: 0.2; }
    50% { opacity: 1; }
    100% { opacity: 0.2; }
  }
`;

export const MessageUsername = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
  font-size: 13px;
  color: ${(props) => (props.$dark ? "#90caf9" : "#0078d4")};
  user-select: none;
  transition: color 0.3s ease;
`;

