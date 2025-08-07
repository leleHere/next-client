const API_BASE =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001/api"
    : (window as any).NEXT_PUBLIC_API_BASE || "http://localhost:3001/api";

export async function fetchHistory() {
  const res = await fetch(`${API_BASE}/history`);
  return res.json();
}

export async function fetchChat(id: number) {
  const res = await fetch(`${API_BASE}/history/${id}`);
  return res.json();
}

export async function createChat() {
  const res = await fetch(`${API_BASE}/history`, { method: "POST" });
  return res.json();
}

export async function sendMessage(chatId: number, text: string) {
  const res = await fetch(`${API_BASE}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, text }),
  });
  return res.json();
}
