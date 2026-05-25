import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      id="main"
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--bg-cream)' }}
    >
      <div className="max-w-2xl text-center">
        <p
          className="uppercase tracking-[0.18em] mb-3"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--semantic-ink-subtle)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Ken Research · v0.4
        </p>
        <h1
          className="mb-6"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 'var(--text-3xl)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--semantic-ink-strong)',
          }}
        >
          V1 Product Page · Rebuild v0.4
        </h1>
        <p
          className="mb-8"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--semantic-ink-body)',
          }}
        >
          Section-by-section rebuild · Australia Cold Chain master example · 3 density variants (LOW · MID · MAX).
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/test/phase-0"
            className="px-5 py-2.5 rounded-full text-white"
            style={{
              background: 'var(--color-foundation-black)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
            }}
          >
            Phase 0 · Foundation Test →
          </Link>
        </div>
      </div>
    </main>
  );
}
