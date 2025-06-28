import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../page/LoginPage';
import ChatPage from '../page/ChatPage';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../context/AuthContext';
import { useChatAppState } from '../hooks/useChatAppState';

export default function AppRouter() {
  const { setUsername, setAvatar } = useChatAppState();
  const { isLoggedIn, isAuthChecked } = useAuth({ setUsername, setAvatar });

  if (!isAuthChecked) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/chat" replace /> : <LoginPage />}
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAuthChecked={isAuthChecked}>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/chat' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}
