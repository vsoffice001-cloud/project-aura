'use client';

/**
 * FinalCTABanner · full-width closing CTA for §24 Get Full Access.
 *
 * @what  Full-width banner · dark gradient bg (cinematic-dark variant inside
 *        light page · `#0a0a0c` → `#12101a` w/ subtle brand-red accent vein).
 *        2-col desktop layout: left = headline (Noto Serif display) + supporting
 *        DM Sans body + meta chips (pricing · format · updates · license) ·
 *        right = CTA stack (primary brand-red · secondary outline · tertiary link).
 *        Bottom trust strip: "Trusted by 200+ Australia logistics teams" + icons.
 *        Mobile: stacked · CTAs full-width.
 *
 * @why   §24 is the final conversion moment. Brand-red is INTENTIONAL here per
 *        COLOR-USAGE-GUIDE.md (CTA moments). Cinematic-dark within editorial-light
 *        page creates high contrast section break that stops scroll and forces
 *        attention — refs canonical for closing banners. McKinsey / Forrester /
 *        Gartner all use dark closing CTAs on research product pages.
 *
 * @when  §24 · final section of PDP. No SourceCluster · no InsightBox (banner IS the closer).
 *
 * @how   ```tsx
 *        <FinalCTABanner />
 *        ```
 *
 * A11y: WCAG AA ensured — white text on dark bg (`#0a0a0c`) passes ≥7:1.
 * CTA buttons have focus-visible ring. Contact modal linkout is external href.
 *
 * Project-local atom · promote to DS at 2nd consumer.
 */

import {
  Button,
  SectionLabel,
  Badge,
  InlineLink,
} from '@kenresearch/design-system/atoms';

const META_CHIPS = [
  { label: 'Price on request' },
  { label: 'PDF + Excel delivery' },
  { label: '12-mo update rights' },
  { label: 'Single + Enterprise license' },
];

const TRUST_SIGNALS = [
  { label: 'Logistics operators' },
  { label: 'Pharma distributors' },
  { label: 'Retail chains' },
  { label: 'Private equity' },
  { label: 'Government agencies' },
];

