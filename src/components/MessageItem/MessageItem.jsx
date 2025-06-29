// MessageItem.jsx
import { useState } from 'react';
import CustomAudioPlayer from '../CustomAudioPlayer/CustomAudioPlayer.jsx';
import 'react-h5-audio-player/lib/styles.css';
import {
  Message,
  MessageUsername,
  MessageText,
  MessageImage,
  MessageTime,
  StyledMarkdown,
  AvatarImageChat,
  FileLabel,
  FileLabelContainer,
  FileLabelContainerPlayer,
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
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          {msg.text?.trim() && <StyledMarkdown>{msg.text}</StyledMarkdown>}

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
    </div>
  );
}
