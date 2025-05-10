import { useState } from "react";

export default function ChannelSelector({ defaultUser, onSubmit }) {
  const [user, setUser] = useState(defaultUser);
  const [room, setRoom] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    if (user && room) onSubmit(user.trim(), room.trim());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleJoin}
        className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Live Chat</h1>

        <label className="block">
          <span className="text-sm font-medium">User name</span>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 w-full rounded-lg border p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Channel name</span>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mt-1 w-full rounded-lg border p-2"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition"
        >
          Join / Create
        </button>
      </form>
    </div>
  );
}