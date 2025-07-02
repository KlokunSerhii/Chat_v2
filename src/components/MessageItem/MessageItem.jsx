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

export default function MessageItem({
  msg,
  isOwn,
  isDarkTheme,
  onImageClick,
  username,
  onToggleReaction,
  onDeleteMessage,
  onReplyMessage,
}) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = e => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleTouchStart = e => {
    touchTimeout.current = setTimeout(() => {
      const touch = e.touches[0];
      setMenuPosition({ x: touch.clientX, y: touch.clientY });
      setShowContextMenu(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimeout.current);
  };

  const handleCopy = () => {
    if (msg.text) navigator.clipboard.writeText(msg.text);
  };

  const handleDelete = () => {
    if (msg.id && onDeleteMessage) {
      onDeleteMessage(msg.id);
    }
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

  return (
    <div
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
      <Message $isOwn={isOwn} $dark={isDarkTheme} $system={msg.sender === 'system'}>
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
          {msg.replyTo ? (
            <ReplyContainer>
              <ReplyUsername>{msg.replyTo.username || 'Користувач'}:</ReplyUsername>
              <ReplyText>
                {msg.replyTo.text?.length > 100
                  ? msg.replyTo.text.slice(0, 100) + '...'
                  : msg.replyTo.text || 'Відповідь'}
              </ReplyText>
            </ReplyContainer>
          ) : null}

          {msg.text?.trim() && <MarkdownRenderer content={msg.text} />}
       {msg.linkPreview && (
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginTop: '8px',
                overflow: 'hidden',
                // maxWidth: '300px',
              }}
            >
              <a
                href={msg.linkPreview.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {msg.linkPreview.image ?(
                  <img
                    src={msg.linkPreview.image}
                    alt="preview"
                    style={{
                      width: '100%',
                      maxHeight: '160px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  />
                ):(
  <div style={{ padding: 8, fontSize: 12, color: "#999" }}>
    Зображення недоступне
  </div>)}
                <div style={{ padding: '8px' }}>
                  <strong style={{ fontSize: '14px' }}>{msg.linkPreview.title}</strong>
                  <p style={{ fontSize: '12px', color: '#666' }}>{msg.linkPreview.description}</p>
                  <p style={{ fontSize: '10px', color: '#999' }}>{msg.linkPreview.url}</p>
                </div>
              </a>
            </div>
          )}
          {msg.image && (
            <FileLabelContainer>
              <MessageImage
                src={msg.image}
                alt="attached"
                onClick={() => onImageClick(msg.image)}
                style={{ cursor: 'pointer' }}
              />
            </FileLabelContainer>
          )}

          {msg.video && (
            <FileLabelContainer>
              <video
                controls
                style={{
                  maxWidth: '300px',
                  borderRadius: '12px',
                }}
              >
                <source src={msg.video} type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </FileLabelContainer>
          )}

          {msg.audio && (
            <FileLabelContainerPlayer>
              <FileLabel $dark={isDarkTheme} $isOwn={isOwn}>
                {extractFilename(msg.audio)}
              </FileLabel>
              <CustomAudioPlayer src={msg.audio} isOwn={isOwn} isDarkTheme={isDarkTheme} />
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
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
