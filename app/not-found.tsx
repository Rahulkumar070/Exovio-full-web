import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <span
          className="font-display text-foreground/10 leading-none select-none"
          style={{ fontSize: '8rem' }}
          aria-hidden="true"
        >
          404
        </span>

        <h1 className="font-display text-xl text-foreground mt-2">
          Page not found
        </h1>

        <p className="text-sm text-muted mt-4 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 text-sm text-foreground relative group"
        >
          Back to home →
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-foreground w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          />
        </Link>
      </div>
    </div>
  );
}
