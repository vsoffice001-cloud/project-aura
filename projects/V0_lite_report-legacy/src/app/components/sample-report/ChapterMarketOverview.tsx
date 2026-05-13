/**
 * ChapterMarketOverview — Chapter 2: Market Overview & Definition
 * Shows 3 paragraphs with progressive fade + paywall CTA.
 *
 * Extracted from the monolith as part of Tier 4 decomposition.
 * The paywall lock icon uses `iconColors.content` (#806ce0) with a
 * 10% opacity container — within the 3% accent tier boundary.
 * The "Unlock Full Report" CTA uses brand red (5% tier) — correct
 * because it's a conversion action.
 */

import { LockKey } from '@phosphor-icons/react';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { Button } from '@/design-system/Button';
import { iconColors } from '@/design-system/iconColors';

export function ChapterMarketOverview() {
  return (
    <div id="chapter-2-overview" className="mb-16 scroll-mt-16">
      {/* Chapter Label */}
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">
          CHAPTER 2 - MARKET OVERVIEW
        </SectionLabel>
      </div>

      {/* Title */}
      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
        Market Overview &amp; Definition
      </h2>

      {/* Progressive fade paragraphs */}
      <div className="relative">
        <div className="space-y-4 text-[1rem] text-[var(--black-500)] leading-[1.7]">
          <p>
            The global AI in healthcare market encompasses software, hardware,
            and services that leverage artificial intelligence technologies —
            including machine learning, natural language processing, computer
            vision, and generative AI — to improve clinical outcomes, optimize
            operations, and accelerate drug discovery across the healthcare
            value chain.
          </p>
          <p className="opacity-60">
            Market scope includes diagnostic imaging AI, clinical decision
            support systems, robotic process automation in healthcare
            administration, AI-powered drug discovery platforms, precision
            medicine solutions, and virtual health assistants. The analysis
            covers 50+ countries across North America, Europe, Asia-Pacific,
            Latin America, and Middle East & Africa.
          </p>
          <p className="opacity-30">
            Key market taxonomy distinguishes between component type
            (software, hardware, services), technology (ML, NLP, computer
            vision, generative AI), application (diagnostics, drug discovery,
            precision medicine, administrative), end-user (hospitals, pharma,
            payers, research institutions), and deployment model (cloud,
            on-premise, hybrid).
          </p>
        </div>

        {/* Fade overlay + paywall */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-2">
          <div
            className="size-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: 'rgba(128, 108, 224, 0.1)' }}
          >
            <LockKey size={22} weight="regular" color={iconColors.content} />
          </div>
          <p className="text-[0.875rem] text-[var(--black-500)] mb-3 text-center">
            Full chapter available in the complete report
          </p>
          <Button variant="brand" size="md" animatedArrow>
            Unlock Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}