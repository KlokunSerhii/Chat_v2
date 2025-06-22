import styled from "styled-components";
import { getTheme } from "../../utils/theme";

export const UploaderContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ $dark }) => getTheme($dark).border};
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 14px;
  background-color: ${({ $dark }) => getTheme($dark).username};
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#666" : "#005fd1")};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  background-color: ${({ $dark }) => ($dark ? "#555" : "#28a745")};
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#777" : "#218838")};
  }
`;
