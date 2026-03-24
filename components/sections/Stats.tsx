"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 50,
    suffix: "+",
    label: "Projects delivered",
    sub: "Across 12 countries",
  },
  { value: 5, suffix: "yrs", label: "Years in the field", sub: "Since 2020" },
  {
    value: 98,
    suffix: "%",
    label: "Client retention rate",
    sub: "They always come back",
  },
  {
    value: 3,
    suffix: "x",
    label: "Avg. conversion lift",
    sub: "Measured over 6 months",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        if (prefersReduced) {
          setDisplay(value);
          return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => setDisplay(Math.round(obj.val)),
        });
      },
    });
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            delay: i * 0.1,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[2.8rem] pt-10 pb-10 border-t border-border bg-surface"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 border border-border md:border-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => {
              if (el) statRefs.current[i] = el;
            }}
            className="
        px-4 py-6 md:px-8 md:py-0
        opacity-0
        border-b border-border
        md:border-b-0 md:border-r
        last:border-r-0
      "
          >
            <div
              className="font-body text-foreground mb-3 leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="font-body text-[.82rem] text-foreground font-normal mb-1">
              {stat.label}
            </p>
            <p className="font-body text-[.72rem] text-muted font-light">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
