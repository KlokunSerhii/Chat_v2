import React from 'react';
import { LoaderWrapper, Dot } from './FancyLoader.styled';

export default function FancyLoader({ isDarkTheme }) {
  return (
    <LoaderWrapper>
      <Dot delay="0s" $dark={isDarkTheme} />
      <Dot delay="0.2s" $dark={isDarkTheme} />
      <Dot delay="0.4s" $dark={isDarkTheme} />
    </LoaderWrapper>
  );
}
