"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    sub: "1–2 days",
    desc: "We map your landscape. Competitors, positioning gaps, audience psychology, and the one thing your brand needs to own in the market.",
  },
  {
    num: "02",
    title: "Strategy",
    sub: "3–5 days",
    desc: "Brand voice, visual direction, and a creative brief so sharp it practically designs itself. No vague mood boards — decisions with rationale.",
  },
  {
    num: "03",
    title: "Execution",
    sub: "2–6 weeks",
    desc: "Design sprints with daily check-ins. You see real progress, not a black box. We ship in phases so value arrives fast.",
  },
  {
    num: "04",
    title: "Launch & Iterate",
    sub: "Ongoing",
    desc: "We launch, measure, and sharpen. The best brands never stop evolving — your engagement with Exovio doesn't have to either.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

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

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
            delay: i * 0.06,
          },
        );

        // Line expand animation
        const line = el.querySelector(".step-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
              delay: i * 0.06 + 0.2,
            },
          );
        }
      });
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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 opacity-0"
      >
        <div>
          <span className="font-body text-[.72rem] text-muted uppercase tracking-[.18em] block mb-6">
            How we work
          </span>
          <h2
            className="font-body font-normal text-foreground leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            A systemic approach
            <br />
            <em className="font-body not-italic text-muted">
              that actually works.
            </em>
          </h2>
        </div>
        <div className="flex items-end">
          <p className="font-body text-[.88rem] text-muted font-light leading-[1.9]">
            No bloated timelines. No death by committee. We've refined this
            process across 50+ projects to eliminate the waste and keep the
            craft.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => {
              if (el) stepRefs.current[i] = el;
            }}
            className="group border-t border-border py-10 opacity-0"
          >
            <div
              className="step-line h-px bg-foreground/20 mb-10"
              style={{ transform: "scaleX(0)" }}
            />
            <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[3rem_1fr_1fr_auto] gap-6 items-start">
              {/* Number */}
              <span className="font-body text-[.68rem] text-muted tracking-[.1em] pt-1">
                {step.num}
              </span>

              {/* Title */}
              <div>
                <h3 className="font-body text-[clamp(1.6rem,2.8vw,2.4rem)] font-normal tracking-tight text-foreground leading-tight">
                  {step.title}
                </h3>
                <span className="font-body text-[.72rem] text-muted mt-2 block">
                  {step.sub}
                </span>
              </div>

              {/* Description */}
              <p className="hidden md:block font-body text-[.85rem] text-muted font-light leading-[1.9] max-w-sm">
                {step.desc}
              </p>

              {/* Arrow */}
              <div className="hidden md:flex w-10 h-10 border border-border rounded-full items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-400">
                <span className="text-muted group-hover:text-background transition-colors duration-400 text-xs">
                  →
                </span>
              </div>
            </div>

            {/* Mobile desc */}
            <p className="md:hidden font-body text-[.85rem] text-muted font-light leading-[1.9] mt-4 ml-[calc(3rem+1.5rem)]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
