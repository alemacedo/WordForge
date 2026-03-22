import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/words';
import { getFromStorage, saveToStorage } from '../lib/storage';

export function useWords() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFromStorage = useCallback(() => {
    const cached = getFromStorage();
    setWords(cached);
  }, []);

  const syncWithApi = useCallback(async () => {
    try {
      const data = await api.fetchWords();
      setWords(data);
      saveToStorage(data);
    } catch (err) {
      setError(err.message);
      loadFromStorage();
    } finally {
      setLoading(false);
    }
  }, [loadFromStorage]);

  useEffect(() => {
    loadFromStorage();
    syncWithApi();
  }, [loadFromStorage, syncWithApi]);

  const createWord = useCallback(async (data) => {
    const created = await api.createWord(data);
    setWords((prev) => {
      const next = [...prev, created];
      saveToStorage(next);
      return next;
    });
    return created;
  }, []);

  const updateWord = useCallback(async (id, data) => {
    const updated = await api.updateWord(id, data);
    setWords((prev) => {
      const next = prev.map((w) => (w.id === id ? updated : w));
      saveToStorage(next);
      return next;
    });
    return updated;
  }, []);

  const deleteWord = useCallback(async (id) => {
    await api.deleteWord(id);
    setWords((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  return {
    words,
    loading,
    error,
    createWord,
    updateWord,
    deleteWord,
  };
}
