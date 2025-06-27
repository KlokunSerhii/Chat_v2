// src/hooks/useImageModal.js

import { useCallback } from 'react';

export function useImageModal(setIsImageModalOpen, setModalImageSrc) {
  const openImageModal = useCallback((src) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  }, [setModalImageSrc, setIsImageModalOpen]);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
    setModalImageSrc(null);
  }, [setIsImageModalOpen, setModalImageSrc]);

  return { openImageModal, closeImageModal };
}
