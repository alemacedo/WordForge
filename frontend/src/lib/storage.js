const STORAGE_KEY = 'wordforge_words';

export function getFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToStorage(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}
