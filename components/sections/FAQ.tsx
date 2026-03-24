"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Who do you work with?",
    a: "We work with founders, startups, and growth-stage companies who take design seriously. Our ideal client sees their brand as a competitive asset — not just window dressing.",
  },
  {
    q: "What's your process like?",
    a: "Four phases: Discovery (understand your world), Strategy (creative brief + positioning), Execution (design sprints with daily visibility), and Launch. We move fast without cutting corners.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines vary by scope. Brand identity: 2–3 weeks. Website design + dev: 4–8 weeks. Full-stack brand + web: 6–12 weeks. We'll give you a precise timeline after discovery.",
  },
  {
    q: "Do you only take five clients at a time?",
    a: "Yes, intentionally. This limit lets us give every project the focused attention that actually produces award-level work. We maintain a waitlist.",
  },
  {
    q: "How do I get started?",
    a: "Fill out our project form or email hello@exovio.agency. We'll schedule a 30-min discovery call to see if we're a fit — no sales pitch, just a real conversation.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!bodyRef.current) return;

    if (open) {
      gsap.set(bodyRef.current, { height: "auto", opacity: 1 });
      const h = bodyRef.current.offsetHeight;
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: prefersReduced ? 0 : 0.5,
          ease: "power3.out",
        },
      );
      if (arrowRef.current && !prefersReduced) {
        gsap.to(arrowRef.current, {
          rotation: 45,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    } else {
      const h = bodyRef.current.offsetHeight;
      if (h > 0) {
        gsap.to(bodyRef.current, {
          height: 0,
          opacity: 0,
          duration: prefersReduced ? 0 : 0.4,
          ease: "power3.in",
        });
        if (arrowRef.current && !prefersReduced) {
          gsap.to(arrowRef.current, {
            rotation: 0,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      }
    }
  }, [open]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: itemRef.current, start: "top 88%" },
        delay: index * 0.07,
      },
    );
  }, [index]);

  return (
    <div ref={itemRef} className="border-t border-border opacity-0">
      <button
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-body text-[.95rem] text-foreground font-normal group-hover:text-muted transition-colors duration-300 leading-tight">
          {q}
        </span>
        <span
          ref={arrowRef}
          className="flex-shrink-0 w-6 h-6 border border-border rounded-full flex items-center justify-center mt-0.5"
          style={{ display: "inline-flex" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1V9M1 5H9"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-muted"
            />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="font-body text-[.88rem] text-muted font-light leading-[1.9] pb-7 max-w-2xl">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !headerRef.current) return;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[2.8rem] pt-28 pb-32 border-t border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
        {/* Left */}
        <div ref={headerRef} className="opacity-0">
          <span className="font-body text-[.72rem] text-muted uppercase tracking-[.18em] block mb-6">
            FAQ
          </span>
          <h2
            className="font-body font-normal text-foreground tracking-tight leading-[1.1] mb-8"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Frequently
            <br />
            <em className="font-body not-italic text-muted">
              asked questions.
            </em>
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-body text-[.82rem] text-foreground border border-border px-6 py-3 hover:bg-surface transition-colors duration-300"
          >
            See all questions
            <span className="text-muted">→</span>
          </a>
        </div>

        {/* Right — accordion */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
