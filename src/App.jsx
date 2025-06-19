import "./App.css";
import ChatApp from "./components/ChatApp/ChatApp.jsx";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <div>Time: {time}</div>
      </header>
      <main>
        <ChatApp />
      </main>
    </>
  );
}

export default App;
