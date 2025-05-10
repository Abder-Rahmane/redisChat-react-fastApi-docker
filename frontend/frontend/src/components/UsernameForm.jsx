import { useState } from "react";

export default function UsernameForm({ onSet }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      localStorage.setItem("user", input.trim());
      onSet(input.trim());
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Enter your nickname</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your nickname..."
          className="w-full border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
}