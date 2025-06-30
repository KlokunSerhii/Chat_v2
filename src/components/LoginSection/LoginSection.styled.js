import styled from 'styled-components';
import { getTheme } from '../../utils/theme';

// Контейнер для вводу і аватара з елегантними тінями та плавними переходами
export const UsernameInputWrapper = styled.form`
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  margin: 25px auto;
  border-radius: 15px;
  background: ${({ $dark }) => getTheme($dark).background};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  transition: all 0.3s ease;

  background: transparent;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const UsernameInput = styled.input`
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
  color: ${({ $dark }) => getTheme($dark).text};
  font-size: 18px;
  margin-top: 20px;
  width: 100%;
  max-width: 360px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;

  &::placeholder {
    color: ${({ $dark }) => getTheme($dark).placeholder};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${({ $dark }) => getTheme($dark).highlight};
    box-shadow: 0 0 10px ${({ $dark }) => getTheme($dark).highlight};
    transition: box-shadow 0.3s ease;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 14px;
  }
`;

export const AvatarImage = styled.img`
  width: 90px;
  height: 90px;
  margin-top: 20px;
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
    width: 50px;
    height: 50px;
  }
`;
export const AvatarImageButton = styled.button`
  margin-top: 8px;
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

export const HidePasswordButton = styled.button`
  position: absolute;
  right: 20px;
  top: 63%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
