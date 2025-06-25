import { useState } from "react";
import {
  UploaderContainer,
  PreviewImage,
  UploadButton,
  FileInputLabel,
  HiddenFileInput,
} from "./AvatarUploader.styled.js";
import { SERVER_URL } from "../../utils/url.js";
// const SERVER_URL = "https://chat-v2-server-7.onrender.com";

export default function AvatarUploader({
  onUpload,
  isDarkTheme = false,
}) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(`${SERVER_URL}/api/upload-avatar`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.avatarUrl) {
        const fullUrl = data.avatarUrl.startsWith("/")
          ? SERVER_URL + data.avatarUrl
          : data.avatarUrl;
        onUpload(fullUrl);
      } else {
        alert("Помилка: немає avatarUrl у відповіді сервера");
      }
    } catch (err) {
      alert("Помилка завантаження аватарки");
      console.error(err);
    }
  };

  return (
    <UploaderContainer>
      <FileInputLabel $dark={isDarkTheme}>
        Обрати аватар
        <HiddenFileInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FileInputLabel>

      {preview && (
        <>
          <PreviewImage
            src={preview}
            alt="preview"
            $dark={isDarkTheme}
          />
          <UploadButton
            type="button"
            onClick={upload}
            $dark={isDarkTheme}
          >
            Завантажити аватар
          </UploadButton>
        </>
      )}
    </UploaderContainer>
  );
}
