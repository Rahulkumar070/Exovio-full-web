"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubPageShell from "@/components/layout/SubPageShell";
import TransitionLink from "@/components/layout/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero ────────────────────────────────────────────────────────────────────

const HERO_LINES = [
  "A studio built on",
  "the belief that design",
  "changes everything.",
];

function AboutHero() {
  const tagRef    = useRef<HTMLSpanElement>(null);
  const linesRef  = useRef<HTMLSpanElement[]>([]);
  const bodyRef   = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Hide before first paint (no static opacity-0 in JSX)
  useLayoutEffect(() => {
    gsap.set([tagRef.current, ...linesRef.current], { y: "110%" });
    gsap.set([bodyRef.current, bottomRef.current], { opacity: 0, y: 16 });
  }, []);

  // Animate immediately — no gate, no isReady
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([tagRef.current, ...linesRef.current, bodyRef.current, bottomRef.current], { clearProps: "all" });
      return;
    }
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(tagRef.current, { y: 0, duration: 0.8, ease: "power3.out" }, 0)
      .to(linesRef.current, { y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.05)
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.35)
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.5);
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="min-h-[100svh] md:min-h-screen flex flex-col px-[2.8rem]">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-start md:items-center pt-24 md:pt-0">
            <div className="overflow-hidden">
              <span ref={tagRef} className="block font-body text-[.75rem] text-muted tracking-[.18em] uppercase">
                About Exovio
              </span>
            </div>
          </div>

          <div className="flex items-start md:items-center pb-12 md:pb-0">
            <div>
              <div className="mb-10">
                {HERO_LINES.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      ref={el => { if (el) linesRef.current[i] = el }}
                      className="block font-body text-[clamp(1.7rem,3.4vw,3rem)] font-normal leading-[1.32] tracking-tight text-foreground"
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
              <p ref={bodyRef} className="font-body text-[clamp(.88rem,1.05vw,1rem)] font-light text-muted leading-[1.9] max-w-[360px]">
                Founded in 2024, Exovio is a design-led digital agency from India.
                We work with ambitious founders and established brands to build
                identities and digital products that stand apart.
              </p>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="flex justify-between items-center py-6 border-t border-border">
          <span className="font-body text-[.75rem] text-muted">Est. 2024 — Nashik, India</span>
          <span className="font-body text-[.75rem] text-muted">(Scroll)</span>
        </div>
      </div>
    </section>
  );
}

// ─── Mission ─────────────────────────────────────────────────────────────────

function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [leftRef.current, rightRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-24 md:py-36 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        <div ref={leftRef}>
          <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-6">Our Mission</p>
          <p className="font-body text-[clamp(1.4rem,2.5vw,2.2rem)] font-normal leading-[1.45] text-foreground max-w-[520px]">
            We exist to prove that design and business aren't in tension —
            they're{" "}
            <em className="font-serif not-italic text-muted">the same thing.</em>
          </p>
        </div>
        <div ref={rightRef} className="flex flex-col justify-end space-y-6 max-w-[400px]">
          <p className="font-body text-[.9rem] font-light text-muted leading-[1.9]">
            Great design isn't decoration. It's the difference between a product
            people love and one they tolerate. Between a brand people remember
            and one they forget.
          </p>
          <p className="font-body text-[.9rem] font-light text-muted leading-[1.9]">
            We combine sharp strategy, meticulous craft, and technical excellence
            to build things that actually move people.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Values ──────────────────────────────────────────────────────────────────

const VALUES = [
  { num: "01", title: "Craft over speed", desc: "We refuse to ship work we're not proud of. Every pixel, every interaction, every line of code is considered." },
  { num: "02", title: "Honesty first", desc: "We say what we mean. If your idea needs rethinking, we'll tell you — with respect and with a better path forward." },
  { num: "03", title: "Design as strategy", desc: "Aesthetics without thinking is decoration. We design systems that solve real problems and create lasting impressions." },
  { num: "04", title: "Long-term thinking", desc: "We build for resilience, not trends. The brands and products we create are meant to grow with you for years." },
];

function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: el, start: "top 87%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-24 md:py-32 border-t border-border">
      <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-16">What we believe</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {VALUES.map((v, i) => (
          <div key={v.num} ref={el => { itemRefs.current[i] = el }} className="bg-background p-10 md:p-12">
            <span className="font-body text-[.68rem] text-muted block mb-6">{v.num}</span>
            <h3 className="font-body text-[1.15rem] font-normal text-foreground mb-4 leading-[1.3]">{v.title}</h3>
            <p className="font-body text-[.85rem] text-muted font-light leading-[1.9]">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Disciplines ─────────────────────────────────────────────────────────────

const DISCIPLINES = ["Brand Identity", "Web Design", "Motion & Animation", "Development", "Digital Strategy", "Product Design"];

function DisciplinesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, x: -12, duration: 0.6, ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-24 md:py-32 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
        <div>
          <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-4">Disciplines</p>
          <p className="font-body text-[.85rem] font-light text-muted leading-[1.9]">A focused set of capabilities, delivered with depth.</p>
        </div>
        <div>
          {DISCIPLINES.map((d, i) => (
            <div key={d} ref={el => { itemRefs.current[i] = el }} className="border-b border-border py-5 flex items-center justify-between group">
              <span className="font-body text-[1rem] font-normal text-foreground">{d}</span>
              <span className="font-body text-[.75rem] text-muted group-hover:text-foreground transition-colors duration-300">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: innerRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-24 md:py-36 border-t border-border">
      <div ref={innerRef}>
        <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-8">Work with us</p>
        <p className="font-body text-[clamp(1.4rem,2.5vw,2.2rem)] font-normal leading-[1.45] text-foreground mb-10 max-w-[560px]">
          If you're building something you believe in — we want to hear about it.
        </p>
        <TransitionLink
          href="/contact"
          className="inline-block font-body text-[.82rem] font-normal text-foreground border-b border-foreground hover:opacity-60 transition-opacity duration-300 pb-px"
        >
          Start a conversation →
        </TransitionLink>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <SubPageShell>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <DisciplinesSection />
      <AboutCTA />
    </SubPageShell>
  );
}
