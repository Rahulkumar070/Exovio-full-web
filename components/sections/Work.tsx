'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '@/components/animations/FadeIn';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Researchly',
    category: 'AI Research Platform',
    image: '/images/projects/Researchly.png',
    href: 'https://researchly.in',
  },
  {
    title: 'Exovio Agency',
    category: 'Agency Website',
    image: '/images/projects/Exovio.png',
    href: 'https://exovio.agency',
  },
];

function ProjectCard({
  title,
  category,
  image,
  href,
  index,
}: {
  title: string;
  category: string;
  image: string;
  href: string;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallax = parallaxRef.current;
    const container = containerRef.current;
    if (!parallax || !container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.set(parallax, { y: `${self.progress * -8}%` });
      },
    });

    return () => trigger.kill();
  }, []);

  const onEnter = () => {
    gsap.to(scaleRef.current, { scale: 1.05, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
  };

  const onLeave = () => {
    gsap.to(scaleRef.current, { scale: 1.0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <FadeIn direction="up" delay={index * 0.1}>
      <div className="mb-24 last:mb-0">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="group block"
        >
          {/* Image container */}
          <div
            ref={containerRef}
            className="w-full overflow-hidden rounded-lg relative"
            style={{ aspectRatio: '16/9' }}
          >
            {/* Parallax layer */}
            <div ref={parallaxRef} className="absolute inset-0 will-change-transform" style={{ height: '115%', top: '-7.5%' }}>
              {/* Scale layer */}
              <div ref={scaleRef} className="w-full h-full will-change-transform">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
            </div>

            {/* Hover overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent flex items-end p-8 md:p-12"
              style={{ opacity: 0 }}
              aria-hidden="true"
            >
              <span
                className="font-display text-[#E8E4DD]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
              >
                {title} ↗
              </span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between mt-6">
            <span
              className="font-display text-[#E8E4DD] group-hover:text-[#C17F59] transition-colors duration-300"
              style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
            >
              {title}
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-[0.2em]">
              {category}
            </span>
          </div>
        </a>
      </div>
    </FadeIn>
  );
}

export default function Work() {
  return (
    <section className="bg-[#0A0A0A] py-32 md:py-48 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <FadeIn direction="up">
            <p className="text-xs uppercase tracking-[0.2em] text-[#777777] mb-4">
              [ Selected Work ]
            </p>
          </FadeIn>
          <div className="overflow-hidden">
            <h2
              className="font-display font-light text-[#E8E4DD] leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
            >
              Work
            </h2>
          </div>
        </div>

        {/* Projects */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
