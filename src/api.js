export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function getJSON(path, fallback) {
  try {
    const res = await fetch(API_URL + path);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function postJSON(path, body) {
  const res = await fetch(API_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
