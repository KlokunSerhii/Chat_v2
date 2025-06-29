import { Container, EmojiList, EmojiDisplay } from './EmojiReactions.styled.js';
import { emojiOptions } from '../../utils/emojiOptions.js';

export default function EmojiReactions({ msg, username, isOwn, onToggleReaction }) {
  const handleEmojiClick = emoji => {
    if (msg.id) {
      onToggleReaction({ messageId: msg.id, emoji });
    }
  };

  const grouped = emojiOptions
    .map(emoji => {
      const count = msg.reactions?.filter(r => r.emoji === emoji).length || 0;
      if (count === 0) return null;

      const reactedByUser = msg.reactions?.some(r => r.emoji === emoji && r.username === username);

      return (
        <EmojiDisplay key={emoji} reacted={reactedByUser} onClick={() => handleEmojiClick(emoji)}>
          {emoji} {count}
        </EmojiDisplay>
      );
    })
    .filter(Boolean);

  return (
    <Container $isOwn={isOwn}>{grouped.length > 0 && <EmojiList>{grouped}</EmojiList>}</Container>
  );
}
