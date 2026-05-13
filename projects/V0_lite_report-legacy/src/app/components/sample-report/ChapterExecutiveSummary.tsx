/**
 * ChapterExecutiveSummary — Chapter 1: Executive Summary
 * Includes body text with expand/collapse and 3 metric stat cards.
 *
 * Extracted from the monolith as part of Tier 4 decomposition.
 * Stat card icons use `iconColors.content` (#806ce0) with 10% opacity
 * container backgrounds — within the 3% accent tier boundary.
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, PieChart, Building2 } from 'lucide-react';
import { SectionLabel } from '@/design-system/components/SectionLabel';
import { iconColors } from '@/design-system/iconColors';

export function ChapterExecutiveSummary() {
  return (
    <div id="chapter-1-summary" className="mb-16 scroll-mt-16">
      {/* Chapter Label */}
      <div className="mb-4">
        <SectionLabel background="light" variant="accent">
          CHAPTER 1 - EXECUTIVE SUMMARY
        </SectionLabel>
      </div>

      {/* Title */}
      <h1 className="text-[1.953rem] sm:text-[2.441rem] font-light font-serif text-black leading-[1.25] mb-6">
        Executive Summary
      </h1>

      {/* Body Content */}
      <SampleReportBody />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        <StatCard
          icon={TrendingUp}
          label="Market Value"
          value="$45.2B"
          sublabel="2024 Estimate"
        />
        <StatCard
          icon={PieChart}
          label="Projected CAGR"
          value="32.5%"
          sublabel="2024–2030"
        />
        <StatCard
          icon={Building2}
          label="Forecast 2030"
          value="$148.4B"
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
    <div className="border border-[var(--black-100)] p-4 rounded-[10px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.03)] transition-shadow duration-300 flex items-start gap-3 bg-white">
      <div className="size-10 rounded-lg flex items-center justify-center shrink-0 bg-content-icon/10">
        <Icon className="h-4 w-4" strokeWidth={2} color={iconColors.content} />
      </div>
      <div className="flex flex-col">
        <p className="text-[14px] text-[var(--black-500)]">{label}</p>
        <p className="text-[18px] font-bold text-black">{value}</p>
        <p className="text-[13px] text-[var(--black-500)]">{sublabel}</p>
      </div>
    </div>
  );
}

// ── Body Text with expand/collapse ─────────────────────

function SampleReportBody() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4 text-[1rem] text-[var(--black-500)] leading-[1.7]">
      <p>
        The Global AI in Healthcare Market reached $45.2 billion in 2024 and is projected to
        grow at a compound annual growth rate (CAGR) of 32.5% through 2030, reaching an
        estimated $148.4 billion. This report delivers a comprehensive analysis of market
        dynamics, competitive forces, technology trends, and strategic opportunities shaping
        the future of AI-driven healthcare across 50+ countries.
      </p>
      <div className="relative">
        <p className={`${!expanded ? 'line-clamp-2' : ''}`}>
          Key findings indicate that diagnostic imaging AI leads current adoption at 28% market
          share, followed by drug discovery and clinical trial optimization at 22%. North America
          maintains the largest regional share (41%), while Asia-Pacific represents the
          fastest-growing market with 38.7% CAGR driven by China, India, and Japan. Over 200
          companies were profiled, including established technology leaders and high-growth
          startups disrupting traditional healthcare delivery models.
        </p>
        {!expanded && (
          <button
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
            Strategic recommendations center on three high-impact areas: accelerating regulatory
            alignment for AI/ML-based Software as a Medical Device (SaMD), building data
            partnerships for model training at scale, and deploying hybrid cloud architectures
            that meet HIPAA, GDPR, and regional compliance requirements. This executive summary
            distills 165+ pages of analysis into the critical insights decision-makers need to
            capture market share in the world's fastest-growing health technology sector.
          </p>
          <button
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
