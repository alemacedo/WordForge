const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Erro ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchWords() {
  return request('/words');
}

export async function fetchWordById(id) {
  return request(`/words/${id}`);
}

export async function createWord(data) {
  return request('/words', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateWord(id, data) {
  return request(`/words/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteWord(id) {
  return request(`/words/${id}`, { method: 'DELETE' });
}
