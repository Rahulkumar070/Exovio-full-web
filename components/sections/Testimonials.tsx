"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    num: "01",
    quote:
      "Exovio didn't just redesign our site — they reframed how we talk about ourselves. Our sales cycle dropped by half.",
    name: "Arjun Mehta",
    role: "Founder, Luma Health",
  },
  {
    num: "02",
    quote:
      "The attention to motion and micro-detail is unlike anything we'd seen. Every frame of the site is considered. It's the best investment we made in year one.",
    name: "Sarah Lin",
    role: "CEO, Arc Systems",
  },
  {
    num: "03",
    quote:
      "They challenged our brief, questioned our assumptions, and delivered work that made us look five years ahead of our category.",
    name: "Marcus Reid",
    role: "Co-founder, Vela Studio",
  },
];

const LOGOS = ["Luma", "Arc", "Vela", "Onyx", "Frigate", "NPC Labs"];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        },
      );

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            delay: i * 0.12,
          },
        );
      });

      gsap.fromTo(
        logosRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: logosRef.current, start: "top 88%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[2.8rem] pt-28 pb-32 border-t border-border"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex items-end justify-between mb-16 opacity-0"
      >
        <h2
          className="font-body font-normal text-foreground tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
        >
          What they say
        </h2>
        <div className="hidden md:flex gap-2">
          <button className="w-10 h-10 border border-border flex items-center justify-center hover:bg-surface transition-colors duration-300">
            <span className="text-muted text-sm">←</span>
          </button>
          <button className="w-10 h-10 border border-border flex items-center justify-center hover:bg-surface transition-colors duration-300">
            <span className="text-muted text-sm">→</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-20">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.num}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className="bg-background p-8 flex flex-col justify-between min-h-[280px] opacity-0 group hover:bg-surface transition-colors duration-300"
          >
            <div>
              <span className="font-body text-[.68rem] text-muted tracking-[.1em] block mb-8">
                {t.num}
              </span>
              <p className="font-body text-[.9rem] text-muted font-light leading-[1.9]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-body text-[.82rem] text-foreground">
                {t.name}
              </p>
              <p className="font-body text-[.75rem] text-muted mt-1">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Logo row */}
      <div ref={logosRef} className="opacity-0">
        <p className="font-body text-[.68rem] text-muted uppercase tracking-[.18em] mb-8 text-center">
          Trusted by
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-border">
          {LOGOS.map((logo) => (
            <div
              key={logo}
              className="bg-background px-6 py-5 flex items-center justify-center hover:bg-surface transition-colors duration-300"
            >
              <span className="font-display font-bold text-[.72rem] text-muted uppercase tracking-[.2em]">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
