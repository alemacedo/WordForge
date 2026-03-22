import { v4 as uuidv4 } from 'uuid';

const words = [];

export function getAll() {
  return words;
}

export function getById(id) {
  return words.find((w) => w.id === id) ?? null;
}

export function create(data) {
  const word = {
    id: uuidv4(),
    word: data.word,
    description: data.description,
    useCase: data.useCase,
  };
  words.push(word);
  return word;
}

export function update(id, data) {
  const index = words.findIndex((w) => w.id === id);
  if (index === -1) return null;
  words[index] = { ...words[index], ...data };
  return words[index];
}

export function remove(id) {
  const index = words.findIndex((w) => w.id === id);
  if (index === -1) return false;
  words.splice(index, 1);
  return true;
}
