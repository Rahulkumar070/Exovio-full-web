"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TAGLINE_LINES = ["Designing beyond limits,", "from concept to code."];

const HEADING_LINES = [
  "Exovio is a design-led",
  "agency crafting digital",
  "experiences from",
  "vision to reality.",
];

const BODY_LINES = [
  "We partner with ambitious brands and",
  "visionaries to build identities, websites,",
  "and digital products that resonate.",
  "From raw ideas to refined execution—",
  "built to last.",
];

interface HeroProps {
  isLoaded: boolean;
}

function LineBlock({
  lines,
  className,
  refs,
}: {
  lines: string[];
  className: string;
  refs: React.MutableRefObject<HTMLSpanElement[]>;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <span
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            className={`block ${className}`}
            style={{ transform: "translateY(110%)" }}
          >
            {line}
          </span>
        </div>
      ))}
    </>
  );
}

export default function Hero({ isLoaded }: HeroProps) {
  const taglineRefs = useRef<HTMLSpanElement[]>([]);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const bodyRefs = useRef<HTMLSpanElement[]>([]);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState("");

  // IST Clock
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Animations
  useEffect(() => {
    if (!isLoaded) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      gsap.set(
        [...headingRefs.current, ...taglineRefs.current, ...bodyRefs.current],
        { y: 0 },
      );
      gsap.set(bottomBarRef.current, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      headingRefs.current,
      { y: "110%" },
      { y: 0, duration: 1, stagger: 0.09, ease: "power3.out" },
      0,
    )
      .fromTo(
        taglineRefs.current,
        { y: "110%" },
        { y: 0, duration: 1, stagger: 0.07, ease: "power3.out" },
        0.1,
      )
      .fromTo(
        bodyRefs.current,
        { y: "110%" },
        { y: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" },
        0.2,
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4,
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoaded]);

  return (
    <section className="overflow-hidden">
      {/* MAIN CONTAINER */}
      <div className="min-h-[100svh] md:min-h-screen flex flex-col px-[2.8rem]">
        {/* TOP CONTENT */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="flex items-start md:items-center pt-24 md:pt-0">
            <div className="max-w-[260px]">
              <LineBlock
                lines={TAGLINE_LINES}
                className="font-body text-[clamp(.88rem,1vw,1rem)] font-light text-muted"
                refs={taglineRefs}
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-start md:items-center pb-12 md:pb-0">
            <div>
              <div className="mb-10">
                <LineBlock
                  lines={HEADING_LINES}
                  className="font-body text-[clamp(1.7rem,3.4vw,3rem)] font-normal leading-[1.32] tracking-tight text-foreground"
                  refs={headingRefs}
                />
              </div>
              <LineBlock
                lines={BODY_LINES}
                className="font-body text-[clamp(.88rem,1.05vw,1rem)] font-light text-muted"
                refs={bodyRefs}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          ref={bottomBarRef}
          className="flex justify-between items-center py-6 border-t border-border opacity-0"
        >
          <span className="font-body text-[.75rem] text-muted">
            Nagpur, India{time ? ` — ${time} IST` : ""}
          </span>
          <span className="font-body text-[.75rem] text-muted">(Scroll)</span>
        </div>
      </div>
    </section>
  );
}
