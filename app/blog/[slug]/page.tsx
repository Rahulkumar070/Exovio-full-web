import TransitionLink from '@/components/ui/TransitionLink';

export default function BlogPost() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#080808]">
      <div className="text-center">
        <h1 className="font-display text-2xl text-foreground">Coming Soon</h1>
        <p className="text-sm text-muted mt-4">This article is being written.</p>
        <TransitionLink
          href="/blog"
          className="inline-block mt-8 text-sm text-foreground hover:text-muted transition-colors"
        >
          ← Back to Insights
        </TransitionLink>
      </div>
    </div>
  );
}
