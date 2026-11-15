// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// const SCENES = ['intro', 'stars', 'wish', 'memories', 'letter', 'final'];
// // 6 taare jo milkar heart banate hain (tap karte jao, line judti jaye)
// const PTS = [[50, 90], [10, 38], [28, 14], [50, 34], [72, 14], [90, 38]];
// const COLORS = ['#ff5f9e', '#ffd1e3', '#ffb347', '#ffffff'];
// const seg = (a, b) => `M${a.join(' ')} L${b.join(' ')}`;

// function fireworks() {
//   const end = Date.now() + 3500;
//   const go = () => {
//     confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors: COLORS });
//     confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors: COLORS });
//     if (Date.now() < end) requestAnimationFrame(go);
//   };
//   go();
//   confetti({ particleCount: 160, spread: 120, origin: { y: 0.55 }, colors: COLORS });
// }

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, pet = card.options?.friendSticker || 'bunny';
//   const Btn = ({ children, onClick = next }) => <button className="px-btn" onClick={onClick}>{children}</button>;

//   useEffect(() => {
//     if (s !== 'final') return;
//     const id = setTimeout(fireworks, 500);
//     return () => clearTimeout(id);
//   }, [s, k]);

//   return <main className="px">
//     <Sky /><Hearts />
//     <div className="px-dots">{SCENES.map((_, n) => <i key={n} className={n <= i ? 'on' : ''} />)}</div>
//     <AnimatePresence mode="wait">
//       <motion.section key={s + k} className="px-scene"
//         initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.96 }} animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
//         exit={{ opacity: 0, filter: 'blur(14px)' }} transition={{ duration: 0.6 }}>
//         {s === 'intro' && <>
//           <div className="px-glow">💖</div>
//           <h1><Typed text={t.intro} /></h1>
//           <p>{t.intro2}</p>
//           <Btn>Begin ✨</Btn></>}
//         {s === 'stars' && <Stars title={t.starsTitle} reasons={[t.r1, t.r2, t.r3, t.r4, t.r5, t.r6]} done={next} />}
//         {s === 'wish' && <Wish title={t.wishTitle} hint={t.wishHint} done={next} />}
//         {s === 'memories' && <Reel photos={card.photos || []} title={t.momentsTitle} done={next} />}
//         {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//         {s === 'final' && <>
//           <div className="px-pets"><Sticker kind={pet} /></div>
//           <h1>{t.finalTitle} ❤️</h1><p>{t.finalSub}</p>
//           <Btn onClick={() => { setI(0); setK(x => x + 1); }}>Replay</Btn></>}
//       </motion.section>
//     </AnimatePresence>
//   </main>;
// }

// function Sky() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const c = ref.current, x = c.getContext('2d'); let w, h, raf, shoot = null;
//     const fit = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
//     fit(); addEventListener('resize', fit);
//     const stars = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.3, p: Math.random() * 6 }));
//     const draw = t => {
//       x.clearRect(0, 0, w, h); x.fillStyle = '#fff';
//       for (const st of stars) { x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t / 1200 + st.p)); x.beginPath(); x.arc(st.x * w, st.y * h, st.r, 0, 7); x.fill(); }
//       if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, l: 0 };
//       if (shoot) {
//         shoot.l += 9; x.globalAlpha = Math.max(1 - shoot.l / 160, 0); x.strokeStyle = '#ffd6e6'; x.lineWidth = 2;
//         x.beginPath(); x.moveTo(shoot.x + shoot.l, shoot.y + shoot.l * 0.6); x.lineTo(shoot.x + shoot.l - 50, shoot.y + (shoot.l - 50) * 0.6); x.stroke();
//         if (shoot.l > 160) shoot = null;
//       }
//       raf = requestAnimationFrame(draw);
//     };
//     raf = requestAnimationFrame(draw);
//     return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); };
//   }, []);
//   return <canvas ref={ref} className="px-sky" />;
// }

