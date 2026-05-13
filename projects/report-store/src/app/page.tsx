import { SectionHeading } from '@kenresearch/design-system/atoms';

export default function HomePage() {
  return (
    <div className="container max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8 py-16">
      <p className="text-[var(--typography-size-xs)] uppercase tracking-wider opacity-60 mb-3">
        Sprint 2026-05-07 Phase D — Report Store scaffold
      </p>
      <SectionHeading level={1} align="left">
        Ken Research Report Store
      </SectionHeading>
      <p className="opacity-80 max-w-prose mt-4">
        Next.js 15 port scaffold. Sections port in subsequent commits — see{' '}
        <code>docs/aura-sprint-2026-05-07-port/A2-report-store-audit.md</code>.
      </p>
    </div>
  );
}
