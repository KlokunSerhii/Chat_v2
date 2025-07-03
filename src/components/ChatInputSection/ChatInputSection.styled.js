import styled from 'styled-components';
import { getTheme } from '../../utils/theme';

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-top: 1px solid ${({ $dark }) => getTheme($dark).border};
  background-color: ${({ $dark }) => getTheme($dark).input};
`;

export const ChatInput = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: none;
  padding-top: 14px;
  padding-left: 18px;
  border-radius: 12px;
  font-size: 14px;
  background-color: ${({ $dark }) => ($dark ? '#333' : '#fff')};
  color: ${({ $dark }) => getTheme($dark).text};
  outline: none;
`;

export const EmojiButton = styled.button`
  background: none;
  border: none;
  margin: 0 5px;
  padding: 8px;
  cursor: pointer;
`;

export const AttachButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-right: 5px;
`;

export const AttachedImagePreview = styled.img`
  max-width: 100%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
`;
export const AttachedVideoPreview = styled.video`
  max-width: 100%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
`;
export const AttachedAudioPreview = styled.audio`
  max-width: 100%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
`;
export const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${({ $dark }) => getTheme($dark).border};
  border-top: 3px solid ${({ $dark }) => getTheme($dark).text};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
`;

export const ModalContent = styled.div`
  background: ${({ $dark }) => ($dark ? '#222' : '#fff')};
  color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
  padding: 20px;
  border-radius: 12px;
  min-width: 260px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease;
`;

export const ModalButton = styled.button`
  background: ${({ danger }) => (danger ? '#e74c3c' : '#3498db')};
  color: #fff;
  border: none;
  padding: 10px 16px;
  margin: 8px 0;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: ${({ danger }) => (danger ? '#c0392b' : '#2980b9')};
  }
`;

// optional animations
const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }
`;

const slideUp = `
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0 }
    to { transform: translateY(0); opacity: 1 }
  }
`;

export const GlobalModalAnimations = styled.div`
  ${fadeIn}
  ${slideUp}
`;
