"use client";

import { useRef } from "react";
import gsap from "gsap";
import AnimatedLabel from "@/components/animations/AnimatedLabel";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import FadeIn from "@/components/animations/FadeIn";
import CTA from "@/components/sections/CTA";

// large: true  → col-span-7, aspect-[16/9]
// large: false → col-span-5, aspect-[4/3]
const ROWS = [
  [
    {
      name: "Researchly",
      category: "AI Research Platform",
      image: "/images/projects/researchly.png",
      large: true,
      url: "https://researchly.in",
    },
    {
      name: "Exovio Agency",
      category: "Agency Website",
      image: "/images/projects/Exovio.png",
      large: false,
      url: "https://exovio.agency",
    },
  ],
];

function ProjectCard({
  name,
  category,
  image,
  large,
  delay,
  url,
}: {
  name: string;
  category: string;
  image: string;
  large: boolean;
  delay: number;
  url?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const viewRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.03,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(viewRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(labelRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(viewRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <FadeIn
      direction="up"
      delay={delay}
      className={
        large ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"
      }
    >
      <a
        href={url ?? "#"}
        target={url ? "_blank" : undefined}
        rel={url ? "noopener noreferrer" : undefined}
        data-cursor-hover
        className="block cursor-pointer"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Card image area */}
        <div
          className={[
            "relative overflow-hidden rounded-lg border border-white/5",
            large ? "aspect-[16/9]" : "aspect-[4/3]",
          ].join(" ")}
        >
          {/* Project image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-background/60 z-10"
            style={{ opacity: 0 }}
          />

          {/* Centered name */}
          <p
            ref={labelRef}
            className="absolute inset-0 z-20 flex items-center justify-center font-display text-2xl text-foreground text-center px-6"
            style={{ opacity: 0, transform: "translateY(8px)" }}
          >
            {name}
          </p>

          {/* View Project label */}
          <span
            ref={viewRef}
            className="absolute bottom-5 right-5 z-20 text-xs text-muted uppercase tracking-widest"
            style={{ opacity: 0, transform: "translateY(8px)" }}
          >
            View Project →
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-lg text-foreground">{name}</span>
          <span className="text-xs text-muted uppercase tracking-wider">
            {category}
          </span>
        </div>
      </a>
    </FadeIn>
  );
}

export default function WorkContent() {
  return (
    <div className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-40 md:py-60 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <FadeIn direction="up">
            <AnimatedLabel>Our Work</AnimatedLabel>
          </FadeIn>
          <AnimatedHeading
            className="font-display font-light text-foreground leading-[0.95] tracking-tight max-w-5xl"
            style={
              { fontSize: "clamp(2.5rem, 5vw, 5rem)" } as React.CSSProperties
            }
            delay={0.1}
          >
            Projects that speak for themselves
          </AnimatedHeading>
        </div>
      </section>

      {/* ── Project grid ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-y-16">
          {ROWS.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-12 gap-4 md:gap-6 items-start"
            >
              {row.map((project, i) => (
                <ProjectCard key={project.name} {...project} delay={i * 0.1} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <CTA />
    </div>
  );
}
