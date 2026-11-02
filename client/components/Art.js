// Original SVG art (copyright-free). type/kind options form se aate hain.
const CAKES = {
  chocolate: { base: '#5a3425', top: '#7a4a35', icing: '#f4dfe6' },
  vanilla: { base: '#f3dcae', top: '#f8e8c8', icing: '#ffffff' },
  strawberry: { base: '#f2a0b6', top: '#f7bccb', icing: '#ffffff' }
};
export function Cake({ type = 'chocolate', lit = true }) {
  const c = CAKES[type] || CAKES.chocolate;
  return <svg viewBox="0 0 200 200" aria-label="cake">
    <ellipse cx="100" cy="176" rx="84" ry="10" fill="#efd9e1" />
    <rect x="28" y="110" width="144" height="62" rx="14" fill={c.base} />
    <rect x="28" y="110" width="144" height="16" rx="8" fill={c.icing} />
    <rect x="54" y="68" width="92" height="46" rx="12" fill={c.top} />
    <rect x="54" y="68" width="92" height="14" rx="7" fill={c.icing} />
    {[44, 76, 108, 140].map(x => <circle key={x} cx={x + 6} cy="148" r="5" fill="#ff8fab" />)}
    <circle cx="70" cy="98" r="4" fill="#ff8fab" /><circle cx="100" cy="98" r="4" fill="#ffd166" /><circle cx="130" cy="98" r="4" fill="#ff8fab" />
    <rect x="96" y="38" width="8" height="32" rx="3" fill="#e24a6b" />
    {lit && <g className="fl"><ellipse cx="100" cy="28" rx="7" ry="12" fill="#ffb347" /><ellipse cx="100" cy="31" rx="3.5" ry="7" fill="#fff3b0" /></g>}
  </svg>;
}
export function Sticker({ kind = 'bunny' }) {
  const eyes = <><circle cx="47" cy="72" r="3.6" fill="#3b2230" /><circle cx="73" cy="72" r="3.6" fill="#3b2230" /></>;
  const cheeks = <><ellipse cx="38" cy="82" rx="6" ry="4" fill="#ffb3c6" opacity=".7" /><ellipse cx="82" cy="82" rx="6" ry="4" fill="#ffb3c6" opacity=".7" /></>;
  const mouth = <path d="M54 84 q6 6 12 0" stroke="#3b2230" strokeWidth="2" fill="none" strokeLinecap="round" />;
  if (kind === 'bear') return <svg viewBox="0 0 120 120"><circle cx="28" cy="38" r="15" fill="#b5784a" /><circle cx="92" cy="38" r="15" fill="#b5784a" /><circle cx="28" cy="38" r="7" fill="#e8b98f" /><circle cx="92" cy="38" r="7" fill="#e8b98f" />
    <circle cx="60" cy="68" r="38" fill="#c8905a" /><ellipse cx="60" cy="82" rx="17" ry="12" fill="#f2d3a8" />{eyes}{cheeks}<ellipse cx="60" cy="77" rx="5" ry="3.5" fill="#3b2230" />{mouth}</svg>;
  if (kind === 'panda') return <svg viewBox="0 0 120 120"><circle cx="28" cy="38" r="15" fill="#2b2230" /><circle cx="92" cy="38" r="15" fill="#2b2230" />
    <circle cx="60" cy="68" r="38" fill="#fff" stroke="#eadbe2" strokeWidth="2" /><ellipse cx="45" cy="70" rx="9" ry="11" fill="#2b2230" transform="rotate(20 45 70)" /><ellipse cx="75" cy="70" rx="9" ry="11" fill="#2b2230" transform="rotate(-20 75 70)" />
    <circle cx="46" cy="70" r="3" fill="#fff" /><circle cx="74" cy="70" r="3" fill="#fff" />{cheeks}<ellipse cx="60" cy="80" rx="5" ry="3.5" fill="#2b2230" />{mouth}</svg>;
  return <svg viewBox="0 0 120 120"><ellipse cx="42" cy="26" rx="10" ry="26" fill="#fff" stroke="#eadbe2" strokeWidth="2" /><ellipse cx="78" cy="26" rx="10" ry="26" fill="#fff" stroke="#eadbe2" strokeWidth="2" />
    <ellipse cx="42" cy="28" rx="5" ry="18" fill="#ffc2d4" /><ellipse cx="78" cy="28" rx="5" ry="18" fill="#ffc2d4" />
    <ellipse cx="60" cy="74" rx="40" ry="35" fill="#fff" stroke="#eadbe2" strokeWidth="2" />{eyes}{cheeks}<ellipse cx="60" cy="79" rx="4" ry="3" fill="#ff8fab" />{mouth}</svg>;
}