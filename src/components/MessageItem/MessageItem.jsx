import { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer.jsx';
import MessageContextMenu from '../MessageContextMenu.jsx';

import CustomAudioPlayer from '../CustomAudioPlayer/CustomAudioPlayer.jsx';
import 'react-h5-audio-player/lib/styles.css';
import {
  Message,
  MessageUsername,
  MessageText,
  MessageImage,
  MessageTime,
  AvatarImageChat,
  FileLabel,
  FileLabelContainer,
  FileLabelContainerPlayer,
  ReplyContainer,
  ReplyUsername,
  ReplyText,
} from './MessageItem.styled';
import EmojiReactions from '../EmojiReactions/EmojiReactions.jsx';
import { FaRegSmile } from 'react-icons/fa';
import { ReactionButton, Modal, EmojiOption } from '../EmojiReactions/EmojiReactions.styled.js';
import { formatTime } from '../../utils/utils';
import { emojiOptions } from '../../utils/emojiOptions.js';
import { SERVER_URL } from '../../utils/url.js';

export default function MessageItem({
  msg,
  isOwn,
  isDarkTheme,
  onImageClick,
  username,
  onToggleReaction,
  onReplyMessage,
  scrollToRef,
  onScrollToMessage,
  setMessages,
}) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchTimeout = useRef(null);
  const messageRef = useRef(null);

  // Відповідь для кліку: відображаємо повідомлення, на яке відповідають
  const fullReply = msg.replyTo && (msg.replyTo.id || msg.replyTo._id) ? msg.replyTo : null;

  const handleDeleteMessage = async id => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVER_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      setMessages(prev => {
  const updated = {};

  for (const chatId in prev) {
    updated[chatId] = prev[chatId].filter(
      m => m.id !== id && m.localId !== id
    );
  }

  return updated;
});
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Не вдалося видалити повідомлення');
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = e => {
    e.preventDefault();
    if (messageRef.current && messageRef.current.contains(e.target)) {
      const rect = messageRef.current.getBoundingClientRect();

      const menuWidth = 140;
      const menuHeight = 120;

      let x = isOwn ? rect.left : rect.right - menuWidth;
      let y = rect.bottom;

      const maxX = window.innerWidth - menuWidth;
      const maxY = window.innerHeight - menuHeight;

      if (x < 0) x = 0;
      if (x > maxX) x = maxX;
      if (y > maxY) y = maxY;

      setMenuPosition({ x, y });
      setShowContextMenu(true);
    } else {
      setShowContextMenu(false);
    }
  };

  const handleTouchStart = e => {
    touchTimeout.current = setTimeout(() => {
      if (messageRef.current) {
        const rect = messageRef.current.getBoundingClientRect();

        const menuWidth = 140;
        const menuHeight = 120;

        let x = isOwn ? rect.left : rect.right - menuWidth;
        let y = rect.bottom;

        const maxX = window.innerWidth - menuWidth;
        const maxY = window.innerHeight - menuHeight;

        if (x < 0) x = 0;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;

        setMenuPosition({ x, y });
        setShowContextMenu(true);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimeout.current);
  };

  const handleCopy = () => {
    if (msg.text) navigator.clipboard.writeText(msg.text);
  };

  const handleReply = () => {
    if (onReplyMessage) {
      onReplyMessage({
        id: msg.id,
        username: msg.username,
        text: msg.text,
      });
    }
  };

  function extractFilename(url) {
    try {
      const lastPart = url.split('/').pop();
      const [nameWithoutExt] = lastPart.split('.');
      const parts = nameWithoutExt.split('-');
      if (parts.length > 1) {
        parts.pop();
        return parts.join('-');
      }
      return nameWithoutExt;
    } catch {
      return 'audio file';
    }
  }

  const handleEmojiClick = emoji => {
    if (msg.id) {
      onToggleReaction({ messageId: msg.id, emoji });
    }
    setIsModalOpen(false);
  };

  const safeImageSrc = msg.image && !msg.image.startsWith('blob:') ? msg.image : null;
const safeVideoSrc = msg.video && !msg.video.startsWith('blob:') ? msg.video : null;
const safeAudioSrc = msg.audio && !msg.audio.startsWith('blob:') ? msg.audio : null;

  return (
    <div
      ref={scrollToRef}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
      }}
    >
      <Message
        ref={messageRef}
        $isOwn={isOwn}
        $dark={isDarkTheme}
        $system={msg.sender === 'system'}
      >
        {isOwn ? (
          <MessageUsername
            $dark={isDarkTheme}
            $isOwn={isOwn}
            style={{ justifyContent: 'flex-end' }}
          >
            {msg.username}
            <AvatarImageChat src={msg.avatar} alt={msg.username} />
          </MessageUsername>
        ) : (
          <MessageUsername $dark={isDarkTheme} $isOwn={isOwn}>
            <AvatarImageChat src={msg.avatar} alt={msg.username} />
            {msg.username}
          </MessageUsername>
        )}

        <MessageText $isOwn={isOwn}>
          {fullReply ? (
            <ReplyContainer
              onClick={() => {
                if (fullReply.id || fullReply._id) {
                  const id = fullReply.id || fullReply._id;
                  onScrollToMessage(id);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <ReplyUsername>{fullReply.username || 'Користувач'}:</ReplyUsername>
              <ReplyText>
                {fullReply.text?.length > 100
                  ? fullReply.text.slice(0, 100) + '...'
                  : fullReply.text || 'Відповідь'}
              </ReplyText>
            </ReplyContainer>
          ) : null}

          {msg.text?.trim() && <MarkdownRenderer content={msg.text} />}
          {msg.linkPreview && (
            <a
              href={msg.linkPreview.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {msg.linkPreview.image ? (
                <img
                  src={msg.linkPreview.image}
                  alt="preview"
                  style={{
                    width: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginTop: '8px',
                  }}
                />
              ) : (
                <div style={{ padding: 8, fontSize: 12, color: '#999' }}>Зображення недоступне</div>
              )}
            </a>
          )}
          {safeImageSrc && typeof safeImageSrc === 'string' && safeImageSrc.length > 0 &&  (
            <FileLabelContainer>
              <MessageImage
                src={safeImageSrc}
                alt="attached"
                onClick={() => onImageClick(msg.image)}
                style={{ cursor: 'pointer' }}
              />
            </FileLabelContainer>
          )}

          {safeVideoSrc && typeof safeVideoSrc === 'string' && safeVideoSrc.length > 0 &&  (
            <FileLabelContainer>
              <video
                controls
                style={{
                  maxWidth: '300px',
                  borderRadius: '12px',
                }}
              >
                <source src={safeVideoSrc} type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </FileLabelContainer>
          )}

          {safeAudioSrc && typeof safeAudioSrc === 'string' && safeAudioSrc.length > 0 &&  (
            <FileLabelContainerPlayer>
              <FileLabel $dark={isDarkTheme} $isOwn={isOwn}>
                {extractFilename(safeAudioSrc)}
              </FileLabel>
              <CustomAudioPlayer src={safeAudioSrc} isOwn={isOwn} isDarkTheme={isDarkTheme} />
            </FileLabelContainerPlayer>
          )}
        </MessageText>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
          }}
        >
          <EmojiReactions
            msg={msg}
            username={username}
            isOwn={isOwn}
            onToggleReaction={onToggleReaction}
          />

          <MessageTime $dark={isDarkTheme} $isOwn={isOwn} $delivered>
            {formatTime(msg.timestamp)}
          </MessageTime>
        </div>
      </Message>
      <div style={{ paddingTop: '6px' }}>
        <ReactionButton onClick={() => setIsModalOpen(!isModalOpen)}>
          <FaRegSmile size={18} />
        </ReactionButton>
        {isModalOpen && (
          <Modal style={{ top: '30px', [isOwn ? 'right' : 'left']: 0 }}>
            {emojiOptions.map(emoji => (
              <EmojiOption key={emoji} onClick={() => handleEmojiClick(emoji)}>
                {emoji}
              </EmojiOption>
            ))}
          </Modal>
        )}
      </div>
      {showContextMenu && (
        <MessageContextMenu
          position={menuPosition}
          onClose={() => setShowContextMenu(false)}
          onReply={handleReply}
          onCopy={handleCopy}
          onDelete={isOwn ? () => handleDeleteMessage(msg.id) : undefined}
        />
      )}
    </div>
  );
}
