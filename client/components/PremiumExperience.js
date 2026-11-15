

// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// // Flow: lifafa -> heart par teer -> cake gir ke bane -> candle phoonk -> Little Moments (dil me photos)
// //       -> wish (hold) -> memory tree (photo frames) -> letter -> last surprise
// const SCENES = ['seal', 'arrows', 'cake', 'candle', 'photos', 'wish', 'tree', 'letter', 'final'];
// const HEART = 'M50 88 C10 55 0 30 0 20 C0 8 10 0 22 0 C34 0 45 8 50 18 C55 8 66 0 78 0 C90 0 100 8 100 20 C100 30 90 55 50 88Z';
// const COL = ['#ffd6e0', '#ff7aa8', '#ffe29a', '#ffffff'];
// function love() {
//   let shapes;
//   try { shapes = [confetti.shapeFromText({ text: '💗', scalar: 2 }), 'circle']; } catch (e) { /* default shapes */ }
//   confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 }, colors: COL, scalar: 2, shapes });
// }

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
//   return <main className="rx">
//     <div className="rx-sun" /><Petals dense={s === 'final'} />
//     <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//       {s === 'seal' && <Seal t={t} done={next} />}
//       {s === 'arrows' && <Arrows t={t} name={name} done={next} />}
//       {s === 'cake' && <CakeBuild done={next} />}
//       {s === 'candle' && <Candle done={next} />}
//       {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle || 'Little Moments'} done={next} />}
//       {s === 'wish' && <Wish title={t.wishTitle || 'Make a wish'} hint={t.wishHint || 'Press and hold the heart'} done={next} />}
//       {s === 'tree' && <Tree photos={card.treePhotos || []} done={next} />}
//       {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//       {s === 'final' && <Final name={name} t={t} replay={() => { setI(0); setK(x => x + 1); }} />}
//     </motion.section>
//   </main>;
// }

// function Petals({ dense }) {
//   const [p, setP] = useState([]); // client par hi random (hydration error se bachne ke liye)
//   useEffect(() => {
//     setP(Array.from({ length: dense ? 34 : 18 }, (_, n) => ({ n, l: Math.random() * 100, d: 9 + Math.random() * 9, s: -Math.random() * 14, f: 14 + Math.random() * 18, e: ['🌹', '🌸', '💗'][n % 3] })));
//   }, [dense]);
//   return p.map(x => <span key={(dense ? 'd' : 'n') + x.n} className="rx-petal" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.e}</span>);
// }

// /* ---------- 1. Lifafa (same as before) ---------- */
// function Seal({ t, done }) {
//   const [open, setOpen] = useState(false);
//   return <>
//     <p className="rx-hand">{t.intro2}</p>
//     <div className="rx-env" onClick={() => setOpen(true)}>
//       <div className="rx-back" />
//       <motion.div className="rx-paper" animate={{ y: open ? -120 : 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
//         <b>{t.intro}</b><span>💌</span></motion.div>
//       <div className="rx-front" />
//       <motion.div className="rx-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 4 }} transition={{ duration: 0.7 }} />
//       <motion.div className="rx-wax" animate={open ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
//         transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6 }}>♥</motion.div>
//     </div>
//     {open
//       ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Continue</motion.button>
//       : <p className="rx-small">Tap the seal</p>}</>;
// }

// /* ---------- 2. Heart par teer, phir Happy Birthday ---------- */
// const ANGLES = [-22, 165, 68];
// function Arrows({ t, name, done }) {
//   const [n, setN] = useState(0), [boom, setBoom] = useState(false);
//   const timers = useRef([]);
//   useEffect(() => () => timers.current.forEach(clearTimeout), []);
//   const hit = () => {
//     if (boom || n >= 3) return;
//     const m = n + 1; setN(m);
//     if (m === 3) {
//       timers.current.push(setTimeout(() => { setBoom(true); love(); }, 800));
//       timers.current.push(setTimeout(done, 5200));
//     }
//   };
//   return <>
//     <h2>{t.strikeTitle || 'Aim for the heart'}</h2>
//     <div className="rx-hit" onClick={hit}>
//       <motion.svg key={n} viewBox="0 0 100 90" className="rx-hitheart"
//         animate={n ? { scale: [1, 0.82, 1.12, 1] } : { scale: [1, 1.06, 1] }}
//         transition={n ? { duration: 0.45 } : { repeat: Infinity, duration: 1.4 }}>
//         <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//         <path d={HEART} fill="url(#hg)" />
//       </motion.svg>
//       {ANGLES.slice(0, n).map((a, j) => <div key={j} className="rx-arrowwrap" style={{ transform: `rotate(${a}deg)` }}>
//         <motion.svg viewBox="0 0 130 20" className="rx-arrow" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeIn' }}>
//           <line x1="10" y1="10" x2="118" y2="10" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" />
//           <polygon points="116,2 130,10 116,18" fill="#ffd59a" />
//           <polygon points="0,1 16,10 0,19 6,10" fill="#ffffff" />
//         </motion.svg></div>)}
//     </div>
//     <p className="rx-small">{n >= 3 ? '💘' : `Tap the heart to shoot an arrow (${n}/3)`}</p>
//     {boom && typeof document !== 'undefined' && createPortal(
//       <div className="rx-boom">
//         <motion.i className="rx-circle" initial={{ scale: 0 }} animate={{ scale: 34 }} transition={{ duration: 1.1, ease: 'easeIn' }} />
//         <motion.div className="rx-hb" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
//           <small>make a wish...</small><h1>Happy Birthday</h1><b>{name}</b>
//         </motion.div>
//       </div>, document.body)}</>;
// }

// /* ---------- 3. Cake upar se gir ke banta hai ---------- */
// function Piece({ i, build, children }) {
//   if (!build) return <g>{children}</g>;
//   return <motion.g initial={{ y: -360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.4 + i * 0.8 }}>{children}</motion.g>;
// }
// function PinkCake({ lit = false, build = false }) {
//   return <svg viewBox="0 0 200 220" aria-label="cake">
//     <Piece i={0} build={build}><ellipse cx="100" cy="196" rx="88" ry="10" fill="#fff3f7" /><ellipse cx="100" cy="192" rx="80" ry="8" fill="#f6d9e3" /></Piece>
//     <Piece i={1} build={build}><rect x="24" y="138" width="152" height="54" rx="14" fill="#f48fb1" /><rect x="24" y="138" width="152" height="15" rx="8" fill="#fff" />
//       {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="172" r="5" fill="#ffe29a" />)}</Piece>
//     <Piece i={2} build={build}><rect x="44" y="96" width="112" height="44" rx="12" fill="#f7a8c4" /><rect x="44" y="96" width="112" height="13" rx="7" fill="#fff" /></Piece>
//     <Piece i={3} build={build}><rect x="64" y="58" width="72" height="40" rx="11" fill="#f9bfd4" /><rect x="64" y="58" width="72" height="12" rx="6" fill="#fff" />
//       <circle cx="84" cy="86" r="4" fill="#ff7aa8" /><circle cx="116" cy="86" r="4" fill="#ff7aa8" /></Piece>
//     <Piece i={4} build={build}><circle cx="100" cy="52" r="7" fill="#e0245e" /><path d="M100 46 q6 -10 12 -12" stroke="#4f7f5a" strokeWidth="2" fill="none" /></Piece>
//     <Piece i={5} build={build}><rect x="96" y="14" width="8" height="30" rx="3" fill="#ffd166" />
//       {lit && <g className="fl"><ellipse cx="100" cy="6" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="9" rx="3.5" ry="7" fill="#fff3b0" /></g>}</Piece>
//   </svg>;
// }
// function CakeBuild({ done }) {
//   useEffect(() => { const id = setTimeout(done, 6000); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>First things first 🎂</h2>
//     <div className="rx-cake"><PinkCake build /></div>
//     <p className="rx-small">Your cake is being made...</p></>;
// }

// /* ---------- 4. Candle: phoonk maro ya tap karo ---------- */
// function Candle({ done }) {
//   const [lit, setLit] = useState(true);
//   const [msg, setMsg] = useState('');
//   const blow = () => { if (!lit) return; setLit(false); love(); setTimeout(done, 1600); };
//   async function listen() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
//       await ctx.resume();
//       ctx.createMediaStreamSource(stream).connect(an);
//       const buf = new Float32Array(an.fftSize);
//       setMsg('Now blow into the mic...');
//       const t0 = performance.now(); let base = 0, n = 0, hits = 0;
//       const tick = () => {
//         an.getFloatTimeDomainData(buf);
//         let sum = 0; for (const v of buf) sum += v * v;
//         const rms = Math.sqrt(sum / buf.length);
//         if (performance.now() - t0 < 600) { base += rms; n++; }
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
//       setMsg(!navigator.mediaDevices ? 'Mic is not supported in this browser. Open in Chrome/Safari, or tap the cake'
//         : n === 'NotAllowedError' ? "Mic is blocked. Allow Microphone in your browser's site settings, or tap the cake"
//         : 'Mic failed (' + n + '). Tap the cake');
//     }
//   }
//   return <>
//     <h2>Blow the candle</h2>
//     <div className="rx-cake" onClick={blow}><PinkCake lit={lit} /></div>
//     <button className="rx-btn" onClick={listen}>🎤 Blow into the mic</button><div className="rx-small">{msg}</div></>;
// }

// /* ---------- 5. Little Moments (dil me photos) ---------- */
// function Gallery({ photos, title, done }) {
//   const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   return <>
//     <h2>{title}</h2>
//     <button className="rx-btn" onClick={done}>Next</button>
//     <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
//       animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
//       <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
//       <g clipPath={`url(#hc${n})`}>
//         {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
//       </g>
//       <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
//     </motion.svg>)}</div></>;
// }

// /* ---------- 6. Wish: heart ko dabake pakdo, lantern udta hai ---------- */
// function Wish({ title, hint, done }) {
//   const [p, setP] = useState(0), [sent, setSent] = useState(false), tm = useRef();
//   const start = () => { if (!sent) { clearInterval(tm.current); tm.current = setInterval(() => setP(v => v + 2.2), 30); } };
//   const stop = () => { clearInterval(tm.current); if (!sent) setP(0); };
//   useEffect(() => () => clearInterval(tm.current), []);
//   useEffect(() => {
//     if (p < 100 || sent) return;
//     clearInterval(tm.current); setSent(true); love();
//   }, [p]);
//   return <>
//     <h2>{title}</h2><p className="rx-small">{hint}</p>
//     <div className="rx-wish" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={e => e.preventDefault()}>
//       <svg viewBox="0 0 100 100">
//         <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff44" strokeWidth="4" />
//         <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 * (1 - Math.min(p, 100) / 100)} />
//       </svg>
//       <span style={{ transform: `scale(${1 + Math.min(p, 100) / 300})` }}>{sent ? '✨' : '❤️'}</span>
//       {sent && <motion.div className="rx-lantern" initial={{ y: 0, opacity: 1 }} animate={{ y: -420, opacity: 0, scale: 0.5 }} transition={{ duration: 3.5 }}>🏮</motion.div>}
//     </div>
//     {sent && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} onClick={done}>Next</motion.button>}</>;
// }

