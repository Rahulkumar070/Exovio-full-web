"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubPageShell from "@/components/layout/SubPageShell";
import TransitionLink from "@/components/layout/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "Exovio",
    title: "Exovio Agency",
    category: "Brand Identity",
    type: "branding",
    year: "2025",
    tags: ["Logo", "Visual System", "Print"],
    desc: "Complete brand identity for a luxury interior design studio based in Mumbai.",
    bg: "#0f1a0f",
  },
  {
    id: "02",
    title: "Meridian SaaS",
    category: "Web Design & Dev",
    type: "web",
    year: "2025",
    tags: ["Next.js", "GSAP", "Motion"],
    desc: "Award-level marketing site for a B2B analytics platform targeting enterprise clients.",
    bg: "#0a0f1a",
  },
  {
    id: "03",
    title: "Fold Coffee",
    category: "Brand Identity",
    type: "branding",
    year: "2024",
    tags: ["Packaging", "Typography", "Brand"],
    desc: "Brand and packaging system for a specialty coffee brand with a minimal Japanese aesthetic.",
    bg: "#1a1005",
  },
  {
    id: "04",
    title: "Helios Capital",
    category: "Web Design & Dev",
    type: "web",
    year: "2025",
    tags: ["Webflow", "Animation", "Finance"],
    desc: "Authoritative digital presence for a venture capital firm investing in climate technology.",
    bg: "#0f0a1a",
  },
  {
    id: "05",
    title: "Luma Health",
    category: "Product Design",
    type: "product",
    year: "2024",
    tags: ["UI/UX", "Design System", "Figma"],
    desc: "Full product redesign for a digital health platform serving 80,000+ patients.",
    bg: "#0a1510",
  },
  {
    id: "06",
    title: "Velt Agency",
    category: "Brand + Web",
    type: "branding",
    year: "2024",
    tags: ["Identity", "Website", "Motion"],
    desc: "End-to-end brand and web for a creative consultancy in Bengaluru.",
    bg: "#1a0a0a",
  },
];

const FILTERS = ["All", "Branding", "Web", "Product"];

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_LINES = [
  "Selected work from",
  "brands that wanted",
  "to stand apart.",
];

function WorkHero() {
  const tagRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set([tagRef.current, ...linesRef.current], { y: "110%" });
    gsap.set([bodyRef.current, bottomRef.current], { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      gsap.set(
        [
          tagRef.current,
          ...linesRef.current,
          bodyRef.current,
          bottomRef.current,
        ],
        { clearProps: "all" },
      );
      return;
    }
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(tagRef.current, { y: 0, duration: 0.8, ease: "power3.out" }, 0)
      .to(
        linesRef.current,
        { y: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
        0.05,
      )
      .to(
        bodyRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.35,
      )
      .to(
        bottomRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.5,
      );
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="min-h-[100svh] md:min-h-screen flex flex-col px-[2.8rem]">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-start md:items-center pt-24 md:pt-0">
            <div className="overflow-hidden">
              <span
                ref={tagRef}
                className="block font-body text-[.75rem] text-muted tracking-[.18em] uppercase"
              >
                Our work
              </span>
            </div>
          </div>
          <div className="flex items-start md:items-center pb-12 md:pb-0">
            <div>
              <div className="mb-10">
                {HERO_LINES.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      ref={(el) => {
                        if (el) linesRef.current[i] = el;
                      }}
                      className="block font-body text-[clamp(1.7rem,3.4vw,3rem)] font-normal leading-[1.32] tracking-tight text-foreground"
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
              <p
                ref={bodyRef}
                className="font-body text-[clamp(.88rem,1.05vw,1rem)] font-light text-muted leading-[1.9] max-w-[360px]"
              >
                A curated selection of projects across branding, web, and
                product — each one a long-term collaboration built to last.
              </p>
            </div>
          </div>
        </div>
        <div
          ref={bottomRef}
          className="flex justify-between items-center py-6 border-t border-border"
        >
          <span className="font-body text-[.75rem] text-muted">
            {PROJECTS.length} projects
          </span>
          <span className="font-body text-[.75rem] text-muted">(Scroll)</span>
        </div>
      </div>
    </section>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        delay: (index % 2) * 0.12,
        scrollTrigger: { trigger: cardRef.current, start: "top 87%" },
      });
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          y: "-12%",
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden mb-5"
        style={{ aspectRatio: index % 3 === 1 ? "3/4" : "4/3" }}
      >
        <div
          ref={imgRef}
          className="absolute inset-0 scale-[1.12]"
          style={{ background: p.bg }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-bold text-foreground select-none leading-none transition-opacity duration-700"
            style={{
              fontSize: "clamp(5rem,18vw,14rem)",
              letterSpacing: "-0.03em",
              opacity: hovered ? 0.08 : 0.03,
            }}
          >
            {p.id}
          </span>
        </div>
        <div
          className="absolute bottom-5 left-5 flex gap-2 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-body text-[.68rem] text-foreground/80 bg-background/50 backdrop-blur-sm border border-foreground/10 px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-body text-[1rem] font-normal text-foreground mb-1 group-hover:opacity-60 transition-opacity duration-300">
            {p.title}
          </h3>
          <p className="font-body text-[.8rem] text-muted">{p.category}</p>
        </div>
        <span className="font-body text-[.75rem] text-muted mt-1">
          {p.year}
        </span>
      </div>

      <div
        className="mt-3 overflow-hidden transition-all duration-500"
        style={{ maxHeight: hovered ? "80px" : "0", opacity: hovered ? 1 : 0 }}
      >
        <p className="font-body text-[.82rem] text-muted font-light leading-[1.8]">
          {p.desc}
        </p>
      </div>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

function ProjectsGrid() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter.toLowerCase());

  return (
    <section className="px-[2.8rem] pt-8 pb-24 md:pb-32 border-t border-border">
      <div className="flex gap-6 py-8 border-b border-border mb-16">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="font-body text-[.8rem] transition-all duration-300 pb-px"
            style={{
              color:
                filter === f ? "var(--color-foreground)" : "var(--color-muted)",
              borderBottom:
                filter === f
                  ? "1px solid var(--color-foreground)"
                  : "1px solid transparent",
            }}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-body text-[.75rem] text-muted">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function WorkCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: innerRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[2.8rem] py-24 md:py-36 border-t border-border"
    >
      <div ref={innerRef}>
        <p className="font-body text-[.68rem] text-muted uppercase tracking-[.15em] mb-8">
          Your project
        </p>
        <p className="font-body text-[clamp(1.4rem,2.5vw,2.2rem)] font-normal leading-[1.45] text-foreground mb-10 max-w-[560px]">
          Every project in this portfolio started with a single conversation.
          Yours can too.
        </p>
        <TransitionLink
          href="/contact"
          className="inline-block font-body text-[.82rem] font-normal text-foreground border-b border-foreground hover:opacity-60 transition-opacity duration-300 pb-px"
        >
          Let's talk →
        </TransitionLink>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <SubPageShell>
      <WorkHero />
      <ProjectsGrid />
      <WorkCTA />
    </SubPageShell>
  );
}
