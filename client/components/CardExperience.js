// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Cake, Sticker, Bouquet } from './Art';

// class Guard extends React.Component {
//   state = { err: null };
//   static getDerivedStateFromError(err) { return { err }; }
//   render() {
//     if (!this.state.err) return this.props.children;
//     return <div style={{ padding: 20, maxWidth: 420, color: '#900', fontFamily: 'monospace', wordBreak: 'break-word' }}>
//       <b>Error:</b> {String(this.state.err?.message || this.state.err)}<br /><br />
//       <button className="btn" onClick={() => location.reload()}>Reload</button></div>;
//   }
// }

// const SCENES = ['intro', 'balloons', 'candle', 'bouquet', 'moments', 'letter', 'final'];
// const boom = () => confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });

// export default function CardExperience({ card }) {
//   const [i, setI] = useState(0);
//   const [key, setKey] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts;
//   const cake = card.options?.cake || 'chocolate', pet = card.options?.friendSticker || 'bunny';
//   const Btn = ({ children, onClick = next }) => <button className="btn" onClick={onClick}>{children}</button>;
//   return (
//     <main className="stage"><Guard>
//         <motion.section key={s + key} className="scene" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
//           {s === 'intro' && <>
//             <div className="muted">{card.birthDate?.day} {card.birthDate?.month}</div>
//             <h1>{t.intro}</h1><div className="pets"><Sticker kind={pet} /><div className="mini"><Cake type={cake} lit={false} /></div></div><Btn>Open</Btn></>}
//           {s === 'balloons' && <Balloons words={card.balloonWords} title={t.balloonTitle} done={next} />}
//           {s === 'candle' && <Candle title={t.candleTitle} cake={cake} done={next} />}
//           {s === 'bouquet' && <>
//             <h2>{t.bouquetTitle}</h2>
//             <div className="bouquet"><Bouquet /></div>
//             <Btn>Next</Btn>
//           </>}
//           {s === 'moments' && <Moments photos={card.photos} title={t.momentsTitle} done={next} />}
//           {s === 'letter' && <Letter pet={pet} title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={() => { next(); setTimeout(boom, 300); }} />}
//           {s === 'final' && <>
//             <div className="pets"><Sticker kind={pet} /></div><h1>{t.finalTitle} ❤️</h1><p>{t.finalSub}</p>
//             <Btn onClick={() => { setI(0); setKey(k => k + 1); }}>↻ Replay</Btn></>}
//         </motion.section>
//     </Guard></main>
//   );
// }

// function Balloons({ words, title, done }) {
//   const [popped, setPopped] = useState([]);
//   const pos = [[8, 40], [58, 10], [12, 190], [60, 170]];
//   const pop = n => {
//     if (popped.includes(n)) return;
//     const p = [...popped, n]; setPopped(p);
//     if (p.length === 4) setTimeout(done, 1200);
//   };
//   return <>
//     <h2>{title}</h2>
//     <div className="balloons">
//       {words.map((w, n) => popped.includes(n)
//         ? <span key={n} className="word" style={{ left: pos[n][0] + '%', top: pos[n][1] + 20 }}>{w}</span>
//         : <motion.button key={n} className="balloon" style={{ left: pos[n][0] + '%', top: pos[n][1] }}
//             animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 2 + n * 0.4 }} onClick={() => pop(n)}>🎈</motion.button>)}
//     </div></>;
// }

// function Candle({ title, cake, done }) {
//   const [lit, setLit] = useState(true);
//   const [msg, setMsg] = useState('');
//   const blow = () => { if (!lit) return; setLit(false); boom(); setTimeout(done, 1600); };
//   async function listen() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
//       await ctx.resume();
//       ctx.createMediaStreamSource(stream).connect(an);
//       const buf = new Float32Array(an.fftSize);
//       setMsg('Ab mic ke paas phoonk maro...');
//       const t0 = performance.now(); let base = 0, n = 0, hits = 0;
//       const tick = () => {
//         an.getFloatTimeDomainData(buf);
//         let sum = 0; for (const v of buf) sum += v * v;
//         const rms = Math.sqrt(sum / buf.length);
//         if (performance.now() - t0 < 600) { base += rms; n++; }          // pehle shaant awaaz naapo
//         else {
//           const limit = Math.max((base / Math.max(n, 1)) * 3, 0.05);
//           hits = rms > limit ? hits + 1 : 0;
//           if (hits >= 3) { blow(); stream.getTracks().forEach(x => x.stop()); ctx.close(); return; }
//         }
//         requestAnimationFrame(tick);
//       };
//       tick();
//     } catch (e) {
//       const n = e?.name || '';
//       setMsg(!navigator.mediaDevices ? 'Is browser me mic nahi chalta. Chrome/Safari me kholo, ya cake par tap karo'
//         : n === 'NotAllowedError' ? 'Mic block hai. Browser ki site settings me Microphone Allow karo, ya cake par tap karo'
//         : 'Mic nahi chala (' + n + '). Cake par tap karo');
//     }
//   }
//   return <>
//     <h2>{title}</h2>
//     <div className="cake" onClick={blow}><Cake type={cake} lit={lit} /></div>
//     <button className="btn" onClick={listen}>🎤 Blow into the mic</button><div className="muted">{msg}</div></>;
// }

