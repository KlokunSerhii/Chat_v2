import styled from "styled-components";
import { getTheme } from "../../utils/theme";

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn
      ? getTheme($dark).messageOwn
      : getTheme($dark).messageOther};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 8px 12px;
  border-radius: 12px;

  max-width: 300px;
`;

export const PlayButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background-color: #ccc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background-color: ${({ $dark }) => ($dark ? "#90caf9" : "#1976d2")};
  transition: width 0.2s ease;
`;

export const TimeText = styled.span`
  font-size: 12px;
  white-space: nowrap;
`;
