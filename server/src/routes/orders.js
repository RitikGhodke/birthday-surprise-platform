import { Router } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import Card from '../models/Card.js';

const rzp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const safeEq = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const router = Router();

// Payment hone par card ko paid karo (verify aur webhook dono yahi use karte hain)
async function markPaid(orderId, paymentId) {
  const card = await Card.findOne({ 'razorpay.orderId': orderId });
  if (!card) return null;
  if (card.status !== 'paid') {
    card.status = 'paid';
    card.slug = nanoid(8);
    card.razorpay.paymentId = paymentId;
    card.expiresAt = new Date(Date.now() + Number(process.env.EXPIRY_DAYS || 365) * 864e5);
    await card.save();
  }
  return card;
}

router.post('/', async (req, res) => {
  const { recipientName, birthDate, style, options, passcode } = req.body;
  if (!recipientName?.trim()) return res.status(400).json({ error: 'Naam zaruri hai' });
  if (passcode && !/^\d{4}$/.test(passcode)) return res.status(400).json({ error: 'Passcode 4 digit ka hona chahiye' });
  const amount = Number(process.env.PRICE_PAISE); // amount hamesha server se
  const order = await rzp.orders.create({ amount, currency: 'INR' });
  await Card.create({
    recipientName, birthDate, style, options, amount,
    passcodeHash: passcode ? await bcrypt.hash(passcode, 8) : undefined,
    razorpay: { orderId: order.id }
  });
  res.json({ orderId: order.id, amount, keyId: process.env.RAZORPAY_KEY_ID });
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s } = req.body;
  if (!o || !p || !s) return res.status(400).json({ error: 'Invalid request' });
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${o}|${p}`).digest('hex');
  if (!safeEq(expected, s)) return res.status(400).json({ error: 'Payment verify nahi hua' });
  const card = await markPaid(o, p);
  if (!card) return res.status(404).json({ error: 'Order nahi mila' });
  const editToken = nanoid(32); // sirf owner ke paas rahega, edit/upload ke liye
  card.editTokenHash = sha(editToken);
  await card.save();
  res.json({ slug: card.slug, editToken });
});

router.post('/dev-pay', async (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_')) return res.sendStatus(404);
  const card = await markPaid(req.body.orderId, 'dev_test');
  if (!card) return res.status(404).json({ error: 'Order nahi mila' });
  const editToken = nanoid(32);
  card.editTokenHash = sha(editToken);
  await card.save();
  res.json({ slug: card.slug, editToken });
});

export async function webhook(req, res) {
  const sig = req.get('x-razorpay-signature') || '';
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(req.body).digest('hex');
  if (!safeEq(expected, sig)) return res.sendStatus(400);
  const evt = JSON.parse(req.body.toString());
  if (evt.event === 'payment.captured') {
    const pay = evt.payload.payment.entity;
    await markPaid(pay.order_id, pay.id);
  }
  res.sendStatus(200);
}
export { sha };
export default router;
