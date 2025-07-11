import { Link, useParams } from 'react-router-dom';

import { SidebarUserAvatar } from '../../SidebarUsers/SidebarUsers.styled';
import { ModalOverlay, OnlineListModal, OnlineUser } from './OnlineUsersModal.styled';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useAuth } from '../../../context/AuthContext';
import { MsgUnreadCount } from '../../SidebarUsers/SidebarUsers.styled';
import { ConnectionStatus } from '../../ChatApp/ChatApp.styled';


export default function OnlineUsersModal({
  onlineUsers,
  allUsers,
  setIsOnlineListOpen,
  isDarkTheme,
  unreadPrivateMessages = {},
}) {
  const { username: currentUsername } = useAuth();
  const { userId: activeChatUserId } = useParams();

  const isMobile = useMediaQuery('(max-width: 767px)');
  if (!isMobile) return null;
  return (
    <>
      <ModalOverlay onClick={() => setIsOnlineListOpen(false)} />
      <OnlineListModal $dark={isDarkTheme}>
        <h3>Онлайн</h3>
        {allUsers
          .filter(user => user.username !== currentUsername)
          .map(user => {
            const unreadCount = unreadPrivateMessages[user.id] || 0;
            const isOnline = onlineUsers.some(online => online.id === user.id);
console.log(isOnline)
            return (
              <Link
                key={`${user.id}`}
                to={`/chat/${user.id}`}
                onClick={() => setIsOnlineListOpen(false)}
              >
                <OnlineUser $dark={isDarkTheme} $active={user.id === activeChatUserId}>
                  <SidebarUserAvatar src={user.avatar} alt={user.username} />
                  {user.username}
                  {unreadCount > 0 && <MsgUnreadCount>{unreadCount}</MsgUnreadCount>}
                  <ConnectionStatus $connected={isOnline} />
                  
                </OnlineUser>
              </Link>
            );
          })}
      </OnlineListModal>
    </>
  );
}
