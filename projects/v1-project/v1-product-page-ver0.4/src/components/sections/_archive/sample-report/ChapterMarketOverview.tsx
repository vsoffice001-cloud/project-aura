'use client';

/**
 * ChapterMarketOverview — Chapter 2: Market Overview & Definition
 *
 * @what  3 paragraphs with progressive fade + paywall CTA.
 *        First para: visible · Second: 60% opacity · Third: 30% opacity.
 *        Fade overlay + "Unlock Full Report" CTA.
 *
 * @why   Port from V0_lite_report-legacy ChapterMarketOverview.tsx.
 *        Content adapted to Australia Cold Chain market definition.
 *        Paywall icon uses content purple at 10% opacity (within 3% accent tier).
 *        CTA uses brand red (5% tier · correct for conversion action).
 *
 * @when  §22 SamplePreviewSection · Chapter 2 · second unlocked chapter
 */

import { Lock } from 'lucide-react';

export function ChapterMarketOverview() {
  return (
    <div id="chapter-2-overview" className="mb-16 scroll-mt-16">
      {/* Chapter Label */}
      <div className="mb-4">
        <span
          className="inline-flex items-center rounded-[var(--radius-xs,5px)] border border-[var(--black-100,#f5f5f5)] px-2.5 py-1 font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle)]"
          style={{ fontSize: '10.5px', fontWeight: 600 }}
        >
          Chapter 2 · Market Overview
        </span>
      </div>

      {/* Title */}
      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
        Market Overview &amp; Definition
      </h2>

      {/* Progressive fade paragraphs */}
      <div className="relative">
        <div className="space-y-4 text-[1rem] text-[var(--semantic-ink-subtle)] leading-[1.7]">
          <p>
            The Australia Cold Chain Market encompasses temperature-controlled storage and
            transportation services — including cold storage facilities, refrigerated transport,
            blast-freezing, and value-added services — that maintain product integrity across
            the entire cold-chain from farm gate to consumer. The market covers all 8 Australian
            states and territories, spanning domestic cold storage, interstate refrigerated freight,
            port export cold chain, and last-mile reefer delivery verticals.
          </p>
          <p className="opacity-60">
            Market scope includes Cold Storage (60.8% revenue share · AUD 3,977 Mn 2022) and
            Cold Transport (39.2% share · AUD 2,571 Mn 2022). The analysis covers 6 end-user
            verticals — Meat &amp; Seafood (32%) · Dairy (18%) · Fruit &amp; Vegetables (16%) ·
            Pharmaceutical (14%) · Frozen Packaged Foods (12%) · Other (8%) — across 3 temperature
            zones: Frozen (−18°C to −25°C) · Chiller (+2°C to +5°C) · Ambient (+10°C to +15°C).
          </p>
          <p className="opacity-30">
            Key market taxonomy distinguishes between sub-market type (Cold Storage vs Cold
            Transport), end-user vertical (6 categories), temperature zone (3 tiers),
            geographic region (8 states + territories), reefer truck size (small · medium · large),
            and service mode (domestic vs international export chain). The study period is
            2022–2027 with historical reference data from 2018–2021 for trend validation.
          </p>
        </div>

        {/* Fade overlay + paywall */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end pb-2">
          <div
            className="size-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: 'rgba(128, 108, 224, 0.1)' }}
          >
            <Lock size={22} style={{ color: '#806ce0' }} />
          </div>
          <p className="text-[0.875rem] text-[var(--semantic-ink-subtle)] mb-3 text-center">
            Full chapter available in the complete report
          </p>
          <a
            href="/contact-expert?ref=sample-preview-ch2"
            className="inline-flex items-center gap-2 rounded-[var(--radius-xs,5px)] bg-[var(--color-brand-red,#b01f24)] text-white px-5 py-2.5 font-body font-medium text-[13.5px] hover:bg-[#8f181d] transition-colors"
          >
            Unlock Full Report →
          </a>
        </div>
      </div>
    </div>
  );
}
