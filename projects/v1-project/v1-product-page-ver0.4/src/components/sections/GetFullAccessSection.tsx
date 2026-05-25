'use client';

/**
 * GetFullAccessSection — v0.4 §24 Get Full Access
 *
 * @what  Thin wrapper section that renders FinalCTABanner atom full-width.
 *        Sets section id="cta-banner" for SideTOC scroll-spy + SmoothScroll.
 *        NO SourceCluster (closing CTA · no data provenance needed) ·
 *        NO InsightBox (banner IS the closer).
 *
 * @why   §24 is the conversion endpoint. The thin wrapper pattern keeps the section
 *        wired to PDP_SECTIONS scroll-spy without adding unnecessary layout chrome
 *        around the banner (full-width is intentional — refs canonical for dark
 *        closing banners that break the editorial-light rhythm at the end of a
 *        long-form research PDP).
 *
 * @when  v0.4 PDP body §24 · final section.
 *        NOTE: FinalCTABanner already sets id="cta-banner" internally and uses
 *        cinematic-dark variant · no additional wrapper section bg needed.
 *
 * Source: n/a (CTA is closing · no data attribution needed).
 */

import { FinalCTABanner } from '@/components/atoms/FinalCTABanner';

export function GetFullAccessSection() {
  return (
    /**
     * Outer wrapper: full-bleed (no max-w · no horizontal px) so the dark banner
     * extends edge-to-edge. id="cta-banner" on FinalCTABanner handles scroll-spy.
     * The section element here is for semantic structure only.
     */
    <section aria-label="Get Full Access" className="w-full">
      <FinalCTABanner />
    </section>
  );
}
