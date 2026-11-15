'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sticker } from './Art';
import './premium.css';

const SCENES = ['intro', 'stars', 'wish', 'memories', 'letter', 'final'];
// 6 taare jo milkar heart banate hain (tap karte jao, line judti jaye)
const PTS = [[50, 90], [10, 38], [28, 14], [50, 34], [72, 14], [90, 38]];
const COLORS = ['#ff5f9e', '#ffd1e3', '#ffb347', '#ffffff'];
const seg = (a, b) => `M${a.join(' ')} L${b.join(' ')}`;

function fireworks() {
  const end = Date.now() + 3500;
  const go = () => {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors: COLORS });
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(go);
  };
  go();
  confetti({ particleCount: 160, spread: 120, origin: { y: 0.55 }, colors: COLORS });
}

export default function PremiumExperience({ card }) {
  const [i, setI] = useState(0), [k, setK] = useState(0);
  const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
  const s = SCENES[i], t = card.texts, pet = card.options?.friendSticker || 'bunny';
  const Btn = ({ children, onClick = next }) => <button className="px-btn" onClick={onClick}>{children}</button>;

  useEffect(() => {
    if (s !== 'final') return;
    const id = setTimeout(fireworks, 500);
    return () => clearTimeout(id);
  }, [s, k]);

  return <main className="px">
    <Sky /><Hearts />
    <div className="px-dots">{SCENES.map((_, n) => <i key={n} className={n <= i ? 'on' : ''} />)}</div>
    <AnimatePresence mode="wait">
      <motion.section key={s + k} className="px-scene"
        initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.96 }} animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        exit={{ opacity: 0, filter: 'blur(14px)' }} transition={{ duration: 0.6 }}>
        {s === 'intro' && <>
          <div className="px-glow">💖</div>
          <h1><Typed text={t.intro} /></h1>
          <p>{t.intro2}</p>
          <Btn>Begin ✨</Btn></>}
        {s === 'stars' && <Stars title={t.starsTitle} reasons={[t.r1, t.r2, t.r3, t.r4, t.r5, t.r6]} done={next} />}
        {s === 'wish' && <Wish title={t.wishTitle} hint={t.wishHint} done={next} />}
        {s === 'memories' && <Reel photos={card.photos || []} title={t.momentsTitle} done={next} />}
        {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
        {s === 'final' && <>
          <div className="px-pets"><Sticker kind={pet} /></div>
          <h1>{t.finalTitle} ❤️</h1><p>{t.finalSub}</p>
          <Btn onClick={() => { setI(0); setK(x => x + 1); }}>Replay</Btn></>}
      </motion.section>
    </AnimatePresence>
  </main>;
}

function Sky() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'); let w, h, raf, shoot = null;
    const fit = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    fit(); addEventListener('resize', fit);
    const stars = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.3, p: Math.random() * 6 }));
    const draw = t => {
      x.clearRect(0, 0, w, h); x.fillStyle = '#fff';
      for (const st of stars) { x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t / 1200 + st.p)); x.beginPath(); x.arc(st.x * w, st.y * h, st.r, 0, 7); x.fill(); }
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, l: 0 };
      if (shoot) {
        shoot.l += 9; x.globalAlpha = Math.max(1 - shoot.l / 160, 0); x.strokeStyle = '#ffd6e6'; x.lineWidth = 2;
        x.beginPath(); x.moveTo(shoot.x + shoot.l, shoot.y + shoot.l * 0.6); x.lineTo(shoot.x + shoot.l - 50, shoot.y + (shoot.l - 50) * 0.6); x.stroke();
        if (shoot.l > 160) shoot = null;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); };
  }, []);
  return <canvas ref={ref} className="px-sky" />;
}

function Hearts() {
  const [h, setH] = useState([]); // client par hi random, hydration error se bachne ke liye
  useEffect(() => { setH(Array.from({ length: 14 }, (_, n) => ({ n, l: Math.random() * 100, d: 8 + Math.random() * 8, s: Math.random() * 10, f: 12 + Math.random() * 16 }))); }, []);
  return h.map(x => <span key={x.n} className="px-heart" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.n % 3 ? '💗' : '✨'}</span>);
}

function Typed({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN(n + 1), 55);
    return () => clearTimeout(id);
  }, [n, text]);
  return <>{text.slice(0, n)}<span className="px-caret" /></>;
}

