import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insights — Thoughts on Design, Code & Craft',
};
import AnimatedLabel from '@/components/animations/AnimatedLabel';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import FadeIn from '@/components/animations/FadeIn';

const POSTS = [
  {
    date: 'March 2026',
    title: 'Why Your Website Is Your Best Salesperson',
    excerpt:
      'A well-designed website works 24/7, converting visitors while you sleep. Here\'s why investing in design pays for itself.',
    slug: 'website-best-salesperson',
  },
  {
    date: 'February 2026',
    title: 'The Stack Behind Award-Winning Sites',
    excerpt:
      'Next.js, Tailwind, GSAP — the tools we use and why they matter for performance and creativity.',
    slug: 'stack-award-winning-sites',
  },
  {
    date: 'February 2026',
    title: 'Minimalism Isn\'t Lazy — It\'s Hard',
    excerpt:
      'Stripping a design to its essence requires more decisions, not fewer. The discipline of restraint.',
    slug: 'minimalism-is-hard',
  },
  {
    date: 'January 2026',
    title: 'Motion Design: The Invisible Differentiator',
    excerpt:
      'Why animation separates good websites from unforgettable ones, and how to do it right.',
    slug: 'motion-design-differentiator',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-40 md:py-48 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <FadeIn direction="up">
            <AnimatedLabel>Insights</AnimatedLabel>
          </FadeIn>
          <AnimatedHeading
            className="font-display font-light text-foreground leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' } as React.CSSProperties}
            delay={0.1}
          >
            Thoughts on design, code, and craft
          </AnimatedHeading>
        </div>
      </section>

      {/* ── Blog grid ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {POSTS.map((post, i) => (
            <FadeIn key={post.slug} direction="up" delay={i * 0.1}>
              <article
                data-cursor-hover
                className="border-b border-border pb-8"
              >
                <time className="text-xs text-muted font-mono">{post.date}</time>
                <h2 className="font-display text-xl text-foreground mt-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block text-xs text-muted hover:text-foreground transition-colors duration-300 mt-4"
                >
                  Read more →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  );
}
