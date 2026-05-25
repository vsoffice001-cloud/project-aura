'use client';

/**
 * GatedBlock · wraps premium content w/ blur background + adjacent PremiumLockCard.
 *
 * @what  Container w/ blurred children + dim/gauze layer + lock card laid OVER the
 *        blurred region. Auto-sizes to whichever is taller (lock card OR blurred
 *        content) · never clips. ARIA: blurred layer aria-hidden · lock card owns
 *        semantics.
 *
 * @why   Premium teaser pattern · reader sees there IS more data (blurred shape
 *        visible) · single click on CTA → external sales contact. NO form embedded.
 *        QA rebuild 2026-05-21 v2: prior fixed-minHeight + overflow-hidden combo
 *        clipped lock card by 100-185px · now auto-sizes via grid stacking.
 *
 * @when  Wrap any premium data block in §08-§24 that needs teaser treatment.
 *        Typical: annotation cards, forecast splits, per-segment trajectories,
 *        competitor matrices, methodology details.
 *
 * @how   ```tsx
 *        <GatedBlock
 *          lockCard={<PremiumLockCard ... />}
 *        >
 *          [premium content here · gets blurred]
 *        </GatedBlock>
 *        ```
 *
 * Defense in depth: CSS blur is decoy · real backend MUST replace this w/
 * server-side data redaction in production. Aura mocks only.
 *
 * Project-local atom · promote to DS at 2nd consumer.
 */

import type { ReactNode } from 'react';

interface GatedBlockProps {
  /** PremiumLockCard instance · rendered over blurred content · drives container height */
  lockCard: ReactNode;
  /** Premium content · gets visually blurred · still in DOM for SEO/a11y bot crawl */
  children: ReactNode;
  /** Blur strength in pixels · default 5 · range 3-10 */
  blurStrength?: number;
  /** Gauze opacity at bottom · default 0.4 (was 0.75 · QA caught killing blur signal) */
  gauzeOpacity?: number;
  /** Optional className on outer wrapper */
  className?: string;
}

export function GatedBlock({
  lockCard,
  children,
  blurStrength = 5,
  gauzeOpacity = 0.4,
  className,
}: GatedBlockProps) {
  return (
    <div
      className={[
        'relative isolate rounded-[var(--radius-sm,10px)]',
        'border border-[var(--black-100)]',
        className ?? '',
      ].join(' ')}
      style={{
        // overflow-clip preserves border-radius without clipping absolutely-positioned
        // descendants the way overflow-hidden does for layout. Falls back gracefully.
        overflow: 'clip',
      }}
    >
      {/* Grid stacks blurred content + lock card in same cell · auto-sizes to taller */}
      <div className="grid">
        {/* Blurred content · grid cell row 1 col 1 · aria-hidden */}
        <div
          aria-hidden="true"
          className="select-none pointer-events-none p-4"
          style={{
            gridArea: '1 / 1',
            filter: `blur(${blurStrength}px)`,
            opacity: 0.6,
          }}
        >
          {children}
        </div>

        {/* Lock card · grid cell row 1 col 1 (overlay) · self-center · drives min-height */}
        <div
          className="flex items-center justify-center p-4 z-10"
          style={{ gridArea: '1 / 1' }}
        >
          {/* Gauze wash directly behind lock card · localized · doesn't kill blur outside */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,${gauzeOpacity * 0.6}) 0%, rgba(255,255,255,${gauzeOpacity}) 100%)`,
            }}
          />
          <div className="relative">{lockCard}</div>
        </div>
      </div>
    </div>
  );
}
