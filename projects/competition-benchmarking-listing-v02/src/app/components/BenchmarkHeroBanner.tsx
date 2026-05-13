/**
 * BenchmarkHeroBanner — Page-level composition
 * competition-benchmarking-listing-v01
 *
 * Four hero variants:
 *   A = editorial split + recent ticker (full-height 85svh)
 *   B = image split (boardroom) (full-height)
 *   C = data-viz node graph bg (full-height)
 *   D = SLIM (50vh cap) — left text + right featured-report card. CANONICAL/DEFAULT.
 *
 * SubtleVariantSwitcher visible in DEV only (import.meta.env.DEV) — kept so tech team
 * can preview alt heroes for different scenarios.
 * GSAP fade-up on active variant content, matchMedia for reduced-motion.
 * DS tokens only — no hardcoded hex/px.
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';
import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
import { SubtleVariantSwitcher } from './SubtleVariantSwitcher';
import { BENCHMARK_REPORTS } from '../../lib/mock-data';

// ── Shared types ──

type HeroVariant = 'A' | 'B' | 'C' | 'D';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '240+', label: 'Benchmarks delivered' },
  { value: '18', label: 'Industries covered' },
  { value: '35', label: 'Regions analyzed' },
];

const HERO_VARIANTS = [
  { id: 'D', label: 'Variant D', description: 'Slim 50vh — featured report (DEFAULT)' },
  { id: 'A', label: 'Variant A', description: 'Editorial split + recent ticker' },
  { id: 'B', label: 'Variant B', description: 'Image split (boardroom)' },
  { id: 'C', label: 'Variant C', description: 'Data-viz node graph bg' },
];

// ── Eyebrow pill ──

function EyebrowPill() {
  return (
    <div
      className="inline-flex items-center gap-2 mb-6"
      style={{
        border: '1px solid var(--hairline-on-dark)',
        borderRadius: 'var(--radius-element)',
        padding: '0.35rem 0.875rem',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand-red)' }} />
      <span
        className="uppercase tracking-widest"
        style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-on-dark-subtle)', letterSpacing: '0.1em' }}
      >
        Research · Competition Benchmarking
      </span>
    </div>
  );
}

// ── Stats row ──

function StatsRow() {
  return (
    <div
      className="flex flex-wrap gap-8 border-t border-b py-6"
      style={{ borderColor: 'var(--hairline-on-dark-soft)' }}
    >
      {STATS.map((s) => (
        <div key={s.label}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontSize: 'var(--text-2xl)',
              color: 'var(--black-50)',
              lineHeight: 1,
              marginBottom: '0.3rem',
            }}
          >
            {s.value}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-on-dark-subtle)' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── CTA row ──

function CTARow({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="brand" size="md" onClick={onExplore} showArrow>
        Explore reports
      </Button>
      <a
        href="/research/competition-benchmarking/methodology"
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--ink-on-dark-subtle)',
          textDecoration: 'underline',
          textDecorationColor: 'var(--ink-on-dark-whisper)',
          textUnderlineOffset: '3px',
          transition: 'color 200ms ease',
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '44px',
          padding: '0 0.25rem',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-strong)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-subtle)'; }}
      >
        How we benchmark
      </a>
    </div>
  );
}

// ── Left content block (shared A/B) ──

function LeftContent({ headingRef, dekRef, ctaRef, onExplore }: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  dekRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  onExplore: () => void;
}) {
  return (
    <div className="flex flex-col justify-center">
      <EyebrowPill />
      <h1
        ref={headingRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 4vw, var(--text-3xl))',
          fontWeight: 600,
          lineHeight: 1.1,
          color: 'var(--black-50)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Benchmark your market.
        <br />
        Outpace your peers.
      </h1>
      <p
        ref={dekRef}
        style={{
          maxWidth: 'var(--container-prose)',
          fontSize: 'var(--text-lg)',
          color: 'var(--ink-on-dark-muted)',
          lineHeight: 1.6,
          marginBottom: 'var(--space-8)',
        }}
      >
        Access structured competitive intelligence across 18+ industries — covering pricing, positioning, product, and go-to-market from verified primary and secondary research.
      </p>
      <div ref={ctaRef}>
        <CTARow onExplore={onExplore} />
      </div>
    </div>
  );
}

// ── Recent benchmarks ticker (Variant A right panel) ──

const RECENT = BENCHMARK_REPORTS.slice(0, 3);

function RecentBenchmarksTicker() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % RECENT.length);
        setFading(false);
      }, 250);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const report = RECENT[active];

  return (
    <div
      className="flex flex-col justify-center"
      style={{
        borderLeft: '1px solid var(--hairline-on-dark-soft)',
        paddingLeft: 'var(--space-8)',
      }}
    >
      <p
        className="uppercase tracking-widest mb-4"
        style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-on-dark-subtle)', letterSpacing: '0.1em' }}
      >
        Recent benchmarks
      </p>
      <div
        style={{
          transition: 'opacity 250ms ease',
          opacity: fading ? 0 : 1,
        }}
      >
        <span
          className="inline-block uppercase tracking-wide mb-2"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--brand-red)',
            letterSpacing: '0.08em',
            border: '1px solid var(--brand-red-30)',
            borderRadius: 'var(--radius-element)',
            padding: '0.15rem 0.5rem',
          }}
        >
          {report.industry}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 400,
            color: 'var(--ink-on-dark-strong)',
            lineHeight: 1.3,
            marginBottom: 'var(--space-3)',
          }}
        >
          {report.title}
        </h3>
        <a
          href={`/research/competition-benchmarking/${report.slug}`}
          className="inline-flex items-center gap-1.5 transition-colors"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-on-dark-subtle)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-strong)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-subtle)'; }}
        >
          View report →
        </a>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-6">
        {RECENT.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all"
            style={{
              width: i === active ? '20px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: i === active ? 'var(--brand-red)' : 'var(--ink-on-dark-whisper)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Show benchmark ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Variant A: Editorial split + ticker ──

function HeroVariantA({ onExplore, headingRef, dekRef, ctaRef, statsRef }: {
  onExplore: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  dekRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Container maxWidth="content">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] py-8 md:py-10">
        <LeftContent headingRef={headingRef} dekRef={dekRef} ctaRef={ctaRef} onExplore={onExplore} />
        <RecentBenchmarksTicker />
      </div>
      <div ref={statsRef} style={{ paddingBottom: 'var(--space-6)' }}>
        <StatsRow />
      </div>
    </Container>
  );
}

// ── Variant B: Image split ──

function HeroVariantB({ onExplore, headingRef, dekRef, ctaRef, statsRef }: {
  onExplore: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  dekRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Container maxWidth="content">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center py-8 md:py-10">
        <LeftContent headingRef={headingRef} dekRef={dekRef} ctaRef={ctaRef} onExplore={onExplore} />
        {/* Right image — full bleed right edge with left-side gradient fade */}
        <div className="relative overflow-hidden" style={{ borderRadius: 'var(--rc-radius-card)', minHeight: '360px' }}>
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&q=80"
            alt="Strategy boardroom"
            className="w-full h-full object-cover"
            style={{ borderRadius: 'var(--rc-radius-card)' }}
          />
          {/* Left fade into black bg */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, var(--black-900) 0%, transparent 35%)' }}
          />
        </div>
      </div>
      <div ref={statsRef} style={{ paddingBottom: 'var(--space-6)' }}>
        <StatsRow />
      </div>
    </Container>
  );
}

