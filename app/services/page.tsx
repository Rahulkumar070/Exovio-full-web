"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubPageShell from "@/components/layout/SubPageShell";
import TransitionLink from "@/components/layout/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Brand Identity",
    desc: "End-to-end brand systems crafted to communicate authority from first impression. Logo, typography, colour, motion, tone of voice — everything needed to own a market.",
    deliverables: ["Logo & mark system", "Typography hierarchy", "Colour palette", "Brand guidelines", "Motion principles", "Stationery & collateral"],
  },
  {
    num: "02",
    title: "Web Design & Development",
    desc: "Pixel-perfect, animation-first websites built to win awards and convert visitors into clients. We handle UX strategy, visual design, and production Next.js development.",
    deliverables: ["UX strategy & wireframes", "Visual design", "Motion design", "Next.js development", "CMS integration", "Performance optimisation"],
  },
  {
    num: "03",
    title: "Digital Strategy",
    desc: "Data-informed creative direction that aligns business goals with design decisions. Audience research, positioning, SEO architecture, and growth roadmaps.",
    deliverables: ["Brand positioning", "Audience research", "Content strategy", "SEO architecture", "Analytics setup", "Growth roadmap"],
  },
  {
    num: "04",
    title: "Product Design",
    desc: "Interfaces that feel inevitable — designed around how humans actually think and move. From early product discovery to polished UI systems.",
    deliverables: ["User research", "Information architecture", "Wireframing", "UI design", "Design systems", "Handoff & documentation"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We get under the skin of your business, your users, and your market before designing a single pixel." },
  { step: "02", title: "Strategy", desc: "A clear brief, defined scope, and creative direction. Align on what we're building and why before we build it." },
  { step: "03", title: "Design", desc: "Rapid explorations, refined executions. We move fast but never at the expense of quality or intention." },
  { step: "04", title: "Delivery", desc: "Clean handoffs, thorough documentation, and a smooth launch. We're here even after the work goes live." },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_LINES = ["We offer a focused", "suite of services,", "done exceptionally well."];

function ServicesHero() {
  const tagRef    = useRef<HTMLSpanElement>(null);
  const linesRef  = useRef<HTMLSpanElement[]>([]);
  const bodyRef   = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set([tagRef.current, ...linesRef.current], { y: "110%" });
    gsap.set([bodyRef.current, bottomRef.current], { opacity: 0, y: 16 });
  }, []);

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
                What we do
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
                Four core disciplines, practiced with depth. No scattered specialisms, no outsourced work. Everything you need, nothing you don't.
              </p>
            </div>
          </div>
        </div>
        <div ref={bottomRef} className="flex justify-between items-center py-6 border-t border-border">
          <span className="font-body text-[.75rem] text-muted">Four disciplines</span>
          <span className="font-body text-[.75rem] text-muted">(Scroll)</span>
        </div>
      </div>
    </section>
  );
}

// ─── Service accordion card ───────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef  = useRef<HTMLDivElement>(null);
  const bodyRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      delay: index * 0.08,
      scrollTrigger: { trigger: cardRef.current, start: "top 87%" },
    });
  }, [index]);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [open]);

  return (
    <div ref={cardRef} className="border-b border-border">
      <button
        type="button"
        className="w-full py-10 md:py-12 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-body text-[.68rem] text-muted pt-1">{service.num}</span>
        <div>
          <h2 className="font-body text-[clamp(1.4rem,2.5vw,2rem)] font-normal text-foreground leading-[1.2] mb-4 group-hover:opacity-70 transition-opacity duration-300">
            {service.title}
          </h2>
          <p className="font-body text-[.85rem] font-light text-muted leading-[1.9] max-w-[480px]">{service.desc}</p>
        </div>
        <span
          className="font-body text-[1.2rem] text-muted mt-1 inline-block transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="pb-10">
          <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-5 md:ml-[3.5rem]">Deliverables</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:ml-[3.5rem]">
            {service.deliverables.map(d => (
              <span key={d} className="font-body text-[.82rem] text-muted border border-border px-4 py-2">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <section className="px-[2.8rem] pt-8 pb-24 border-t border-border">
      <div className="border-t border-border">
        {SERVICES.map((s, i) => <ServiceCard key={s.num} service={s} index={i} />)}
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[2.8rem] py-24 md:py-32 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-16">
        <div>
          <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em]">How we work</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROCESS.map((p, i) => (
            <div key={p.step} ref={el => { itemRefs.current[i] = el }}>
              <span className="font-body text-[.68rem] text-muted block mb-4">{p.step}</span>
              <h3 className="font-body text-[1rem] font-normal text-foreground mb-3">{p.title}</h3>
              <p className="font-body text-[.85rem] font-light text-muted leading-[1.9]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function ServicesCTA() {
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
        <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-8">Ready to start?</p>
        <p className="font-body text-[clamp(1.4rem,2.5vw,2.2rem)] font-normal leading-[1.45] text-foreground mb-10 max-w-[560px]">
          Tell us about your project and we'll put together a tailored proposal.
        </p>
        <TransitionLink
          href="/contact"
          className="inline-block font-body text-[.82rem] font-normal text-foreground border-b border-foreground hover:opacity-60 transition-opacity duration-300 pb-px"
        >
          Start a project →
        </TransitionLink>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <SubPageShell>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <ServicesCTA />
    </SubPageShell>
  );
}
