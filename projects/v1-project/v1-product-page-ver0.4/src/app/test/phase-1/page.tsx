'use client';

/**
 * Phase 1 · Chrome Test Page (TopNav + Hero · V0_lite canonical)
 */

import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import { DummyHeaderV04 } from '@/components/chrome/DummyHeaderV04';
import { ReportHeroV04 } from '@/components/sections/ReportHeroV04';

export default function Phase1TestPage() {
  return (
    <>
      <DummyHeaderV04 />
      <main id="main">
        <ReportHeroV04
          eyebrow="LOGISTICS · AUSTRALIA · 2022–2027"
          title="Australia Cold Chain Market Outlook 2022–2027"
          promise="Market size, segmentation, competitor landscape, growth drivers, and forecast outlook for Australia's cold chain industry."
          stats={[
            { icon: BarChart3, value: 'AUD 6,547.8 Mn', label: 'Market Size 2022' },
            { icon: TrendingUp, value: '10.03%', label: 'CAGR 2022-2027' },
            { icon: Globe, value: 'AUD 10,705 Mn', label: 'Forecast 2027' },
          ]}
        />
        <div className="bg-[var(--bg-cream,#f5f2f1)] py-16 px-6 text-center">
          <p className="font-body text-[var(--semantic-ink-subtle)] tracking-[0.12em] uppercase text-[13px]">
            ↓ Body content starts here · Phase 2 will add Sticky PDP Nav + Side TOC ↓
          </p>
        </div>
      </main>
    </>
  );
}
