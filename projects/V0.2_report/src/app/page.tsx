import { SectionHeading } from '@kenresearch/design-system/atoms';
import { reportMeta } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="container max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8 py-16">
      <p className="text-[var(--typography-size-xs)] uppercase tracking-wider opacity-60 mb-3">
        Sprint 2026-05-07 Phase E — V0.2 Report scaffold
      </p>
      <SectionHeading level={1} align="left">
        {reportMeta.title}
      </SectionHeading>
      <p className="opacity-80 max-w-prose mt-4">
        {reportMeta.bodyDescription}
      </p>
      <p className="opacity-60 max-w-prose mt-2 text-[var(--typography-size-compact)]">
        Next.js 15 port scaffold. 13-section structure carry-over from legacy in subsequent commits — see{' '}
        <code>docs/aura-sprint-2026-05-07-port/A3-V0.2_report-audit.md</code>.
      </p>
    </div>
  );
}
