const API = "https://api.octoreq.com";

export async function getHealth() {
  const res = await fetch(`${API}/health`);
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API}/api/public/stats`);
  return res.json();
}

export async function getProviders() {
  const res = await fetch(`${API}/api/public/providers`);
  return res.json();
}