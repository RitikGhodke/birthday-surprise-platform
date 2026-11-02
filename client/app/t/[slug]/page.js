'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CardExperience from '../../../components/CardExperience';
const API = process.env.NEXT_PUBLIC_API_URL;

export default function CardPage() {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    fetch(`${API}/api/cards/${slug}`).then(r => r.ok ? r.json() : Promise.reject()).then(setCard).catch(() => setErr('Ye card nahi mila'));
  }, [slug]);
  async function unlock() {
    const r = await fetch(`${API}/api/cards/${slug}/unlock`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ passcode: code }) });
    r.ok ? setCard(await r.json()) : setErr('Galat passcode');
  }
  if (!card) return <main className="stage"><div className="scene">{err || 'Loading...'}</div></main>;
  if (card.locked) return <main className="stage"><div className="scene">
    <h2>For {card.recipientName}</h2>
    <input value={code} onChange={e => setCode(e.target.value)} maxLength={4} inputMode="numeric" placeholder="4-digit passcode" style={{ padding: 12, borderRadius: 12, border: '1px solid #e7b6c6', textAlign: 'center' }} />
    <button className="btn" onClick={unlock}>Unlock</button><div className="muted">{err}</div></div></main>;
  return <CardExperience card={card} />;
}
