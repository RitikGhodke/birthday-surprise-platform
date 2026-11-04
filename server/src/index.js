import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import orders, { webhook } from './routes/orders.js';
import cards from './routes/cards.js';
import { DEFAULTS } from './defaults.js';

console.log('Razorpay key:', process.env.RAZORPAY_KEY_ID?.slice(0, 9));

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.post('/api/razorpay/webhook', express.raw({ type: 'application/json' }), webhook); // raw body zaruri
app.use(express.json({ limit: '100kb' }));
app.use('/api', rateLimit({ windowMs: 60_000, max: 60 }));
app.get('/api/defaults', (_, res) => res.json(DEFAULTS)); // form me defaults dikhane ke liye
app.use('/api/orders', orders);
app.use('/api/cards', cards);
app.use((e, _, res, __) => { console.error(e); res.status(500).json({ error: 'Server error' }); });

await mongoose.connect(process.env.MONGO_URI);
app.listen(process.env.PORT || 5000, () => console.log('Server chal gaya'));
