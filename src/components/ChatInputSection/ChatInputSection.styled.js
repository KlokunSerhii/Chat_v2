import styled from "styled-components";
import { getTheme } from "../../utils/theme";

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

export const ChatInput = styled.textarea`
    text-align: left;
    padding: 10px 12px;
    font-size: 10px;
    line-height: 1.4;
    resize: none;
    overflow: hidden;
    height: auto;
    box-sizing: border-box;
    flex-grow: 1
    border: none;
    border-radius: 12px;
    background-color: ${({ $dark }) => ($dark ? "#333" : "#fff")};
    color: ${({ $dark }) => getTheme($dark).text};
    outline: none;
`;

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
export const AttachedVideoPreview = styled.video`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
`;
export const AttachedAudioPreview = styled.audio`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
`;
export const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${({ $dark }) => getTheme($dark).border};
  border-top: 3px solid ${({ $dark }) => getTheme($dark).text};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
