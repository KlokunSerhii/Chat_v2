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
        setImageLoading(true);
        setAttachedImage(data.url);
        setAttachedAudio(null);
        setAttachedVideo(null);
      } else if (fileType.startsWith("audio/")) {
        setAudioLoading(true);
        setAttachedAudio(data.url);
        setAttachedImage(null);
        setAttachedVideo(null);
      } else if (fileType.startsWith("video/")) {
        setVideoLoading(true);
        setAttachedVideo(data.url);
        setAttachedImage(null);
        setAttachedAudio(null);
      }
    } catch (err) {
      console.error("File upload error:", err);
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