// function Hearts() {
//   const [h, setH] = useState([]); // client par hi random, hydration error se bachne ke liye
//   useEffect(() => { setH(Array.from({ length: 14 }, (_, n) => ({ n, l: Math.random() * 100, d: 8 + Math.random() * 8, s: Math.random() * 10, f: 12 + Math.random() * 16 }))); }, []);
//   return h.map(x => <span key={x.n} className="px-heart" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.n % 3 ? '💗' : '✨'}</span>);
// }

// function Typed({ text }) {
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     if (n >= text.length) return;
//     const id = setTimeout(() => setN(n + 1), 55);
//     return () => clearTimeout(id);
//   }, [n, text]);
//   return <>{text.slice(0, n)}<span className="px-caret" /></>;
// }

// function Stars({ title, reasons, done }) {
//   const [n, setN] = useState(0);
//   const all = n >= PTS.length;
//   const tap = idx => { if (idx === n) setN(n + 1); };
//   return <>
//     <h2>{title}</h2>
//     <svg viewBox="0 0 100 100" className="px-svg">
//       {all && <motion.path d={'M' + PTS.map(p => p.join(' ')).join(' L') + 'Z'} fill="#ff5f9e33" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />}
//       {PTS.slice(1, n).map((p, j) => <motion.path key={j} d={seg(PTS[j], p)} stroke="#ff8fb5" strokeWidth=".8" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />)}
//       {all && <motion.path d={seg(PTS[5], PTS[0])} stroke="#ff8fb5" strokeWidth=".8" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />}
//       {PTS.map(([x, y], idx) => <g key={idx} onClick={() => tap(idx)} style={{ cursor: idx === n ? 'pointer' : 'default' }}>
//         <circle cx={x} cy={y} r="9" fill="transparent" />
//         <motion.circle cx={x} cy={y} r={idx < n ? 3.2 : 2} fill={idx < n ? '#ffd1e3' : '#fff'} style={{ filter: 'drop-shadow(0 0 3px #ff8fb5)' }}
//           animate={idx === n ? { opacity: [1, 0.3, 1] } : { opacity: 1 }} transition={{ repeat: Infinity, duration: 1.2 }} />
//       </g>)}
//     </svg>
//     <div className="px-reason"><AnimatePresence mode="wait">
//       <motion.p key={n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
//         {n === 0 ? 'Chamakte taare par tap karo ✨' : reasons[n - 1]}</motion.p></AnimatePresence></div>
//     {all && <button className="px-btn" onClick={done}>Next</button>}</>;
// }

// function Wish({ title, hint, done }) {
//   const [p, setP] = useState(0), [sent, setSent] = useState(false), tm = useRef();
//   const start = () => { if (!sent) { clearInterval(tm.current); tm.current = setInterval(() => setP(v => v + 2.2), 30); } };
//   const stop = () => { clearInterval(tm.current); if (!sent) setP(0); };
//   useEffect(() => () => clearInterval(tm.current), []);
//   useEffect(() => {
//     if (p < 100 || sent) return;
//     clearInterval(tm.current); setSent(true);
//     confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 }, scalar: 2, shapes: [confetti.shapeFromText({ text: '❤️', scalar: 2 })] });
//   }, [p]);
//   return <>
//     <h2>{title}</h2><p>{hint}</p>
//     <div className="px-wish" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={e => e.preventDefault()}>
//       <svg viewBox="0 0 100 100">
//         <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff22" strokeWidth="4" />
//         <circle cx="50" cy="50" r="46" fill="none" stroke="#ff8fb5" strokeWidth="4" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 * (1 - Math.min(p, 100) / 100)} />
//       </svg>
//       <span style={{ transform: `scale(${1 + Math.min(p, 100) / 300})` }}>{sent ? '✨' : '❤️'}</span>
//       {sent && <motion.div className="px-lantern" initial={{ y: 0, opacity: 1 }} animate={{ y: -420, opacity: 0, scale: 0.5 }} transition={{ duration: 3.5 }}>🏮</motion.div>}
//     </div>
//     {sent && <motion.button className="px-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={done}>Next</motion.button>}</>;
// }

