import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ $dark }) => ($dark ? "#ffffffaa" : "#333")};
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${({ delay }) => delay};
`;