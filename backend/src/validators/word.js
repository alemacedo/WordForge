import { z } from 'zod';

const wordSchema = z.object({
  word: z.string().min(1, 'O campo word é obrigatório'),
  description: z.string().min(1, 'O campo description é obrigatório'),
  useCase: z.string().min(1, 'O campo useCase é obrigatório'),
});

export function validateWord(body) {
  const result = wordSchema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: result.error.flatten().fieldErrors,
  };
}