// function Reel({ photos, title, done }) {
//   const items = photos.length ? photos : [null, null, null];
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     const id = setInterval(() => setN(v => (v + 1) % items.length), 3200);
//     return () => clearInterval(id);
//   }, [items.length]);
//   return <>
//     <h2>{title}</h2>
//     <div className="px-reel"><AnimatePresence mode="wait">
//       <motion.div key={n} className="px-pol" initial={{ opacity: 0, x: 80, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: n % 2 ? 2 : -2 }}
//         exit={{ opacity: 0, x: -80, rotate: -6 }} transition={{ duration: 0.6 }}>
//         <div className="im">{items[n] ? <img src={items[n]} alt="" /> : '📸'}</div><b>Moment {n + 1}</b>
//       </motion.div></AnimatePresence></div>
//     <button className="px-btn" onClick={done}>Next</button></>;
// }

// function Letter({ title, text, btn, done }) {
//   const [n, setN] = useState(0), box = useRef();
//   const fin = n >= text.length;
//   useEffect(() => {
//     if (fin) return;
//     const id = setTimeout(() => setN(v => v + 2), 24);
//     return () => clearTimeout(id);
//   }, [n, fin]);
//   useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [n]);
//   return <>
//     <h2>{title}</h2>
//     <div className="px-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="px-caret" />}</div>
//     {fin ? <button className="px-btn" onClick={done}>{btn}</button> : <button className="px-skip" onClick={() => setN(text.length)}>skip</button>}</>;
// }
















// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// // "Our Movie": ticket faado -> parda khule -> trailer -> scratch card -> script letter -> end credits
// const SCENES = ['ticket', 'curtain', 'trailer', 'scratch', 'script', 'credits'];
// const GOLD = ['#e9c46a', '#fff3c4', '#c2182f', '#ffffff'];
// const boom = () => confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: GOLD });

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
//   const lines = ['Har kahani me ek khaas insaan hota hai...', t.r1, t.r2, t.r3, t.r4, t.r5, `Aur is kahani ke hero hain ${name}.`];
//   return <main className="cx">
//     <div className="cx-grain" />
//     <AnimatePresence mode="wait">
//       <motion.section key={s + k} className="cx-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
//         {s === 'ticket' && <Ticket name={name} date={card.birthDate} done={next} />}
//         {s === 'curtain' && <Poster t={t} pet={pet} name={name} done={next} />}
//         {s === 'trailer' && <Trailer lines={lines} photos={card.photos || []} done={next} />}
//         {s === 'scratch' && <Scratch secret={t.r6} done={next} />}
//         {s === 'script' && <Script title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//         {s === 'credits' && <Credits t={t} name={name} pet={pet} replay={() => { setI(0); setK(x => x + 1); }} />}
//       </motion.section>
//     </AnimatePresence>
//   </main>;
// }

// function Ticket({ name, date, done }) {
//   const [torn, setTorn] = useState(false);
//   const tear = () => { if (torn) return; setTorn(true); setTimeout(done, 900); };
//   return <>
//     <p className="cx-dim">Aaj ki special screening ka ticket aaya hai</p>
//     <div className="cx-ticket">
//       <div className="cx-main">
//         <small>Admit one</small>
//         <h2>{name} ka Birthday</h2>
//         <p>{date?.day} {date?.month}, Screen 1, Seat: mere bagal me</p>
//       </div>
//       <motion.div className="cx-stub" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
//         onDragEnd={(_, inf) => { if (inf.offset.x > 60) tear(); }} onClick={tear}
//         animate={torn ? { x: 340, y: -70, rotate: 28, opacity: 0 } : {}} transition={{ duration: 0.7 }}>Faado</motion.div>
//     </div>
//     <p className="cx-dim">Stub ko kheenchke faado</p></>;
// }

