'use client';

/**
 * PremiumLockCard · small CTA card rendered as overlay center on gated content.
 *
 * @what  Compact card · lock icon + tier pill + headline + 1-2 specifics +
 *        brand-red CTA button + neutral secondary link. NO form. NO fake
 *        meter or social proof numbers. Single click → external sales contact
 *        page (placeholder href).
 *
 * @why   User decision (2026-05-21): "we should not place form directly on
 *        any widget · place small CTAs with text above them looks like
 *        premium wall · does not take much space · redirect user to forms ·
 *        connect to sales team as lead." NO fabricated proof numbers per
 *        stakeholder-trust principle.
 *
 * @when  Centered inside <GatedBlock> · over blurred premium data. Used in
 *        §08 (Lineage detail annotation · 2027F segment split) and future
 *        §09 §13 §14 §16 sections.
 *
 * @how   ```tsx
 *        <PremiumLockCard
 *          tier="lead"
 *          headline="See per-segment 2017-2027 projection"
 *          specifics={['Per-year Cold Storage CAGR', 'Cold Transport margin trajectory']}
 *          primaryCta={{ label: 'Talk to expert', href: '/contact-expert?ref=08-segment-split' }}
 *          secondaryCta={{ label: 'View sample', href: '#sample-preview' }}
 *        />
 *        ```
 *
 * Project-local atom · promote to DS at 2nd consumer.
 */

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * useResponsiveVariant · returns active variant per viewport breakpoint.
 * - <640px (mobile): use compact (vertical-friendly · no overflow risk)
 * - <1024px (tablet): use compact
 * - >=1024px (desktop): use whatever variant prop says
 *
 * Reason: minimal variant truncates 4-6 word headlines on narrow viewports
 * (320-480px). default variant overflows when gated zone is narrow column.
 * Compact handles both well at sub-1024 widths.
 */
function useResponsiveVariant(requested: 'default' | 'compact' | 'minimal'): 'default' | 'compact' | 'minimal' {
  const [variant, setVariant] = useState<'default' | 'compact' | 'minimal'>(requested);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setVariant(requested);
      return;
    }
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => {
      // On narrow viewports · auto-downgrade default→compact and keep minimal
      // (minimal already pill-sized · fits everywhere · we keep it as-is)
      if (mq.matches) {
        if (requested === 'default') {
          setVariant('compact');
        } else {
          setVariant(requested);
        }
      } else {
        setVariant(requested);
      }
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [requested]);

  return variant;
}

interface PremiumLockCardProps {
  /** Tier classification · drives pill label · lead = email-equivalent · paid = purchase */
  tier: 'lead' | 'paid';
  /** Value-prop headline · what is unlocked (specific · not generic) */
  headline: string;
  /** Optional 1-3 specifics · concrete data points teased · ignored when variant='compact' */
  specifics?: string[];
  /** Primary CTA · brand-red · always present · always anchor/external href (no form) */
  primaryCta: { label: string; href: string };
  /** Secondary CTA · neutral · optional · anchor or external href */
  secondaryCta?: { label: string; href: string };
  /**
   * Visual variant.
   * 'default' · serif headline + bullets + 2 CTAs (~280-340px tall · prose zones)
   * 'compact' · 1-line headline + single CTA · NO specifics (~50-60px · horizontal narrow zones)
   * 'minimal' · ultra-tight · 3-6 word headline · neutral chrome (no brand-red bg ·
   *             only link-style CTA) · use when adjacent to text-heavy free content
   *             where prominent red would clash · ~36-44px tall · feels light not loud
   */
  variant?: 'default' | 'compact' | 'minimal';
  /**
   * CTA button style.
   * 'secondary' (DEFAULT) · white bg · brand-red text · 1px brand-red border · hover fills red
   * 'primary' · filled brand-red · white text (rare · opt-in for main paywall moments)
   * S10 2026-05-22 · brand-red budget = 1 per viewport · sub-CTAs go secondary
   */
  ctaVariant?: 'primary' | 'secondary';
  /** Optional className passthrough */
  className?: string;
}

