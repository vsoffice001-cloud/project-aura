import { Lock } from 'lucide-react';
import { Button, SectionLabel } from '@kenresearch/design-system/atoms';

/**
 * ChapterMarketOverview — Chapter 2 paywall preview (3 progressively faded paragraphs + lock CTA).
 *
 * Note: Phosphor `LockKey` legacy icon → Lucide `Lock` (icon consolidation per Phase C).
 *
 * @port V0_lite_report-legacy/src/app/components/sample-report/ChapterMarketOverview.tsx
 */
export function ChapterMarketOverview() {
  return (
    <div id="chapter-2-overview" className="mb-16 scroll-mt-16">
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">CHAPTER 2 - MARKET OVERVIEW</SectionLabel>
      </div>
      <h2 className="text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] font-light font-[var(--typography-family-display)] text-[var(--surface-text)] leading-[1.25] mb-6">
        Market Overview &amp; Definition
      </h2>

      <div className="relative">
        <div className="space-y-4 text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] leading-[1.7]">
          <p>
            The global AI in healthcare market encompasses software, hardware, and services that leverage artificial intelligence technologies — including machine learning, natural language processing, computer vision, and generative AI — to improve clinical outcomes, optimize operations, and accelerate drug discovery across the healthcare value chain.
          </p>
          <p className="opacity-60">
            Market scope includes diagnostic imaging AI, clinical decision support systems, robotic process automation in healthcare administration, AI-powered drug discovery platforms, precision medicine solutions, and virtual health assistants. The analysis covers 50+ countries across North America, Europe, Asia-Pacific, Latin America, and Middle East &amp; Africa.
          </p>
          <p className="opacity-30">
            Key market taxonomy distinguishes between component type (software, hardware, services), technology (ML, NLP, computer vision, generative AI), application (diagnostics, drug discovery, precision medicine, administrative), end-user (hospitals, pharma, payers, research institutions), and deployment model (cloud, on-premise, hybrid).
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[var(--color-foundation-white)] via-[var(--color-foundation-white)]/95 to-transparent flex flex-col items-center justify-end pb-2">
          <div className="size-12 rounded-full flex items-center justify-center mb-3 bg-[var(--color-accent-purple)]/10">
            <Lock size={22} className="text-[var(--color-accent-purple)]" strokeWidth={2} />
          </div>
          <p className="text-[var(--typography-size-compact)] text-[var(--surface-text-muted)] mb-3 text-center">
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