// function Poster({ t, name, pet, done }) {
//   const [open, setOpen] = useState(false);
//   useEffect(() => { const id = setTimeout(() => setOpen(true), 700); return () => clearTimeout(id); }, []);
//   return <>
//     <div className="cx-poster">
//       <small>Ek Birthday Production</small>
//       <h1>{t.intro}</h1>
//       <div className="cx-pets"><Sticker kind={pet} /></div>
//       <p className="cx-tag">{t.intro2}</p>
//       <small>Starring {name}</small>
//     </div>
//     <button className="cx-btn" onClick={done}>Trailer dekho</button>
//     <motion.div className="cx-curtain l" initial={{ x: 0 }} animate={{ x: open ? '-101%' : 0 }} transition={{ duration: 1.6, ease: [0.7, 0, 0.2, 1] }} />
//     <motion.div className="cx-curtain r" initial={{ x: 0 }} animate={{ x: open ? '101%' : 0 }} transition={{ duration: 1.6, ease: [0.7, 0, 0.2, 1] }} /></>;
// }

// function Trailer({ lines, photos, done }) {
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     const id = setTimeout(() => (n >= lines.length - 1 ? done() : setN(n + 1)), 2600);
//     return () => clearTimeout(id);
//   }, [n]);
//   const ph = photos.length ? photos[n % photos.length] : null;
//   return <div className="cx-screen">
//     <AnimatePresence mode="wait">
//       <motion.div key={n} className="cx-frame" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
//         {ph && <img src={ph} alt="" className="cx-kb" />}
//         <motion.p initial={{ letterSpacing: '.25em', opacity: 0 }} animate={{ letterSpacing: '.03em', opacity: 1 }} transition={{ duration: 1.8, delay: 0.3 }}>{lines[n]}</motion.p>
//       </motion.div>
//     </AnimatePresence>
//     <div className="cx-bar top" /><div className="cx-bar bot" />
//     <button className="cx-skip" onClick={done}>skip</button>
//   </div>;
// }

// function Scratch({ secret, done }) {
//   const cv = useRef(), down = useRef(false), cnt = useRef(0);
//   const [won, setWon] = useState(false);
//   useEffect(() => {
//     const c = cv.current, x = c.getContext('2d');
//     const g = x.createLinearGradient(0, 0, c.width, c.height);
//     g.addColorStop(0, '#e9c46a'); g.addColorStop(0.5, '#fff0b8'); g.addColorStop(1, '#c9a227');
//     x.fillStyle = g; x.fillRect(0, 0, c.width, c.height);
//     x.fillStyle = '#6b5410'; x.font = '600 22px serif'; x.textAlign = 'center'; x.fillText('Yahan scratch karo', c.width / 2, c.height / 2 + 7);
//   }, []);
//   const scratch = e => {
//     if (!down.current || won) return;
//     const c = cv.current, r = c.getBoundingClientRect(), x = c.getContext('2d');
//     x.globalCompositeOperation = 'destination-out';
//     x.beginPath(); x.arc((e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height, 22, 0, 7); x.fill();
//     if (++cnt.current % 8) return;
//     const d = x.getImageData(0, 0, c.width, c.height).data; let clear = 0;
//     for (let p = 3; p < d.length; p += 160) if (!d[p]) clear++;
//     if (clear / (d.length / 160) > 0.45) { setWon(true); boom(); }
//   };
//   return <>
//     <h2>Ek deleted scene</h2>
//     <p className="cx-dim">Jo film me nahi aaya, wo yahan chhupa hai</p>
//     <div className="cx-scratch">
//       <div className="cx-secret">{secret}</div>
//       <canvas ref={cv} width="300" height="160" className={won ? 'gone' : ''}
//         onPointerDown={e => { down.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
//         onPointerMove={scratch} onPointerUp={() => { down.current = false; }} />
//     </div>
//     {won && <button className="cx-btn" onClick={done}>Aage</button>}</>;
// }

// function Script({ title, text, btn, done }) {
//   const [n, setN] = useState(0), box = useRef();
//   const fin = n >= text.length;
//   useEffect(() => {
//     if (fin) return;
//     const id = setTimeout(() => setN(v => v + 2), 24);
//     return () => clearTimeout(id);
//   }, [n, fin]);
//   useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [n]);
//   return <>
//     <h2>{title}</h2>
//     <div className="cx-page" ref={box}><div className="cx-slug">INT. DIL, RAAT</div>{text.slice(0, n)}{!fin && <span className="cx-caret" />}</div>
//     {fin ? <button className="cx-btn" onClick={done}>{btn}</button> : <button className="cx-link" onClick={() => setN(text.length)}>skip</button>}</>;
// }

