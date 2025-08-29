import express from 'express';
import cors from 'cors';
import pool, { init } from './db.js';
import amqp from 'amqplib';

const app = express();
app.use(cors());
app.use(express.json());

let channel = null;

async function connectRabbit() {
  const url = process.env.AMQP_URL || 'amqp://rabbitmq:5672';
  const conn = await amqp.connect(url);
  channel = await conn.createChannel();
  await channel.assertExchange('events', 'topic', { durable: true });
}

async function start() {
  await init().catch(console.error);
  try {
    await connectRabbit();
  } catch (e) {
    console.error('RabbitMQ connect failed, continuing without queue:', e.message);
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API on ${port}`));
}

app.get('/health', (req, res) => res.json({ ok: true }));

// GET /vehicles
app.get('/vehicles', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
  res.json(rows);
});

// POST /vehicles
app.post('/vehicles', async (req, res) => {
  const { make, model, price } = req.body;
  if (!make || !model || price == null) return res.status(400).json({ error: 'make, model, price required' });
  const [r] = await pool.query('INSERT INTO vehicles (make, model, price) VALUES (?,?,?)', [make, model, price]);
  const id = r.insertId;
  const [rows] = await pool.query('SELECT * FROM vehicles WHERE id=?', [id]);
  const payload = rows[0];
  if (channel) {
    channel.publish('events', 'vehicle.created', Buffer.from(JSON.stringify(payload)), { contentType: 'application/json' });
  }
  res.status(201).json(payload);
});

// DELETE /vehicles/:id
app.delete('/vehicles/:id', async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM vehicles WHERE id=?', [id]);
  if (channel) {
    channel.publish('events', 'vehicle.deleted', Buffer.from(JSON.stringify({ id })), { contentType: 'application/json' });
  }
  res.status(204).end();
});

start();
