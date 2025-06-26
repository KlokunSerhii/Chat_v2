import styled from "styled-components";
import { getTheme } from "../../utils/theme";

// Контейнер для всіх елементів завантаження
export const UploaderContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  // width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ $dark }) => getTheme($dark).background};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: ${({ $dark }) =>
    $dark
      ? "linear-gradient(135deg, #333, #1e1e1e)"
      : "linear-gradient(135deg, #f7f7f7, #dcdcdc)"};
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

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
  padding: 12px 20px;
  background-color: ${({ $dark }) =>
    getTheme($dark).buttonBackground};
  color: #444;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#777" : "#0069d9")};
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 14px;
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
  margin-top: 8px;
  background: ${({ $dark }) => ($dark ? "#444" : "#eee")};
  border: 1px solid #ccc;
  padding: 6px 12px;
  cursor: pointer;
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  border-radius: 6px;

  &:hover {
    background: ${({ $dark }) => ($dark ? "#666" : "#ddd")};
  }
`;
