// utils.js
export function saveChatMessages(messages, maxMessages = 100) {
  let trimmed = messages;
  if (messages.length > maxMessages) {
    trimmed = messages.slice(-maxMessages);
  }
  try {
    localStorage.setItem("chat_messages", JSON.stringify(trimmed));
  } catch (e) {
    console.error("Помилка запису chat_messages у localStorage:", e);
  }
  return trimmed;
}

export function compressImage(
  file,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
    };

    image.onload = () => {
      let { width, height } = image;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);

      const mimeType = file.type.includes("image") ? file.type : "image/jpeg";

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Не вдалося створити blob"));
          return;
        }

        const compressedFile = new File([blob], file.name, {
          type: mimeType,
          lastModified: Date.now(),
        });

        resolve(compressedFile);
      }, mimeType, quality);
    };

    reader.onerror = reject;
    image.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function formatTime(input) {
  const d = new Date(input);
  if (isNaN(d.getTime())) return "??:??";
  return new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Kiev",
  }).format(d);
}
