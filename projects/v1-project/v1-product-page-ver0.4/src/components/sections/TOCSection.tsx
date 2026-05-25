'use client';

/**
 * TOCSection — v0.4 §20 Table of Contents
 *
 * @what  Thin shell wrapping ChapterExtendedTOC. Shows full Australia Cold Chain
 *        report structure with: 2-phase/3-phase variant switcher · search · filter
 *        pills · expandable phase cards · footer stats.
 *
 * @why   Visual design matches v0-lite ChapterExtendedTOC (canonical).
 *        Section eyebrow only · single title owned by ExtendedTOC (no duplication).
 *
 * @when  v0.4 PDP body §20. Below §19 Methodology · above §21 FAQs.
 *
 * Source: V0_lite_report-legacy (canonical) · ported 2026-05-22.
 */

import { SectionLabel } from '@kenresearch/design-system/atoms';
import { ChapterExtendedTOC } from '@/components/sample-report/ChapterExtendedTOC';

export function TOCSection() {
  return (
    <section
      id="toc"
      aria-label="Table of Contents"
      className="px-4 sm:px-6 lg:px-12 w-full"
    >
      {/* Section eyebrow only · ExtendedTOC owns title + description */}
      <div className="max-w-[1100px] mx-auto w-full mb-6">
        <div className="inline-flex">
          <SectionLabel background="light" variant="accent">
            Section 20
          </SectionLabel>
        </div>
      </div>

      {/* Extended TOC — carries its own h2 + description + stats */}
      <div className="max-w-[1100px] mx-auto w-full">
        <ChapterExtendedTOC />
      </div>
    </section>
  );
}
