import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  /* Забезпечити правильну поведінку на iOS */
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
  touch-action: none;
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Уникнути зміщення через padding, borders, etc */
  box-sizing: border-box;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;