// function Credits({ t, name, pet, replay }) {
//   const [end, setEnd] = useState(false);
//   useEffect(() => { const id = setTimeout(() => setEnd(true), 15500); return () => clearTimeout(id); }, []);
//   useEffect(() => { if (end) boom(); }, [end]);
//   const rows = [
//     ['Starring', `${name} as meri sabse favorite insaan`], ['Directed by', 'Main, sirf tumhare liye'],
//     ['Produced by', 'Tumhari muskurahat'], ['Music by', 'Tumhari hansi'],
//     ['Special effects', 'Wo dil ki dhak-dhak'], ['Disclaimer', 'Is film me koi dil toota nahi, sirf chura gaya']
//   ];
//   if (end) return <motion.div className="cx-end" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
//     <div className="cx-pets"><Sticker kind={pet} /></div>
//     <small>The End</small><h1>{t.finalTitle} ❤️</h1><p>{t.finalSub}</p>
//     <button className="cx-btn" onClick={replay}>Replay</button></motion.div>;
//   return <div className="cx-roll">
//     <div className="cx-credits">{rows.map(([a, b]) => <div key={a}><small>{a}</small><p>{b}</p></div>)}</div>
//     <button className="cx-skip" onClick={() => setEnd(true)}>skip</button></div>;
// }










'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sticker } from './Art';
import './premium.css';

// "Love Story": khat ka seal todo -> kahani ke pages -> do dil milao -> heart yaadein -> letter -> finale
const SCENES = ['seal', 'story', 'meet', 'photos', 'letter', 'final'];
const HEART = 'M50 88 C10 55 0 30 0 20 C0 8 10 0 22 0 C34 0 45 8 50 18 C55 8 66 0 78 0 C90 0 100 8 100 20 C100 30 90 55 50 88Z';
const COL = ['#ffd6e0', '#ff7aa8', '#ffe29a', '#ffffff'];
function love() {
  let shapes;
  try { shapes = [confetti.shapeFromText({ text: '💗', scalar: 2 }), 'circle']; } catch (e) { /* default shapes */ }
  confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 }, colors: COL, scalar: 2, shapes });
}

export default function PremiumExperience({ card }) {
  const [i, setI] = useState(0), [k, setK] = useState(0);
  const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
  const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
  const chapters = [t.r1, t.r2, t.r3, t.r4, t.r5, t.r6];
  return <main className="rx">
    <div className="rx-sun" /><Petals dense={s === 'final'} />
    {/* exit animation hata di: scene badalte waqt screen khali reh jati thi */}
    <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {s === 'seal' && <Seal t={t} done={next} />}
        {s === 'story' && <Story chapters={chapters} done={next} />}
        {s === 'meet' && <Meet pet={pet} done={next} />}
        {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle} done={next} />}
        {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
        {s === 'final' && <Final name={name} t={t} replay={() => { setI(0); setK(x => x + 1); }} />}
    </motion.section>
  </main>;
}

function Petals({ dense }) {
  const [p, setP] = useState([]); // client par hi random (hydration error se bachne ke liye)
  useEffect(() => {
    setP(Array.from({ length: dense ? 34 : 18 }, (_, n) => ({ n, l: Math.random() * 100, d: 9 + Math.random() * 9, s: -Math.random() * 14, f: 14 + Math.random() * 18, e: ['🌹', '🌸', '💗'][n % 3] })));
  }, [dense]);
  return p.map(x => <span key={(dense ? 'd' : 'n') + x.n} className="rx-petal" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.e}</span>);
}

