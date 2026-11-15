// 'use client';
// import { useEffect, useState } from 'react';
// import PremiumExperience from '../../../components/PremiumExperience';
// const API = process.env.NEXT_PUBLIC_API_URL;

// // Server ke /api/defaults se premiumTexts leta hai (server chalna chahiye)
// export default function DemoPremium() {
//   const [c, setC] = useState(null);
//   useEffect(() => {
//     fetch(API + '/api/defaults').then(r => r.json()).then(d => {
//       const n = 'Jaan', f = s => s.replaceAll('{name}', n);
//       setC({ recipientName: n, birthDate: { day: 9, month: 'Dec' }, photos: [], options: { friendSticker: 'bunny' },
//         texts: Object.fromEntries(Object.entries(d.premiumTexts).map(([k, v]) => [k, f(v)])), letter: f(d.letters.partner) });
//     });
//   }, []);
//   return c ? <PremiumExperience card={c} /> : null;
// }








// 'use client';
// import PremiumExperience from '../../../components/PremiumExperience';
// // Server ke bina chalta hai
// const n = 'Jaan';
// const demo = {
//   recipientName: n, birthDate: { day: 9, month: 'Dec' }, photos: [], options: { friendSticker: 'bunny' },
//   letter: `Dear ${n},\n\nJanamdin mubarak! Tumhare aane se meri duniya aur khoobsurat ho gayi.\n\nHar din tumhare saath ek nayi yaad ban jaata hai.\n\nTumhara apna`,
//   texts: {
//     intro: `Happy Birthday, ${n}`, intro2: 'Based on a true love story',
//     r1: 'Tumhari muskurahat meri sabse pyaari subah hai', r2: 'Tumhare saath waqt ka pata hi nahi chalta',
//     r3: 'Tum mere bure din ko bhi achha bana dete ho', r4: 'Tumhari har chhoti baat mujhe yaad rehti hai',
//     r5: 'Tum jaisa koi nahi, aur main bahut lucky hu', r6: 'Sabse badi wajah: tum, bas tum',
//     envelopeTitle: 'Film ki script', lastButton: 'Credits dekho', finalTitle: `I love you, ${n}`, finalSub: 'Happy Birthday meri jaan'
//   }
// };
// export default function DemoPremium() { return <PremiumExperience card={demo} />; }




















'use client';
import PremiumExperience from '../../../components/PremiumExperience';
// Server ke bina chalta hai
const n = 'Jaan';
const demo = {
  recipientName: n, birthDate: { day: 9, month: 'Dec' }, photos: ['https://picsum.photos/400/400?1', 'https://picsum.photos/400/400?2', 'https://picsum.photos/400/400?3'], options: { friendSticker: 'bunny' },
  letter: `Dear ${n},\n\nJanamdin mubarak! Tumhare aane se meri duniya aur khoobsurat ho gayi.\n\nHar din tumhare saath ek nayi yaad ban jaata hai.\n\nAaj ka din tumhara hai, aur main bas yahi chahta hu ki tum hamesha muskuraate raho.\n\nTumhara apna`,
  texts: {
    intro: `Happy Birthday, ${n}`, intro2: 'Ek khat, sirf tumhare liye',
    r1: 'Tumhari muskurahat meri sabse pyaari subah hai', r2: 'Tumhare saath waqt ka pata hi nahi chalta',
    r3: 'Tum mere bure din ko bhi achha bana dete ho', r4: 'Tumhari har chhoti baat mujhe yaad rehti hai',
    r5: 'Tum jaisa koi nahi, aur main bahut lucky hu', r6: 'Sabse badi wajah: tum, bas tum',
    momentsTitle: 'Hamari yaadein', envelopeTitle: 'Tumhare liye, dil se', lastButton: 'Last surprise',
    finalTitle: `I love you, ${n}`, finalSub: 'Happy Birthday meri jaan'
  }
};
export default function DemoPremium() { return <PremiumExperience card={demo} />; }