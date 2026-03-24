"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/layout/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["Co-create a brand", "identity you'll love."];
const ITEMS = [
  "Brand Strategy",
  "Brand Guidelines",
  "Visual Design",
  "Brand Identity",
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<HTMLSpanElement[]>([]);
  const bodyRefs = useRef<HTMLElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(textRefs.current, {
        y: "110%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(bodyRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (glowRef.current)
            gsap.set(glowRef.current, {
              y: `${(self.progress - 0.5) * -60}px`,
            });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-[2.8rem] pt-28 pb-32 border-t border-border bg-surface"
    >
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(240,237,232,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <div>
          <div className="mb-10">
            {LINES.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <span
                  ref={(el) => {
                    if (el) textRefs.current[i] = el;
                  }}
                  className="block font-body font-normal text-foreground tracking-tight leading-[1.1]"
                  style={{ fontSize: "clamp(2rem,3.8vw,3.4rem)" }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
          <p
            ref={(el) => {
              if (el) bodyRefs.current[0] = el;
            }}
            className="font-body text-[.88rem] text-muted font-light leading-[1.9] max-w-sm"
          >
            We'll forge a logo that captures your essence, a visual style that
            speaks for itself, and a name that resonates.
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div
            ref={(el) => {
              if (el) bodyRefs.current[1] = el;
            }}
            className="space-y-3 mb-12"
          >
            {ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 group cursor-default"
              >
                <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-foreground transition-colors duration-300 flex-shrink-0" />
                <span className="font-body text-[.82rem] text-muted uppercase tracking-[.12em] group-hover:text-foreground transition-colors duration-300">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            ref={(el) => {
              if (el) bodyRefs.current[2] = el;
            }}
            className="flex flex-col gap-4"
          >
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-4 bg-foreground text-background font-body text-[.82rem] font-normal px-8 py-4 hover:opacity-90 transition-opacity duration-300 self-start"
            >
              Start a project <span>→</span>
            </TransitionLink>
            <TransitionLink
              href="/work"
              className="font-body text-[.78rem] text-muted hover:text-foreground transition-colors duration-300 self-start"
            >
              See our work first
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex justify-between items-center">
        <span className="font-body text-[.72rem] text-muted">
          exovio.agency
        </span>
        <span className="font-body text-[.72rem] text-muted">
          Nashik, India
        </span>
      </div>
    </section>
  );
}
