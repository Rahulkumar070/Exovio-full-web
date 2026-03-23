'use client';

const TEXT =
  'Web Design\u2003•\u2003Development\u2003•\u2003Brand Identity\u2003•\u2003Motion Design\u2003•\u2003UI/UX\u2003•\u2003Creative Direction\u2003•\u2003';

// Repeat to fill wide viewports before the loop resets
const CONTENT = Array.from({ length: 3 }, () => TEXT).join('');

export default function Marquee() {
  return (
    <div className="py-16 overflow-hidden" aria-hidden="true">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {/* Two identical copies — CSS animates by -50% for a seamless loop */}
        {[0, 1].map((n) => (
          <span
            key={n}
            className="font-display uppercase tracking-wider text-foreground/[0.07] shrink-0"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            {CONTENT}
          </span>
        ))}
      </div>
    </div>
  );
}
