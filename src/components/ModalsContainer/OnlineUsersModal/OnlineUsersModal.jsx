import { Link } from 'react-router-dom';

import { SidebarUserAvatar } from '../../SidebarUsers/SidebarUsers.styled';
import { ModalOverlay, OnlineListModal, OnlineUser } from './OnlineUsersModal.styled';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useAuth } from '../../../context/AuthContext';

export default function OnlineUsersModal({ onlineUsers, setIsOnlineListOpen, isDarkTheme }) {
  const { username: currentUsername } = useAuth();
  const isMobile = useMediaQuery('(max-width: 767px)');
  if (!isMobile) return null;
  return (
    <>
      <ModalOverlay onClick={() => setIsOnlineListOpen(false)} />
      <OnlineListModal $dark={isDarkTheme}>
        <h3>Користувачі онлайн</h3>
        {onlineUsers
          .filter(user => user.username !== currentUsername)
          .map((user, index) => (
            <Link key={`${user.username}-${index}`} to={`/chat/${user.id}`}>
              <OnlineUser key={`${user.username}-${user.avatar}-${index}`} $dark={isDarkTheme}>
                <SidebarUserAvatar src={user.avatar} alt={user.username} />
                {user.username}
              </OnlineUser>
            </Link>
          ))}
      </OnlineListModal>
    </>
  );
}
