import styled from "styled-components";
import { motion } from "framer-motion";

// Базові кольори
const light = {
  background: "#ffffff",
  text: "#000000",
  messageOwn: "#dcf8c6",
  messageOther: "#ffffff",
  system: "#999",
};

const dark = {
  background: "#1e1e1e",
  text: "#ffffff",
  messageOwn: "#054640",
  messageOther: "#262d31",
  system: "#777",
};

export const ChatContainer = styled.div`
  background: ${({ $dark }) => ($dark ? dark.background : light.background)};
  color: ${({ $dark }) => ($dark ? dark.text : light.text)};
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
`;

export const StatusBar = styled.div`
  padding: 10px 16px;
  background: ${({ $dark }) => ($dark ? "#2a2f32" : "#f5f5f5")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const ThemeToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 46px;
    height: 24px;
    background-color: ${({ $dark }) => ($dark ? "#444" : "#ccc")};
    border-radius: 24px;
    transition: background-color 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    left: ${({ $dark }) => ($dark ? "22px" : "2px")};
    top: 2px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled.div`
  max-width: 80%;
  align-self: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ $isOwn, $dark }) =>
    $isOwn
      ? $dark
        ? dark.messageOwn
        : light.messageOwn
      : $dark
      ? dark.messageOther
      : light.messageOther};
  color: ${({ $dark }) => ($dark ? dark.text : light.text)};
  padding: 8px 12px;
  border-radius: 14px;
  border-bottom-right-radius: ${({ $isOwn }) => ($isOwn ? "0" : "14px")};
  border-bottom-left-radius: ${({ $isOwn }) => ($isOwn ? "14px" : "0")};
  word-break: break-word;
`;

export const MessageUsername = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 4px;
  gap: 6px;
`;

export const MessageText = styled.div`
  font-size: 1rem;
`;

export const MessageTime = styled.div`
  font-size: 0.7rem;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#888")};
  margin-top: 4px;
  text-align: right;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${({ $dark }) => ($dark ? "#2a2f32" : "#f0f0f0")};
  gap: 8px;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: ${({ $dark }) => ($dark ? "#3c3c3c" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  outline: none;
`;

export const ChatButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #0088cc;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const EmojiButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const AttachButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const UsernameInputWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const UsernameInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: ${({ $dark }) => ($dark ? "#2c2c2c" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
`;

export const TypingIndicator = styled.div`
  font-size: 0.85rem;
  color: ${({ $dark }) => ($dark ? "#aaa" : "#444")};
`;

export const ConnectionStatus = styled.div`
  font-size: 0.85rem;
  color: ${({ connected }) => (connected ? "green" : "red")};
`;

export const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
`;

export const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const OnlineListModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 360px;
  transform: translate(-50%, -50%);
  background: ${({ $dark }) => ($dark ? "#2a2a2a" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  border-radius: 16px;
  padding: 20px;
  z-index: 1001;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
`;

export const ModalOverlay = styled.div`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

export const AttachedImagePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;

  img {
    max-width: 40px;
    max-height: 40px;
    border-radius: 4px;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const MessageImage = styled.img`
  max-width: 100%;
  border-radius: 12px;
  margin-top: 8px;
`;

