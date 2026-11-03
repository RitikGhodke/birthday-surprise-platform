// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// const API = process.env.NEXT_PUBLIC_API_URL;

// export default function Manage() {
//   const { slug } = useParams();
//   const [c, setC] = useState(null), [msg, setMsg] = useState(''), [busy, setBusy] = useState(false);
//   const tok = () => localStorage.getItem('edit_' + slug) || '';
//   const call = (path, opt = {}) => fetch(`${API}/api/cards/${slug}${path}`, { ...opt, headers: { 'x-edit-token': tok(), ...(opt.headers || {}) } })
//     .then(async r => { const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Error'); return j; });
//   useEffect(() => { call('/mine').then(setC).catch(() => setMsg('Ye card is device par edit nahi ho sakta')); }, [slug]);
//   if (!c) return <main className="stage"><div className="scene">{msg || 'Loading...'}</div></main>;

//   const link = typeof location !== 'undefined' ? `${location.origin}/t/${slug}` : '';
//   const upd = (k, v) => setC({ ...c, [k]: v });
//   async function save() {
//     setBusy(true); setMsg('');
//     try {
//       const body = { recipientName: c.recipientName, letter: c.letter, balloonWords: c.balloonWords, texts: c.texts };
//       if (c.newPass !== undefined) body.passcode = c.newPass;
//       setC(await call('', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })); setMsg('Save ho gaya ✅');
//     } catch (e) { setMsg(e.message); } setBusy(false);
//   }
//   async function upload(e) {
//     const fd = new FormData(); [...e.target.files].forEach(f => fd.append('photos', f));
//     setBusy(true); try { setC(await call('/photos', { method: 'POST', body: fd })); setMsg('Photos upload ho gayi ✅'); } catch (er) { setMsg(er.message); } setBusy(false);
//   }
//   return <main className="stage"><div className="scene form">
//     <h2>Customize your card</h2>
//     <div className="muted">Card link:<br /><a href={link}>{link}</a></div>
//     <button className="btn" onClick={() => navigator.clipboard.writeText(link)}>Copy link</button>
//     <label>Naam<input value={c.recipientName} onChange={e => upd('recipientName', e.target.value)} /></label>
//     <label>Balloon words (4)</label>
//     <div className="row">{c.balloonWords.map((w, i) => <input key={i} value={w} onChange={e => upd('balloonWords', c.balloonWords.map((x, j) => j === i ? e.target.value : x))} />)}</div>
//     <label>Letter<textarea rows={9} value={c.letter} onChange={e => upd('letter', e.target.value)} /></label>
//     {Object.keys(c.texts).map(k => <label key={k}>{k}<input value={c.texts[k]} onChange={e => upd('texts', { ...c.texts, [k]: e.target.value })} /></label>)}
//     <label>Passcode {c.passcodeSet ? '(set hai, naya likho ya khali chhodo)' : '(optional)'}<input maxLength={4} inputMode="numeric" onChange={e => upd('newPass', e.target.value)} /></label>
//     <label>Photos ({c.photos.length}/5)<input type="file" accept="image/*" multiple onChange={upload} /></label>
//     <div className="row">{c.photos.map(u => <img key={u} src={u} alt="" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }} />)}</div>
//     <button className="btn" disabled={busy} onClick={save}>{busy ? 'Wait...' : 'Save changes'}</button>
//     <div>{msg}</div></div></main>;
// }














import { Router } from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import Card from '../models/Card.js';
import { resolve } from '../defaults.js';
import { sha } from './orders.js';

const router = Router();
const EDIT_DAYS = Number(process.env.EDIT_DAYS || 7), MAX_SAVES = Number(process.env.MAX_SAVES || 10);
const editInfo = (c) => {
  const until = new Date(c.createdAt.getTime() + EDIT_DAYS * 864e5);
  return { editUntil: until, editOpen: until > new Date(), savesLeft: Math.max(MAX_SAVES - (c.editCount || 0), 0) };
};
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 5 },
  fileFilter: (_, f, cb) => cb(null, /^image\/(jpeg|png|webp)$/.test(f.mimetype)) });

const live = async (slug) => {
  const c = await Card.findOne({ slug, status: 'paid' });
  return c && (!c.expiresAt || c.expiresAt > new Date()) ? c : null;
};
const owner = async (req, res, next) => {
  const c = await live(req.params.slug);
  if (!c) return res.status(404).json({ error: 'Card nahi mila' });
  if (sha(req.get('x-edit-token') || '') !== c.editTokenHash) return res.status(403).json({ error: 'Allowed nahi hai' });
  req.card = c; next();
};

// Owner apna card edit karne ke liye dekhta hai (passcode ke bina bhi)
router.get('/:slug/mine', owner, (req, res) => res.json({ ...resolve(req.card), passcodeSet: !!req.card.passcodeHash, ...editInfo(req.card) }));

router.get('/:slug', async (req, res) => {
  const c = await live(req.params.slug);
  if (!c) return res.status(404).json({ error: 'Card nahi mila' });
  if (c.passcodeHash) return res.json({ locked: true, recipientName: c.recipientName });
  res.json(resolve(c));
});

router.post('/:slug/unlock', async (req, res) => {
  const c = await live(req.params.slug);
  if (!c || !c.passcodeHash) return res.status(404).json({ error: 'Card nahi mila' });
  if (!(await bcrypt.compare(String(req.body.passcode || ''), c.passcodeHash))) return res.status(401).json({ error: 'Galat passcode' });
  res.json(resolve(c));
});

// Sab kuch editable: naam, date, style, options, words, letter, har title
const EDITABLE = ['balloonWords', 'letter', 'texts']; // naam, date, style, cake, bond payment ke baad lock
router.patch('/:slug', owner, async (req, res) => {
  const i = editInfo(req.card);
  if (!i.editOpen || i.savesLeft < 1) return res.status(403).json({ error: 'Edit ka time ya save limit khatam ho gaya' });
  req.card.editCount = (req.card.editCount || 0) + 1;
  for (const k of EDITABLE) if (k in req.body) req.card[k] = req.body[k];
  if ('passcode' in req.body) req.card.passcodeHash = req.body.passcode ? await bcrypt.hash(String(req.body.passcode), 8) : undefined;
  await req.card.save();
  res.json({ ...resolve(req.card), passcodeSet: !!req.card.passcodeHash, ...editInfo(req.card) });
});

router.post('/:slug/photos', owner, upload.array('photos', 5), async (req, res) => {
  if (!editInfo(req.card).editOpen) return res.status(403).json({ error: 'Edit ka time khatam ho gaya' });
  const room = 5 - req.card.photos.length;
  const files = (req.files || []).slice(0, Math.max(room, 0));
  for (const f of files) {
    const r = await new Promise((ok, no) => cloudinary.uploader.upload_stream(
      { folder: `birthday/${req.card.slug}` }, (e, x) => (e ? no(e) : ok(x))).end(f.buffer));
    req.card.photos.push({ url: r.secure_url, publicId: r.public_id });
  }
  await req.card.save();
  res.json(resolve(req.card));
});

router.delete('/:slug/photos/:publicId', owner, async (req, res) => {
  if (!editInfo(req.card).editOpen) return res.status(403).json({ error: 'Edit ka time khatam ho gaya' });
  const id = decodeURIComponent(req.params.publicId);
  req.card.photos = req.card.photos.filter(p => p.publicId !== id);
  await cloudinary.uploader.destroy(id);
  await req.card.save();
  res.json(resolve(req.card));
});
export default router;