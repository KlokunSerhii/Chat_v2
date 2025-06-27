import { useState } from "react";
import {
  UploaderContainer,
  PreviewImage,
  FileInputLabel,
  HiddenFileInput,
  ClearButton,
} from "./AvatarUploader.styled.js";
import { AiOutlineClose } from "react-icons/ai";

import { SERVER_URL } from "../../utils/url.js";

export default function AvatarUploader({
  onUpload,
  isDarkTheme = false,
}) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const upload = async (selectedFile) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("avatar", selectedFile);

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
          console.log(fullUrl)
        onUpload(fullUrl);
      } else {
        alert("Помилка: немає avatarUrl у відповіді сервера");
      }
    } catch (err) {
      alert("Помилка завантаження аватарки");
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    upload(f); // завантажити одразу після вибору
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    onUpload(""); // скидаємо URL аватарки
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
          <ClearButton
            type="button"
            onClick={handleClear}
            $dark={isDarkTheme}
          >
            <AiOutlineClose
              size={20}
              color={isDarkTheme ? "#fff" : "#000"}
            />
          </ClearButton>
        </>
      )}
    </UploaderContainer>
  );
}
