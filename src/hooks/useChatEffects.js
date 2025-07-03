import { useEffect } from "react";

export function useChatEffects({ messages, username, audioRef, messagesEndRef, hasInteracted }) {
  // Програвання звуку
 useEffect(() => {
  if (!hasInteracted.current || messages.length === 0) return;

  const lastMsg = messages[messages.length - 1];
  const isIncomingUserMsg = lastMsg?.sender !== "system" && lastMsg?.username !== username;

  const audioEl = audioRef.current;
  if (isIncomingUserMsg && audioEl && audioEl.src) {
    audioEl.play().catch(console.warn);
  }
}, [messages, username]);

  // Автоматична прокрутка
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Один раз відслідковує першу взаємодію
  useEffect(() => {
    const handleInteraction = () => {
      hasInteracted.current = true;
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);
}
