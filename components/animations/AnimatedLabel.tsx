'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedLabelProps {
  children: string;
  className?: string;
}

export default function AnimatedLabel({ children, className }: AnimatedLabelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const text = textRef.current;
    if (!container || !line || !text) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.set(line, { width: 0 });
    gsap.set(text, { opacity: 0, x: -10 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });
        tl.to(line, { width: 24 })
          .to(text, { opacity: 1, x: 0, duration: 0.6 }, '-=0.2');
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf([line, text]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-3 ${className ?? ''}`}
    >
      <span
        ref={lineRef}
        className="inline-block h-px bg-muted shrink-0"
        style={{ width: 24 }}
        aria-hidden="true"
      />
      <span
        ref={textRef}
        className="uppercase text-xs tracking-[0.15em] text-muted"
      >
        {children}
      </span>
    </div>
  );
}
