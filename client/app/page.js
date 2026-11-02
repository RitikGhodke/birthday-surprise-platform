import Link from 'next/link';
export default function Home() {
  return <main className="stage"><div className="scene">
    <div className="big">🎂</div><h1>Birthday Surprise</h1>
    <p>Apne khaas insaan ke liye ek pyaara interactive birthday card banao.</p>
    <Link className="btn" href="/create">Create yours</Link>
    <Link href="/demo" className="muted">Demo dekho</Link></div></main>;
}
