import { Link } from 'react-router-dom';

import { SidebarWrapper, SidebarUser, SidebarUserAvatar } from './SidebarUsers.styled';
import { ConnectionStatus } from '../ChatApp/ChatApp.styled';
import { useAuth } from '../../context/AuthContext'; // або шлях до твого контексту

export default function SidebarUsers({ onlineUsers, isDarkTheme, isConnected }) {
  const { username: currentUsername } = useAuth();

  return (
    <SidebarWrapper $dark={isDarkTheme}>
      {onlineUsers
        .filter(user => user.username !== currentUsername)
        .map((user, index) => (
          <Link key={`${user.username}-${index}`} to={`/chat/${user.id}`}>
            <SidebarUser $dark={isDarkTheme}>
              <SidebarUserAvatar src={user.avatar} alt={user.username} />
              {user.username}
              <ConnectionStatus $connected={isConnected} />
            </SidebarUser>
          </Link>
        ))}
    </SidebarWrapper>
  );
}
