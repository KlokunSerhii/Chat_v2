import {
  ModalOverlay,
  ModalContent,
  ModalImage,
} from "./ImageModal.styled.js";

function ImageModal({ isOpen, imageSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <ModalImage src={imageSrc} alt="Expanded" />
      </ModalContent>
    </ModalOverlay>
  );
}

export default ImageModal;
