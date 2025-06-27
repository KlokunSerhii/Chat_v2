import React from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { AnimatePresence } from 'framer-motion';
import { EmojiPickerContainer } from '../ChatApp/ChatApp.styled';

const EmojiPickerSection = ({ showEmojiPicker, isDarkTheme, setInput }) => {
  return (
    <AnimatePresence>
      {showEmojiPicker && (
        <EmojiPickerContainer>
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setInput((prev) => prev + emoji.native)}
            theme={isDarkTheme ? 'dark' : 'light'}
          />
        </EmojiPickerContainer>
      )}
    </AnimatePresence>
  );
};

export default EmojiPickerSection;
