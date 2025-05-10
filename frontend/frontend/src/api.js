const API = "http://localhost:8000";

export async function getChannels() {
  const r = await fetch(`${API}/channels`);
  return r.ok ? r.json() : [];
}

export async function createChannel(name) {
  return fetch(`${API}/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}