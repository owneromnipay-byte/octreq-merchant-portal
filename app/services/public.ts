const API_BASE =
process.env.NEXT_PUBLIC_API_URL + "/api";

export async function getHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/public/stats`);
  return res.json();
}

export async function getProviders() {
  const res = await fetch(`${API_BASE}/public/providers`);
  return res.json();
}