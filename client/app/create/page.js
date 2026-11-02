'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const API = process.env.NEXT_PUBLIC_API_URL;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const opts = { cake: ['chocolate', 'vanilla', 'strawberry'], bond: ['friend', 'partner', 'family'], friendSticker: ['bunny', 'bear', 'panda'] };
const post = (u, b) => fetch(API + u, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(async r => { const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Error'); return j; });

export default function Create() {
  const r = useRouter();
  const [f, setF] = useState({ recipientName: '', month: 'Dec', day: 9, style: 'card', cake: 'chocolate', bond: 'friend', friendSticker: 'bunny', passcode: '' });
  const [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const Pick = ({ k, label }) => <label>{label}<select value={f[k]} onChange={set(k)}>{opts[k].map(o => <option key={o}>{o}</option>)}</select></label>;

async function skipPay() {
  setErr(''); if (!f.recipientName.trim()) return setErr('Naam likho');
  setBusy(true);
  try {
    const o = await post('/api/orders', { recipientName: f.recipientName, birthDate: { month: f.month, day: Number(f.day) }, style: f.style,
      options: { cake: f.cake, bond: f.bond, friendSticker: f.friendSticker }, passcode: f.passcode || undefined });
    const v = await post('/api/orders/dev-pay', { orderId: o.orderId });
    localStorage.setItem('edit_' + v.slug, v.editToken); r.push('/manage/' + v.slug);
  } catch (e) { setErr(e.message); setBusy(false); }
}

  async function pay() {
    setErr(''); if (!f.recipientName.trim()) return setErr('Naam likho');
    setBusy(true);
    try {
      const o = await post('/api/orders', { recipientName: f.recipientName, birthDate: { month: f.month, day: Number(f.day) }, style: f.style,
        options: { cake: f.cake, bond: f.bond, friendSticker: f.friendSticker }, passcode: f.passcode || undefined });
      await new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = ok; s.onerror = () => no(new Error('Razorpay load nahi hua')); document.body.appendChild(s); });
      new window.Razorpay({ key: o.keyId, amount: o.amount, currency: 'INR', order_id: o.orderId, name: 'Birthday Surprise',
        handler: async res => {
          try { const v = await post('/api/orders/verify', res); localStorage.setItem('edit_' + v.slug, v.editToken); r.push('/manage/' + v.slug); }
          catch (e) { setErr(e.message); setBusy(false); }
        },
        modal: { ondismiss: () => setBusy(false) } }).open();
    } catch (e) { setErr(e.message); setBusy(false); }
  }
  return <main className="stage"><div className="scene form">
    <h2>Create a Birthday Card</h2>
    <label>Whose birthday is it?<input value={f.recipientName} onChange={set('recipientName')} placeholder="Naam" /></label>
    <div className="row"><label>Month<select value={f.month} onChange={set('month')}>{MONTHS.map(m => <option key={m}>{m}</option>)}</select></label>
      <label>Day<input type="number" min="1" max="31" value={f.day} onChange={set('day')} /></label></div>
    <Pick k="cake" label="Cake" /><Pick k="bond" label="Bond" /><Pick k="friendSticker" label="Sticker" />
    <label>Passcode (optional, 4 digit)<input value={f.passcode} maxLength={4} inputMode="numeric" onChange={set('passcode')} /></label>
    <button className="btn" disabled={busy} onClick={pay}>{busy ? 'Wait...' : 'Pay & Create'}</button>
    {process.env.NEXT_PUBLIC_DEV_SKIP === '1' && <button className="btn" disabled={busy} onClick={skipPay}>Test: skip payment</button>}
    <div style={{ color: '#b00' }}>{err}</div></div></main>;
}
