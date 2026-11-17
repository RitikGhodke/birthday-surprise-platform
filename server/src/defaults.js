// Sab kuch yahan se default aata hai. User kuch na bhare to ye dikhta hai, bhare to uska text aata hai.
export const DEFAULTS = {
  balloonWords: ['Tum', 'bahut', 'khaas', 'ho'],
  options: { cake: 'chocolate', bond: 'friend', friendSticker: 'bunny' },
  style: 'card',
  letters: {
    friend: `Dear {name},\n\nJanamdin mubarak! Tum un logon me se ho jinke saath har pal aasan lagta hai.\n\nTumhari hansi, tumhari support aur tumhara saath meri zindagi ka sabse achha hissa hai.\n\nIs saal tumhe wo sab mile jo tum dil se chahte ho.\n\nHamesha tumhara,\nTumhara dost`,
    partner: `Dear {name},\n\nHappy Birthday! My world became more beautiful the day you came into it.\n\nEvery day with you turns into a new memory.\n\nToday is your day, and all I want is for you to keep smiling, always.\n\nYours forever`,
    family: `Dear {name},\n\nJanamdin mubarak! Aap ke bina ye ghar, ye zindagi adhoori hai.\n\nAapka pyaar aur aashirwad meri sabse badi taakat hai.\n\nBhagwan aapko hamesha khush rakhe.\n\nAapka apna`
  },
  // Classic card ke texts
  texts: {
    intro: 'Happy Birthday, {name}',
    balloonTitle: 'Pop all 4 balloons',
    candleTitle: 'Blow the candle, {name}',
    bouquetTitle: 'Your Rose Bouquet',
    momentsTitle: 'Some Sweet Moments',
    envelopeTitle: 'A Message From My Heart',
    lastButton: 'One last surprise',
    finalTitle: 'Lots of love for you',
    finalSub: 'Once again, Happy Birthday {name}!'
  },
  // Premium card ke texts (English)
  premiumTexts: {
    intro: 'Happy Birthday, {name}',
    intro2: 'A little surprise, just for you',
    strikeTitle: 'Aim for the heart',
    scanTitle: 'Love scanner',
    scanHint: 'Press and hold your finger on the scanner',
    scanResult: 'Match found: 100% in love 💖',
    qTitle: 'Quick questions',
    q1: 'Do you love me?',
    q2: 'Will you always stay with me?',
    q3: 'Can I hug you right now?',
    momentsTitle: 'Little Moments',
    envelopeTitle: 'For you, from my heart',
    lastButton: 'Last surprise',
    finalTitle: 'I love you, {name}',
    finalSub: 'Happy Birthday, my love'
  }
};
export const fill = (s, name) => (s || '').replaceAll('{name}', name);

// Card ko defaults ke saath merge karke public shape banata hai
export function resolve(card) {
  // flattenMaps: true zaruri hai, warna texts (Mongoose Map) spread nahi hota aur edits ignore ho jaate hain
  const o = card.toObject ? card.toObject({ flattenMaps: true }) : card;
  const bond = o.options?.bond || DEFAULTS.options.bond;
  const baseTexts = o.style === 'premium' ? DEFAULTS.premiumTexts : DEFAULTS.texts;
  const merged = {
    slug: o.slug, recipientName: o.recipientName, birthDate: o.birthDate,
    style: o.style || DEFAULTS.style,
    options: { ...DEFAULTS.options, ...o.options },
    balloonWords: o.balloonWords?.length === 4 ? o.balloonWords : DEFAULTS.balloonWords,
    letter: o.letter || DEFAULTS.letters[bond] || DEFAULTS.letters.friend,
    texts: { ...baseTexts, ...(o.texts || {}) },
    photos: (o.photos || []).map(p => p.url),
    treePhotos: (o.treePhotos || []).map(p => p.url)
  };
  merged.letter = fill(merged.letter, o.recipientName);
  for (const k in merged.texts) merged.texts[k] = fill(merged.texts[k], o.recipientName);
  return merged;
}










