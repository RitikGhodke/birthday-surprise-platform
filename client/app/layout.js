// import { Playfair_Display, Caveat } from 'next/font/google';
// import './globals.css';
// const serif = Playfair_Display({ subsets: ['latin'], variable: '--serif' });
// const hand = Caveat({ subsets: ['latin'], variable: '--hand' });
// export const metadata = { title: 'Happy Birthday', viewport: 'width=device-width, initial-scale=1' };
// export default function Root({ children }) {
//   return <html lang="en"><body className={`${serif.variable} ${hand.variable}`}>{children}</body></html>;
// }











import { Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';
const serif = Playfair_Display({ subsets: ['latin'], variable: '--serif' });
const hand = Caveat({ subsets: ['latin'], variable: '--hand' });
export const metadata = { title: 'Happy Birthday' };
export const viewport = { width: 'device-width', initialScale: 1 };
export default function Root({ children }) {
  return <html lang="en"><body className={`${serif.variable} ${hand.variable}`}>{children}</body></html>;
}