function Stars({ title, reasons, done }) {
  const [n, setN] = useState(0);
  const all = n >= PTS.length;
  const tap = idx => { if (idx === n) setN(n + 1); };
  return <>
    <h2>{title}</h2>
    <svg viewBox="0 0 100 100" className="px-svg">
      {all && <motion.path d={'M' + PTS.map(p => p.join(' ')).join(' L') + 'Z'} fill="#ff5f9e33" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />}
      {PTS.slice(1, n).map((p, j) => <motion.path key={j} d={seg(PTS[j], p)} stroke="#ff8fb5" strokeWidth=".8" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />)}
      {all && <motion.path d={seg(PTS[5], PTS[0])} stroke="#ff8fb5" strokeWidth=".8" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
      {PTS.map(([x, y], idx) => <g key={idx} onClick={() => tap(idx)} style={{ cursor: idx === n ? 'pointer' : 'default' }}>
        <circle cx={x} cy={y} r="9" fill="transparent" />
        <motion.circle cx={x} cy={y} r={idx < n ? 3.2 : 2} fill={idx < n ? '#ffd1e3' : '#fff'} style={{ filter: 'drop-shadow(0 0 3px #ff8fb5)' }}
          animate={idx === n ? { opacity: [1, 0.3, 1] } : { opacity: 1 }} transition={{ repeat: Infinity, duration: 1.2 }} />
      </g>)}
    </svg>
    <div className="px-reason"><AnimatePresence mode="wait">
      <motion.p key={n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        {n === 0 ? 'Chamakte taare par tap karo ✨' : reasons[n - 1]}</motion.p></AnimatePresence></div>
    {all && <button className="px-btn" onClick={done}>Next</button>}</>;
}

function Wish({ title, hint, done }) {
  const [p, setP] = useState(0), [sent, setSent] = useState(false), tm = useRef();
  const start = () => { if (!sent) { clearInterval(tm.current); tm.current = setInterval(() => setP(v => v + 2.2), 30); } };
  const stop = () => { clearInterval(tm.current); if (!sent) setP(0); };
  useEffect(() => () => clearInterval(tm.current), []);
  useEffect(() => {
    if (p < 100 || sent) return;
    clearInterval(tm.current); setSent(true);
    confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 }, scalar: 2, shapes: [confetti.shapeFromText({ text: '❤️', scalar: 2 })] });
  }, [p]);
  return <>
    <h2>{title}</h2><p>{hint}</p>
    <div className="px-wish" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={e => e.preventDefault()}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff22" strokeWidth="4" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="#ff8fb5" strokeWidth="4" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 * (1 - Math.min(p, 100) / 100)} />
      </svg>
      <span style={{ transform: `scale(${1 + Math.min(p, 100) / 300})` }}>{sent ? '✨' : '❤️'}</span>
      {sent && <motion.div className="px-lantern" initial={{ y: 0, opacity: 1 }} animate={{ y: -420, opacity: 0, scale: 0.5 }} transition={{ duration: 3.5 }}>🏮</motion.div>}
    </div>
    {sent && <motion.button className="px-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={done}>Next</motion.button>}</>;
}

function Reel({ photos, title, done }) {
  const items = photos.length ? photos : [null, null, null];
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN(v => (v + 1) % items.length), 3200);
    return () => clearInterval(id);
  }, [items.length]);
  return <>
    <h2>{title}</h2>
    <div className="px-reel"><AnimatePresence mode="wait">
      <motion.div key={n} className="px-pol" initial={{ opacity: 0, x: 80, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: n % 2 ? 2 : -2 }}
        exit={{ opacity: 0, x: -80, rotate: -6 }} transition={{ duration: 0.6 }}>
        <div className="im">{items[n] ? <img src={items[n]} alt="" /> : '📸'}</div><b>Moment {n + 1}</b>
      </motion.div></AnimatePresence></div>
    <button className="px-btn" onClick={done}>Next</button></>;
}

function Letter({ title, text, btn, done }) {
  const [n, setN] = useState(0), box = useRef();
  const fin = n >= text.length;
  useEffect(() => {
    if (fin) return;
    const id = setTimeout(() => setN(v => v + 2), 24);
    return () => clearTimeout(id);
  }, [n, fin]);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [n]);
  return <>
    <h2>{title}</h2>
    <div className="px-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="px-caret" />}</div>
    {fin ? <button className="px-btn" onClick={done}>{btn}</button> : <button className="px-skip" onClick={() => setN(text.length)}>skip</button>}</>;
}