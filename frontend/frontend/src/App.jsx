import { useState } from "react";
import UsernameForm from "./components/UsernameForm.jsx";
import Lobby from "./components/Lobby.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem("user") || "");
  const [room, setRoom] = useState("");

  if (!user) {
    return <UsernameForm onSet={(name) => setUser(name)} />;
  }

  if (!room) {
    return <Lobby user={user} onJoin={setRoom} />;
  }

  return <ChatRoom user={user} room={room} onLeave={() => setRoom("")} />;
}