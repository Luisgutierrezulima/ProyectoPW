// backend/index.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});