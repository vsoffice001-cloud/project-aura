'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, PieChart, Building2, type LucideIcon } from 'lucide-react';
import { SectionLabel } from '@kenresearch/design-system/atoms';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel: string;
}

function StatCard({ icon: Icon, label, value, sublabel }: StatCardProps) {
  return (
    <div className="border border-[var(--border-soft)] p-4 rounded-[var(--radius-card)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300 flex items-start gap-3 bg-[var(--color-foundation-white)]">
      <div className="size-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-accent-purple)]/10">
        <Icon className="h-4 w-4 text-[var(--color-accent-purple)]" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <p className="text-[14px] text-[var(--surface-text-muted)]">{label}</p>
        <p className="text-[18px] font-bold text-[var(--surface-text)]">{value}</p>
        <p className="text-[13px] text-[var(--surface-text-muted)]">{sublabel}</p>
      </div>
    </div>
  );
}

function SampleReportBody() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-4 text-[var(--typography-size-sm)] text-[var(--surface-text-muted)] leading-[1.7]">
      <p>
        The Global AI in Healthcare Market reached $45.2 billion in 2024 and is projected to grow at a compound annual growth rate (CAGR) of 32.5% through 2030, reaching an estimated $148.4 billion. This report delivers a comprehensive analysis of market dynamics, competitive forces, technology trends, and strategic opportunities shaping the future of AI-driven healthcare across 50+ countries.
      </p>
      <div className="relative">
        <p className={!expanded ? 'line-clamp-2' : ''}>
          Key findings indicate that diagnostic imaging AI leads current adoption at 28% market share, followed by drug discovery and clinical trial optimization at 22%. North America maintains the largest regional share (41%), while Asia-Pacific represents the fastest-growing market with 38.7% CAGR driven by China, India, and Japan. Over 200 companies were profiled, including established technology leaders and high-growth startups disrupting traditional healthcare delivery models.
        </p>
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-1 mt-1.5 text-[var(--typography-size-xs)] font-bold text-[var(--surface-text)] transition-colors duration-200 cursor-pointer"
          >
            See more
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
      {expanded && (
        <>
          <p>
            Strategic recommendations center on three high-impact areas: accelerating regulatory alignment for AI/ML-based Software as a Medical Device (SaMD), building data partnerships for model training at scale, and deploying hybrid cloud architectures that meet HIPAA, GDPR, and regional compliance requirements. This executive summary distills 165+ pages of analysis into the critical insights decision-makers need to capture market share in the world&apos;s fastest-growing health technology sector.
          </p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1 text-[var(--typography-size-xs)] font-bold text-[var(--surface-text)] transition-colors duration-200 cursor-pointer"
          >
            See less
            <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </>
      )}
    </div>
  );
}

/**
 * ChapterExecutiveSummary — Chapter 1 (intro + 3 stat cards).
 * @port V0_lite_report-legacy/src/app/components/sample-report/ChapterExecutiveSummary.tsx
 */
export function ChapterExecutiveSummary() {
  return (
    <div id="chapter-1-summary" className="mb-16 scroll-mt-16">
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">CHAPTER 1 - EXECUTIVE SUMMARY</SectionLabel>
      </div>
      <h1 className="text-[var(--typography-size-xl)] sm:text-[var(--typography-size-2xl)] font-light font-[var(--typography-family-display)] text-[var(--surface-text)] leading-[1.25] mb-6">
        Executive Summary
      </h1>
      <SampleReportBody />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard icon={TrendingUp} label="Market Value"  value="$45.2B"  sublabel="2024 Estimate" />
        <StatCard icon={PieChart}    label="Projected CAGR" value="32.5%"   sublabel="2024–2030" />
        <StatCard icon={Building2}   label="Forecast 2030" value="$148.4B" sublabel="Projected Value" />
      </div>
    </div>
  );
}
