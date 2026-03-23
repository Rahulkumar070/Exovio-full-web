'use client';

const UNIT = 'Web Design\u2003•\u2003Development\u2003•\u2003Brand Identity\u2003•\u2003Motion Design\u2003•\u2003';
const CONTENT = Array.from({ length: 3 }, () => UNIT).join('');

export default function Marquee() {
  return (
    <div className="py-16 overflow-hidden" aria-hidden="true">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {[0, 1].map((n) => (
          <span
            key={n}
            className="font-display uppercase tracking-wider text-[#1A1A1A]/[0.06] shrink-0"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            {CONTENT}
          </span>
        ))}
      </div>
    </div>
  );
}
