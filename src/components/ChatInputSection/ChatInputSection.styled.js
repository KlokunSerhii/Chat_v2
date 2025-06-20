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