export function PremiumLockCard({
  tier,
  headline,
  specifics,
  primaryCta,
  secondaryCta,
  variant: requestedVariant = 'default',
  ctaVariant = 'secondary',
  className,
}: PremiumLockCardProps) {
  // Auto-downgrade default → compact below 1024px to prevent overflow + headline truncation.
  // Minimal + compact pass through unchanged (already fit narrow viewports).
  const variant = useResponsiveVariant(requestedVariant);
  const tierLabel = tier === 'lead' ? 'Preview only' : 'Premium content';

  // Minimal variant · ultra-light · neutral chrome · text-link CTA only · for slots
  // where brand-red would dominate · headline must be 3-6 words max
  // S3-2026-05-22: min-width 360px (was 280px) · flex-wrap for narrow containers ·
  // solid white bg + shadow for overlay-on-chart use case
  if (variant === 'minimal') {
    return (
      <div
        className={[
          'flex flex-wrap items-center gap-2',
          'rounded-full border border-[var(--black-100)]',
          'pl-3 pr-1.5 py-1.5',
          className ?? '',
        ].join(' ')}
        style={{
          minWidth: '360px',
          maxWidth: '100%',
          // Solid bg for overlay-on-chart legibility (transparent fails on light chart canvas)
          backgroundColor: 'var(--color-foundation-white, #ffffff)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}
        role="region"
        aria-label={`${tierLabel} content · ${headline}`}
      >
        <Lock size={11} aria-hidden="true" className="text-[var(--semantic-ink-subtle)] flex-none" />
        <span
          className="font-body text-[var(--semantic-ink-strong)] flex-1 min-w-0 truncate"
          style={{ fontSize: '12px', lineHeight: 1.3, fontWeight: 500 }}
        >
          {headline}
        </span>
        <a
          href={primaryCta.href}
          className="inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 font-body font-medium text-[var(--color-brand-red,#b01f24)] hover:bg-[var(--black-50)] transition-colors flex-none whitespace-nowrap flex-shrink-0"
          style={{ fontSize: '11.5px', letterSpacing: '0.01em' }}
        >
          {primaryCta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  // Compact variant · horizontal · single line · for tight teaser zones (2027F bar block etc.)
  if (variant === 'compact') {
    const compactCtaClass = ctaVariant === 'primary'
      ? 'inline-flex items-center gap-1 rounded-[var(--radius-xs,5px)] bg-[var(--color-brand-red,#b01f24)] text-white px-3 py-1.5 font-body font-medium hover:bg-[#8f181d] transition-colors flex-none whitespace-nowrap'
      : 'inline-flex items-center gap-1 rounded-[var(--radius-xs,5px)] bg-white border border-[var(--color-brand-red,#b01f24)] text-[var(--color-brand-red,#b01f24)] px-3 py-1.5 font-body font-medium hover:bg-[var(--color-brand-red,#b01f24)] hover:text-white transition-colors flex-none whitespace-nowrap';
    return (
      <div
        className={[
          'inline-flex flex-wrap items-center gap-3 max-w-[560px]',
          'rounded-[var(--radius-sm,10px)] border border-[var(--black-100)]',
          'px-4 py-2.5',
          className ?? '',
        ].join(' ')}
        style={{
          // S3-2026-05-22: solid white bg + shadow for overlay-on-chart legibility
          backgroundColor: 'var(--color-foundation-white, #ffffff)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}
        role="region"
        aria-label={`${tierLabel} content · ${headline}`}
      >
        {/* Tier pill · softer style · DM Sans 9.5px uppercase · ink-muted text · black-50 bg */}
        <span
          className="inline-flex items-center gap-1.5 rounded-full flex-none"
          style={{
            background: 'var(--black-50, rgba(0,0,0,0.04))',
            color: 'var(--semantic-ink-muted)',
            padding: '2px 8px',
          }}
        >
          <Lock size={9} aria-hidden="true" />
          <span
            className="font-body uppercase"
            style={{ fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.10em' }}
          >
            {tierLabel}
          </span>
        </span>
        <span
          className="font-body text-[var(--semantic-ink-strong)] flex-1 min-w-0"
          style={{ fontSize: '12.5px', lineHeight: 1.4, fontWeight: 500 }}
        >
          {headline}
        </span>
        <a
          href={primaryCta.href}
          className={compactCtaClass}
          style={{ fontSize: '12px', letterSpacing: '0.01em' }}
        >
          {primaryCta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  return (
    <div
      className={[
        'inline-flex flex-col items-start gap-3 max-w-[420px]',
        'rounded-[var(--radius-sm,10px)] border border-[var(--black-200)]',
        'bg-[var(--color-foundation-white)]',
        'shadow-[0_6px_28px_-12px_rgba(0,0,0,0.18)]',
        'px-5 py-4',
        className ?? '',
      ].join(' ')}
      role="region"
      aria-label={`${tierLabel} content · ${headline}`}
    >
      {/* Tier pill · softer style · DM Sans 9.5px uppercase · ink-muted text · black-50 bg */}
      <div
        className="inline-flex items-center gap-1.5 rounded-full"
        style={{
          background: 'var(--black-50, rgba(0,0,0,0.04))',
          color: 'var(--semantic-ink-muted)',
          padding: '3px 10px',
        }}
      >
        <Lock size={10} aria-hidden="true" />
        <span
          className="font-body uppercase"
          style={{ fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.10em' }}
        >
          {tierLabel}
        </span>
      </div>

      {/* Headline · the specific value prop */}
      <p
        className="font-display text-[var(--semantic-ink-strong)] tracking-tight"
        style={{ fontSize: '17px', lineHeight: 1.3, fontWeight: 400 }}
      >
        {headline}
      </p>

      {/* Specifics · 1-3 bullets · concrete data points */}
      {specifics && specifics.length > 0 && (
        <ul className="space-y-1.5 w-full">
          {specifics.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
              style={{ fontSize: '12.5px', lineHeight: 1.5 }}
            >
              <span
                aria-hidden="true"
                className="inline-block flex-none rounded-full bg-[var(--color-brand-red,#b01f24)] mt-[7px]"
                style={{ width: '4px', height: '4px' }}
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTAs · primary/secondary style per ctaVariant + optional secondary neutral anchor */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <a
          href={primaryCta.href}
          className={
            ctaVariant === 'primary'
              ? 'inline-flex items-center gap-1.5 rounded-[var(--radius-xs,5px)] bg-[var(--color-brand-red,#b01f24)] text-white px-3.5 py-2 font-body font-medium hover:bg-[#8f181d] transition-colors'
              : 'inline-flex items-center gap-1.5 rounded-[var(--radius-xs,5px)] bg-white border border-[var(--color-brand-red,#b01f24)] text-[var(--color-brand-red,#b01f24)] px-3.5 py-2 font-body font-medium hover:bg-[var(--color-brand-red,#b01f24)] hover:text-white transition-colors'
          }
          style={{ fontSize: '12.5px', letterSpacing: '0.01em' }}
        >
          {primaryCta.label}
          <span aria-hidden="true">→</span>
        </a>
        {secondaryCta && (
          <a
            href={secondaryCta.href}
            className="inline-flex items-center font-body font-medium text-[var(--semantic-ink-strong)] hover:text-[var(--color-brand-red,#b01f24)] underline decoration-[var(--black-300)] underline-offset-4 hover:decoration-[var(--color-brand-red,#b01f24)] transition-colors"
            style={{ fontSize: '12.5px' }}
          >
            {secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  );
}
