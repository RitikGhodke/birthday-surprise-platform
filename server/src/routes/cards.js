// import { Router } from 'express';
// import multer from 'multer';
// import bcrypt from 'bcryptjs';
// import { v2 as cloudinary } from 'cloudinary';
// import Card from '../models/Card.js';
// import { resolve } from '../defaults.js';
// import { sha } from './orders.js';

// const router = Router();
// const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 5 },
//   fileFilter: (_, f, cb) => cb(null, /^image\/(jpeg|png|webp)$/.test(f.mimetype)) });

// const live = async (slug) => {
//   const c = await Card.findOne({ slug, status: 'paid' });
//   return c && (!c.expiresAt || c.expiresAt > new Date()) ? c : null;
// };
// const owner = async (req, res, next) => {
//   const c = await live(req.params.slug);
//   if (!c) return res.status(404).json({ error: 'Card nahi mila' });
//   if (sha(req.get('x-edit-token') || '') !== c.editTokenHash) return res.status(403).json({ error: 'Allowed nahi hai' });
//   req.card = c; next();
// };

// // Owner apna card edit karne ke liye dekhta hai (passcode ke bina bhi)
// router.get('/:slug/mine', owner, (req, res) => res.json({ ...resolve(req.card), passcodeSet: !!req.card.passcodeHash }));

// router.get('/:slug', async (req, res) => {
//   const c = await live(req.params.slug);
//   if (!c) return res.status(404).json({ error: 'Card nahi mila' });
//   if (c.passcodeHash) return res.json({ locked: true, recipientName: c.recipientName });
//   res.json(resolve(c));
// });

// router.post('/:slug/unlock', async (req, res) => {
//   const c = await live(req.params.slug);
//   if (!c || !c.passcodeHash) return res.status(404).json({ error: 'Card nahi mila' });
//   if (!(await bcrypt.compare(String(req.body.passcode || ''), c.passcodeHash))) return res.status(401).json({ error: 'Galat passcode' });
//   res.json(resolve(c));
// });

// // Sab kuch editable: naam, date, style, options, words, letter, har title
// const EDITABLE = ['recipientName', 'birthDate', 'style', 'options', 'balloonWords', 'letter', 'texts'];
// router.patch('/:slug', owner, async (req, res) => {
//   for (const k of EDITABLE) if (k in req.body) req.card[k] = req.body[k];
//   if ('passcode' in req.body) req.card.passcodeHash = req.body.passcode ? await bcrypt.hash(String(req.body.passcode), 8) : undefined;
//   await req.card.save();
//   res.json(resolve(req.card));
// });

// router.post('/:slug/photos', owner, upload.array('photos', 5), async (req, res) => {
//   const room = 5 - req.card.photos.length;
//   const files = (req.files || []).slice(0, Math.max(room, 0));
//   for (const f of files) {
//     const r = await new Promise((ok, no) => cloudinary.uploader.upload_stream(
//       { folder: `birthday/${req.card.slug}` }, (e, x) => (e ? no(e) : ok(x))).end(f.buffer));
//     req.card.photos.push({ url: r.secure_url, publicId: r.public_id });
//   }
//   await req.card.save();
//   res.json(resolve(req.card));
// });

// router.delete('/:slug/photos/:publicId', owner, async (req, res) => {
//   const id = decodeURIComponent(req.params.publicId);
//   req.card.photos = req.card.photos.filter(p => p.publicId !== id);
//   await cloudinary.uploader.destroy(id);
//   await req.card.save();
//   res.json(resolve(req.card));
// });
// export default router;














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