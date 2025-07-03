import { useState } from "react";
import { SERVER_URL } from "../utils/url";

export function useFileUpload({
  setAttachedImage,
  setAttachedAudio,
  setAttachedVideo,
}) {
  const [imageLoading, setImageLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;

    try {
      // Включаємо лоадер в залежності від типу перед початком завантаження
      if (fileType.startsWith("image/")) setImageLoading(true);
      else if (fileType.startsWith("audio/")) setAudioLoading(true);
      else if (fileType.startsWith("video/")) setVideoLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${SERVER_URL}/api/send-file`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (fileType.startsWith("image/")) {
        setAttachedImage(data.url);
        setAttachedAudio(null);
        setAttachedVideo(null);
        setImageLoading(false);
      } else if (fileType.startsWith("audio/")) {
        setAttachedAudio(data.url);
        setAttachedImage(null);
        setAttachedVideo(null);
        setAudioLoading(false);
      } else if (fileType.startsWith("video/")) {
        setAttachedVideo(data.url);
        setAttachedImage(null);
        setAttachedAudio(null);
        setVideoLoading(false);
      }
    } catch (err) {
      console.error("File upload error:", err);
      // Вимикаємо лоадер, навіть якщо помилка
      setImageLoading(false);
      setAudioLoading(false);
      setVideoLoading(false);
    }
  };

  return {
    handleFileChange,
    imageLoading,
    audioLoading,
    videoLoading,
    setImageLoading,
    setAudioLoading,
    setVideoLoading,
  };
}
