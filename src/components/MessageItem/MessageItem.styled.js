import styled, { css } from 'styled-components';
import { getTheme } from '../../utils/theme';

export const Message = styled.div`
  margin-bottom: 12px;
  align-self: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn ? getTheme($dark).messageOwn : getTheme($dark).messageOther};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 5px 10px 5px 10px;
  box-shadow: 0 5px 9px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  max-width: 40%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
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
    max-width: 40%;
    font-size: 14px;
  }
`;

export const MessageText = styled.div`

  margin-top: 10px;
  white-space: pre-wrap;
`;

export const MessageTime = styled.div`
  font-size: 10px;
  text-align: right;
  color: ${({ $dark }) => ($dark ? '#aaa' : '#666')};
`;

export const MessageUsername = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;

  padding: 4px 8px;
  color: ${({ $dark }) => getTheme($dark).username};
  margin-bottom: 4px;
  border-bottom: 2px solid ${({ $dark }) => getTheme($dark).border};

  // img {
  //   border-radius: 50%;
  //   width: 30px;
  //   height: 30px;
  //   margin-right: 6px;
  //   margin-left: 6px;
  // }
`;

export const MessageImage = styled.img`
  max-width: 100%;
  max-height: 300px;
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

export const AvatarImageChat = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 6px;
  margin-left: 6px;
  object-fit: cover;
  object-position: center;
  border: 1px solid ${({ $dark }) => getTheme($dark).border};
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;
export const FileLabel = styled.div`
  font-size: 14px;
  margin-bottom: 1px;
  color: ${({ $dark }) => ($dark ? '#e0e0e0' : '#222')};
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn ? getTheme($dark).messageOwn : getTheme($dark).messageOther};
  padding: 6px 10px;
  border-radius: 10px;
  display: inline-block;
  max-width: 100%;
  width: 200px;
  word-break: break-word;
`;
export const FileLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px;
`;
export const FileLabelContainerPlayer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 6px 10px;
  box-shadow: 0 5px 9px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;
export const ReplyContainer = styled.div`
  border-left: 4px solid #e91e63;
  background-color: #fce4ec;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  font-size: 0.95em;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8bbd0;
    cursor: pointer;
  }
`;

export const ReplyUsername = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  color: #c2185b;
`;

export const ReplyText = styled.div`
  font-style: italic;
  color: #555;
  word-break: break-word;
`;
