import { useRef, useState, useEffect } from "react";
import {
  PlayerContainer,
  PlayButton,
  ProgressBar,
  ProgressFill,
  TimeText,
} from "./CustomAudioPlayer.styled";
import { FaPlay, FaPause } from "react-icons/fa";

export default function CustomAudioPlayer({ src, isOwn, isDarkTheme }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState(null);

  // Обробка src: якщо це Blob/File — створюємо blob URL, якщо рядок — просто ставимо
  useEffect(() => {
    if (!src) {
      setAudioSrc(null);
      return;
    }

    if (src instanceof Blob) {
      const url = URL.createObjectURL(src);
      setAudioSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setAudioSrc(src);
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <PlayerContainer $isOwn={isOwn} $dark={isDarkTheme}>
      <PlayButton onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayButton>
      <ProgressBar>
        <ProgressFill style={{ width: `${progress}%` }} $dark={isDarkTheme} />
      </ProgressBar>
      <TimeText>{formatTime(duration * (progress / 100))}</TimeText>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </PlayerContainer>
  );
}
