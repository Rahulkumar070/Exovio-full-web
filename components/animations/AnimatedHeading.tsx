'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function AnimatedHeading({ children, className, style, delay = 0 }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const words = container.querySelectorAll<HTMLElement>('[data-word]');

    gsap.set(words, { y: '100%', opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
          delay,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(words);
    };
  }, [delay]);

  const words = children.split(' ');

  return (
    <div ref={containerRef} className={className} style={style} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : undefined }}
        >
          <span className="inline-block" data-word>
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
