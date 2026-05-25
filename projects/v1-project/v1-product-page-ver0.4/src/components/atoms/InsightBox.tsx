'use client';

/**
 * InsightBox · "What this means for X" section-end closer · refs canonical.
 *
 * @what  Typographic emphasis block · italic thesis + brand-red left border +
 *        eyebrow + bold lead-in + body prose. NO card bg · NO shadow · refs
 *        canonical pattern (merged-report Zone Identity Insight + rainbow-pothos
 *        synthesis callouts).
 *
 * @why   Every data-heavy section needs an analyst-voice closer that translates
 *        the data into stakeholder implication. User catches up faster · scan
 *        rhythm anchored · sales hook plants. Refs use this verbatim per
 *        zone/asset-class/section.
 *
 * @when  End of every data-heavy section (§07 · §08 · §09 · §10 · §11 · §13 ·
 *        §14 · §16 · §18). Skip on: prose-only sections (§04 Genesis · §15
 *        Regulatory) · meta sections (§19-§24).
 *
 * @how   ```tsx
 *        <InsightBox
 *          eyebrow="What this means for cold-chain operators"
 *          lead="Capacity expansion outpaces demand only in pharma + premium retail."
 *          body="Operators serving meat/dairy/seafood face commoditized pricing through 2027 · pharma cold-chain remains the margin segment."
 *        />
 *        ```
 *
 * Variants:
 * - `default` · brand-red left border · italic lead · body prose
 * - `accent` · brand-red bg tint + brand-red left border (warmer · for §17 Opportunities)
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/REF-PATTERNS-ADOPTION.md §6 (NEW atoms)
 * @relatedDoc projects/v1-product-page-ver0.4/docs/FONT-PAIRING-GUIDE.md §4 (italic usage)
 *
 * Project-local atom · promote to DS at 2nd consumer (anti-bloat rule).
 */

import type { ReactNode } from 'react';

export interface InsightBoxProps {
  /** Uppercase tracked label · context tag · default "What this means" */
  eyebrow?: string;
  /** Bold lead-in sentence · the conclusion · 1 sentence · max 20 words */
  lead: string;
  /** Body prose · 1-3 sentences explaining lead · ReactNode OR string · max 50 words */
  body?: ReactNode;
  /** Optional className passthrough */
  className?: string;
  /** Visual variant · default `default` (left-border only) · `accent` (red-tint bg too) */
  variant?: 'default' | 'accent';
}

export function InsightBox({
  eyebrow = 'What this means',
  lead,
  body,
  className,
  variant = 'default',
}: InsightBoxProps) {
  const isAccent = variant === 'accent';

  return (
    <aside
      role="note"
      aria-label={`Insight · ${eyebrow}`}
      className={[
        'border-l-2 border-[var(--color-brand-red,#b01f24)] pl-5 sm:pl-6 py-2 max-w-[68ch]',
        isAccent
          ? 'bg-[rgba(176,31,36,0.025)] pr-5 sm:pr-6 rounded-r-[var(--radius-xs,5px)]'
          : '',
        className ?? '',
      ].join(' ')}
    >
      {/* Eyebrow · DM Sans 600 · uppercase tracked · brand-red · refs canonical */}
      <p
        className="font-body uppercase tracking-[0.14em] text-[var(--color-brand-red,#b01f24)] mb-2"
        style={{ fontSize: '10.5px', fontWeight: 700 }}
      >
        {eyebrow}
      </p>

      {/* Lead · DM Sans 500 medium · italic (refs use italic for thesis) · ink-strong */}
      <p
        className="font-body italic text-[var(--semantic-ink-strong)] mb-2"
        style={{
          fontSize: '15px',
          lineHeight: 1.5,
          fontWeight: 500,
          letterSpacing: '-0.005em',
        }}
      >
        {lead}
      </p>

      {/* Body · DM Sans 400 · regular · ink-body */}
      {body && (
        <div
          className="font-body text-[var(--semantic-ink-body)]"
          style={{ fontSize: '13.5px', lineHeight: 1.6 }}
        >
          {body}
        </div>
      )}
    </aside>
  );
}
