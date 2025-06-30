import styled, { css } from 'styled-components';
import { getTheme } from '../../utils/theme';

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: ${({ $dark }) => getTheme($dark).background};
  ${({ $isLogin, $dark }) =>
    $isLogin &&
    `
    background-image: url("/img/background-image.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: ${getTheme($dark).backgroundBlendMode};
  `}

  color: ${({ $dark }) => getTheme($dark).text};
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ChatButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 6px 12px;
  font-weight: bold;
  background-color: ${({ $dark }) => ($dark ? '#444' : '#0088cc')};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? '#555' : '#007ab8')};
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  min-width: 0; /* <== Додай */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const TypingIndicator = styled.div`
  display: flex;
  font-style: italic;
  color: ${({ $dark }) => ($dark ? '#aaa' : '#555')};
  margin: 5px 10px;
`;

export const ConnectionStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $connected }) => ($connected ? '#4caf50' : '#f44336')};
`;
export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
  z-index: 1000;
  max-width: calc(100vw - 40px);
  overflow-x: hidden;
`;
export const Header = styled.span`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: ${({ $dark }) => getTheme($dark).text};
  margin-bottom: 12px;
`;

export const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;
export const FlexWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;
