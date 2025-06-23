import styled, { css } from "styled-components";
import { getTheme } from "../../utils/theme";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ $dark }) => getTheme($dark).background};
  color: ${({ $dark }) => getTheme($dark).text};
  font-family: "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-bottom: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

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
    content: "";
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

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const TypingIndicator = styled.div`
  font-style: italic;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#555")};
  margin: 5px 10px;
`;

export const ConnectionStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $connected }) =>
    $connected ? "#4caf50" : "#f44336"};
  margin-right: 10px;
`;
export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
  z-index: 1000;
`;
export const Header = styled.span`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: ${({ $dark }) => getTheme($dark).text};
  margin-bottom: 12px;
`;
