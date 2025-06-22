import styled, { css } from "styled-components";
import { getTheme } from "../../utils/theme";

export const Message = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn
      ? getTheme($dark).messageOwn
      : getTheme($dark).messageOther};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 8px;
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
  font-size: 8px;
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
export const StyledMarkdown = styled.div`
  margin-block-start: 0;
`;
