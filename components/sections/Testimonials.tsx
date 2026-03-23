'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const QUOTES = [
  {
    text: 'Exovio delivered a website that genuinely impressed our investors. The attention to animation and interaction design is next level.',
    author: '— Vikram Patel',
    role: 'Co-founder, NovaTech',
  },
  {
    text: 'From concept to launch, Exovio made the entire process feel effortless. Our conversion rate doubled within the first month.',
    author: '— Meera Joshi',
    role: 'Founder, Bloom Studio',
  },
  {
    text: 'Researchly has transformed how I approach academic research. The AI-powered analysis saves me hours every week.',
    author: '— Dr. Ananya Reddy',
    role: 'Research Scholar, IIT Bombay',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    if (isAnimating.current || next === activeRef.current) return;
    isAnimating.current = true;

    const el = quoteRef.current;
    if (!el) { isAnimating.current = false; return; }

    gsap.to(el, {
      opacity: 0,
      y: 16,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        activeRef.current = next;
        setActive(next);
        gsap.fromTo(
          el,
          { opacity: 0, y: -16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goTo((activeRef.current + 1) % QUOTES.length);
    }, 5000);
  }, [goTo]);

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startInterval]);

  const handleDot = (i: number) => {
    goTo(i);
    startInterval();
  };

  const q = QUOTES[active];

  return (
    <section className="py-40 md:py-64 px-6 md:px-16 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        <div
          ref={quoteRef}
          className="flex flex-col items-center min-h-[260px] justify-center will-change-transform"
        >
          <blockquote
            className="font-serif text-[#1A1A1A] leading-[1.35]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            &ldquo;{q.text}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1 mt-10">
            <span className="text-sm text-[#8B8680]">{q.author}</span>
            <span className="text-xs text-[#8B8680]/60">{q.role}</span>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Testimonials">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => handleDot(i)}
              data-cursor-hover
              className={[
                'w-2 h-2 rounded-full transition-colors duration-300',
                i === active ? 'bg-[#1A1A1A]' : 'bg-[#D9D4CE] hover:bg-[#8B8680]',
              ].join(' ')}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