export function FinalCTABanner({ className }: { className?: string }) {
  return (
    <section
      id="cta-banner"
      aria-label="Get full access to Australia Cold Chain report"
      className={['relative overflow-hidden', className ?? ''].join(' ')}
      style={{
        /* Gradient uses foundation tokens where available.
           --color-foundation-black (#0a0a0c) for start.
           Mid + end have no exact single tokens → kept as literal stops (decorative surface gradient · no semantic meaning).
           Justified: background IS the cinematic brand pattern per COLOR-USAGE-GUIDE.md. */
        background:
          'linear-gradient(135deg, var(--color-foundation-black, #0a0a0c) 0%, #12101a 55%, #1a0d0f 100%)',
      }}
      data-variant-section="cinematic"
    >
      {/* Subtle brand-red accent vein — top-right corner
          rgba(176,31,36,0.18): decorative only · no semantic token maps this exact alpha ·
          kept as rgba per brief (Cat 1.1 exception for decorative-only gradients). */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          background:
            'radial-gradient(ellipse at top right, rgba(176,31,36,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Main content */}
      <div
        className="relative mx-auto max-w-[var(--container-page,1240px)] px-4 sm:px-6 lg:px-12 py-16 lg:py-20"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left column · headline + body + chips */}
          <div className="flex-1 min-w-0">
            {/* Eyebrow via SectionLabel DS atom — text style · dark background */}
            <SectionLabel
              style="text"
              background="dark"
              className="mb-4"
            >
              Australia Cold Chain Market 2022–2027
            </SectionLabel>

            {/* Headline · Noto Serif display · final CTA h2 → --text-3xl canonical per base.css comment */}
            <h2
              className="font-display leading-[1.05] tracking-tight mb-5"
              style={{
                fontSize: 'var(--text-3xl)',    /* 48.8px · hero h1 / final CTA h2 ONLY per base.css */
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--semantic-ink-on-dark-strong)',   /* rgba(255,255,255,0.92) */
              }}
            >
              Get the full Australia<br className="hidden sm:block" /> Cold Chain report
            </h2>

            {/* Supporting body */}
            <p
              className="font-body leading-relaxed mb-6 max-w-[44ch]"
              style={{
                fontSize: 'var(--text-sm)',          /* 16px · body default */
                lineHeight: 1.6,
                color: 'var(--semantic-ink-on-dark-body)',   /* rgba(255,255,255,0.75) */
              }}
            >
              240+ pages · 80+ charts · 18-month research window · expert-validated
              forecasts across cold storage, cold transport, and 8 regional markets.
            </p>

            {/* Meta chips via DS Badge atom — dark mode · rounded variant */}
            <div className="flex flex-wrap gap-2">
              {META_CHIPS.map((chip) => (
                <Badge
                  key={chip.label}
                  variant="rounded"
                  size="xs"
                  theme="neutral"
                  mode="dark"
                  bordered
                  className="font-body normal-case tracking-normal"
                  style={{
                    /* Dark surface override: chip bg + border use border-on-dark tokens.
                       Badge neutral theme is light-surface only · inline override for dark context.
                       --border-on-dark-hairline = rgba(255,255,255,0.06) ≈ chip bg intent (0.07).
                       --border-on-dark-card     = rgba(255,255,255,0.10) ≈ chip border intent.
                       Justified: no dark-mode neutral Badge token exists in DS yet. */
                    background: 'var(--border-on-dark-hairline)',
                    borderColor: 'var(--border-on-dark-card)',
                    color: 'var(--semantic-ink-on-dark-muted)',   /* rgba(255,255,255,0.62) */
                    backdropFilter: 'blur(4px)',
                    fontSize: 'var(--text-xs)',     /* 12.8px */
                  }}
                >
                  {chip.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right column · CTA stack */}
          <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[240px]">
            {/* Primary · brand-red · large · animated arrow · full-width on mobile */}
            <a
              href="/contact?ref=cta-banner-primary"
              className="w-full lg:w-auto"
            >
              <Button
                variant="brand"
                size="lg"
                animatedArrow
                fullWidth
              >
                Get full report
              </Button>
            </a>

            {/* Secondary · ghost on dark · outline white */}
            <a
              href="/contact?ref=cta-banner-expert"
              className="w-full lg:w-auto"
            >
              <Button
                variant="ghost"
                background="dark"
                size="md"
                fullWidth
              >
                Talk to expert
              </Button>
            </a>

            {/* Tertiary · InlineLink on dark · CSS hover only (no JS handlers) */}
            <div className="flex justify-center px-2 py-2">
              <InlineLink
                href="/pricing?ref=cta-banner-pricing"
                onDark
                className="font-body font-medium"
                style={{ fontSize: 'var(--text-13)' }}   /* 13px */
              >
                View pricing options →
              </InlineLink>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ borderTop: '1px solid var(--border-on-dark-hairline)' }}
        >
          <p
            className="font-body font-medium"
            style={{
              fontSize: 'var(--text-xs)',               /* 12.8px */
              color: 'var(--semantic-ink-on-dark-faint)',  /* rgba(255,255,255,0.30) */
            }}
          >
            Trusted by 200+ Australia logistics teams including:
          </p>
          <div className="flex flex-wrap gap-3">
            {TRUST_SIGNALS.map((signal) => (
              <Badge
                key={signal.label}
                variant="rounded"
                size="xs"
                theme="neutral"
                mode="dark"
                bordered
                className="font-body normal-case tracking-normal"
                style={{
                  /* Same dark-surface override as META_CHIPS above.
                     --border-on-dark-hairline ≈ rgba(255,255,255,0.06) for bg (intent was 0.05).
                     Justified: no DS dark-mode neutral Badge token yet. */
                  background: 'var(--border-on-dark-hairline)',
                  borderColor: 'var(--border-on-dark-hairline)',
                  color: 'var(--semantic-ink-on-dark-faint)',   /* rgba(255,255,255,0.30) */
                  fontSize: 'var(--text-2xs)',   /* 11px */
                }}
              >
                {signal.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
