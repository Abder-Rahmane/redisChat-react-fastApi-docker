import { useEffect, useState } from "react";
import { getChannels, createChannel } from "../api.js";

export default function Lobby({ user, onJoin }) {
  const [channels, setChannels] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const load = async () => setChannels(await getChannels());
    load();
    const id = setInterval(load, 1000);
    return () => clearInterval(id);
  }, []);

  const addChannel = async () => {
    if (!newName) return;
    await createChannel(newName);
    setNewName("");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user}!</h1>

      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New channel name…"
          className="flex-1 border rounded-lg p-2"
        />
        <button
          onClick={addChannel}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
        >
          Create
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {channels.map((c) => (
          <li
            key={c}
            onClick={() => onJoin(c)}
            className="cursor-pointer rounded-xl bg-gray-100 hover:bg-gray-200 p-4 shadow text-center"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}