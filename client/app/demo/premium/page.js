'use client';
import { useEffect, useState } from 'react';
import PremiumExperience from '../../../components/PremiumExperience';
const API = process.env.NEXT_PUBLIC_API_URL;

// Server ke /api/defaults se premiumTexts leta hai (server chalna chahiye)
export default function DemoPremium() {
  const [c, setC] = useState(null);
  useEffect(() => {
    fetch(API + '/api/defaults').then(r => r.json()).then(d => {
      const n = 'Jaan', f = s => s.replaceAll('{name}', n);
      setC({ recipientName: n, birthDate: { day: 9, month: 'Dec' }, photos: [], options: { friendSticker: 'bunny' },
        texts: Object.fromEntries(Object.entries(d.premiumTexts).map(([k, v]) => [k, f(v)])), letter: f(d.letters.partner) });
    });
  }, []);
  return c ? <PremiumExperience card={c} /> : null;
}