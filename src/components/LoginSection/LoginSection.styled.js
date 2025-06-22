import styled from "styled-components";
import { getTheme } from "../../utils/theme";

export const UsernameInputWrapper = styled.div`
  padding: 32px;
  text-align: center;
`;

export const UsernameInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
  color: ${({ $dark }) => getTheme($dark).text};
  font-size: 16px;
  margin-top: 12px;
  width: 80%;
`;
export const AvatarImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
