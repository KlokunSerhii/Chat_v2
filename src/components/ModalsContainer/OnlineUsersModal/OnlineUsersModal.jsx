import { AvatarImage } from '../../LoginSection/LoginSection.styled';
import { ModalOverlay, OnlineListModal, OnlineUser } from './OnlineUsersModal.styled';
import useMediaQuery from '../../../hooks/useMediaQuery';

export default function OnlineUsersModal({ onlineUsers, setIsOnlineListOpen, isDarkTheme }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  if (!isMobile) return null;
  return (
    <>
      <ModalOverlay onClick={() => setIsOnlineListOpen(false)} />
      <OnlineListModal $dark={isDarkTheme}>
        <h3>Користувачі онлайн</h3>
        {onlineUsers.map((user, index) => (
          <OnlineUser key={`${user.username}-${user.avatar}-${index}`} $dark={isDarkTheme}>
            <AvatarImage src={user.avatar} alt={user.username} />
            {user.username}
          </OnlineUser>
        ))}
      </OnlineListModal>
    </>
  );
}
