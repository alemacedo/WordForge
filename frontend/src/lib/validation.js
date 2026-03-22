import { z } from 'zod';

export const wordSchema = z.object({
  word: z.string().min(1, 'O campo word é obrigatório'),
  description: z.string().min(1, 'O campo description é obrigatório'),
  useCase: z.string().min(1, 'O campo useCase é obrigatório'),
});

export function validateWordForm(data) {
  return wordSchema.safeParse(data);
}
