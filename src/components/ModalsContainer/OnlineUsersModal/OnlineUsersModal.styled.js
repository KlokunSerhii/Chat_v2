import styled from 'styled-components';
import { getTheme } from '../../../utils/theme';

export const OnlineListModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  max-width: 90vw;
  background-color: ${({ $dark }) => getTheme($dark).background};
  color: ${({ $dark }) => getTheme($dark).text};
  padding: 20px;
  border-radius: 0 12px 12px 0;
  z-index: 1000;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.25);
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 260px;
  }

  @media (max-width: 480px) {
    width: 70%;
    border-radius: 0;
  }
`;

export const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  gap: 8px;
  font-size: 0.95rem;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;
