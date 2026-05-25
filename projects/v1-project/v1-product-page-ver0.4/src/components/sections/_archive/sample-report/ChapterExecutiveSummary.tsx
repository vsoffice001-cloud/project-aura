'use client';

/**
 * ChapterExecutiveSummary — Chapter 1: Executive Summary
 *
 * @what  Australia Cold Chain Market executive summary w/ expand/collapse body
 *        and 3 metric stat cards (Market Value · CAGR · Forecast 2027).
 *
 * @why   Port from V0_lite_report-legacy ChapterExecutiveSummary.tsx.
 *        Content adapted to Australia Cold Chain (AUD 6,547.8 Mn 2022 · 10.03% CAGR).
 *        Stat card icons use content purple (iconColors.content #806ce0) at 10% opacity.
 *
 * @when  §22 SamplePreviewSection · Chapter 1 · first visible chapter (unlocked)
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, PieChart, Building2 } from 'lucide-react';

export function ChapterExecutiveSummary() {
  return (
    <div id="chapter-1-summary" className="mb-16 scroll-mt-16">
      {/* Chapter Label */}
      <div className="mb-4">
        <span
          className="inline-flex items-center rounded-[var(--radius-xs,5px)] border border-[var(--black-100,#f5f5f5)] px-2.5 py-1 font-body uppercase tracking-[0.08em] text-[var(--semantic-ink-subtle,#a3a3a3)]"
          style={{ fontSize: '10.5px', fontWeight: 600 }}
        >
          Chapter 1 · Executive Summary
        </span>
      </div>

      {/* Title */}
      <h2 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
        Executive Summary
      </h2>

      {/* Body Content */}
      <SampleReportBody />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard
          icon={TrendingUp}
          label="Market Value 2022"
          value="AUD 6,547.8 Mn"
          sublabel="Base Year Estimate"
        />
        <StatCard
          icon={PieChart}
          label="Projected CAGR"
          value="10.03%"
          sublabel="2022–2027"
        />
        <StatCard
          icon={Building2}
          label="Forecast 2027"
          value="AUD 10,705 Mn"
          sublabel="Projected Value"
        />
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────

interface StatCardProps {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  sublabel: string;
}

function StatCard({ icon: Icon, label, value, sublabel }: StatCardProps) {
  return (
    <div className="border border-[var(--black-100,#f5f5f5)] p-4 rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.03)] transition-shadow duration-300 flex items-start gap-3 bg-white">
      <div
        className="size-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'rgba(128, 108, 224, 0.1)' }}
      >
        <Icon className="h-4 w-4" strokeWidth={2} style={{ color: '#806ce0' }} />
      </div>
      <div className="flex flex-col">
        <p className="text-[14px] text-[var(--black-500,#a3a3a3)]">{label}</p>
        <p className="text-[18px] font-bold text-black">{value}</p>
        <p className="text-[13px] text-[var(--black-500,#a3a3a3)]">{sublabel}</p>
      </div>
    </div>
  );
}

// ── Body Text with expand/collapse ─────────────────────

function SampleReportBody() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4 text-[1rem] text-[var(--black-500,#a3a3a3)] leading-[1.7]">
      <p>
        The Australia Cold Chain Market reached AUD 6,547.8 million in 2022 and is projected
        to grow at a compound annual growth rate (CAGR) of 10.03% through 2027, reaching an
        estimated AUD 10,705 million. This report delivers a comprehensive analysis of market
        dynamics, competitive forces, infrastructure trends, and strategic opportunities
        shaping Australia&apos;s temperature-controlled logistics sector across all 8 states and territories.
      </p>
      <div className="relative">
        <p className={`${!expanded ? 'line-clamp-2' : ''}`}>
          Key findings indicate that Cold Storage is the dominant sub-market at 60.8% revenue share,
          growing at 11.0% CAGR, while Cold Transport (39.2% share · 9.4% CAGR) is accelerating
          driven by e-grocery, pharma distribution, and last-mile reefer investment. Meat &amp; seafood
          remains the largest end-user vertical at 32% of revenue, with pharmaceutical &amp; biologics
          the highest-margin tier at 14%. Over 200 cold-chain players were profiled, with Lineage
          Logistics holding the largest Cold Storage position at 12.5% pallet-position share.
        </p>
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-1 mt-1.5 text-[0.8rem] font-bold text-black transition-colors duration-200 cursor-pointer"
          >
            See more
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
      {expanded && (
        <>
          <p>
            Strategic recommendations centre on three high-impact opportunity areas: expanding
            pharmaceutical cold-chain 3PL capacity to capture TGA GDP-compliant biologics distribution
            (TAM AUD 820 Mn), deploying IoT temperature-monitoring SaaS platforms for operator
            fleet management (TAM AUD 560 Mn), and scaling urban last-mile reefer delivery for
            e-grocery and pharma DTC channels (TAM AUD 420 Mn). This executive summary distils
            240+ pages of primary and secondary research — including 240+ executive interviews —
            into the critical insights decision-makers need to compete in Australia&apos;s fastest-growing
            logistics infrastructure sector.
          </p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1 text-[0.8rem] font-bold text-black transition-colors duration-200 cursor-pointer"
          >
            See less
            <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </>
      )}
    </div>
  );
}
