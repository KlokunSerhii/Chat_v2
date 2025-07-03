import { useState } from "react";
import {
  UploaderContainer,
  PreviewImage,
  FileInputLabel,
  HiddenFileInput,
  ClearButton,
} from "./AvatarUploader.styled.js";
import { AiOutlineClose } from "react-icons/ai";
import {compressImage} from "../../utils/utils.js";
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

const handleFileChange = async (e) => {
  const originalFile = e.target.files[0];
  if (!originalFile) return;

  const MAX_MB = 2;
  const MAX_BYTES = MAX_MB * 1024 * 1024;
  let finalFile = originalFile;

  // Якщо файл завеликий — стискаємо
  if (originalFile.size > MAX_BYTES) {
    try {
      finalFile = await compressImage(originalFile);
    } catch (err) {
      alert("Не вдалося стиснути зображення");
      console.error(err);
      return;
    }
  }

  setFile(finalFile);
  setPreview(URL.createObjectURL(finalFile));
  upload(finalFile); // надсилаємо на сервер
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
