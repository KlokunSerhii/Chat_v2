import { Link, useParams } from 'react-router-dom';

import { SidebarWrapper, SidebarUser, SidebarUserAvatar } from './SidebarUsers.styled';
import { ConnectionStatus } from '../ChatApp/ChatApp.styled';
import { useAuth } from '../../context/AuthContext';

export default function SidebarUsers({ onlineUsers, isDarkTheme, isConnected }) {
  const { username: currentUsername } = useAuth();
  const { userId: activeChatUserId } = useParams();

  return (
    <SidebarWrapper $dark={isDarkTheme}>
      {onlineUsers
        .filter(user => user.username !== currentUsername)
        .map(user => (
          <Link key={`${user.id}`} to={`/chat/${user.id}`}>
            <SidebarUser $dark={isDarkTheme} $active={user.id === activeChatUserId}>
              <SidebarUserAvatar src={user.avatar} alt={user.username} />
              {user.username}
              <ConnectionStatus $connected={isConnected} />
            </SidebarUser>
          </Link>
        ))}
    </SidebarWrapper>
  );
}