function Seal({ t, done }) {
  const [open, setOpen] = useState(false);
  return <>
    <p className="rx-hand">{t.intro2}</p>
    <div className="rx-env" onClick={() => setOpen(true)}>
      <div className="rx-back" />
      <motion.div className="rx-paper" animate={{ y: open ? -120 : 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
        <b>{t.intro}</b><span>💌</span></motion.div>
      <div className="rx-front" />
      <motion.div className="rx-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 4 }} transition={{ duration: 0.7 }} />
      <motion.div className="rx-wax" animate={open ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
        transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6 }}>♥</motion.div>
    </div>
    {open
      ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Kahani shuru karo</motion.button>
      : <p className="rx-small">Seal par tap karo</p>}</>;
}

function Story({ chapters, done }) {
  const [n, setN] = useState(0);
  const last = n >= chapters.length - 1;
  return <>
    <h2>Hamari kahani</h2>
    <div className="rx-book"><AnimatePresence mode="wait">
      <motion.div key={n} className="rx-page" style={{ transformPerspective: 900, transformOrigin: 'left center' }}
        initial={{ rotateY: 80, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -80, opacity: 0 }} transition={{ duration: 0.55 }}>
        <small>Adhyay {n + 1}</small><p>{chapters[n]}</p><span>🌹</span>
      </motion.div></AnimatePresence></div>
    <div className="rx-hearts">{chapters.map((_, x) => <i key={x} className={x <= n ? 'on' : ''}>♥</i>)}</div>
    <button className="rx-btn" onClick={() => (last ? done() : setN(n + 1))}>{last ? 'Aage badho' : 'Page palto'}</button></>;
}

function Meet({ pet, done }) {
  const lx = useMotionValue(0), rx = useMotionValue(0), [met, setMet] = useState(false);
  const other = pet === 'bear' ? 'bunny' : 'bear';
  useEffect(() => {
    const chk = () => { if (lx.get() >= 55 && rx.get() <= -55) setMet(true); };
    const a = lx.on('change', chk), b = rx.on('change', chk);
    return () => { a(); b(); };
  }, []);
  useEffect(() => {
    if (!met) return;
    love();
    const id = setTimeout(done, 3500); // button na dabe to bhi apne aap aage badh jaye
    return () => clearTimeout(id);
  }, [met]);
  return <>
    <h2>{met ? 'Aakhir mil gaye ❤️' : 'Dono ko paas laao'}</h2>
    <div className="rx-stage">
      <motion.div className="rx-pal l" style={{ x: lx }} drag={met ? false : 'x'} dragConstraints={{ left: 0, right: 90 }} dragElastic={0} dragMomentum={false}><Sticker kind={pet} /></motion.div>
      <motion.div className="rx-pal r" style={{ x: rx }} drag={met ? false : 'x'} dragConstraints={{ left: -90, right: 0 }} dragElastic={0} dragMomentum={false}><Sticker kind={other} /></motion.div>
      {met && <motion.div className="rx-bigheart" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: -60 }}>💖</motion.div>}
    </div>
    <p className="rx-small">{met ? 'Ab inhe koi juda nahi kar sakta' : 'Ek-ek ko pakdo aur khiskao'}</p>
    {met ? <button className="rx-btn" onClick={done}>Aage badho</button> : <button className="rx-link" onClick={done}>skip</button>}</>;
}

function Gallery({ photos, title, done }) {
  const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
  const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
  return <>
    <h2>{title}</h2>
    <button className="rx-btn" onClick={done}>Aage</button>
    <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
      animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
      <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
      <g clipPath={`url(#hc${n})`}>
        {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
      </g>
      <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
    </motion.svg>)}</div></>;
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
    <div className="rx-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="rx-caret" />}</div>
    {fin ? <button className="rx-btn" onClick={done}>{btn}</button> : <button className="rx-link" onClick={() => setN(text.length)}>skip</button>}</>;
}

function Final({ name, t, replay }) {
  useEffect(() => {
    const a = setTimeout(love, 500), b = setTimeout(love, 1500);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  return <>
    <motion.svg viewBox="0 0 100 90" className="rx-bigsvg" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
      <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
      <path d={HEART} fill="url(#fg)" />
      <text x="50" y="46" textAnchor="middle" className="rx-hname" fontSize={Math.min(16, 120 / Math.max(name.length, 1))}>{name}</text>
    </motion.svg>
    <h1>{t.finalTitle}</h1><p className="rx-hand">{t.finalSub}</p>
    <button className="rx-btn" onClick={replay}>Phir se dekho</button></>;
}