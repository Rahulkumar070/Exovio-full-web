'use client';

import TransitionLink from '@/components/ui/TransitionLink';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/hello.exovio/' },
  { label: 'X',         href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/exovio-ai/' },
];

const NAV_LINKS = [
  { label: 'Work',     href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

function EmailLink() {
  return (
    <a
      href="mailto:hello.exovio@gmail.com"
      data-cursor-hover
      className="group inline-flex items-center gap-2 font-display text-[#F5F0EB] hover:text-[#C17F59] transition-colors duration-300"
      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
    >
      <span className="relative">
        hello.exovio@gmail.com
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px bg-[#C17F59] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        />
      </span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        →
      </span>
    </a>
  );
}

function BackToTop() {
  return (
    <button
      data-cursor-hover
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-xs tracking-wide text-[#8B8680] hover:text-[#F5F0EB] transition-colors duration-300"
    >
      Back to top ↑
    </button>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#1A1A1A]">
      <footer className="bg-[#1A1A1A] rounded-t-[40px] px-6 md:px-16 pt-32 md:pt-48 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">

          {/* Main CTA block */}
          <div className="flex flex-col gap-6">
            <h2
              className="font-display font-light text-[#F5F0EB] leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              Let&apos;s create something<br />extraordinary
            </h2>
            <EmailLink />
          </div>

          {/* Footer nav links */}
          <div className="flex items-center gap-8 flex-wrap">
            {NAV_LINKS.map(({ label, href }) => (
              <TransitionLink
                key={href}
                href={href}
                data-cursor-hover
                className="text-xs tracking-wide text-[#8B8680] hover:text-[#F5F0EB] transition-colors duration-300"
              >
                {label}
              </TransitionLink>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[#333333]">
            <span className="text-xs tracking-wide text-[#555555]">© 2026 Exovio</span>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <span className="text-xs text-[#555555]">Made with precision by Exovio</span>
              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    data-cursor-hover
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#8B8680] hover:text-[#F5F0EB] transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <BackToTop />
          </div>

        </div>
      </footer>
    </div>
  );
}
