// src/components/ModalsContainer/ModalsContainer.jsx

import React from 'react';
import OnlineUsersModal from './OnlineUsersModal/OnlineUsersModal';
import ImageModal from './ImageModal/ImageModal';

export default function ModalsContainer({
  isOnlineListOpen,
  setIsOnlineListOpen,
  onlineUsers,
  isDarkTheme,
  isImageModalOpen,
  modalImageSrc,
  closeImageModal,
  unreadPrivateMessages,
}) {
  return (
    <>
      {isOnlineListOpen && (
        <OnlineUsersModal
          onlineUsers={onlineUsers}
          setIsOnlineListOpen={setIsOnlineListOpen}
          isDarkTheme={isDarkTheme}
          unreadPrivateMessages={unreadPrivateMessages}
        />
      )}

      <ImageModal isOpen={isImageModalOpen} imageSrc={modalImageSrc} onClose={closeImageModal} />
    </>
  );
}
