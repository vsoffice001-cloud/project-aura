/**
 * BenchmarkStatsStrip — Slim warm-palette info strip before listing
 * competition-benchmarking-listing-v01
 *
 * Mirrors RS Report Store pattern: light info container w/ key counts between
 * ContextBanner (warm-300) and listing (white). Surfaces "240+ benchmarks · 18 industries · 35 regions"
 * credibility line that was previously inside the hero StatsRow.
 *
 * WHY: Trust signals shouldn't live in hero (eats vertical space).
 *      Pure black strip felt heavy + jarring after warm-300 context banner; switch to warm palette
 *      keeps editorial-light continuity (warm-300 ContextBanner → warm-400 strip → white listing).
 * WHAT: Slim bar w/ 3 stat pairs, hairline dividers, dark ink text.
 * WHEN: Renders between ContextBanner (warm-300) + listing body (white).
 * WHERE: Full-width, container-page max, py-2.5 vertical padding.
 * HOW: Flex row w/ gap, mobile collapses to wrap.
 */

const STATS = [
  { value: '240+', label: 'Benchmarks delivered' },
  { value: '18', label: 'Industries covered' },
  { value: '35', label: 'Regions analyzed' },
];

export function BenchmarkStatsStrip() {
  return (
    <section
      aria-label="Competition benchmarking key statistics"
      style={{
        background: 'var(--warm-400)',
        borderTop: '1px solid var(--warm-500)',
        borderBottom: '1px solid var(--warm-500)',
      }}
    >
      <div
        className="mx-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3"
        style={{ maxWidth: 'var(--container-page)' }}
      >
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 sm:gap-x-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              {/* Vertical divider before items 2+ on sm+ */}
              {i > 0 && (
                <div
                  className="hidden sm:block w-px h-4"
                  style={{ background: 'rgba(0,0,0,0.12)' }}
                  aria-hidden="true"
                />
              )}
              <div className="flex items-baseline gap-1.5">
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 'var(--text-2xs)',
                    color: 'rgba(0,0,0,0.55)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
