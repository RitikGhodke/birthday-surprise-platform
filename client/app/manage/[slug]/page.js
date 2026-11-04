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
//   useEffect(() => {
//     const h = location.hash.slice(1);               // edit link se aaye to chaabi yahan save kar lo
//     if (h) { localStorage.setItem('edit_' + slug, h); history.replaceState(null, '', location.pathname); }
//     call('/mine').then(setC).catch(() => setMsg('Edit link galat ya purana hai. Card banate waqt mila edit link kholo.'));
//   }, [slug]);
//   if (!c) return <main className="stage"><div className="scene">{msg || 'Loading...'}</div></main>;

//   const link = typeof location !== 'undefined' ? `${location.origin}/t/${slug}` : '';
//   const editLink = typeof location !== 'undefined' ? `${location.origin}/manage/${slug}#${tok()}` : '';
//   const upd = (k, v) => setC({ ...c, [k]: v });
//   async function save() {
//     setBusy(true); setMsg('');
//     try {
//       const body = { letter: c.letter, balloonWords: c.balloonWords, texts: c.texts };
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
//     <div className="muted" style={{ background: '#fff', padding: 12, borderRadius: 12, textAlign: 'left' }}>
//       <b>Edit link (isse save kar lo):</b><br />Kisi bhi device par ye link kholkar card edit kar sakte ho. Ise kisi ko mat bhejna.<br />
//       <span style={{ wordBreak: 'break-all', fontSize: '.8rem' }}>{editLink}</span></div>
//     <button className="btn" onClick={() => { navigator.clipboard.writeText(editLink); setMsg('Edit link copy ho gaya ✅'); }}>Copy edit link</button>
//     <label>Naam (payment ke baad badal nahi sakta)<input value={c.recipientName} disabled /></label>
//     <div className="muted">{c.editOpen ? `Edit ${new Date(c.editUntil).toLocaleDateString()} tak khula hai` : 'Edit ka time khatam ho gaya'} · {c.savesLeft} saves baaki</div>
//     <label>Balloon words (4)</label>
//     <div className="row">{c.balloonWords.map((w, i) => <input key={i} value={w} onChange={e => upd('balloonWords', c.balloonWords.map((x, j) => j === i ? e.target.value : x))} />)}</div>
//     <label>Letter<textarea rows={9} value={c.letter} onChange={e => upd('letter', e.target.value)} /></label>
//     {Object.keys(c.texts).map(k => <label key={k}>{k}<input value={c.texts[k]} onChange={e => upd('texts', { ...c.texts, [k]: e.target.value })} /></label>)}
//     <label>Passcode {c.passcodeSet ? '(set hai, naya likho ya khali chhodo)' : '(optional)'}<input maxLength={4} inputMode="numeric" onChange={e => upd('newPass', e.target.value)} /></label>
//     <label>Photos ({c.photos.length}/5)<input type="file" accept="image/*" multiple disabled={!c.editOpen} onChange={upload} /></label>
//     <div className="row">{c.photos.map(u => <img key={u} src={u} alt="" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }} />)}</div>
//     <button className="btn" disabled={busy || !c.editOpen || c.savesLeft < 1} onClick={save}>{busy ? 'Wait...' : 'Save changes'}</button>
//     <div>{msg}</div></div></main>;
// }



















'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
const API = process.env.NEXT_PUBLIC_API_URL;

