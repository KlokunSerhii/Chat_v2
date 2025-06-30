import styled from 'styled-components';
import { getTheme } from '../../utils/theme';

export const SidebarWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 16px 0;
    background-color: ${({ $dark }) => ($dark ? '#222' : '#f3f3f3')};
    color: ${({ $dark }) => ($dark ? '#fff' : '#000')};
    border-right: 1px solid ${({ $dark }) => ($dark ? '#333' : '#ccc')};
  }
`;

export const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ $active, $dark }) =>
    $active ? ($dark ? '#444' : '#d0ebff') : 'transparent'};
  border-bottom: 1px solid #ccc;
  padding: 8px;
  gap: 8px;
  font-size: 0.95rem;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? '#555' : '#f0f0f0')};
  }
`;

export const SidebarUserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 4px solid ${({ $dark }) => getTheme($dark).border};
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${({ $dark }) => getTheme($dark).highlight};
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;
export const MsgUnreadCount = styled.div`
  background: #ff0000;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-left: 8px;
  fontsize: 12px;
`;
