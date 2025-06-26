import styled from "styled-components";
import { getTheme } from "../../utils/theme";

// Контейнер для всіх елементів завантаження
export const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 350px;
  margin: 0 auto;

  border-radius: 15px;
  background-color: ${({ $dark }) => getTheme($dark).background};

  transition: all 0.3s ease;
  background: transparent;

  @media (max-width: 480px) {
    padding: 15px;
    gap: 10px;
  }
`;

// Стилі для попереднього перегляду зображення
export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ $dark }) => getTheme($dark).border};
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    border-color: ${({ $dark }) => getTheme($dark).highlight};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

// Стилі для мітки файлу
export const FileInputLabel = styled.label`
  display: inline-block;
  margin-top: 8px;
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

// Прихований елемент input для завантаження файлів
export const HiddenFileInput = styled.input`
  display: none;
`;

// Кнопка для завантаження
export const UploadButton = styled.button`
  background-color: ${({ $dark }) => ($dark ? "#444" : "#28a745")};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#555" : "#218838")};
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 14px;
  }
`;
export const ClearButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: "#000";

  &:hover {
    color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  }
`;
