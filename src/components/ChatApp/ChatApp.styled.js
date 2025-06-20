import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ $dark }) => ($dark ? "#121212" : "#f5f5f5")};
  color: ${({ $dark }) => ($dark ? "#e0e0e0" : "#121212")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const StatusBar = styled.div`
  padding: 10px 20px;
  background-color: ${({ $dark, $connected }) =>
    $dark ? ($connected ? "#2c7a7b" : "#6c757d") : $connected ? "#38b2ac" : "#adb5bd"};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: ${({ $dark }) => ($dark ? "#f6e05e" : "#4a5568")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ $dark }) => ($dark ? "#ecc94b" : "#2d3748")};
  }
`;

export const UsernameInputWrapper = styled.div`
  margin: auto;
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

export const UsernameInput = styled.input`
  width: calc(100% - 100px);
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  margin-right: 10px;

  &:focus {
    border-color: #38b2ac;
    outline: none;
  }
`;

export const ChatButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #38b2ac;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${({ $dark }) => ($dark ? "#1a202c" : "#fff")};
`;

export const Message = styled.div`
  margin-bottom: 15px;
  max-width: 80%;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $dark, $isOwn, $system }) => {
    if ($system) return $dark ? "#4a5568" : "#e2e8f0";
    return $isOwn ? ($dark ? "#2c7a7b" : "#bee3f8") : $dark ? "#2d3748" : "#edf2f7";
  }};
  color: ${({ $dark, $system }) => ($system ? ($dark ? "#e2e8f0" : "#4a5568") : "inherit")};
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: ${({ $isOwn }) => ($isOwn ? "2px 2px 5px rgba(0,0,0,0.2)" : "none")};
`;

export const MessageUsername = styled.div`
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: ${({ $dark }) => ($dark ? "#63b3ed" : "#2b6cb0")};
`;

export const MessageText = styled.div`
  font-size: 1rem;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const MessageTime = styled.span`
  font-size: 0.7rem;
  color: ${({ $dark, $isOwn }) =>
    $isOwn ? ($dark ? "#90cdf4" : "#3182ce") : $dark ? "#a0aec0" : "#718096"};
  float: right;
  margin-top: 5px;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: ${({ $dark }) => ($dark ? "#2d3748" : "#e2e8f0")};
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  margin-right: 10px;
  background-color: ${({ $dark }) => ($dark ? "#4a5568" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#e2e8f0" : "#121212")};

  &:focus {
    border-color: #38b2ac;
    outline: none;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  margin-bottom: 10px;
  color: ${({ $dark }) => ($dark ? "#a0aec0" : "#718096")};
`;
