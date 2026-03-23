"use client";

import AnimatedLabel from "@/components/animations/AnimatedLabel";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import FadeIn from "@/components/animations/FadeIn";

const PROJECTS = [
  {
    name: "Researchly",
    category: "AI Research Platform",
    image: "/images/projects/researchly.png",
    aspect: "aspect-[16/9]",
    col: "col-span-12 md:col-span-7",
    url: "https://researchly.in",
  },
  {
    name: "Exovio Agency",
    category: "Agency Website",
    image: "/images/projects/Exovio.png",
    aspect: "aspect-[4/3]",
    col: "col-span-12 md:col-span-5",
    url: "https://exovio.agency",
  },
];

function ProjectCard({
  name,
  category,
  image,
  aspect,
  col,
  delay,
  url,
}: {
  name: string;
  category: string;
  image: string;
  aspect: string;
  col: string;
  delay: number;
  url: string;
}) {
  return (
    <FadeIn direction="up" delay={delay} className={col}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
        style={{ textDecoration: "none" }}
      >
        <div data-cursor-hover className="flex flex-col group cursor-pointer">
          {/* Image area */}
          <div
            className={`relative overflow-hidden rounded-lg border border-white/5 ${aspect}`}
          >
            {/* Project image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.03] group-hover:brightness-90 transition-all duration-700 ease-out"
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Centered project name overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span
                className="font-display text-foreground text-center px-6 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {name}
              </span>
            </div>

            {/* View Project — bottom right */}
            <div className="absolute bottom-5 right-5 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-xs text-foreground/80 tracking-wide uppercase">
                View Project →
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between mt-4">
            <span className="font-display text-lg text-foreground">{name}</span>
            <span className="text-xs text-muted uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
      </a>
    </FadeIn>
  );
}

export default function FeaturedWork() {
  return (
    <section className="py-40 md:py-60 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-16 md:mb-24">
          <FadeIn direction="up">
            <AnimatedLabel>Selected Work</AnimatedLabel>
          </FadeIn>
          <AnimatedHeading
            className="font-display font-medium text-foreground leading-tight tracking-tight"
            style={
              { fontSize: "clamp(2rem, 4vw, 4rem)" } as React.CSSProperties
            }
          >
            Projects that speak
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} {...p} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
