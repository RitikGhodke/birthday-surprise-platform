'use client';
import CardExperience from '../../components/CardExperience';
// Bina server aur payment ke test karne ke liye. photos me apni image links daal sakte ho.
const demo = {
  recipientName: 'Dost', birthDate: { day: 9, month: 'Dec' },
  balloonWords: ['Tum', 'bahut', 'khaas', 'ho'], photos: [],
  letter: 'Dear Dost,\n\nJanamdin mubarak! Tum un logon me se ho jinke saath har pal aasan lagta hai.\n\nHamesha tumhara,\nTumhara dost',
  texts: { intro: 'Happy Birthday, Dost', balloonTitle: 'Pop all 4 balloons', candleTitle: 'Blow the candle, Dost',
    bouquetTitle: 'Your Rose Bouquet', momentsTitle: 'Some Sweet Moments', envelopeTitle: 'A Message From My Heart',
    lastButton: 'One last surprise', finalTitle: 'Lots of love for you', finalSub: 'Once again, Happy Birthday Dost!' }
};
export default function Demo() { return <CardExperience card={demo} />; }
