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
}) {
  return (
    <>
      {isOnlineListOpen && (
        <OnlineUsersModal
          onlineUsers={onlineUsers}
          setIsOnlineListOpen={setIsOnlineListOpen}
          isDarkTheme={isDarkTheme}
        />
      )}

      <ImageModal
        isOpen={isImageModalOpen}
        imageSrc={modalImageSrc}
        onClose={closeImageModal}
      />
    </>
  );
}
