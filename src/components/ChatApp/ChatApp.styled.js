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
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: ${({ $dark }) => ($dark ? "#ffd740" : "#555")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ $dark }) => ($dark ? "#fff176" : "#000")};
  }
`;

export const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px 20px;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#fff")};
  scrollbar-width: thin;
  scrollbar-color: ${({ $dark }) => ($dark ? "#555 #222" : "#ccc #f1f1f1")};

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
  max-width: 65%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.4;
  position: relative;
  word-wrap: break-word;
  background-color: ${({ $dark, $isOwn, $system }) => {
    if ($system) return $dark ? "#2f3136" : "#f0f0f0";
    return $isOwn ? ($dark ? "#054d40" : "#dcf8c6") : $dark ? "#262626" : "#fff";
  }};
  color: ${({ $dark, $isOwn, $system }) => {
    if ($system) return $dark ? "#999" : "#666";
    return $isOwn ? ($dark ? "#b9f6ca" : "#202020") : $dark ? "#ddd" : "#222";
  }};
  /* Вирівнюємо повідомлення по правому або лівому краю */
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  box-shadow: ${({ $isOwn, $dark }) =>
    $isOwn
      ? $dark
        ? "0 1px 3px rgba(5, 77, 64, 0.7)"
        : "0 1px 3px rgba(0, 92, 75, 0.5)"
      : "0 1px 1px rgba(0,0,0,0.1)"};
`;


export const MessageUsername = styled.div`
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 4px;
  color: ${({ $dark }) => ($dark ? "#8ab4f8" : "#0088cc")};
  user-select: none;
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
`;

export const MessageTime = styled.span`
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 10px;
  color: ${({ $dark }) => ($dark ? "rgba(255, 255, 255, 0.4)" : "#999")};
  user-select: none;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  background-color: ${({ $dark }) => ($dark ? "#1f1f1f" : "#f7f7f7")};
  border-top: 1px solid ${({ $dark }) => ($dark ? "#333" : "#ddd")};
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
    ${({ $dark }) => ($dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)")};

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
    background-color: ${({ disabled }) => (disabled ? "#9e9e9e" : "#006699")};
  }
`;

export const UsernameInputWrapper = styled.div`
  display: flex;
  padding: 40px 20px;
  justify-content: center;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#f0f0f0")};
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
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  font-size: 14px;
  margin: 0 0 10px 8px;
  color: ${({ $dark }) => ($dark ? "#bbb" : "#555")};
`;