// /* ---------- 7. Memory tree: video jaisa heart-tree, photo frames latakte hain ---------- */
// const CANOPY = (() => {
//   const out = [];
//   [[1, 40], [0.72, 28], [0.45, 16], [0.2, 6]].forEach(([k, cnt], r) => {
//     for (let n = 0; n < cnt; n++) {
//       const a = (n / cnt) * Math.PI * 2 + r * 0.4;
//       const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
//       out.push({ l: 50 + x * k * 2.6, tp: 38 - y * k * 1.9, f: 13 + ((n * 7 + r * 3) % 9), c: ['#ff9ab8', '#ffb3c6', '#ffe29a', '#ff7aa8'][(n + r) % 4], d: 1.2 + (out.length * 0.035) });
//     }
//   });
//   return out;
// })();
// const FRAMES = [[30, 30, -6], [70, 28, 5], [50, 48, -2], [32, 60, 4], [68, 58, -5]];
// function Tree({ photos, done }) {
//   const [sel, setSel] = useState(null), [ready, setReady] = useState(false);
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   useEffect(() => { const id = setTimeout(() => setReady(true), 4200); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>Our Tree of Memories 🌳</h2>
//     <div className="rx-tree">
//       <svg viewBox="0 0 300 340" className="rx-trunk">
//         <motion.path d="M150 340 C150 290 148 250 150 200 M150 240 C120 220 105 198 85 172 M150 228 C180 208 198 188 215 162 M150 208 C150 182 150 160 150 140"
//           stroke="#5a3a2a" strokeWidth="9" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
//       </svg>
//       {CANOPY.map((h, n) => <span key={n} className="rx-leaf" style={{ left: h.l + '%', top: h.tp + '%', fontSize: h.f, color: h.c, animationDelay: h.d + 's' }}>♥</span>)}
//       {items.map((p, n) => <motion.button key={n} className="rx-frame" style={{ left: FRAMES[n][0] + '%', top: FRAMES[n][1] + '%', rotate: FRAMES[n][2] }}
//         initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 + n * 0.4, type: 'spring' }} onClick={() => setSel(p || 'ph')}>
//         {p ? <img src={p} alt="" /> : <span>📸</span>}</motion.button>)}
//     </div>
//     <p className="rx-small">Tap any frame</p>
//     {ready && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={done}>Next</motion.button>}
//     {sel && typeof document !== 'undefined' && createPortal(
//       <div className="rx-zoom" onClick={() => setSel(null)}>
//         <div className="rx-zoomcard">{sel === 'ph' ? <span>📸</span> : <img src={sel} alt="" />}</div></div>, document.body)}</>;
// }

// /* ---------- 8. Letter + 9. Final (same as before) ---------- */
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
//     <div className="rx-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="rx-caret" />}</div>
//     {fin ? <button className="rx-btn" onClick={done}>{btn}</button> : <button className="rx-link" onClick={() => setN(text.length)}>skip</button>}</>;
// }

// function Final({ name, t, replay }) {
//   useEffect(() => {
//     const a = setTimeout(love, 500), b = setTimeout(love, 1500);
//     return () => { clearTimeout(a); clearTimeout(b); };
//   }, []);
//   return <>
//     <motion.svg viewBox="0 0 100 90" className="rx-bigsvg" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
//       <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//       <path d={HEART} fill="url(#fg)" />
//       <text x="50" y="46" textAnchor="middle" className="rx-hname" fontSize={Math.min(16, 120 / Math.max(name.length, 1))}>{name}</text>
//     </motion.svg>
//     <h1>{t.finalTitle}</h1><p className="rx-hand">{t.finalSub}</p>
//     <button className="rx-btn" onClick={replay}>Watch again</button></>;
// }











// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// // Flow: lifafa -> heart par teer -> cake gir ke bane -> candle phoonk -> Little Moments (dil me photos)
// //       -> catch the hearts (game) -> memory tree (photo frames) -> letter -> last surprise
// const SCENES = ['seal', 'arrows', 'cake', 'candle', 'photos', 'catch', 'tree', 'letter', 'final'];
// const HEART = 'M50 88 C10 55 0 30 0 20 C0 8 10 0 22 0 C34 0 45 8 50 18 C55 8 66 0 78 0 C90 0 100 8 100 20 C100 30 90 55 50 88Z';
// const COL = ['#ffd6e0', '#ff7aa8', '#ffe29a', '#ffffff'];
// function love() {
//   let shapes;
//   try { shapes = [confetti.shapeFromText({ text: '💗', scalar: 2 }), 'circle']; } catch (e) { /* default shapes */ }
//   confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 }, colors: COL, scalar: 2, shapes });
// }

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
//   return <main className="rx">
//     <div className="rx-sun" /><Petals dense={s === 'final'} />
//     <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//       {s === 'seal' && <Seal t={t} done={next} />}
//       {s === 'arrows' && <Arrows t={t} name={name} done={next} />}
//       {s === 'cake' && <CakeBuild done={next} />}
//       {s === 'candle' && <Candle done={next} />}
//       {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle || 'Little Moments'} done={next} />}
//       {s === 'catch' && <Catch title={t.catchTitle || 'Catch the hearts'} hint={t.catchHint || 'Tap 10 falling hearts'} done={next} />}
//       {s === 'tree' && <Tree photos={card.treePhotos || []} done={next} />}
//       {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//       {s === 'final' && <Final name={name} t={t} replay={() => { setI(0); setK(x => x + 1); }} />}
//     </motion.section>
//   </main>;
// }

// function Petals({ dense }) {
//   const [p, setP] = useState([]); // client par hi random (hydration error se bachne ke liye)
//   useEffect(() => {
//     setP(Array.from({ length: dense ? 34 : 18 }, (_, n) => ({ n, l: Math.random() * 100, d: 9 + Math.random() * 9, s: -Math.random() * 14, f: 14 + Math.random() * 18, e: ['🌹', '🌸', '💗'][n % 3] })));
//   }, [dense]);
//   return p.map(x => <span key={(dense ? 'd' : 'n') + x.n} className="rx-petal" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.e}</span>);
// }

// /* ---------- 1. Lifafa (same as before) ---------- */
// function Seal({ t, done }) {
//   const [open, setOpen] = useState(false);
//   return <>
//     <p className="rx-hand">{t.intro2}</p>
//     <div className="rx-env" onClick={() => setOpen(true)}>
//       <div className="rx-back" />
//       <motion.div className="rx-paper" animate={{ y: open ? -120 : 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
//         <b>{t.intro}</b><span>💌</span></motion.div>
//       <div className="rx-front" />
//       <motion.div className="rx-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 4 }} transition={{ duration: 0.7 }} />
//       <motion.div className="rx-wax" animate={open ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
//         transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6 }}>♥</motion.div>
//     </div>
//     {open
//       ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Continue</motion.button>
//       : <p className="rx-small">Tap the seal</p>}</>;
// }

// /* ---------- 2. Heart par teer, phir Happy Birthday ---------- */
// const ANGLES = [-22, 165, 68];
// function Arrows({ t, name, done }) {
//   const [n, setN] = useState(0), [boom, setBoom] = useState(false);
//   const timers = useRef([]);
//   useEffect(() => () => timers.current.forEach(clearTimeout), []);
//   const hit = () => {
//     if (boom || n >= 3) return;
//     const m = n + 1; setN(m);
//     if (m === 3) {
//       timers.current.push(setTimeout(() => { setBoom(true); love(); }, 800));
//       timers.current.push(setTimeout(done, 5200));
//     }
//   };
//   return <>
//     <h2>{t.strikeTitle || 'Aim for the heart'}</h2>
//     <div className="rx-hit" onClick={hit}>
//       <motion.svg key={n} viewBox="0 0 100 90" className="rx-hitheart"
//         animate={n ? { scale: [1, 0.82, 1.12, 1] } : { scale: [1, 1.06, 1] }}
//         transition={n ? { duration: 0.45 } : { repeat: Infinity, duration: 1.4 }}>
//         <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//         <path d={HEART} fill="url(#hg)" />
//       </motion.svg>
//       {ANGLES.slice(0, n).map((a, j) => <div key={j} className="rx-arrowwrap" style={{ transform: `rotate(${a}deg)` }}>
//         <motion.svg viewBox="0 0 130 20" className="rx-arrow" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeIn' }}>
//           <line x1="10" y1="10" x2="118" y2="10" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" />
//           <polygon points="116,2 130,10 116,18" fill="#ffd59a" />
//           <polygon points="0,1 16,10 0,19 6,10" fill="#ffffff" />
//         </motion.svg></div>)}
//     </div>
//     <p className="rx-small">{n >= 3 ? '💘' : `Tap the heart to shoot an arrow (${n}/3)`}</p>
//     {boom && typeof document !== 'undefined' && createPortal(
//       <div className="rx-boom">
//         <motion.i className="rx-circle" initial={{ scale: 0 }} animate={{ scale: 34 }} transition={{ duration: 1.1, ease: 'easeIn' }} />
//         <motion.div className="rx-hb" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
//           <small>make a wish...</small><h1>Happy Birthday</h1><b>{name}</b>
//         </motion.div>
//       </div>, document.body)}</>;
// }

// /* ---------- 3. Cake upar se gir ke banta hai ---------- */
// function Piece({ i, build, children }) {
//   if (!build) return <g>{children}</g>;
//   return <motion.g initial={{ y: -360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.4 + i * 0.8 }}>{children}</motion.g>;
// }
// function PinkCake({ lit = false, build = false }) {
//   return <svg viewBox="0 0 200 220" aria-label="cake">
//     <Piece i={0} build={build}><ellipse cx="100" cy="196" rx="88" ry="10" fill="#fff3f7" /><ellipse cx="100" cy="192" rx="80" ry="8" fill="#f6d9e3" /></Piece>
//     <Piece i={1} build={build}><rect x="24" y="138" width="152" height="54" rx="14" fill="#f48fb1" /><rect x="24" y="138" width="152" height="15" rx="8" fill="#fff" />
//       {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="172" r="5" fill="#ffe29a" />)}</Piece>
//     <Piece i={2} build={build}><rect x="44" y="96" width="112" height="44" rx="12" fill="#f7a8c4" /><rect x="44" y="96" width="112" height="13" rx="7" fill="#fff" /></Piece>
//     <Piece i={3} build={build}><rect x="64" y="58" width="72" height="40" rx="11" fill="#f9bfd4" /><rect x="64" y="58" width="72" height="12" rx="6" fill="#fff" />
//       <circle cx="84" cy="86" r="4" fill="#ff7aa8" /><circle cx="116" cy="86" r="4" fill="#ff7aa8" /></Piece>
//     <Piece i={4} build={build}><circle cx="100" cy="52" r="7" fill="#e0245e" /><path d="M100 46 q6 -10 12 -12" stroke="#4f7f5a" strokeWidth="2" fill="none" /></Piece>
//     <Piece i={5} build={build}><rect x="96" y="14" width="8" height="30" rx="3" fill="#ffd166" />
//       {lit && <g className="fl"><ellipse cx="100" cy="6" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="9" rx="3.5" ry="7" fill="#fff3b0" /></g>}</Piece>
//   </svg>;
// }
// function CakeBuild({ done }) {
//   useEffect(() => { const id = setTimeout(done, 6000); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>First things first 🎂</h2>
//     <div className="rx-cake"><PinkCake build /></div>
//     <p className="rx-small">Your cake is being made...</p></>;
// }

// /* ---------- 4. Candle: phoonk maro ya tap karo ---------- */
// function Candle({ done }) {
//   const [lit, setLit] = useState(true);
//   const [msg, setMsg] = useState('');
//   const blow = () => { if (!lit) return; setLit(false); love(); setTimeout(done, 1600); };
//   async function listen() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
//       await ctx.resume();
//       ctx.createMediaStreamSource(stream).connect(an);
//       const buf = new Float32Array(an.fftSize);
//       setMsg('Now blow into the mic...');
//       const t0 = performance.now(); let base = 0, n = 0, hits = 0;
//       const tick = () => {
//         an.getFloatTimeDomainData(buf);
//         let sum = 0; for (const v of buf) sum += v * v;
//         const rms = Math.sqrt(sum / buf.length);
//         if (performance.now() - t0 < 600) { base += rms; n++; }
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
//       setMsg(!navigator.mediaDevices ? 'Mic is not supported in this browser. Open in Chrome/Safari, or tap the cake'
//         : n === 'NotAllowedError' ? "Mic is blocked. Allow Microphone in your browser's site settings, or tap the cake"
//         : 'Mic failed (' + n + '). Tap the cake');
//     }
//   }
//   return <>
//     <h2>Blow the candle</h2>
//     <div className="rx-cake" onClick={blow}><PinkCake lit={lit} /></div>
//     <button className="rx-btn" onClick={listen}>🎤 Blow into the mic</button><div className="rx-small">{msg}</div></>;
// }

// /* ---------- 5. Little Moments (dil me photos) ---------- */
// function Gallery({ photos, title, done }) {
//   const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   return <>
//     <h2>{title}</h2>
//     <button className="rx-btn" onClick={done}>Next</button>
//     <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
//       animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
//       <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
//       <g clipPath={`url(#hc${n})`}>
//         {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
//       </g>
//       <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
//     </motion.svg>)}</div></>;
// }

// /* ---------- 6. Catch the hearts: girte hue hearts tap karo ---------- */
// function Catch({ title, hint, done }) {
//   const GOAL = 10;
//   const [drops, setDrops] = useState([]), [score, setScore] = useState(0);
//   const id = useRef(0), won = score >= GOAL;
//   useEffect(() => {
//     if (won) return;
//     const iv = setInterval(() => {
//       setDrops(d => d.length > 14 ? d : [...d, { id: ++id.current, x: 6 + Math.random() * 82, dur: 3 + Math.random() * 2.2, e: ['💖', '💗', '🌹', '💝'][Math.floor(Math.random() * 4)] }]);
//     }, 550);
//     return () => clearInterval(iv);
//   }, [won]);
//   useEffect(() => { if (won) { love(); setDrops([]); } }, [won]);
//   const pop = d => { setDrops(x => x.filter(y => y.id !== d.id)); setScore(v => v + 1); };
//   const gone = d => setDrops(x => x.filter(y => y.id !== d.id));
//   return <>
//     <h2>{title}</h2><p className="rx-small">{hint}</p>
//     <div className="rx-score">💖 {Math.min(score, GOAL)} / {GOAL}</div>
//     <div className="rx-catch">
//       {drops.map(d => <button key={d.id} className="rx-drop" style={{ left: d.x + '%', animationDuration: d.dur + 's' }}
//         onPointerDown={() => pop(d)} onAnimationEnd={() => gone(d)}>{d.e}</button>)}
//       {won && <motion.div className="rx-won" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>You caught them all! 🎉</motion.div>}
//     </div>
//     {won && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={done}>Next</motion.button>}</>;
// }

// /* ---------- 7. Memory tree: video jaisa heart-tree, photo frames latakte hain ---------- */
// const CANOPY = (() => {
//   const out = [];
//   [[1, 40], [0.72, 28], [0.45, 16], [0.2, 6]].forEach(([k, cnt], r) => {
//     for (let n = 0; n < cnt; n++) {
//       const a = (n / cnt) * Math.PI * 2 + r * 0.4;
//       const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
//       out.push({ l: 50 + x * k * 2.6, tp: 38 - y * k * 1.9, f: 13 + ((n * 7 + r * 3) % 9), c: ['#ff9ab8', '#ffb3c6', '#ffe29a', '#ff7aa8'][(n + r) % 4], d: 1.2 + (out.length * 0.035) });
//     }
//   });
//   return out;
// })();
// const FRAMES = [[30, 30, -6], [70, 28, 5], [50, 48, -2], [32, 60, 4], [68, 58, -5]];
// function Tree({ photos, done }) {
//   const [sel, setSel] = useState(null), [ready, setReady] = useState(false);
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   useEffect(() => { const id = setTimeout(() => setReady(true), 4200); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>Our Tree of Memories 🌳</h2>
//     <div className="rx-tree">
//       <svg viewBox="0 0 300 340" className="rx-trunk">
//         <motion.path d="M150 340 C150 290 148 250 150 200 M150 240 C120 220 105 198 85 172 M150 228 C180 208 198 188 215 162 M150 208 C150 182 150 160 150 140"
//           stroke="#5a3a2a" strokeWidth="9" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
//       </svg>
//       {CANOPY.map((h, n) => <span key={n} className="rx-leaf" style={{ left: h.l + '%', top: h.tp + '%', fontSize: h.f, color: h.c, animationDelay: h.d + 's' }}>♥</span>)}
//       {items.map((p, n) => <motion.button key={n} className="rx-frame" style={{ left: FRAMES[n][0] + '%', top: FRAMES[n][1] + '%', rotate: FRAMES[n][2] }}
//         initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 + n * 0.4, type: 'spring' }} onClick={() => setSel(p || 'ph')}>
//         {p ? <img src={p} alt="" /> : <span>📸</span>}</motion.button>)}
//     </div>
//     <p className="rx-small">Tap any frame</p>
//     {ready && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={done}>Next</motion.button>}
//     {sel && typeof document !== 'undefined' && createPortal(
//       <div className="rx-zoom" onClick={() => setSel(null)}>
//         <div className="rx-zoomcard">{sel === 'ph' ? <span>📸</span> : <img src={sel} alt="" />}</div></div>, document.body)}</>;
// }

// /* ---------- 8. Letter + 9. Final (same as before) ---------- */
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
//     <div className="rx-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="rx-caret" />}</div>
//     {fin ? <button className="rx-btn" onClick={done}>{btn}</button> : <button className="rx-link" onClick={() => setN(text.length)}>skip</button>}</>;
// }

// function Final({ name, t, replay }) {
//   useEffect(() => {
//     const a = setTimeout(love, 500), b = setTimeout(love, 1500);
//     return () => { clearTimeout(a); clearTimeout(b); };
//   }, []);
//   return <>
//     <motion.svg viewBox="0 0 100 90" className="rx-bigsvg" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
//       <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//       <path d={HEART} fill="url(#fg)" />
//       <text x="50" y="46" textAnchor="middle" className="rx-hname" fontSize={Math.min(16, 120 / Math.max(name.length, 1))}>{name}</text>
//     </motion.svg>
//     <h1>{t.finalTitle}</h1><p className="rx-hand">{t.finalSub}</p>
//     <button className="rx-btn" onClick={replay}>Watch again</button></>;
// }











// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// // Flow: lifafa -> heart par teer -> cake gir ke bane -> candle phoonk -> Little Moments (dil me photos)
// //       -> catch the hearts (game) -> 3 questions (No bhaagta hai) -> memory tree (photo frames) -> letter -> last surprise
// const SCENES = ['seal', 'arrows', 'cake', 'candle', 'photos', 'catch', 'questions', 'tree', 'letter', 'final'];
// const HEART = 'M50 88 C10 55 0 30 0 20 C0 8 10 0 22 0 C34 0 45 8 50 18 C55 8 66 0 78 0 C90 0 100 8 100 20 C100 30 90 55 50 88Z';
// const COL = ['#ffd6e0', '#ff7aa8', '#ffe29a', '#ffffff'];
// function love() {
//   let shapes;
//   try { shapes = [confetti.shapeFromText({ text: '💗', scalar: 2 }), 'circle']; } catch (e) { /* default shapes */ }
//   confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 }, colors: COL, scalar: 2, shapes });
// }

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
//   return <main className="rx">
//     <div className="rx-sun" /><Petals dense={s === 'final'} />
//     <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//       {s === 'seal' && <Seal t={t} done={next} />}
//       {s === 'arrows' && <Arrows t={t} name={name} done={next} />}
//       {s === 'cake' && <CakeBuild done={next} />}
//       {s === 'candle' && <Candle done={next} />}
//       {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle || 'Little Moments'} done={next} />}
//       {s === 'catch' && <Catch title={t.catchTitle || 'Catch the hearts'} hint={t.catchHint || 'Tap 10 falling hearts'} done={next} />}
//       {s === 'questions' && <Questions title={t.qTitle || 'Quick questions'} qs={[t.q1, t.q2, t.q3]} done={next} />}
//       {s === 'tree' && <Tree photos={card.treePhotos || []} done={next} />}
//       {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//       {s === 'final' && <Final name={name} t={t} replay={() => { setI(0); setK(x => x + 1); }} />}
//     </motion.section>
//   </main>;
// }

// function Petals({ dense }) {
//   const [p, setP] = useState([]); // client par hi random (hydration error se bachne ke liye)
//   useEffect(() => {
//     setP(Array.from({ length: dense ? 34 : 18 }, (_, n) => ({ n, l: Math.random() * 100, d: 9 + Math.random() * 9, s: -Math.random() * 14, f: 14 + Math.random() * 18, e: ['🌹', '🌸', '💗'][n % 3] })));
//   }, [dense]);
//   return p.map(x => <span key={(dense ? 'd' : 'n') + x.n} className="rx-petal" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.e}</span>);
// }

// /* ---------- 1. Lifafa (same as before) ---------- */
// function Seal({ t, done }) {
//   const [open, setOpen] = useState(false);
//   return <>
//     <p className="rx-hand">{t.intro2}</p>
//     <div className="rx-env" onClick={() => setOpen(true)}>
//       <div className="rx-back" />
//       <motion.div className="rx-paper" animate={{ y: open ? -120 : 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
//         <b>{t.intro}</b><span>💌</span></motion.div>
//       <div className="rx-front" />
//       <motion.div className="rx-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 4 }} transition={{ duration: 0.7 }} />
//       <motion.div className="rx-wax" animate={open ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
//         transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6 }}>♥</motion.div>
//     </div>
//     {open
//       ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Continue</motion.button>
//       : <p className="rx-small">Tap the seal</p>}</>;
// }

// /* ---------- 2. Heart par teer, phir Happy Birthday ---------- */
// const ANGLES = [-22, 165, 68];
// function Arrows({ t, name, done }) {
//   const [n, setN] = useState(0), [boom, setBoom] = useState(false);
//   const timers = useRef([]);
//   useEffect(() => () => timers.current.forEach(clearTimeout), []);
//   const hit = () => {
//     if (boom || n >= 3) return;
//     const m = n + 1; setN(m);
//     if (m === 3) {
//       timers.current.push(setTimeout(() => { setBoom(true); love(); }, 800));
//       timers.current.push(setTimeout(done, 5200));
//     }
//   };
//   return <>
//     <h2>{t.strikeTitle || 'Aim for the heart'}</h2>
//     <div className="rx-hit" onClick={hit}>
//       <motion.svg key={n} viewBox="0 0 100 90" className="rx-hitheart"
//         animate={n ? { scale: [1, 0.82, 1.12, 1] } : { scale: [1, 1.06, 1] }}
//         transition={n ? { duration: 0.45 } : { repeat: Infinity, duration: 1.4 }}>
//         <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//         <path d={HEART} fill="url(#hg)" />
//       </motion.svg>
//       {ANGLES.slice(0, n).map((a, j) => <div key={j} className="rx-arrowwrap" style={{ transform: `rotate(${a}deg)` }}>
//         <motion.svg viewBox="0 0 130 20" className="rx-arrow" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeIn' }}>
//           <line x1="10" y1="10" x2="118" y2="10" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" />
//           <polygon points="116,2 130,10 116,18" fill="#ffd59a" />
//           <polygon points="0,1 16,10 0,19 6,10" fill="#ffffff" />
//         </motion.svg></div>)}
//     </div>
//     <p className="rx-small">{n >= 3 ? '💘' : `Tap the heart to shoot an arrow (${n}/3)`}</p>
//     {boom && typeof document !== 'undefined' && createPortal(
//       <div className="rx-boom">
//         <motion.i className="rx-circle" initial={{ scale: 0 }} animate={{ scale: 34 }} transition={{ duration: 1.1, ease: 'easeIn' }} />
//         <motion.div className="rx-hb" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
//           <small>make a wish...</small><h1>Happy Birthday</h1><b>{name}</b>
//         </motion.div>
//       </div>, document.body)}</>;
// }

// /* ---------- 3. Cake upar se gir ke banta hai ---------- */
// function Piece({ i, build, children }) {
//   if (!build) return <g>{children}</g>;
//   return <motion.g initial={{ y: -360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.4 + i * 0.8 }}>{children}</motion.g>;
// }
// function PinkCake({ lit = false, build = false }) {
//   return <svg viewBox="0 0 200 220" aria-label="cake">
//     <Piece i={0} build={build}><ellipse cx="100" cy="196" rx="88" ry="10" fill="#fff3f7" /><ellipse cx="100" cy="192" rx="80" ry="8" fill="#f6d9e3" /></Piece>
//     <Piece i={1} build={build}><rect x="24" y="138" width="152" height="54" rx="14" fill="#f48fb1" /><rect x="24" y="138" width="152" height="15" rx="8" fill="#fff" />
//       {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="172" r="5" fill="#ffe29a" />)}</Piece>
//     <Piece i={2} build={build}><rect x="44" y="96" width="112" height="44" rx="12" fill="#f7a8c4" /><rect x="44" y="96" width="112" height="13" rx="7" fill="#fff" /></Piece>
//     <Piece i={3} build={build}><rect x="64" y="58" width="72" height="40" rx="11" fill="#f9bfd4" /><rect x="64" y="58" width="72" height="12" rx="6" fill="#fff" />
//       <circle cx="84" cy="86" r="4" fill="#ff7aa8" /><circle cx="116" cy="86" r="4" fill="#ff7aa8" /></Piece>
//     <Piece i={4} build={build}><circle cx="100" cy="52" r="7" fill="#e0245e" /><path d="M100 46 q6 -10 12 -12" stroke="#4f7f5a" strokeWidth="2" fill="none" /></Piece>
//     <Piece i={5} build={build}><rect x="96" y="14" width="8" height="30" rx="3" fill="#ffd166" />
//       {lit && <g className="fl"><ellipse cx="100" cy="6" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="9" rx="3.5" ry="7" fill="#fff3b0" /></g>}</Piece>
//   </svg>;
// }
// function CakeBuild({ done }) {
//   useEffect(() => { const id = setTimeout(done, 6000); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>First things first 🎂</h2>
//     <div className="rx-cake"><PinkCake build /></div>
//     <p className="rx-small">Your cake is being made...</p></>;
// }

// /* ---------- 4. Candle: phoonk maro ya tap karo ---------- */
// function Candle({ done }) {
//   const [lit, setLit] = useState(true);
//   const [msg, setMsg] = useState('');
//   const stopMic = useRef(() => {});
//   useEffect(() => () => stopMic.current(), []);
//   const blow = () => { if (!lit) return; setLit(false); love(); setTimeout(done, 1600); };
//   async function listen() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
//       await ctx.resume();
//       ctx.createMediaStreamSource(stream).connect(an);
//       const buf = new Float32Array(an.fftSize);
//       setMsg('Stay quiet for a second...');
//       const t0 = performance.now(); let base = 0, n = 0, hits = 0, live = true, said = false;
//       stopMic.current = () => { live = false; stream.getTracks().forEach(x => x.stop()); ctx.close().catch(() => {}); stopMic.current = () => {}; };
//       const tick = () => {
//         if (!live) return;
//         an.getFloatTimeDomainData(buf);
//         let sum = 0; for (const v of buf) sum += v * v;
//         const rms = Math.sqrt(sum / buf.length);
//         if (performance.now() - t0 < 1000) { base += rms; n++; }      // pehle 1 sec shaant awaaz naapo
//         else {
//           if (!said) { said = true; setMsg('Now blow hard into the mic!'); }
//           const limit = Math.max((base / Math.max(n, 1)) * 5, 0.12);   // pehle se zyada strict
//           hits = rms > limit ? hits + 1 : 0;
//           if (hits >= 12) { stopMic.current(); blow(); return; }       // lagbhag 0.2 sec lagatar tez awaaz
//         }
//         requestAnimationFrame(tick);
//       };
//       tick();
//     } catch (e) {
//       const n = e?.name || '';
//       setMsg(!navigator.mediaDevices ? 'Mic is not supported in this browser. Open in Chrome/Safari, or tap the cake'
//         : n === 'NotAllowedError' ? "Mic is blocked. Allow Microphone in your browser's site settings, or tap the cake"
//         : 'Mic failed (' + n + '). Tap the cake');
//     }
//   }
//   return <>
//     <h2>Blow the candle</h2>
//     <div className="rx-cake" onClick={blow}><PinkCake lit={lit} /></div>
//     <button className="rx-btn" onClick={listen}>🎤 Blow into the mic</button><div className="rx-small">{msg}</div></>;
// }

// /* ---------- 5. Little Moments (dil me photos) ---------- */
// function Gallery({ photos, title, done }) {
//   const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   return <>
//     <h2>{title}</h2>
//     <button className="rx-btn" onClick={done}>Next</button>
//     <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
//       animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
//       <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
//       <g clipPath={`url(#hc${n})`}>
//         {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
//       </g>
//       <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
//     </motion.svg>)}</div></>;
// }

// /* ---------- 6. Catch the hearts: girte hue hearts tap karo ---------- */
// function Catch({ title, hint, done }) {
//   const GOAL = 10;
//   const [drops, setDrops] = useState([]), [score, setScore] = useState(0);
//   const id = useRef(0), won = score >= GOAL;
//   useEffect(() => {
//     if (won) return;
//     const iv = setInterval(() => {
//       setDrops(d => d.length > 14 ? d : [...d, { id: ++id.current, x: 6 + Math.random() * 82, dur: 3 + Math.random() * 2.2, e: ['💖', '💗', '🌹', '💝'][Math.floor(Math.random() * 4)] }]);
//     }, 550);
//     return () => clearInterval(iv);
//   }, [won]);
//   useEffect(() => { if (won) { love(); setDrops([]); } }, [won]);
//   const pop = d => { setDrops(x => x.filter(y => y.id !== d.id)); setScore(v => v + 1); };
//   const gone = d => setDrops(x => x.filter(y => y.id !== d.id));
//   return <>
//     <h2>{title}</h2><p className="rx-small">{hint}</p>
//     <div className="rx-score">💖 {Math.min(score, GOAL)} / {GOAL}</div>
//     <div className="rx-catch">
//       {drops.map(d => <button key={d.id} className="rx-drop" style={{ left: d.x + '%', animationDuration: d.dur + 's' }}
//         onPointerDown={() => pop(d)} onAnimationEnd={() => gone(d)}>{d.e}</button>)}
//       {won && <motion.div className="rx-won" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>You caught them all! 🎉</motion.div>}
//     </div>
//     {won && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={done}>Next</motion.button>}</>;
// }

// /* ---------- 6b. 3 questions: No button bhaagta hai ---------- */
// const TEASE = ['Nice try 😜', 'Are you sure? 🥺', 'Too slow! 😆', 'Just say yes 💖'];
// function Questions({ title, qs, done }) {
//   const list = qs.filter(Boolean);
//   const [n, setN] = useState(0), [pos, setPos] = useState(null), [tease, setTease] = useState(0);
//   const box = useRef();
//   const finished = n >= list.length;
//   const dodge = e => {
//     if (e?.cancelable) e.preventDefault();
//     const b = box.current; if (!b) return;
//     const w = Math.max(b.clientWidth - 110, 0), h = Math.max(b.clientHeight - 50, 0);
//     let x = 0, y = 0;
//     for (let tries = 0; tries < 8; tries++) {
//       x = Math.random() * w; y = Math.random() * h;
//       if (!pos || Math.hypot(x - pos.x, y - pos.y) > 90) break;
//     }
//     setPos({ x, y }); setTease(v => v + 1);
//   };
//   const yes = () => { setN(v => v + 1); setPos(null); setTease(0); if (n + 1 >= list.length) love(); };
//   if (finished) return <>
//     <h2>Yay! 🥰</h2>
//     <p className="rx-hand">I knew it all along 💖</p>
//     <button className="rx-btn" onClick={done}>Next</button></>;
//   return <>
//     <h2>{title}</h2>
//     <div className="rx-small">Question {n + 1} of {list.length}</div>
//     <motion.p key={n} className="rx-q" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>{list[n]}</motion.p>
//     <div className="rx-yn" ref={box}>
//       <button className="rx-btn rx-yes" onClick={yes}>Yes 💖</button>
//       <button className="rx-no" style={pos ? { left: pos.x, top: pos.y, right: 'auto' } : undefined}
//         onPointerEnter={dodge} onPointerDown={dodge} onTouchStart={dodge} onFocus={dodge} onClick={dodge}>No</button>
//     </div>
//     <div className="rx-small" style={{ minHeight: 22 }}>{tease ? TEASE[(tease - 1) % TEASE.length] : ''}</div></>;
// }

// /* ---------- 7. Memory tree: video jaisa heart-tree, photo frames latakte hain ---------- */
// const CANOPY = (() => {
//   const out = [];
//   [[1, 40], [0.72, 28], [0.45, 16], [0.2, 6]].forEach(([k, cnt], r) => {
//     for (let n = 0; n < cnt; n++) {
//       const a = (n / cnt) * Math.PI * 2 + r * 0.4;
//       const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
//       out.push({ l: 50 + x * k * 2.6, tp: 38 - y * k * 1.9, f: 13 + ((n * 7 + r * 3) % 9), c: ['#ff9ab8', '#ffb3c6', '#ffe29a', '#ff7aa8'][(n + r) % 4], d: 1.2 + (out.length * 0.035) });
//     }
//   });
//   return out;
// })();
// const FRAMES = [[30, 30, -6], [70, 28, 5], [50, 48, -2], [32, 60, 4], [68, 58, -5]];
// function Tree({ photos, done }) {
//   const [sel, setSel] = useState(null), [ready, setReady] = useState(false);
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   useEffect(() => { const id = setTimeout(() => setReady(true), 4200); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>Our Tree of Memories 🌳</h2>
//     <div className="rx-tree">
//       <svg viewBox="0 0 300 340" className="rx-trunk">
//         <motion.path d="M150 340 C150 290 148 250 150 200 M150 240 C120 220 105 198 85 172 M150 228 C180 208 198 188 215 162 M150 208 C150 182 150 160 150 140"
//           stroke="#5a3a2a" strokeWidth="9" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
//       </svg>
//       {CANOPY.map((h, n) => <span key={n} className="rx-leaf" style={{ left: h.l + '%', top: h.tp + '%', fontSize: h.f, color: h.c, animationDelay: h.d + 's' }}>♥</span>)}
//       {items.map((p, n) => <motion.button key={n} className="rx-frame" style={{ left: FRAMES[n][0] + '%', top: FRAMES[n][1] + '%', rotate: FRAMES[n][2] }}
//         initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 + n * 0.4, type: 'spring' }} onClick={() => setSel(p || 'ph')}>
//         {p ? <img src={p} alt="" /> : <span>📸</span>}</motion.button>)}
//     </div>
//     <p className="rx-small">Tap any frame</p>
//     {ready && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={done}>Next</motion.button>}
//     {sel && typeof document !== 'undefined' && createPortal(
//       <div className="rx-zoom" onClick={() => setSel(null)}>
//         <div className="rx-zoomcard">{sel === 'ph' ? <span>📸</span> : <img src={sel} alt="" />}</div></div>, document.body)}</>;
// }

// /* ---------- 8. Letter + 9. Final (same as before) ---------- */
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
//     <div className="rx-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="rx-caret" />}</div>
//     {fin ? <button className="rx-btn" onClick={done}>{btn}</button> : <button className="rx-link" onClick={() => setN(text.length)}>skip</button>}</>;
// }

// function Final({ name, t, replay }) {
//   useEffect(() => {
//     const a = setTimeout(love, 500), b = setTimeout(love, 1500);
//     return () => { clearTimeout(a); clearTimeout(b); };
//   }, []);
//   return <>
//     <motion.svg viewBox="0 0 100 90" className="rx-bigsvg" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
//       <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//       <path d={HEART} fill="url(#fg)" />
//       <text x="50" y="46" textAnchor="middle" className="rx-hname" fontSize={Math.min(16, 120 / Math.max(name.length, 1))}>{name}</text>
//     </motion.svg>
//     <h1>{t.finalTitle}</h1><p className="rx-hand">{t.finalSub}</p>
//     <button className="rx-btn" onClick={replay}>Watch again</button></>;
// }

















// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { motion } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import { Sticker } from './Art';
// import './premium.css';

// // Flow: lifafa -> heart par teer -> cake gir ke bane -> candle phoonk -> Little Moments (dil me photos)
// //       -> love scanner (finger hold) -> 3 questions (No bhaagta hai) -> memory tree (photo frames) -> letter -> last surprise
// const SCENES = ['seal', 'arrows', 'cake', 'candle', 'photos', 'scan', 'questions', 'tree', 'letter', 'final'];
// const HEART = 'M50 88 C10 55 0 30 0 20 C0 8 10 0 22 0 C34 0 45 8 50 18 C55 8 66 0 78 0 C90 0 100 8 100 20 C100 30 90 55 50 88Z';
// const COL = ['#ffd6e0', '#ff7aa8', '#ffe29a', '#ffffff'];
// function love() {
//   let shapes;
//   try { shapes = [confetti.shapeFromText({ text: '💗', scalar: 2 }), 'circle']; } catch (e) { /* default shapes */ }
//   confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 }, colors: COL, scalar: 2, shapes });
// }

// export default function PremiumExperience({ card }) {
//   const [i, setI] = useState(0), [k, setK] = useState(0);
//   const next = () => setI(n => Math.min(n + 1, SCENES.length - 1));
//   const s = SCENES[i], t = card.texts, name = card.recipientName, pet = card.options?.friendSticker || 'bunny';
//   return <main className="rx">
//     <div className="rx-sun" /><Petals dense={s === 'final'} />
//     <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//       {s === 'seal' && <Seal t={t} done={next} />}
//       {s === 'arrows' && <Arrows t={t} name={name} done={next} />}
//       {s === 'cake' && <CakeBuild done={next} />}
//       {s === 'candle' && <Candle done={next} />}
//       {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle || 'Little Moments'} done={next} />}
//       {s === 'scan' && <Scanner title={t.scanTitle || 'Love scanner'} hint={t.scanHint || 'Touch and hold the scanner (on laptop, just click it)'} result={t.scanResult || 'Match found: 100% in love 💖'} name={name} done={next} />}
//       {s === 'questions' && <Questions title={t.qTitle || 'Quick questions'} qs={[t.q1, t.q2, t.q3]} done={next} />}
//       {s === 'tree' && <Tree photos={card.treePhotos || []} done={next} />}
//       {s === 'letter' && <Letter title={t.envelopeTitle} text={card.letter} btn={t.lastButton} done={next} />}
//       {s === 'final' && <Final name={name} t={t} replay={() => { setI(0); setK(x => x + 1); }} />}
//     </motion.section>
//   </main>;
// }

// function Petals({ dense }) {
//   const [p, setP] = useState([]); // client par hi random (hydration error se bachne ke liye)
//   useEffect(() => {
//     setP(Array.from({ length: dense ? 34 : 18 }, (_, n) => ({ n, l: Math.random() * 100, d: 9 + Math.random() * 9, s: -Math.random() * 14, f: 14 + Math.random() * 18, e: ['🌹', '🌸', '💗'][n % 3] })));
//   }, [dense]);
//   return p.map(x => <span key={(dense ? 'd' : 'n') + x.n} className="rx-petal" style={{ left: x.l + '%', animationDuration: x.d + 's', animationDelay: x.s + 's', fontSize: x.f }}>{x.e}</span>);
// }

// /* ---------- 1. Lifafa (same as before) ---------- */
// function Seal({ t, done }) {
//   const [open, setOpen] = useState(false);
//   return <>
//     <p className="rx-hand">{t.intro2}</p>
//     <div className="rx-env" onClick={() => setOpen(true)}>
//       <div className="rx-back" />
//       <motion.div className="rx-paper" animate={{ y: open ? -120 : 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}>
//         <b>{t.intro}</b><span>💌</span></motion.div>
//       <div className="rx-front" />
//       <motion.div className="rx-flap" animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 4 }} transition={{ duration: 0.7 }} />
//       <motion.div className="rx-wax" animate={open ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.08, 1] }}
//         transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 1.6 }}>♥</motion.div>
//     </div>
//     {open
//       ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Continue</motion.button>
//       : <p className="rx-small">Tap the seal</p>}</>;
// }

// /* ---------- 2. Heart par teer, phir Happy Birthday ---------- */
// const ANGLES = [-22, 165, 68];
// function Arrows({ t, name, done }) {
//   const [n, setN] = useState(0), [boom, setBoom] = useState(false);
//   const timers = useRef([]);
//   useEffect(() => () => timers.current.forEach(clearTimeout), []);
//   const hit = () => {
//     if (boom || n >= 3) return;
//     const m = n + 1; setN(m);
//     if (m === 3) {
//       timers.current.push(setTimeout(() => { setBoom(true); love(); }, 800));
//       timers.current.push(setTimeout(done, 5200));
//     }
//   };
//   return <>
//     <h2>{t.strikeTitle || 'Aim for the heart'}</h2>
//     <div className="rx-hit" onClick={hit}>
//       <motion.svg key={n} viewBox="0 0 100 90" className="rx-hitheart"
//         animate={n ? { scale: [1, 0.82, 1.12, 1] } : { scale: [1, 1.06, 1] }}
//         transition={n ? { duration: 0.45 } : { repeat: Infinity, duration: 1.4 }}>
//         <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//         <path d={HEART} fill="url(#hg)" />
//       </motion.svg>
//       {ANGLES.slice(0, n).map((a, j) => <div key={j} className="rx-arrowwrap" style={{ transform: `rotate(${a}deg)` }}>
//         <motion.svg viewBox="0 0 130 20" className="rx-arrow" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeIn' }}>
//           <line x1="10" y1="10" x2="118" y2="10" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" />
//           <polygon points="116,2 130,10 116,18" fill="#ffd59a" />
//           <polygon points="0,1 16,10 0,19 6,10" fill="#ffffff" />
//         </motion.svg></div>)}
//     </div>
//     <p className="rx-small">{n >= 3 ? '💘' : `Tap the heart to shoot an arrow (${n}/3)`}</p>
//     {boom && typeof document !== 'undefined' && createPortal(
//       <div className="rx-boom">
//         <motion.i className="rx-circle" initial={{ scale: 0 }} animate={{ scale: 34 }} transition={{ duration: 1.1, ease: 'easeIn' }} />
//         <motion.div className="rx-hb" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
//           <small>make a wish...</small><h1>Happy Birthday</h1><b>{name}</b>
//         </motion.div>
//       </div>, document.body)}</>;
// }

// /* ---------- 3. Cake upar se gir ke banta hai ---------- */
// function Piece({ i, build, children }) {
//   if (!build) return <g>{children}</g>;
//   return <motion.g initial={{ y: -360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.4 + i * 0.8 }}>{children}</motion.g>;
// }
// function PinkCake({ lit = false, build = false }) {
//   return <svg viewBox="0 0 200 220" aria-label="cake">
//     <Piece i={0} build={build}><ellipse cx="100" cy="196" rx="88" ry="10" fill="#fff3f7" /><ellipse cx="100" cy="192" rx="80" ry="8" fill="#f6d9e3" /></Piece>
//     <Piece i={1} build={build}><rect x="24" y="138" width="152" height="54" rx="14" fill="#f48fb1" /><rect x="24" y="138" width="152" height="15" rx="8" fill="#fff" />
//       {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="172" r="5" fill="#ffe29a" />)}</Piece>
//     <Piece i={2} build={build}><rect x="44" y="96" width="112" height="44" rx="12" fill="#f7a8c4" /><rect x="44" y="96" width="112" height="13" rx="7" fill="#fff" /></Piece>
//     <Piece i={3} build={build}><rect x="64" y="58" width="72" height="40" rx="11" fill="#f9bfd4" /><rect x="64" y="58" width="72" height="12" rx="6" fill="#fff" />
//       <circle cx="84" cy="86" r="4" fill="#ff7aa8" /><circle cx="116" cy="86" r="4" fill="#ff7aa8" /></Piece>
//     <Piece i={4} build={build}><circle cx="100" cy="52" r="7" fill="#e0245e" /><path d="M100 46 q6 -10 12 -12" stroke="#4f7f5a" strokeWidth="2" fill="none" /></Piece>
//     <Piece i={5} build={build}><rect x="96" y="14" width="8" height="30" rx="3" fill="#ffd166" />
//       {lit && <g className="fl"><ellipse cx="100" cy="6" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="9" rx="3.5" ry="7" fill="#fff3b0" /></g>}</Piece>
//   </svg>;
// }
// function CakeBuild({ done }) {
//   useEffect(() => { const id = setTimeout(done, 6000); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>First things first 🎂</h2>
//     <div className="rx-cake"><PinkCake build /></div>
//     <p className="rx-small">Your cake is being made...</p></>;
// }

// /* ---------- 4. Candle: phoonk maro ya tap karo ---------- */
// function Candle({ done }) {
//   const [lit, setLit] = useState(true);
//   const [msg, setMsg] = useState('');
//   const stopMic = useRef(() => {});
//   useEffect(() => () => stopMic.current(), []);
//   const blow = () => { if (!lit) return; setLit(false); love(); setTimeout(done, 1600); };
//   async function listen() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
//       const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
//       await ctx.resume();
//       ctx.createMediaStreamSource(stream).connect(an);
//       const buf = new Float32Array(an.fftSize);
//       setMsg('Stay quiet for a second...');
//       const t0 = performance.now(); let base = 0, n = 0, hits = 0, live = true, said = false;
//       stopMic.current = () => { live = false; stream.getTracks().forEach(x => x.stop()); ctx.close().catch(() => {}); stopMic.current = () => {}; };
//       const tick = () => {
//         if (!live) return;
//         an.getFloatTimeDomainData(buf);
//         let sum = 0; for (const v of buf) sum += v * v;
//         const rms = Math.sqrt(sum / buf.length);
//         if (performance.now() - t0 < 1000) { base += rms; n++; }      // pehle 1 sec shaant awaaz naapo
//         else {
//           if (!said) { said = true; setMsg('Now blow hard into the mic!'); }
//           const limit = Math.max((base / Math.max(n, 1)) * 5, 0.12);   // pehle se zyada strict
//           hits = rms > limit ? hits + 1 : 0;
//           if (hits >= 12) { stopMic.current(); blow(); return; }       // lagbhag 0.2 sec lagatar tez awaaz
//         }
//         requestAnimationFrame(tick);
//       };
//       tick();
//     } catch (e) {
//       const n = e?.name || '';
//       setMsg(!navigator.mediaDevices ? 'Mic is not supported in this browser. Open in Chrome/Safari, or tap the cake'
//         : n === 'NotAllowedError' ? "Mic is blocked. Allow Microphone in your browser's site settings, or tap the cake"
//         : 'Mic failed (' + n + '). Tap the cake');
//     }
//   }
//   return <>
//     <h2>Blow the candle</h2>
//     <div className="rx-cake" onClick={blow}><PinkCake lit={lit} /></div>
//     <button className="rx-btn" onClick={listen}>🎤 Blow into the mic</button><div className="rx-small">{msg}</div></>;
// }

// /* ---------- 5. Little Moments (dil me photos) ---------- */
// function Gallery({ photos, title, done }) {
//   const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   return <>
//     <h2>{title}</h2>
//     <button className="rx-btn" onClick={done}>Next</button>
//     <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
//       animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
//       <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
//       <g clipPath={`url(#hc${n})`}>
//         {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
//       </g>
//       <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
//     </motion.svg>)}</div></>;
// }

// /* ---------- 6. Love scanner: ungli rakho, scan hota hai, phone vibrate karta hai, result chaukata hai ---------- */
// function Scanner({ title, hint, result, name, done }) {
//   const [p, setP] = useState(0), [ok, setOk] = useState(false), tm = useRef();
//   const vib = v => { try { navigator.vibrate && navigator.vibrate(v); } catch (e) { /* ignore */ } };
//   const auto = useRef(false); // laptop (mouse): sirf click karo, scan apne aap poora hota hai
//   const start = e => {
//     if (ok) return;
//     if (e && e.pointerType === 'mouse') auto.current = true;
//     clearInterval(tm.current); vib(2200); tm.current = setInterval(() => setP(v => Math.min(v + 1.4, 100)), 30);
//   };
//   const stop = () => { if (auto.current) return; clearInterval(tm.current); if (!ok) { setP(0); vib(0); } };
//   useEffect(() => () => { clearInterval(tm.current); vib(0); }, []);
//   useEffect(() => {
//     if (p < 100 || ok) return;
//     clearInterval(tm.current); setOk(true); love(); vib([200, 100, 200]);
//   }, [p]);
//   const scanning = p > 0 && !ok;
//   return <>
//     <h2>{title}</h2><p className="rx-small">{hint}</p>
//     <div className={'rx-scan' + (scanning ? ' shake' : '')} onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={e => e.preventDefault()}>
//       <svg viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity={ok ? 1 : 0.85}>
//         <path d="M30 40 A22 22 0 0 1 70 40" /><path d="M22 52 A30 30 0 0 1 78 52 L78 60" /><path d="M38 78 C34 66 34 54 40 46 A12 12 0 0 1 60 46 C62 58 62 68 58 80" />
//         <path d="M50 50 L50 84" strokeDasharray="4 6" /><path d="M30 70 C28 60 28 50 32 44" /><path d="M70 70 C72 60 72 52 70 46" />
//       </svg>
//       {scanning && <div className="rx-scanline" style={{ top: p + '%' }} />}
//     </div>
//     <div className="rx-result">{ok ? `${name}: ${result}` : scanning ? `Scanning ${name}... ${Math.floor(p)}%` : ''}</div>
//     {ok && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} onClick={done}>Next</motion.button>}</>;
// }

// /* ---------- 6b. 3 questions: No button bhaagta hai ---------- */
// const TEASE = ['Nice try 😜', 'Are you sure? 🥺', 'Too slow! 😆', 'Just say yes 💖'];
// function Questions({ title, qs, done }) {
//   const list = qs.filter(Boolean);
//   const [n, setN] = useState(0), [pos, setPos] = useState(null), [tease, setTease] = useState(0);
//   const box = useRef();
//   const finished = n >= list.length;
//   const dodge = e => {
//     if (e?.cancelable) e.preventDefault();
//     const b = box.current; if (!b) return;
//     const w = Math.max(b.clientWidth - 110, 0), h = Math.max(b.clientHeight - 50, 0);
//     let x = 0, y = 0;
//     for (let tries = 0; tries < 8; tries++) {
//       x = Math.random() * w; y = Math.random() * h;
//       if (!pos || Math.hypot(x - pos.x, y - pos.y) > 90) break;
//     }
//     setPos({ x, y }); setTease(v => v + 1);
//   };
//   const yes = () => { setN(v => v + 1); setPos(null); setTease(0); if (n + 1 >= list.length) love(); };
//   if (finished) return <>
//     <h2>Yay! 🥰</h2>
//     <p className="rx-hand">I knew it all along 💖</p>
//     <button className="rx-btn" onClick={done}>Next</button></>;
//   return <>
//     <h2>{title}</h2>
//     <div className="rx-small">Question {n + 1} of {list.length}</div>
//     <motion.p key={n} className="rx-q" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>{list[n]}</motion.p>
//     <div className="rx-yn" ref={box}>
//       <button className="rx-btn rx-yes" onClick={yes}>Yes 💖</button>
//       <button className="rx-btn rx-no" style={pos ? { left: pos.x, top: pos.y, right: 'auto' } : undefined}
//         onPointerEnter={dodge} onPointerDown={dodge} onTouchStart={dodge} onFocus={dodge} onClick={dodge}>No</button>
//     </div>
//     <div className="rx-small" style={{ minHeight: 22 }}>{tease ? TEASE[(tease - 1) % TEASE.length] : ''}</div></>;
// }

// /* ---------- 7. Memory tree: video jaisa heart-tree, photo frames latakte hain ---------- */
// const CANOPY = (() => {
//   const out = [];
//   [[1, 40], [0.72, 28], [0.45, 16], [0.2, 6]].forEach(([k, cnt], r) => {
//     for (let n = 0; n < cnt; n++) {
//       const a = (n / cnt) * Math.PI * 2 + r * 0.4;
//       const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
//       out.push({ l: 50 + x * k * 2.6, tp: 38 - y * k * 1.9, f: 13 + ((n * 7 + r * 3) % 9), c: ['#ff9ab8', '#ffb3c6', '#ffe29a', '#ff7aa8'][(n + r) % 4], d: 1.2 + (out.length * 0.035) });
//     }
//   });
//   return out;
// })();
// const FRAMES = [[30, 30, -6], [70, 28, 5], [50, 48, -2], [32, 60, 4], [68, 58, -5]];
// function Tree({ photos, done }) {
//   const [sel, setSel] = useState(null), [ready, setReady] = useState(false);
//   const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
//   useEffect(() => { const id = setTimeout(() => setReady(true), 4200); return () => clearTimeout(id); }, []);
//   return <>
//     <h2>Our Tree of Memories 🌳</h2>
//     <div className="rx-tree">
//       <svg viewBox="0 0 300 340" className="rx-trunk">
//         <motion.path d="M150 340 C150 290 148 250 150 200 M150 240 C120 220 105 198 85 172 M150 228 C180 208 198 188 215 162 M150 208 C150 182 150 160 150 140"
//           stroke="#5a3a2a" strokeWidth="9" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
//       </svg>
//       {CANOPY.map((h, n) => <span key={n} className="rx-leaf" style={{ left: h.l + '%', top: h.tp + '%', fontSize: h.f, color: h.c, animationDelay: h.d + 's' }}>♥</span>)}
//       {items.map((p, n) => <motion.button key={n} className="rx-frame" style={{ left: FRAMES[n][0] + '%', top: FRAMES[n][1] + '%', rotate: FRAMES[n][2] }}
//         initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 + n * 0.4, type: 'spring' }} onClick={() => setSel(p || 'ph')}>
//         {p ? <img src={p} alt="" /> : <span>📸</span>}</motion.button>)}
//     </div>
//     <p className="rx-small">Tap any frame</p>
//     {ready && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={done}>Next</motion.button>}
//     {sel && typeof document !== 'undefined' && createPortal(
//       <div className="rx-zoom" onClick={() => setSel(null)}>
//         <div className="rx-zoomcard">{sel === 'ph' ? <span>📸</span> : <img src={sel} alt="" />}</div></div>, document.body)}</>;
// }

// /* ---------- 8. Letter + 9. Final (same as before) ---------- */
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
//     <div className="rx-letter" ref={box}>{text.slice(0, n)}{!fin && <span className="rx-caret" />}</div>
//     {fin ? <button className="rx-btn" onClick={done}>{btn}</button> : <button className="rx-link" onClick={() => setN(text.length)}>skip</button>}</>;
// }

// function Final({ name, t, replay }) {
//   useEffect(() => {
//     const a = setTimeout(love, 500), b = setTimeout(love, 1500);
//     return () => { clearTimeout(a); clearTimeout(b); };
//   }, []);
//   return <>
//     <motion.svg viewBox="0 0 100 90" className="rx-bigsvg" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}>
//       <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
//       <path d={HEART} fill="url(#fg)" />
//       <text x="50" y="46" textAnchor="middle" className="rx-hname" fontSize={Math.min(16, 120 / Math.max(name.length, 1))}>{name}</text>
//     </motion.svg>
//     <h1>{t.finalTitle}</h1><p className="rx-hand">{t.finalSub}</p>
//     <button className="rx-btn" onClick={replay}>Watch again</button></>;
// }









'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sticker } from './Art';
import './premium.css';

// Flow: lifafa -> heart par teer -> cake gir ke bane -> candle phoonk -> Little Moments (dil me photos)
//       -> love scanner (finger hold) -> 3 questions (No bhaagta hai) -> memory tree (photo frames) -> letter -> last surprise
const SCENES = ['seal', 'arrows', 'cake', 'candle', 'photos', 'scan', 'questions', 'tree', 'letter', 'final'];
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
  return <main className="rx">
    <div className="rx-sun" /><Petals dense={s === 'final'} />
    <motion.section key={s + k} className="rx-scene" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {s === 'seal' && <Seal t={t} done={next} />}
      {s === 'arrows' && <Arrows t={t} name={name} done={next} />}
      {s === 'cake' && <CakeBuild done={next} />}
      {s === 'candle' && <Candle done={next} />}
      {s === 'photos' && <Gallery photos={card.photos || []} title={t.momentsTitle || 'Little Moments'} done={next} />}
      {s === 'scan' && <Scanner title={t.scanTitle || 'Love scanner'} hint={t.scanHint || 'Press and hold your finger on the scanner'} result={t.scanResult || 'Match found: 100% in love 💖'} name={name} done={next} />}
      {s === 'questions' && <Questions title={t.qTitle || 'Quick questions'} qs={[t.q1, t.q2, t.q3]} done={next} />}
      {s === 'tree' && <Tree photos={card.treePhotos || []} done={next} />}
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

/* ---------- 1. Lifafa (same as before) ---------- */
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
      ? <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={done}>Continue</motion.button>
      : <p className="rx-small">Tap the seal</p>}</>;
}

/* ---------- 2. Heart par teer, phir Happy Birthday ---------- */
const ANGLES = [-22, 165, 68];
function Arrows({ t, name, done }) {
  const [n, setN] = useState(0), [boom, setBoom] = useState(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const hit = () => {
    if (boom || n >= 3) return;
    const m = n + 1; setN(m);
    if (m === 3) {
      timers.current.push(setTimeout(() => { setBoom(true); love(); }, 800));
      timers.current.push(setTimeout(done, 5200));
    }
  };
  return <>
    <h2>{t.strikeTitle || 'Aim for the heart'}</h2>
    <div className="rx-hit" onClick={hit}>
      <motion.svg key={n} viewBox="0 0 100 90" className="rx-hitheart"
        animate={n ? { scale: [1, 0.82, 1.12, 1] } : { scale: [1, 1.06, 1] }}
        transition={n ? { duration: 0.45 } : { repeat: Infinity, duration: 1.4 }}>
        <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ab8" /><stop offset="1" stopColor="#e0245e" /></linearGradient></defs>
        <path d={HEART} fill="url(#hg)" />
      </motion.svg>
      {ANGLES.slice(0, n).map((a, j) => <div key={j} className="rx-arrowwrap" style={{ transform: `rotate(${a}deg)` }}>
        <motion.svg viewBox="0 0 130 20" className="rx-arrow" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeIn' }}>
          <line x1="10" y1="10" x2="118" y2="10" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" />
          <polygon points="116,2 130,10 116,18" fill="#ffd59a" />
          <polygon points="0,1 16,10 0,19 6,10" fill="#ffffff" />
        </motion.svg></div>)}
    </div>
    <p className="rx-small">{n >= 3 ? '💘' : `Tap the heart to shoot an arrow (${n}/3)`}</p>
    {boom && typeof document !== 'undefined' && createPortal(
      <div className="rx-boom">
        <motion.i className="rx-circle" initial={{ scale: 0 }} animate={{ scale: 34 }} transition={{ duration: 1.1, ease: 'easeIn' }} />
        <motion.div className="rx-hb" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
          <small>make a wish...</small><h1>Happy Birthday</h1><b>{name}</b>
        </motion.div>
      </div>, document.body)}</>;
}

/* ---------- 3. Cake upar se gir ke banta hai ---------- */
function Piece({ i, build, children }) {
  if (!build) return <g>{children}</g>;
  return <motion.g initial={{ y: -360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 0.9, delay: 0.4 + i * 0.8 }}>{children}</motion.g>;
}
function PinkCake({ lit = false, build = false }) {
  return <svg viewBox="0 0 200 220" aria-label="cake">
    <Piece i={0} build={build}><ellipse cx="100" cy="196" rx="88" ry="10" fill="#fff3f7" /><ellipse cx="100" cy="192" rx="80" ry="8" fill="#f6d9e3" /></Piece>
    <Piece i={1} build={build}><rect x="24" y="138" width="152" height="54" rx="14" fill="#f48fb1" /><rect x="24" y="138" width="152" height="15" rx="8" fill="#fff" />
      {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="172" r="5" fill="#ffe29a" />)}</Piece>
    <Piece i={2} build={build}><rect x="44" y="96" width="112" height="44" rx="12" fill="#f7a8c4" /><rect x="44" y="96" width="112" height="13" rx="7" fill="#fff" /></Piece>
    <Piece i={3} build={build}><rect x="64" y="58" width="72" height="40" rx="11" fill="#f9bfd4" /><rect x="64" y="58" width="72" height="12" rx="6" fill="#fff" />
      <circle cx="84" cy="86" r="4" fill="#ff7aa8" /><circle cx="116" cy="86" r="4" fill="#ff7aa8" /></Piece>
    <Piece i={4} build={build}><circle cx="100" cy="52" r="7" fill="#e0245e" /><path d="M100 46 q6 -10 12 -12" stroke="#4f7f5a" strokeWidth="2" fill="none" /></Piece>
    <Piece i={5} build={build}><rect x="96" y="14" width="8" height="30" rx="3" fill="#ffd166" />
      {lit && <g className="fl"><ellipse cx="100" cy="6" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="9" rx="3.5" ry="7" fill="#fff3b0" /></g>}</Piece>
  </svg>;
}
function CakeBuild({ done }) {
  useEffect(() => { const id = setTimeout(done, 6000); return () => clearTimeout(id); }, []);
  return <>
    <h2>First things first 🎂</h2>
    <div className="rx-cake"><PinkCake build /></div>
    <p className="rx-small">Your cake is being made...</p></>;
}

/* ---------- 4. Candle: phoonk maro ya tap karo ---------- */
function Candle({ done }) {
  const [lit, setLit] = useState(true);
  const [msg, setMsg] = useState('');
  const stopMic = useRef(() => {});
  useEffect(() => () => stopMic.current(), []);
  const blow = () => { if (!lit) return; setLit(false); love(); setTimeout(done, 1600); };
  async function listen() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), an = ctx.createAnalyser(); an.fftSize = 1024;
      await ctx.resume();
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Float32Array(an.fftSize);
      setMsg('Stay quiet for a second...');
      const t0 = performance.now(); let base = 0, n = 0, hits = 0, live = true, said = false;
      stopMic.current = () => { live = false; stream.getTracks().forEach(x => x.stop()); ctx.close().catch(() => {}); stopMic.current = () => {}; };
      const tick = () => {
        if (!live) return;
        an.getFloatTimeDomainData(buf);
        let sum = 0; for (const v of buf) sum += v * v;
        const rms = Math.sqrt(sum / buf.length);
        if (performance.now() - t0 < 1000) { base += rms; n++; }      // pehle 1 sec shaant awaaz naapo
        else {
          if (!said) { said = true; setMsg('Now blow hard into the mic!'); }
          const limit = Math.max((base / Math.max(n, 1)) * 5, 0.12);   // pehle se zyada strict
          hits = rms > limit ? hits + 1 : 0;
          if (hits >= 12) { stopMic.current(); blow(); return; }       // lagbhag 0.2 sec lagatar tez awaaz
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      const n = e?.name || '';
      setMsg(!navigator.mediaDevices ? 'Mic is not supported in this browser. Open in Chrome/Safari, or tap the cake'
        : n === 'NotAllowedError' ? "Mic is blocked. Allow Microphone in your browser's site settings, or tap the cake"
        : 'Mic failed (' + n + '). Tap the cake');
    }
  }
  return <>
    <h2>Blow the candle</h2>
    <div className="rx-cake" onClick={blow}><PinkCake lit={lit} /></div>
    <button className="rx-btn" onClick={listen}>🎤 Blow into the mic</button><div className="rx-small">{msg}</div></>;
}

/* ---------- 5. Little Moments (dil me photos) ---------- */
function Gallery({ photos, title, done }) {
  const pos = [[10, 0, 130], [160, 40, 115], [20, 150, 120], [165, 190, 125], [90, 290, 105]];
  const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
  return <>
    <h2>{title}</h2>
    <button className="rx-btn" onClick={done}>Next</button>
    <div className="rx-gal">{items.map((p, n) => <motion.svg key={n} viewBox="0 0 100 90" className="rx-hf" style={{ left: pos[n][0], top: pos[n][1], width: pos[n][2] }}
      animate={{ y: [0, -10, 0], rotate: n % 2 ? [4, -2, 4] : [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 4 + n, ease: 'easeInOut' }}>
      <defs><clipPath id={'hc' + n}><path d={HEART} /></clipPath></defs>
      <g clipPath={`url(#hc${n})`}>
        {p ? <image href={p} width="100" height="90" preserveAspectRatio="xMidYMid slice" /> : <><rect width="100" height="90" fill="#ffd0dd" /><text x="50" y="52" textAnchor="middle" fontSize="26">📸</text></>}
      </g>
      <path d={HEART} fill="none" stroke="#fff" strokeWidth="3" />
    </motion.svg>)}</div></>;
}

/* ---------- 6. Love scanner: ungli rakho, scan hota hai, phone vibrate karta hai, result chaukata hai ---------- */
function Scanner({ title, hint, result, name, done }) {
  const [p, setP] = useState(0), [ok, setOk] = useState(false), tm = useRef();
  const vib = v => { try { navigator.vibrate && navigator.vibrate(v); } catch (e) { /* ignore */ } };
  const start = () => { if (ok) return; clearInterval(tm.current); vib(2200); tm.current = setInterval(() => setP(v => Math.min(v + 1.4, 100)), 30); };
  const stop = () => { clearInterval(tm.current); if (!ok) { setP(0); vib(0); } };
  useEffect(() => () => { clearInterval(tm.current); vib(0); }, []);
  useEffect(() => {
    if (p < 100 || ok) return;
    clearInterval(tm.current); setOk(true); love(); vib([200, 100, 200]);
  }, [p]);
  const scanning = p > 0 && !ok;
  return <>
    <h2>{title}</h2><p className="rx-small">{hint}</p>
    <div className={'rx-scan' + (scanning ? ' shake' : '')} onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={e => e.preventDefault()}>
      <svg viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity={ok ? 1 : 0.85}>
        <path d="M30 40 A22 22 0 0 1 70 40" /><path d="M22 52 A30 30 0 0 1 78 52 L78 60" /><path d="M38 78 C34 66 34 54 40 46 A12 12 0 0 1 60 46 C62 58 62 68 58 80" />
        <path d="M50 50 L50 84" strokeDasharray="4 6" /><path d="M30 70 C28 60 28 50 32 44" /><path d="M70 70 C72 60 72 52 70 46" />
      </svg>
      {scanning && <div className="rx-scanline" style={{ top: p + '%' }} />}
    </div>
    <div className="rx-result">{ok ? `${name}: ${result}` : scanning ? `Scanning ${name}... ${Math.floor(p)}%` : ''}</div>
    {ok && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} onClick={done}>Next</motion.button>}</>;
}

/* ---------- 6b. 3 questions: No button bhaagta hai ---------- */
const TEASE = ['Nice try 😜', 'Are you sure? 🥺', 'Too slow! 😆', 'Just say yes 💖'];
function Questions({ title, qs, done }) {
  const list = qs.filter(Boolean);
  const [n, setN] = useState(0), [pos, setPos] = useState(null), [tease, setTease] = useState(0);
  const box = useRef();
  const finished = n >= list.length;
  const dodge = e => {
    if (e?.cancelable) e.preventDefault();
    const b = box.current; if (!b) return;
    const w = Math.max(b.clientWidth - 110, 0), h = Math.max(b.clientHeight - 50, 0);
    let x = 0, y = 0;
    for (let tries = 0; tries < 8; tries++) {
      x = Math.random() * w; y = Math.random() * h;
      if (!pos || Math.hypot(x - pos.x, y - pos.y) > 90) break;
    }
    setPos({ x, y }); setTease(v => v + 1);
  };
  const yes = () => { setN(v => v + 1); setPos(null); setTease(0); if (n + 1 >= list.length) love(); };
  if (finished) return <>
    <h2>Yay! 🥰</h2>
    <p className="rx-hand">I knew it all along 💖</p>
    <button className="rx-btn" onClick={done}>Next</button></>;
  return <>
    <h2>{title}</h2>
    <div className="rx-small">Question {n + 1} of {list.length}</div>
    <motion.p key={n} className="rx-q" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>{list[n]}</motion.p>
    <div className="rx-yn" ref={box}>
      <button className="rx-btn rx-yes" onClick={yes}>Yes 💖</button>
      <button className="rx-btn rx-no" style={pos ? { left: pos.x, top: pos.y, right: 'auto' } : undefined}
        onPointerEnter={dodge} onPointerDown={dodge} onTouchStart={dodge} onFocus={dodge} onClick={dodge}>No</button>
    </div>
    <div className="rx-small" style={{ minHeight: 22 }}>{tease ? TEASE[(tease - 1) % TEASE.length] : ''}</div></>;
}

/* ---------- 7. Memory tree: video jaisa heart-tree, photo frames latakte hain ---------- */
const CANOPY = (() => {
  const out = [];
  [[1, 40], [0.72, 28], [0.45, 16], [0.2, 6]].forEach(([k, cnt], r) => {
    for (let n = 0; n < cnt; n++) {
      const a = (n / cnt) * Math.PI * 2 + r * 0.4;
      const x = 16 * Math.sin(a) ** 3, y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a);
      out.push({ l: 50 + x * k * 2.6, tp: 38 - y * k * 1.9, f: 13 + ((n * 7 + r * 3) % 9), c: ['#ff9ab8', '#ffb3c6', '#ffe29a', '#ff7aa8'][(n + r) % 4], d: 1.2 + (out.length * 0.035) });
    }
  });
  return out;
})();
const FRAMES = [[30, 30, -6], [70, 28, 5], [50, 48, -2], [32, 60, 4], [68, 58, -5]];
function Tree({ photos, done }) {
  const [sel, setSel] = useState(null), [ready, setReady] = useState(false);
  const items = (photos.length ? photos : [null, null, null]).slice(0, 5);
  useEffect(() => { const id = setTimeout(() => setReady(true), 4200); return () => clearTimeout(id); }, []);
  return <>
    <h2>Our Tree of Memories 🌳</h2>
    <div className="rx-tree">
      <svg viewBox="0 0 300 340" className="rx-trunk">
        <motion.path d="M150 340 C150 290 148 250 150 200 M150 240 C120 220 105 198 85 172 M150 228 C180 208 198 188 215 162 M150 208 C150 182 150 160 150 140"
          stroke="#5a3a2a" strokeWidth="9" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
      </svg>
      {CANOPY.map((h, n) => <span key={n} className="rx-leaf" style={{ left: h.l + '%', top: h.tp + '%', fontSize: h.f, color: h.c, animationDelay: h.d + 's' }}>♥</span>)}
      {items.map((p, n) => <motion.button key={n} className="rx-frame" style={{ left: FRAMES[n][0] + '%', top: FRAMES[n][1] + '%', rotate: FRAMES[n][2] }}
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 + n * 0.4, type: 'spring' }} onClick={() => setSel(p || 'ph')}>
        {p ? <img src={p} alt="" /> : <span>📸</span>}</motion.button>)}
    </div>
    <p className="rx-small">Tap any frame</p>
    {ready && <motion.button className="rx-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={done}>Next</motion.button>}
    {sel && typeof document !== 'undefined' && createPortal(
      <div className="rx-zoom" onClick={() => setSel(null)}>
        <div className="rx-zoomcard">{sel === 'ph' ? <span>📸</span> : <img src={sel} alt="" />}</div></div>, document.body)}</>;
}

/* ---------- 8. Letter + 9. Final (same as before) ---------- */
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
    <button className="rx-btn" onClick={replay}>Watch again</button></>;
}