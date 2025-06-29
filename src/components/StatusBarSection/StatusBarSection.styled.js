import styled, { css } from 'styled-components';
import { getTheme } from '../../utils/theme';

export const GoBackButton = styled.button`
  align-items: center;
  padding: 6px 12px;
  font-weight: bold;

  color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    color: ${({ $dark }) => ($dark ? '#555' : '#007ab8')};
  }
`;
export const OnlineUsersButton = styled.button`
  align-items: center;
  padding: 6px 12px;
  font-weight: bold;

  color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    color: ${({ $dark }) => ($dark ? '#555' : '#007ab8')};
  }
`;
export const LogoutButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 6px 12px;
  font-weight: bold;
  color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    color: ${({ $dark }) => ($dark ? '#555' : '#007ab8')};
  }
`;
export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

export const ThemeToggle = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  background: ${({ $dark }) => ($dark ? '#444' : '#ddd')};
  border-radius: 20px;
  width: 40px;
  height: 20px;
  position: relative;
  transition: background 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $dark }) => ($dark ? '20px' : '2px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ $dark }) => ($dark ? '#fff' : '#333')};
    transition: left 0.3s;
  }
`;
export const StatusUser = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  font-size: 0.95rem;
`;
export const StatusUserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
`;
export const StatusUserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 4px solid ${({ $dark }) => getTheme($dark).border};
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${({ $dark }) => getTheme($dark).highlight};
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