// function Moments({ photos, title, done }) {
//   const base = photos.length ? photos : [null, null, null];
//   const [left, setLeft] = useState(base.map((p, n) => ({ p, n })));
//   useEffect(() => {
//     if (left.length === 0) { const id = setTimeout(done, 700); return () => clearTimeout(id); }
//   }, [left.length]);
//   return <>
//     <h2>{title}</h2><div className="muted">(Swipe the cards)</div>
//     <div className="deck">
//       {left.map((c, idx) => idx > 2 ? null :
//         <motion.div key={c.n} className="photo" style={{ zIndex: left.length - idx }} drag={idx === 0 ? 'x' : false}
//           animate={{ scale: 1 - idx * 0.04, rotate: idx ? (idx % 2 ? 3 : -3) : 0 }}
//           onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) setLeft(l => l.slice(1)); }}>
//           {c.p ? <img src={c.p} alt="" /> : <div className="ph">📸</div>}
//           <div className="cap">Moment {c.n + 1}</div>
//         </motion.div>)}
//     </div>
//     {left.length > 0 && <button className="btn" onClick={() => setLeft(l => l.slice(1))}>Next card →</button>}
//     {left.length === 0 && <button className="btn" onClick={done}>Next</button>}</>;
// }

// function Letter({ pet = 'bunny', title, text, btn, done }) {
//   const [open, setOpen] = useState(false);
//   return <>
//     <h2>{title}</h2>
//     {!open ? <motion.div className="big" style={{ cursor: 'pointer' }} whileTap={{ scale: 0.9 }} onClick={() => setOpen(true)}>💌</motion.div>
//       : <motion.div className="letterwrap" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}><div className="letter">{text}</div><div className="corner"><Sticker kind={pet} /></div></motion.div>}
//     {open && <button className="btn" onClick={done}>{btn} →</button>}</>;
// }














'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Sticker, Bouquet } from './Art';

class Guard extends React.Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return <div style={{ padding: 20, maxWidth: 420, color: '#900', fontFamily: 'monospace', wordBreak: 'break-word' }}>
      <b>Error:</b> {String(this.state.err?.message || this.state.err)}<br /><br />
      <button className="btn" onClick={() => location.reload()}>Reload</button></div>;
  }
}

const SCENES = ['intro', 'balloons', 'candle', 'bouquet', 'moments', 'letter', 'final'];
const boom = () => confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });

export default function CardExperience({ card }) {
  const [i, setI] = useState(0);
  const [key, setKey] = useState(0);
  const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
  const s = SCENES[i], t = card.texts;
  const cake = card.options?.cake || 'chocolate', pet = card.options?.friendSticker || 'bunny';
  const Btn = ({ children, onClick = next }) => <button className="btn" onClick={onClick}>{children}</button>;
  return (
    <main className="stage"><Guard>
        <motion.section key={s + key} className="scene" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          {s === 'intro' && <>
            <div className="muted">{card.birthDate?.day} {card.birthDate?.month}</div>
            <h1>{t.intro}</h1><div className="pets"><Sticker kind={pet} /><div className="mini"><Cake type={cake} lit={false} /></div></div><Btn>Open</Btn></>}
          {s === 'balloons' && <Balloons words={card.balloonWords} title={t.balloonTitle} done={next} />}
          {s === 'candle' && <Candle title={t.candleTitle} cake={cake} done={next} />}
          {s === 'bouquet' && <>
            <h2>{t.bouquetTitle}</h2>
            <BouquetScene name={card.recipientName} />
            <Btn>Next</Btn>
          </>}
          {s === 'moments' && <Moments photos={card.photos} title={t.momentsTitle} done={next} />}
          {s === 'letter' && <Letter pet={pet} title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={() => { next(); setTimeout(boom, 300); }} />}
          {s === 'final' && <>
            <div className="pets"><Sticker kind={pet} /></div><h1>{t.finalTitle} ❤️</h1><p>{t.finalSub}</p>
            <Btn onClick={() => { setI(0); setKey(k => k + 1); }}>↻ Replay</Btn></>}
        </motion.section>
    </Guard></main>
  );
}

