import "./App.css";
import { Toaster } from "react-hot-toast";

import ChatApp from "./components/ChatApp/ChatApp.jsx";

function App() {
  return (
    <>
      <Toaster />
      <main>
        <ChatApp />
      </main>
    </>
  );
}

export default App;
