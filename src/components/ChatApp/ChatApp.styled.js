import styled, { css } from "styled-components";

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  input: "#f5f5f5",
  border: "#ccc",
  messageOwn: "#dcf8c6",
  messageOther: "#ffffff",
  username: "#0088cc",
};

const darkTheme = {
  background: "#1e1e1e",
  text: "#e0e0e0",
  input: "#2a2a2a",
  border: "#444",
  messageOwn: "#056162",
  messageOther: "#262d31",
  username: "#34b7f1",
};

const getTheme = ($dark) => ($dark ? darkTheme : lightTheme);

// -------- Контейнер --------
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ $dark }) => getTheme($dark).background};
  color: ${({ $dark }) => getTheme($dark).text};
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// -------- Верхня панель --------
export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

// -------- Перемикач теми --------
export const ThemeToggle = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  background: ${({ $dark }) => ($dark ? "#444" : "#ddd")};
  border-radius: 20px;
  width: 40px;
  height: 20px;
  position: relative;
  transition: background 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $dark }) => ($dark ? "20px" : "2px")};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ $dark }) => ($dark ? "#fff" : "#333")};
    transition: left 0.3s;
  }
`;

// -------- Інпут --------
export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

export const ChatInput = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: none;
  padding: 10px;
  border-radius: 12px;
  font-size: 14px;
  background-color: ${({ $dark }) => ($dark ? "#333" : "#fff")};
  color: ${({ $dark }) => getTheme($dark).text};
  outline: none;
`;

// -------- Кнопки --------
export const ChatButton = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  font-weight: bold;
  background-color: ${({ $dark }) => ($dark ? "#444" : "#0088cc")};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#555" : "#007ab8")};
  }
`;

// -------- Повідомлення --------
export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  margin-bottom: 12px;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn ? getTheme($dark).messageOwn : getTheme($dark).messageOther};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  position: relative;

  ${({ $isOwn }) =>
    $isOwn &&
    css`
      border-top-right-radius: 0;
    `}

  ${({ $isOwn }) =>
    !$isOwn &&
    css`
      border-top-left-radius: 0;
    `}

  @media (max-width: 480px) {
    max-width: 90%;
    font-size: 14px;
  }
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
`;

export const MessageTime = styled.div`
  font-size: 10px;
  text-align: right;
  margin-top: 4px;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#666")};
`;

export const MessageUsername = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${({ $dark }) => getTheme($dark).username};
  margin-bottom: 4px;

  img {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#555")};
  margin: 5px 10px;
`;

// -------- Emoji / attach --------
export const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin: 0 5px;
  cursor: pointer;
`;

export const AttachButton = styled(EmojiButton)``;

export const AttachedImagePreview = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
`;

// -------- Модальне вікно --------
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

export const OnlineListModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  max-width: 90vw;
  background-color: ${({ $dark }) => getTheme($dark).background};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 20px;
  border-radius: 0 12px 12px 0;
  z-index: 1000;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.25);
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 260px;
  }

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 0;
  }
`;


export const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const UsernameInputWrapper = styled.div`
  padding: 32px;
  text-align: center;
`;

export const UsernameInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
  color: ${({ $dark }) => getTheme($dark).text};
  font-size: 16px;
  margin-top: 12px;
  width: 80%;
`;

export const ConnectionStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $connected }) => ($connected ? "#4caf50" : "#f44336")};
  margin-right: 10px;
`;

// -------- Картинка в повідомленні --------
export const MessageImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 480px) {
    max-height: 200px;
  }
`;
