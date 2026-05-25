'use client';

/**
 * TaxonomySection — v0.4 §06 Taxonomy
 *
 * @what  Market structure hierarchy · LIVE-verified content (9 categories · 17 sub-items).
 *        Custom eyebrow + H2 + lede header matching §01-§05 pattern · then DS MindMap viz
 *        for the tree (DS ScopeOfReport organism's header BYPASSED via empty strings;
 *        we render our own header above it w/ correct type rhythm).
 *
 * @why   Previous build used ScopeOfReport organism header which renders heading via
 *        Next/font CSS var (different cascade than @theme `font-display` used elsewhere)
 *        AND uses var(--text-lg) 18px lede — breaks consistent section type rhythm
 *        established in §01-§05 (16px lede · font-display class).
 *        Per craft principle #2 (type rhythm consistent across sections).
 *
 * @when  v0.4 PDP body §06. Below Definitions.
 *
 * @how   Render header ourselves (consistent w/ §01-§05) · then DS ScopeOfReport
 *        w/ chapterLabel="" + heading="" + description="" + showDotPattern=true.
 *        ScopeOfReport renders empty header zone · just the MindMap card visible.
 *
 * Source: live kenresearch.com/australia-cold-chain-markets (re-scraped 2026-05-21).
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { ScopeOfReport } from '@kenresearch/design-system/organisms';
import type { MindMapNode } from '@kenresearch/design-system/organisms';

const AUSTRALIA_TAXONOMY: MindMapNode = {
  name: 'Australia Cold Chain Market',
  children: [
    {
      name: 'Cold Storage',
      children: [
        { name: 'Refrigerated Warehouses' },
        { name: 'Cold Rooms' },
        { name: 'Blast Freezers' },
        { name: 'Refrigerated Containers' },
      ],
    },
    {
      name: 'Cold Transportation',
      children: [
        { name: 'Refrigerated Trucks' },
        { name: 'Reefer Containers (Sea & Air)' },
        { name: 'Refrigerated Rail Transport' },
      ],
    },
    {
      name: 'Cold Warehousing',
      children: [
        { name: 'Temperature-Controlled Distribution Centers' },
        { name: 'Cross-Docking Facilities' },
      ],
    },
    { name: 'Temperature-Sensitive Products' },
    {
      name: 'Refrigeration Systems',
      children: [
        { name: 'Compressor-based Systems' },
        { name: 'Absorption Refrigeration' },
        { name: 'Cryogenic Systems' },
      ],
    },
    { name: 'Market Participants' },
    {
      name: 'Retail and Distribution Channels',
      children: [{ name: 'Online Grocery Platforms' }],
    },
    {
      name: 'Food and Beverages',
      children: [
        { name: 'Fresh Produce' },
        { name: 'Dairy Products' },
        { name: 'Meat and Seafood' },
        { name: 'Processed Foods' },
      ],
    },
    { name: 'Pharmaceuticals and Biotechnology' },
  ],
};

export function TaxonomySection() {
  return (
    <section
      id="taxonomy"
      aria-labelledby="taxonomy-heading"
      className="scroll-mt-[120px]"
    >
      {/* Custom header · matches §01-§05 type rhythm */}
      <div className="px-4 sm:px-6 lg:px-12 max-w-[1100px] mx-auto w-full mb-8">
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="accent">
            Section 06 · Market Taxonomy
          </SectionLabel>
        </div>
        <h2
          id="taxonomy-heading"
          className="font-display font-light text-[clamp(28px,3vw,39px)] leading-[1.15] tracking-[-0.015em] text-[var(--semantic-ink-strong)] mb-3"
        >
          How the Australia cold chain market is structured
        </h2>
        <p className="font-body text-[16px] leading-[1.6] text-[var(--semantic-ink-body)] max-w-[60ch]">
          9 top-level categories spanning storage, transport, warehousing, end-use products, and supporting systems. Click any node to expand, or open the full mind map for pan and zoom.
        </p>
      </div>

      {/* DS MindMap viz · render via ScopeOfReport organism w/ empty header strings
          (organism renders empty zone · just MindMap card shows · our header above) */}
      <div className="taxonomy-mindmap-wrap">
        <ScopeOfReport
          mindMapData={AUSTRALIA_TAXONOMY}
          chapterLabel=""
          heading=""
          description=""
        />
      </div>

      <style>{`
        /* Hide DS organism's internal header zone (OverheadText + LabelHeadingPair + description)
           since we render our own above. Targets the header div before MindMap card. */
        .taxonomy-mindmap-wrap [data-component="OverheadText"]:empty,
        .taxonomy-mindmap-wrap [data-component="SectionLabel"]:empty {
          display: none;
        }
        .taxonomy-mindmap-wrap [data-component="LabelHeadingPair"] h2:empty {
          display: none;
        }
        /* Tighten section top padding · header already provided */
        .taxonomy-mindmap-wrap section {
          padding-top: 0 !important;
        }
      `}</style>
    </section>
  );
}
