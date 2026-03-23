'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedLabel from '@/components/animations/AnimatedLabel';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';

const SERVICES = [
  {
    num: '01',
    title: 'Web Design',
    description:
      'We design websites that balance beauty with function. Every layout, interaction, and visual decision is rooted in strategy and built to convert.',
    deliverables: [
      'Brand Discovery',
      'Wireframes',
      'UI Design',
      'Design System',
      'Responsive Design',
      'Prototype',
    ],
  },
  {
    num: '02',
    title: 'Web Development',
    description:
      'We build with modern tools — Next.js, React, Tailwind, GSAP. Performance, accessibility, and clean code are non-negotiable.',
    deliverables: [
      'Frontend Development',
      'CMS Integration',
      'API Development',
      'Performance Optimization',
      'SEO',
      'Deployment',
    ],
  },
  {
    num: '03',
    title: 'Brand Identity',
    description:
      'Your brand is more than a logo. We create complete visual systems that work across every touchpoint.',
    deliverables: [
      'Logo Design',
      'Color System',
      'Typography System',
      'Brand Guidelines',
      'Stationery',
      'Social Templates',
    ],
  },
  {
    num: '04',
    title: 'Motion Design',
    description:
      'Animation brings interfaces to life. We craft micro-interactions, scroll animations, and page transitions that feel effortless.',
    deliverables: [
      'Scroll Animations',
      'Page Transitions',
      'Hover Interactions',
      'Loading Animations',
      'Lottie/SVG Animation',
      'Video Editing',
    ],
  },
];

function ServiceBlock({
  num,
  title,
  description,
  deliverables,
  isOpen,
  onToggle,
  delay,
}: {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) {
  return (
    <FadeIn direction="up" delay={delay}>
      <div className="border-b border-[#D9D4CE]">
        {/* Header — always visible */}
        <button
          data-cursor-hover
          onClick={onToggle}
          className="w-full flex items-center justify-between py-8 md:py-12 text-left"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-6 md:gap-10">
            <span className="text-[#8B8680] text-sm font-mono shrink-0">{num}</span>
            <span className="font-display text-2xl md:text-3xl text-[#1A1A1A]">{title}</span>
          </div>

          {/* +/× toggle icon */}
          <span
            className="text-[#8B8680] text-2xl leading-none transition-transform duration-300 shrink-0"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            +
          </span>
        </button>

        {/* Expandable body — grid-rows trick for smooth height animation */}
        <div
          className="grid transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 pb-10 md:pb-14">
              {/* Description */}
              <p className="md:col-span-5 text-muted leading-relaxed">
                {description}
              </p>

              {/* Deliverables */}
              <ul className="md:col-span-6 md:col-start-7 flex flex-col gap-2">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-[#1A1A1A]/70 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/30 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function ServicesContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="bg-[#F5F0EB]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-40 md:py-60 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <FadeIn direction="up">
            <AnimatedLabel>What We Do</AnimatedLabel>
          </FadeIn>

          <AnimatedHeading
            className="font-display font-light text-foreground leading-[0.95] tracking-tight max-w-5xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' } as React.CSSProperties}
            delay={0.1}
          >
            Services designed to elevate
          </AnimatedHeading>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-lg text-muted max-w-2xl mt-8 leading-relaxed">
              We offer end-to-end design and development for brands that refuse to blend in.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Services accordion ───────────────────────────────── */}
      <section className="px-6 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto border-t border-[#D9D4CE]">
          {SERVICES.map((service, i) => (
            <ServiceBlock
              key={service.num}
              {...service}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              delay={i * 0.05}
            />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-16 text-center">
        <FadeIn direction="up">
          <h2 className="font-display text-2xl text-foreground">
            Not sure what you need?
          </h2>
          <p className="text-muted mt-2">Let&apos;s figure it out together.</p>

          <Link
            href="/contact"
            data-cursor-hover
            className="inline-block mt-6 text-sm text-foreground relative group"
          >
            Start a conversation →
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px bg-foreground w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </Link>
        </FadeIn>
      </section>

    </div>
  );
}