function BouquetScene({ name }) {
  const notes = [
    ['Forever yours 🤍', { left: 0, top: '1%' }],
    ['You make my world beautiful', { right: 0, top: '4%' }],
    ['You are my sunshine ☀️', { left: 0, top: '36%' }],
    [`Happy Birthday ${name} 💖`, { right: 0, top: '42%' }],
    ["I'm lucky to have you 🥹", { left: '2%', bottom: '3%' }],
    ['You are my favorite person 💕', { right: 0, bottom: '1%' }]
  ];
  return <div className="bscene">
    <div className="bouquet"><Bouquet /></div>
    {notes.map(([txt, pos], i) => <div key={i} className="bub" style={{ ...pos, '--d': 1.2 + i * 0.35 + 's' }}>{txt}</div>)}
  </div>;
}

function Balloons({ words, title, done }) {
  const [popped, setPopped] = useState([]);
  const pos = [[8, 40], [58, 10], [12, 190], [60, 170]];
  const pop = n => {
    if (popped.includes(n)) return;
    const p = [...popped, n]; setPopped(p);
    if (p.length === 4) setTimeout(done, 1200);
  };
  return <>
    <h2>{title}</h2>
    <div className="balloons">
      {words.map((w, n) => popped.includes(n)
        ? <span key={n} className="word" style={{ left: pos[n][0] + '%', top: pos[n][1] + 20 }}>{w}</span>
        : <motion.button key={n} className="balloon" style={{ left: pos[n][0] + '%', top: pos[n][1] }}
            animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 2 + n * 0.4 }} onClick={() => pop(n)}>🎈</motion.button>)}
    </div></>;
}

function Candle({ title, cake, done }) {
  const [lit, setLit] = useState(true);
  const [msg, setMsg] = useState('');
  const blow = () => { if (!lit) return; setLit(false); boom(); setTimeout(done, 1600); };
  async function listen() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
      await ctx.resume();
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Float32Array(an.fftSize);
      setMsg('Ab mic ke paas phoonk maro...');
      const t0 = performance.now(); let base = 0, n = 0, hits = 0;
      const tick = () => {
        an.getFloatTimeDomainData(buf);
        let sum = 0; for (const v of buf) sum += v * v;
        const rms = Math.sqrt(sum / buf.length);
        if (performance.now() - t0 < 600) { base += rms; n++; }          // pehle shaant awaaz naapo
        else {
          const limit = Math.max((base / Math.max(n, 1)) * 3, 0.05);
          hits = rms > limit ? hits + 1 : 0;
          if (hits >= 3) { blow(); stream.getTracks().forEach(x => x.stop()); ctx.close(); return; }
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      const n = e?.name || '';
      setMsg(!navigator.mediaDevices ? 'Is browser me mic nahi chalta. Chrome/Safari me kholo, ya cake par tap karo'
        : n === 'NotAllowedError' ? 'Mic block hai. Browser ki site settings me Microphone Allow karo, ya cake par tap karo'
        : 'Mic nahi chala (' + n + '). Cake par tap karo');
    }
  }
  return <>
    <h2>{title}</h2>
    <div className="cake" onClick={blow}><Cake type={cake} lit={lit} /></div>
    <button className="btn" onClick={listen}>🎤 Blow into the mic</button><div className="muted">{msg}</div></>;
}

function Moments({ photos, title, done }) {
  const base = photos.length ? photos : [null, null, null];
  const [left, setLeft] = useState(base.map((p, n) => ({ p, n })));
  useEffect(() => {
    if (left.length === 0) { const id = setTimeout(done, 700); return () => clearTimeout(id); }
  }, [left.length]);
  return <>
    <h2>{title}</h2><div className="muted">(Swipe the cards)</div>
    <div className="deck">
      {left.map((c, idx) => idx > 2 ? null :
        <motion.div key={c.n} className="photo" style={{ zIndex: left.length - idx }} drag={idx === 0 ? 'x' : false}
          animate={{ scale: 1 - idx * 0.04, rotate: idx ? (idx % 2 ? 3 : -3) : 0 }}
          onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) setLeft(l => l.slice(1)); }}>
          {c.p ? <img src={c.p} alt="" /> : <div className="ph">📸</div>}
          <div className="cap">Moment {c.n + 1}</div>
        </motion.div>)}
    </div>
    {left.length > 0 && <button className="btn" onClick={() => setLeft(l => l.slice(1))}>Next card →</button>}
    {left.length === 0 && <button className="btn" onClick={done}>Next</button>}</>;
}

function Letter({ pet = 'bunny', title, text, btn, done }) {
  const [open, setOpen] = useState(false);
  return <>
    <h2>{title}</h2>
    {!open ? <motion.div className="big" style={{ cursor: 'pointer' }} whileTap={{ scale: 0.9 }} onClick={() => setOpen(true)}>💌</motion.div>
      : <motion.div className="letterwrap" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}><div className="letter">{text}</div><div className="corner"><Sticker kind={pet} /></div></motion.div>}
    {open && <button className="btn" onClick={done}>{btn} →</button>}</>;
}