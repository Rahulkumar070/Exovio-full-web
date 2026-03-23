'use client';

import FadeIn from '@/components/animations/FadeIn';

const COLUMNS = [
  {
    label: 'Experience',
    items: [
      'Founder, Exovio Agency (24–Present)',
      'Freelance Designer & Developer (22–24)',
      'Frontend Developer, TechVista (21–22)',
    ],
  },
  {
    label: 'Clients',
    items: [
      'Startup Founders',
      'SaaS Companies',
      'E-Commerce Brands',
      'Creative Agencies',
    ],
  },
  {
    label: 'Services',
    items: [
      'Web Design',
      'Web Development',
      'Brand Identity',
      'UI/UX Design',
      'Motion Design',
    ],
  },
  {
    label: 'Recognition',
    items: [
      'Featured on Product Hunt',
      'Awwwards Nominee',
      'Built with Next.js & GSAP',
    ],
  },
];

export default function InfoGrid() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-16 border-t border-[#D9D4CE]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {COLUMNS.map((col, i) => (
          <FadeIn key={col.label} direction="up" delay={i * 0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8B8680] mb-4">
                [ {col.label} ]
              </p>
              <ul>
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-[#1A1A1A]/70 leading-loose">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
