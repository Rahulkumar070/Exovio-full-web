"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_LINES = ["We dont build", "websites. We build", "reputations."];

const PILLARS = [
  {
    num: "01",
    label: "Brand Identity",
    desc: "Logos, systems, and visual languages built to outlast trends.",
  },
  {
    num: "02",
    label: "Web Experiences",
    desc: "Award-chasing digital products with motion as a first-class citizen.",
  },
  {
    num: "03",
    label: "Digital Strategy",
    desc: "Positioning and messaging that turns traffic into believers.",
  },
  {
    num: "04",
    label: "Growth Design",
    desc: "Conversion-obsessed design that compounds over time.",
  },
];

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      lineRefs.current.forEach((el) => el && gsap.set(el, { y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { y: "110%" },
        {
          y: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      const pillars = pillarsRef.current?.querySelectorAll(".pillar-item");
      if (pillars) {
        gsap.fromTo(
          pillars,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[2.8rem] pt-28 pb-32 border-t border-border"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-20">
        <span
          ref={labelRef}
          className="font-body text-[.72rem] text-muted uppercase tracking-[.18em] opacity-0"
        >
          About Exovio
        </span>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-3 font-body text-[.82rem] text-foreground border border-border px-6 py-3 hover:bg-surface transition-colors duration-300"
        >
          Start a project
          <span className="text-muted">→</span>
        </a>
      </div>

      {/* Big statement */}
      <div className="mb-24">
        {STATEMENT_LINES.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <span
              ref={(el) => {
                if (el) lineRefs.current[i] = el;
              }}
              className="block font-body font-normal leading-[1.08] tracking-[-0.02em] text-foreground"
              style={{
                fontSize: "clamp(2.4rem, 7vw, 5.5rem)", // slightly better mobile scaling
                transform: "translateY(110%)",
              }}
            >
              {i === 2 ? (
                <em className="not-italic text-muted">{line}</em>
              ) : (
                line
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Two-col body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-20">
        <p className="font-body text-[.82rem] text-muted font-light leading-[1.8]">
          Tomorrow's brands, today.
        </p>

        <div className="space-y-5">
          <p className="font-body text-[.88rem] text-muted font-light leading-[1.9]">
            We are a design-first growth studio. Since founding, we've been
            recognised globally for helping ambitious founders build
            market-defining digital presences that drive compounding results.
          </p>

          <p className="font-body text-[.88rem] text-muted font-light leading-[1.9]">
            We partner with five clients at a time — giving each the creative
            intensity and strategic focus they deserve.
          </p>

          <a
            href="#work"
            className="inline-block font-body text-[.82rem] text-foreground border-b border-foreground pb-px hover:opacity-60 transition-opacity duration-300 mt-2"
          >
            See our work
          </a>
        </div>
      </div>

      {/* Pillars */}
      <div
        ref={pillarsRef}
        className="grid grid-cols-1 md:grid-cols-4 border-t border-border pt-12"
      >
        {PILLARS.map((p) => (
          <div
            key={p.num}
            className="
              pillar-item
              py-6
              border-b border-border
              md:border-b-0 md:border-r
              md:pr-8 md:mr-8
              md:last:mr-0 md:last:pr-0 md:last:border-r-0
              opacity-0
            "
          >
            <div className="flex items-start gap-3 mb-3 md:mb-4">
              <span className="font-body text-[.68rem] text-muted tracking-[.1em]">
                {p.num}
              </span>

              <span className="font-body text-[.82rem] text-foreground font-normal">
                {p.label}
              </span>
            </div>

            <p className="font-body text-[.78rem] text-muted font-light leading-[1.8]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
