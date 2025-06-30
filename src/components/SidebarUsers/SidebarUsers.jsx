import { Link, useParams } from 'react-router-dom';

import {
  SidebarWrapper,
  SidebarUser,
  SidebarUserAvatar,
  MsgUnreadCount,
} from './SidebarUsers.styled';
import { ConnectionStatus } from '../ChatApp/ChatApp.styled';
import { useAuth } from '../../context/AuthContext';

export default function SidebarUsers({
  onlineUsers,
  isDarkTheme,
  isConnected,
  unreadPrivateMessages = {},
}) {
  const { username: currentUsername } = useAuth();
  const { userId: activeChatUserId } = useParams();

  return (
    <SidebarWrapper $dark={isDarkTheme}>
      {onlineUsers
        .filter(user => user.username !== currentUsername)
        .map(user => {
          const unreadCount = unreadPrivateMessages[user.id] || 0;
          return (
            <Link key={`${user.id}`} to={`/chat/${user.id}`}>
              <SidebarUser $dark={isDarkTheme} $active={user.id === activeChatUserId}>
                <SidebarUserAvatar src={user.avatar} alt={user.username} />
                {user.username}
                {unreadCount > 0 && <MsgUnreadCount>{unreadCount}</MsgUnreadCount>}
                <ConnectionStatus $connected={isConnected} />
              </SidebarUser>
            </Link>
          );
        })}
    </SidebarWrapper>
  );
}
