import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { SERVER_URL } from '../utils/url';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const usernameInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthChecked(true);
      return;
    }

    fetch(`${SERVER_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data?.user?.username) {
          setUsername(data.user.username);
          setAvatar(data.user.avatar);
          setIsLoggedIn(true);
        } else {
          handleLogout();
        }
      })
      .catch(() => handleLogout())
      .finally(() => setIsAuthChecked(true));
  }, []);

  const handleLogin = async (e, avatarOverride) => {
    e.preventDefault();
    const trimmedUsername = tempUsername.trim();
    const password = tempPassword.trim();

    if (!trimmedUsername || !password) {
      return toast.error("Введіть ім'я та пароль", { duration: 3000, position: 'top-center' });
    }

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password, avatar: avatarOverride }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || 'Помилка авторизації');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('avatar', data.user.avatar);

      setUsername(data.user.username);
      setAvatar(data.user.avatar);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Помилка входу', { duration: 3000, position: 'top-center' });
    }
  };

  const handleRegister = async (e, avatarOverride) => {
    e.preventDefault();
    const trimmedUsername = tempUsername.trim();
    const password = tempPassword.trim();

    if (!trimmedUsername || !password) {
      return toast.error("Введіть ім'я та пароль", { duration: 3000, position: 'top-center' });
    }

    if (!avatarOverride || avatarOverride.trim() === '') {
      return toast.error('Оберіть аватарку', { duration: 3000, position: 'top-center' });
    }

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password, avatar: avatarOverride }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || 'Помилка реєстрації');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('avatar', data.user.avatar);

      setUsername(data.user.username);
      setAvatar(data.user.avatar);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Register error:', err);
      toast.error('Помилка реєстрації', { duration: 3000, position: 'top-center' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    setUsername('');
    setAvatar('');
    setTempUsername('');
    setTempPassword('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthChecked,
        username,
        avatar,
        tempUsername,
        setTempUsername,
        tempPassword,
        setTempPassword,
        usernameInputRef,
        handleLogin,
        handleRegister,
        handleLogout,
        setUsername,
        setAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
