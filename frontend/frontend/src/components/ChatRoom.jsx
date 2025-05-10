import { useEffect, useRef, useState } from "react";

function stringToHslColor(str, s = 50, l = 60) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function ChatRoom({ user, room, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/${room}`);
    ws.current.onmessage = (ev) =>
      setMessages((prev) => [...prev, JSON.parse(ev.data)]);
    return () => ws.current.close();
  }, [room]);

  const send = () => {
    if (!text) return;
    ws.current.send(JSON.stringify({ user, text, ts: Date.now() }));
    setText("");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 py-2 bg-blue-600 text-white flex justify-between items-center">
        <span className="font-semibold">Channel: {room}</span>
        <span className="text-sm">Logged in as <strong>{user}</strong></span>
        <button
          onClick={onLeave}
          className="underline text-sm ml-4 hover:text-gray-200"
        >
          Leave
        </button>
      </header>

      {/* Messages */}
      <ul className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-2">
        {messages.map((m, i) => {
          const isMe = m.user === user;
          const userColor = stringToHslColor(m.user, 50, 70);
          return (
            <li key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className="rounded-lg px-3 py-2 shadow max-w-md break-words"
                style={{
                  backgroundColor: isMe ? "#2563eb" : userColor,
                  color: isMe ? "white" : "black",
                }}
              >
                <span className="text-xs font-semibold mr-2">{m.user}:</span>
                {m.text}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Input */}
      <div className="p-3 bg-white flex gap-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message…"
        />
        <button
          onClick={send}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}