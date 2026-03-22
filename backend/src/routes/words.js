import { Router } from 'express';
import * as store from '../store/wordsStore.js';
import { validateWord } from '../validators/word.js';

const router = Router();

router.get('/', (_req, res) => {
  const words = store.getAll();
  res.json(words);
});

router.get('/:id', (req, res) => {
  const word = store.getById(req.params.id);
  if (!word) {
    return res.status(404).json({ error: 'Palavra não encontrada' });
  }
  res.json(word);
});

router.post('/', (req, res) => {
  const validation = validateWord(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Dados inválidos', details: validation.error });
  }
  const word = store.create(validation.data);
  res.status(201).json(word);
});

router.put('/:id', (req, res) => {
  const existing = store.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Palavra não encontrada' });
  }
  const validation = validateWord(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Dados inválidos', details: validation.error });
  }
  const word = store.update(req.params.id, validation.data);
  res.json(word);
});

router.delete('/:id', (req, res) => {
  const deleted = store.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Palavra não encontrada' });
  }
  res.status(204).send();
});

export default router;