// ── Variant C: Data-viz node graph background ──

function NodeGraphSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Connecting lines */}
      <line x1="15%" y1="25%" x2="40%" y2="45%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="40%" y1="45%" x2="65%" y2="20%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="65%" y1="20%" x2="85%" y2="55%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="40%" y1="45%" x2="55%" y2="70%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="55%" y1="70%" x2="80%" y2="80%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="15%" y1="25%" x2="25%" y2="65%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />
      <line x1="25%" y1="65%" x2="55%" y2="70%" stroke="var(--hairline-on-dark-faint)" strokeWidth="1" />

      {/* Nodes — 8 circles. 3 pulse (CSS keyframes only) */}
      <circle cx="15%" cy="25%" r="4" fill="var(--hairline-on-dark-soft)" className="node-pulse-1" />
      <circle cx="40%" cy="45%" r="4" fill="var(--hairline-on-dark-soft)" />
      <circle cx="65%" cy="20%" r="4" fill="var(--hairline-on-dark-soft)" className="node-pulse-2" />
      <circle cx="85%" cy="55%" r="4" fill="var(--hairline-on-dark-faint)" />
      <circle cx="55%" cy="70%" r="4" fill="var(--hairline-on-dark-soft)" className="node-pulse-3" />
      <circle cx="80%" cy="80%" r="4" fill="var(--hairline-on-dark-faint)" />
      <circle cx="25%" cy="65%" r="4" fill="var(--hairline-on-dark-faint)" />
      <circle cx="72%" cy="38%" r="4" fill="var(--hairline-on-dark-faint)" />

      <style>{`
        @keyframes node-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1.2; }
        }
        .node-pulse-1 { animation: node-pulse 4s ease-in-out infinite; }
        .node-pulse-2 { animation: node-pulse 4s ease-in-out infinite 1.3s; }
        .node-pulse-3 { animation: node-pulse 4s ease-in-out infinite 2.6s; }
        @media (prefers-reduced-motion: reduce) {
          .node-pulse-1, .node-pulse-2, .node-pulse-3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}

function HeroVariantC({ onExplore, headingRef, dekRef, ctaRef, statsRef }: {
  onExplore: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  dekRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative">
      <NodeGraphSVG />
      <Container maxWidth="content">
        <div className="py-8 md:py-10 max-w-[42rem]">
          <EyebrowPill />
          <h1
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 4vw, var(--text-3xl))',
              fontWeight: 600,
              lineHeight: 1.1,
              color: 'var(--black-50)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Benchmark your market.
            <br />
            Outpace your peers.
          </h1>
          <p
            ref={dekRef}
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--ink-on-dark-muted)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-8)',
            }}
          >
            Access structured competitive intelligence across 18+ industries — covering pricing, positioning, product, and go-to-market from verified primary and secondary research.
          </p>
          <div ref={ctaRef}>
            <CTARow onExplore={onExplore} />
          </div>
        </div>
        <div ref={statsRef} style={{ paddingBottom: 'var(--space-6)' }}>
          <StatsRow />
        </div>
      </Container>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Variant D: Slim 50vh — left text + right featured-report card. CANONICAL/DEFAULT.
//
// WHY: Listing page hero should be informational, not theatrical. Slim hero gives
//      buyers more vertical viewport for the actual benchmark grid below.
// WHAT: 2-col on tablet+ (1fr_1fr). Left = eyebrow + slim h1 + 2-line dek + CTAs.
//       Right = compact featured-report card (industry · title · short desc · view link).
// WHEN: Default state. User picks A/B/C from variant switcher to compare alt designs.
// HOW: Mobile-first single-col stack (auto height). Desktop/tablet = grid-cols-[1fr_1fr]
//      capped at min(50vh, 480px). Featured report sourced from BENCHMARK_REPORTS.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Featured set: top 4 reports (featured-first then most-recent). Mirrors Variant A's
 * "Recent benchmarks" 3-item ticker pattern but w/ 4 items + image-prominent layout.
 */
const FEATURED_SET = (() => {
  const featured = BENCHMARK_REPORTS.filter((r) => r.isFeatured);
  const rest = BENCHMARK_REPORTS.filter((r) => !r.isFeatured)
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  return [...featured, ...rest].slice(0, 4);
})();

const ROTATE_MS = 6000;
const FADE_MS = 300;

function FeaturedReportCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  // Auto-cycle 6s, pause on hover (matches Variant A ticker)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % FEATURED_SET.length);
        setFading(false);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, FADE_MS);
  };

  const report = FEATURED_SET[active];

  return (
    <div
      className="flex flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <a
        href={`/research/competition-benchmarking/${report.slug}`}
        className="group relative block overflow-hidden transition-all"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--rc-radius-card, 10px)',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(255,255,255,0.18)';
          el.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(255,255,255,0.08)';
          el.style.background = 'rgba(255,255,255,0.03)';
        }}
      >
        {/* Compact original layout: square thumb left + content right (image fixed via absolute fill).
            Image issue earlier was nested div w/ no explicit dimensions on the img — fixed by `absolute inset-0 w-full h-full`. */}
        <div className="flex items-stretch">
          {/* Thumb — fixed width, height matches card (self-stretch via items-stretch on parent flex).
              Drop h-24 fixed — was causing image to not cover full vertical area when content right was taller.
              Image absolute fill within stretch wrapper ensures full coverage at any card height. */}
          <div className="relative flex-shrink-0 w-24 sm:w-28 overflow-hidden self-stretch">
            <img
              key={report.id}
              src={report.thumbnailUrl}
              alt=""
              aria-hidden="true"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05]"
              style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease, transform 500ms ease` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.30) 100%)' }}
            />
          </div>

          {/* Content right */}
          <div
            className="flex-1 min-w-0 flex flex-col py-3 px-4"
            style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
          >
            {/* Featured tag + industry eyebrow */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge
                variant="minimal"
                size="xs"
                theme="brand"
                mode="dark"
                className="font-semibold uppercase tracking-[1.2px]"
                style={{
                  fontSize: '9px',
                  padding: '3px 8px',
                  background: 'rgba(176, 31, 36, 0.65)',
                  border: '1px solid rgba(176, 31, 36, 0.8)',
                  borderRadius: '4px',
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                Featured
              </Badge>
              <span
                className="uppercase tracking-[0.06em]"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.45)' }}
              >
                {report.industry}
              </span>
            </div>

            {/* Title — 2-line clamp */}
            <h3
              className="line-clamp-2 transition-colors"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                lineHeight: 1.3,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {report.title}
            </h3>

            {/* "View report" link */}
            <span
              className="inline-flex items-center gap-1 mt-auto transition-colors"
              style={{
                fontSize: 'var(--text-2xs)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              View report
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>

      {/* Dot indicators — clickable, mirror Variant A pattern */}
      <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Featured benchmarks">
        {FEATURED_SET.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Show featured benchmark ${i + 1} of ${FEATURED_SET.length}`}
            onClick={() => goTo(i)}
            className="transition-all"
            style={{
              width: i === active ? '20px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: i === active ? 'var(--brand-red)' : 'rgba(255,255,255,0.18)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HeroVariantD({ onExplore, headingRef, dekRef, ctaRef }: {
  onExplore: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  dekRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Container maxWidth="page">
      <div className="grid gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[1fr_1fr] items-center py-8 md:py-10">
        {/* Left: text block */}
        <div className="flex flex-col justify-center">
          <EyebrowPill />
          <h1
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-serif)',
              // Slim hero = smaller h1 than fuller variants
              fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              color: 'var(--black-50)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Benchmark your market. Outpace your peers.
          </h1>
          <p
            ref={dekRef}
            style={{
              maxWidth: '36rem',
              fontSize: 'var(--text-base)',
              color: 'var(--ink-on-dark-muted)',
              lineHeight: 1.55,
              marginBottom: 'var(--space-6)',
            }}
          >
            Structured competitive intelligence across 18+ industries — covering pricing, positioning, product, and go-to-market.
          </p>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            {/* Mobile: primary CTA only (Button fullWidth on sm). Desktop: primary + secondary. */}
            <Button variant="brand" size="md" onClick={onExplore} showArrow>
              Explore reports
            </Button>
            <a
              href="/research/competition-benchmarking/methodology"
              className="hidden sm:inline-flex items-center transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--ink-on-dark-subtle)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--ink-on-dark-whisper)',
                textUnderlineOffset: '3px',
                minHeight: '44px',
                padding: '0 0.25rem',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-strong)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink-on-dark-subtle)'; }}
            >
              How we benchmark
            </a>
          </div>
        </div>

        {/* Right: featured report carousel — 4 reports, auto-cycle 6s, pause on hover, dot indicators. */}
        <div>
          <FeaturedReportCarousel />
        </div>
      </div>
    </Container>
  );
}

// ── Main component ──

interface BenchmarkHeroBannerProps {
  onExplore: () => void;
}

export function BenchmarkHeroBanner({ onExplore }: BenchmarkHeroBannerProps) {
  const [variant, setVariant] = useState<HeroVariant>('D');

  const headingRef = useRef<HTMLHeadingElement>(null);
  const dekRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Small delay so DOM settles after variant change
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 }, delay: 0.05 });
      if (headingRef.current) tl.fromTo(headingRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0 });
      if (dekRef.current) tl.fromTo(dekRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, '-=0.3');
      if (statsRef.current) tl.fromTo(statsRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.25');
      if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, '-=0.2');
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([headingRef.current, dekRef.current, statsRef.current, ctaRef.current], { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, [variant]);

  /**
   * Height policy is variant-dependent:
   *   D (slim canonical) → desktop+tablet `min(50vh, 480px)`, mobile `auto` (content-driven).
   *   A/B/C (full)       → `min(720px, calc(85svh - 72px))` — peek of next section.
   * Mobile-first: D drops minHeight entirely below md so vertical content dictates.
   */
  const isSlim = variant === 'D';
  const heightStyle = isSlim
    ? { minHeight: 'min(50vh, 480px)' }
    : { minHeight: 'min(720px, calc(85svh - 72px))' };

  return (
    <SectionWrapper bg="black" id="hero-banner" noPadding>
      <div
        className="relative flex flex-col justify-center"
        style={heightStyle}
      >
        {import.meta.env.DEV && (
          <SubtleVariantSwitcher
            sectionName="Hero design"
            currentVariant={variant}
            variants={HERO_VARIANTS}
            onVariantChange={(id) => setVariant(id as HeroVariant)}
            position="top-right"
            theme="dark"
          />
        )}

        {variant === 'A' && (
          <HeroVariantA
            onExplore={onExplore}
            headingRef={headingRef}
            dekRef={dekRef}
            ctaRef={ctaRef}
            statsRef={statsRef}
          />
        )}
        {variant === 'B' && (
          <HeroVariantB
            onExplore={onExplore}
            headingRef={headingRef}
            dekRef={dekRef}
            ctaRef={ctaRef}
            statsRef={statsRef}
          />
        )}
        {variant === 'C' && (
          <HeroVariantC
            onExplore={onExplore}
            headingRef={headingRef}
            dekRef={dekRef}
            ctaRef={ctaRef}
            statsRef={statsRef}
          />
        )}
        {variant === 'D' && (
          <HeroVariantD
            onExplore={onExplore}
            headingRef={headingRef}
            dekRef={dekRef}
            ctaRef={ctaRef}
          />
        )}
      </div>
    </SectionWrapper>
  );
}
