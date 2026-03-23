'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '@/components/animations/FadeIn';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'Researchly',
    category: 'AI Research Platform',
    description:
      'An intelligent research assistant that helps students and academics find, analyze, and synthesize academic papers.',
    image: '/images/projects/Researchly.png',
    url: 'https://researchly.in',
  },
  {
    name: 'Exovio Agency',
    category: 'Agency Website',
    description:
      'Our own award-level agency website — built with Next.js, GSAP, and obsessive attention to craft.',
    image: '/images/projects/Exovio.png',
    url: 'https://exovio.agency',
  },
];

function ProjectCard({
  name,
  category,
  description,
  image,
  url,
  index,
}: {
  name: string;
  category: string;
  description: string;
  image: string;
  url: string;
  index: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const img = el.querySelector('img');
    if (!img) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(img, { scale: 1.1 - self.progress * 0.1 });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <FadeIn direction="up" delay={index * 0.15}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        data-cursor-hover
      >
        {/* Image */}
        <div
          ref={imgRef}
          className="overflow-hidden rounded-xl bg-[#E8E3DD]"
          style={{ aspectRatio: '16/9' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Info below image */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
          <div>
            <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] group-hover:text-[#C17F59] transition-colors duration-300">
              {name}{' '}
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                ‣
              </span>
            </h3>
            <p className="text-sm text-[#8B8680] mt-1 max-w-md">{description}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#8B8680] shrink-0 mt-1">
            {category}
          </span>
        </div>
      </a>
    </FadeIn>
  );
}

export default function FeaturedWork() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B8680]">
                Recent Work
              </span>
              <h2
                className="font-display text-[#1A1A1A] mt-2 font-light"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Selected Projects
              </h2>
            </div>
            <a
              href="/work"
              className="text-sm text-[#8B8680] hover:text-[#1A1A1A] transition-colors duration-300 hidden md:block"
              data-cursor-hover
            >
              All projects →
            </a>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-20 md:gap-32">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
