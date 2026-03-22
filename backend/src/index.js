import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import wordsRoutes from './routes/words.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(express.json());

app.use('/api/words', wordsRoutes);

const frontendDist = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('WordForge API - Execute "npm run build" e reinicie para servir o frontend.');
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`WordForge backend rodando em http://localhost:${PORT}`);
});
