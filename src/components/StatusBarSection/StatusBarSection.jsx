import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

import useMediaQuery from '../../hooks/useMediaQuery.js';
import { useAuth } from '../../context/AuthContext';

import {
  GoBackButton,
  OnlineUsersButton,
  ThemeToggle,
  LogoutButton,
  StatusBar,
  StatusUser,
  StatusUserAvatar,
  StatusUserContainer,
} from './StatusBarSection.styled.js';
import { ConnectionStatus } from '../ChatApp/ChatApp.styled';

export default function StatusBarSection({
  isDarkTheme,
  isLoggedIn,
  isConnected,
  onToggleTheme,
  onLogout,
  onOpenOnlineUsers,
}) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const navigate = useNavigate();
  const { username, avatar } = useAuth();

  return (
    <StatusBar $dark={isDarkTheme}>
      {isLoggedIn ? (
        <>
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <OnlineUsersButton onClick={onOpenOnlineUsers} $dark={isDarkTheme}>
                <FaBars />
              </OnlineUsersButton>
            </div>
          )}
      <Link to="/chat">
          <GoBackButton $dark={isDarkTheme}>
                <FaArrowLeft />
          </GoBackButton>
      </Link>
          <ThemeToggle $dark={isDarkTheme} onClick={onToggleTheme} title="Toggle theme">
            {isDarkTheme ? ' ' : ' '}
          </ThemeToggle>
          <StatusUserContainer>
            <StatusUser $dark={isDarkTheme}>
              <StatusUserAvatar src={avatar} alt={username} />
              {username}
              <ConnectionStatus $connected={isConnected} />
            </StatusUser>
            <LogoutButton onClick={onLogout} $dark={isDarkTheme}>
              Вийти
            </LogoutButton>
          </StatusUserContainer>
        </>
      ) : (
        <ThemeToggle $dark={isDarkTheme} onClick={onToggleTheme} title="Toggle theme">
          {isDarkTheme ? ' ' : ' '}
        </ThemeToggle>
      )}
    </StatusBar>
  );
}
