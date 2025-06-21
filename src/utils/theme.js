const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  input: "#f5f5f5",
  border: "#ccc",
  messageOwn: "#dcf8c6",
  messageOther: "#ffffff",
  username: "#0088cc",
};

const darkTheme = {
  background: "#1e1e1e",
  text: "#e0e0e0",
  input: "#2a2a2a",
  border: "#444",
  messageOwn: "#056162",
  messageOther: "#262d31",
  username: "#34b7f1",
};

export const getTheme = ($dark) => ($dark ? darkTheme : lightTheme);