export default function Manage() {
  const { slug } = useParams();
  const [c, setC] = useState(null), [msg, setMsg] = useState(''), [busy, setBusy] = useState(false);
  const tok = () => localStorage.getItem('edit_' + slug) || '';
  const call = (path, opt = {}) => fetch(`${API}/api/cards/${slug}${path}`, { ...opt, headers: { 'x-edit-token': tok(), ...(opt.headers || {}) } })
    .then(async r => { const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Error'); return j; });
  useEffect(() => {
    const h = location.hash.slice(1);               // edit link se aaye to chaabi yahan save kar lo
    if (h) { localStorage.setItem('edit_' + slug, h); history.replaceState(null, '', location.pathname); }
    call('/mine').then(setC).catch(() => setMsg('Edit link galat ya purana hai. Card banate waqt mila edit link kholo.'));
  }, [slug]);
  if (!c) return <main className="stage"><div className="scene">{msg || 'Loading...'}</div></main>;

  const link = typeof location !== 'undefined' ? `${location.origin}/t/${slug}` : '';
  const editLink = typeof location !== 'undefined' ? `${location.origin}/manage/${slug}#${tok()}` : '';
  const upd = (k, v) => setC({ ...c, [k]: v });

  async function save() {
    setBusy(true); setMsg('');
    try {
      const body = { letter: c.letter, balloonWords: c.balloonWords, texts: c.texts };
      if (c.newPass !== undefined) body.passcode = c.newPass;
      setC(await call('', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }));
      setMsg('Save ho gaya ✅');
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }
  async function upload(e) {
    const files = [...e.target.files]; e.target.value = '';
    if (!files.length) return;
    const fd = new FormData(); files.forEach(f => fd.append('photos', f));
    setBusy(true); setMsg('');
    try {
      const j = await call('/photos', { method: 'POST', body: fd });
      setC(x => ({ ...x, photos: j.photos })); // sirf photos update, letter ke unsaved changes safe
      setMsg('Photos upload ho gayi ✅');
    } catch (er) { setMsg(er.message); }
    setBusy(false);
  }
  async function remove(id) {
    setBusy(true); setMsg('');
    try {
      const j = await call('/photos/' + encodeURIComponent(id), { method: 'DELETE' });
      setC(x => ({ ...x, photos: j.photos }));
      setMsg('Photo hata di ✅');
    } catch (er) { setMsg(er.message); }
    setBusy(false);
  }

  return <main className="stage"><div className="scene form">
    <h2>Customize your card</h2>
    <div className="muted">Card link:<br /><a href={link}>{link}</a></div>
    <button className="btn" onClick={() => navigator.clipboard.writeText(link)}>Copy link</button>
    <div className="muted" style={{ background: '#fff', padding: 12, borderRadius: 12, textAlign: 'left' }}>
      <b>Edit link (isse save kar lo):</b><br />Kisi bhi device par ye link kholkar card edit kar sakte ho. Ise kisi ko mat bhejna.<br />
      <span style={{ wordBreak: 'break-all', fontSize: '.8rem' }}>{editLink}</span></div>
    <button className="btn" onClick={() => { navigator.clipboard.writeText(editLink); setMsg('Edit link copy ho gaya ✅'); }}>Copy edit link</button>
    <label>Naam (payment ke baad badal nahi sakta)<input value={c.recipientName} disabled /></label>
    <div className="muted">{c.editOpen ? `Edit ${new Date(c.editUntil).toLocaleDateString()} tak khula hai` : 'Edit ka time khatam ho gaya'} · {c.savesLeft} saves baaki</div>
    <label>Balloon words (4)</label>
    <div className="row">{c.balloonWords.map((w, i) => <input key={i} value={w} onChange={e => upd('balloonWords', c.balloonWords.map((x, j) => j === i ? e.target.value : x))} />)}</div>
    <label>Letter<textarea rows={9} value={c.letter} onChange={e => upd('letter', e.target.value)} /></label>
    {Object.keys(c.texts).map(k => <label key={k}>{k}<input value={c.texts[k]} onChange={e => upd('texts', { ...c.texts, [k]: e.target.value })} /></label>)}
    <label>Passcode {c.passcodeSet ? '(set hai, naya likho ya khali chhodo)' : '(optional)'}<input maxLength={4} inputMode="numeric" onChange={e => upd('newPass', e.target.value)} /></label>
    <label>Photos ({c.photos.length}/5)<input type="file" accept="image/*" multiple disabled={busy || !c.editOpen} onChange={upload} /></label>
    <div className="row">{c.photos.map(p => (
      <div key={p.publicId} style={{ position: 'relative', flex: '0 0 70px', minWidth: 70 }}>
        <img src={p.url} alt="" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }} />
        <button disabled={busy || !c.editOpen} onClick={() => remove(p.publicId)}
          style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', border: 0, background: '#c2557a', color: '#fff', cursor: 'pointer' }}>×</button>
      </div>))}</div>
    <button className="btn" disabled={busy || !c.editOpen || c.savesLeft < 1} onClick={save}>{busy ? 'Wait...' : 'Save changes'}</button>
    <div>{msg}</div></div></main>;
}