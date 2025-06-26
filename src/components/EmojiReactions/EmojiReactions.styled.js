import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const ReactionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  padding: 2px;
  &:hover {
    color: #ffa726;
  }
`;

export const Modal = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  gap: 6px;
  z-index: 999;
`;

export const EmojiOption = styled.span`
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  &:hover {
    transform: scale(1.2);
  }
`;

export const EmojiList = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

export const EmojiDisplay = styled.span.attrs((props) => ({
  // Не передавати "reacted" в DOM
  reacted: undefined,
}))`
  padding: 4px 8px;
  border-radius: 16px;
  margin: 0 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ reacted }) => (reacted ? "#e0f7fa" : "#f0f0f0")};
  color: #000;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ddd;
  }
`;
