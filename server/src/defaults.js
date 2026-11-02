// Sab kuch yahan se default aata hai. User kuch na bhare to ye dikhta hai, bhare to uska text aata hai.
export const DEFAULTS = {
  balloonWords: ['Tum', 'bahut', 'khaas', 'ho'],
  options: { cake: 'chocolate', bond: 'friend', friendSticker: 'bunny' },
  style: 'card',
  letters: {
    friend: `Dear {name},\n\nJanamdin mubarak! Tum un logon me se ho jinke saath har pal aasan lagta hai.\n\nTumhari hansi, tumhari support aur tumhara saath meri zindagi ka sabse achha hissa hai.\n\nIs saal tumhe wo sab mile jo tum dil se chahte ho.\n\nHamesha tumhara,\nTumhara dost`,
    partner: `Dear {name},\n\nJanamdin mubarak! Tumhare aane se meri duniya aur khoobsurat ho gayi.\n\nHar din tumhare saath ek nayi yaad ban jaata hai.\n\nAaj ka din tumhara hai, aur main bas yahi chahta hu ki tum hamesha muskuraate raho.\n\nTumhara apna`,
    family: `Dear {name},\n\nJanamdin mubarak! Aap ke bina ye ghar, ye zindagi adhoori hai.\n\nAapka pyaar aur aashirwad meri sabse badi taakat hai.\n\nBhagwan aapko hamesha khush rakhe.\n\nAapka apna`
  },
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
  }
};
export const fill = (s, name) => (s || '').replaceAll('{name}', name);
// Card ko defaults ke saath merge karke public shape banata hai
export function resolve(card) {
  const o = card.toObject ? card.toObject() : card;
  const bond = o.options?.bond || DEFAULTS.options.bond;
  const merged = {
    slug: o.slug, recipientName: o.recipientName, birthDate: o.birthDate,
    style: o.style || DEFAULTS.style,
    options: { ...DEFAULTS.options, ...o.options },
    balloonWords: o.balloonWords?.length === 4 ? o.balloonWords : DEFAULTS.balloonWords,
    letter: o.letter || DEFAULTS.letters[bond] || DEFAULTS.letters.friend,
    texts: { ...DEFAULTS.texts, ...o.texts },
    photos: (o.photos || []).map(p => p.url)
  };
  merged.letter = fill(merged.letter, o.recipientName);
  for (const k in merged.texts) merged.texts[k] = fill(merged.texts[k], o.recipientName);
  return merged;
}
