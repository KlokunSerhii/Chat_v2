import "./App.css";
import { Toaster } from "react-hot-toast";

import ChatApp from "./components/ChatApp/ChatApp.jsx";

function App() {
  return (
    <>
      <main>
        <ChatApp />
      </main>
      <Toaster />
    </>
  );
}

export default App;
