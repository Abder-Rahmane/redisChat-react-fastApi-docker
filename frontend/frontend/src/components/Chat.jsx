import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");
    ws.current.onmessage = (ev) =>
      setMessages((prev) => [...prev, JSON.parse(ev.data)]);
    return () => ws.current.close();
  }, []);

  const send = (text) => {
    const msg = { user: "alice", text, ts: Date.now() };
    ws.current.send(JSON.stringify(msg));
  };

  return (
    <div className="p-4">
      <ul className="h-64 overflow-auto border mb-2">
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.user}</strong>: {m.text}
          </li>
        ))}
      </ul>
      <input
        className="border p-1 w-3/4"
        onKeyDown={(e) => e.key === "Enter" && send(e.target.value)}
      />
    </div>
  );
}