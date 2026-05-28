'use client';

/**
 * TowsCrosswalk · variant D · TOWS strategic matrix.
 *
 * @what  4 strategic intersection cells:
 *        - SO (Strength × Opportunity) · "Leverage" · use strengths to capture opportunities
 *        - ST (Strength × Threat)      · "Defend"   · use strengths to mitigate threats
 *        - WO (Weakness × Opportunity) · "Improve"  · address weaknesses by pursuing opportunities
 *        - WT (Weakness × Threat)      · "Avoid"    · minimize weaknesses + dodge threats
 *
 *        Compact 4-cell layout · each cell shows strategic recommendation w/
 *        source pair (S+O · S+T · etc.) clearly labeled. Headers at top + left
 *        show the SWOT inputs (Strengths/Weaknesses rows · Opportunities/Threats cols).
 *
 * @why   TOWS is the STRATEGIC SWOT · refs canonical for B2B research (McKinsey
 *        Quarterly · Bain Insights). Converts qualitative SWOT into actionable
 *        moves. More premium than 2×2 SWOT alone · genuinely valuable to reader.
 *
 * @when  Use as alternative to SWOT 2×2 when analyst voice + strategic implications
 *        matter more than full bullet-list inventory. Pairs well w/ SWOT 2×2 below
 *        (SWOT inventory + TOWS strategy).
 *
 * @how   ```tsx
 *        <TowsCrosswalk
 *          so={{ title: 'Leverage', strategies: ['Move 1', 'Move 2'] }}
 *          st={{ title: 'Defend',   strategies: [...] }}
 *          wo={{ title: 'Improve',  strategies: [...] }}
 *          wt={{ title: 'Avoid',    strategies: [...] }}
 *        />
 *        ```
 */

import { useState } from 'react';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, ArrowUpRight, Shield, Wrench, Ban } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TowsStrategy {
  /** Strategy title · "Leverage" · "Defend" · "Improve" · "Avoid" */
  title: string;
  /** 2-4 strategic recommendation bullets */
  strategies: readonly string[];
}

export interface TowsCrosswalkProps {
  so: TowsStrategy; // Strength × Opportunity
  st: TowsStrategy; // Strength × Threat
  wo: TowsStrategy; // Weakness × Opportunity
  wt: TowsStrategy; // Weakness × Threat
  className?: string;
}

type CellKey = 'so' | 'st' | 'wo' | 'wt';

interface CellStyle {
  color: string;
  bgTint: string;
  bgHover: string;
  Icon: LucideIcon;
  rowLabel: string;
  colLabel: string;
  inputs: string; // e.g. "S × O"
}

// Color logic: cell blends row + col tone · SO=positive×positive (purple) ·
// WT=negative×negative (coral) · ST/WO mixed (periwinkle / black-600)
const STYLES: Record<CellKey, CellStyle> = {
  so: {
    color: '#9488ec',
    bgTint: 'rgba(148, 136, 236, 0.06)',
    bgHover: 'rgba(148, 136, 236, 0.12)',
    Icon: ArrowUpRight,
    rowLabel: 'Strengths',
    colLabel: 'Opportunities',
    inputs: 'S × O',
  },
  st: {
    color: '#7075c8',
    bgTint: 'rgba(112, 117, 200, 0.06)',
    bgHover: 'rgba(112, 117, 200, 0.12)',
    Icon: Shield,
    rowLabel: 'Strengths',
    colLabel: 'Threats',
    inputs: 'S × T',
  },
  wo: {
    color: '#525252',
    bgTint: 'rgba(0, 0, 0, 0.03)',
    bgHover: 'rgba(0, 0, 0, 0.06)',
    Icon: Wrench,
    rowLabel: 'Weaknesses',
    colLabel: 'Opportunities',
    inputs: 'W × O',
  },
  wt: {
    color: '#c46147',
    bgTint: 'rgba(196, 97, 71, 0.05)',
    bgHover: 'rgba(196, 97, 71, 0.10)',
    Icon: Ban,
    rowLabel: 'Weaknesses',
    colLabel: 'Threats',
    inputs: 'W × T',
  },
};

function Cell({
  data,
  styleKey,
  hovered,
  setHovered,
}: {
  data: TowsStrategy;
  styleKey: CellKey;
  hovered: CellKey | null;
  setHovered: (k: CellKey | null) => void;
}) {
  const style = STYLES[styleKey];
  const isHover = hovered === styleKey;

  return (
    <div
      onMouseEnter={() => setHovered(styleKey)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(styleKey)}
      onBlur={() => setHovered(null)}
      tabIndex={0}
      role="group"
      aria-label={`${data.title} · ${style.inputs}`}
      className="relative rounded-[var(--radius-sm,12px)] p-5 sm:p-6 transition-all duration-300 ease-out"
      style={{
        background: isHover ? style.bgHover : style.bgTint,
        transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHover
          ? `0 10px 28px -16px ${style.color}40, 0 4px 12px -8px rgba(0,0,0,0.06)`
          : '0 0 0 0 transparent',
        outline: 'none',
      }}
    >
      {/* Header: inputs pair (S × O) + title + icon */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <style.Icon size={16} className="flex-none" style={{ color: style.color }} aria-hidden="true" />
          <p
            className="font-body"
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--semantic-ink-strong)',
              letterSpacing: '-0.005em',
            }}
          >
            {data.title}
          </p>
        </div>
        <span
          className="font-body uppercase tracking-[0.14em] flex-none"
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: style.color,
            letterSpacing: '0.14em',
          }}
        >
          {style.inputs}
        </span>
      </div>

      {/* Strategy bullets */}
      <ul className="space-y-2">
        {data.strategies.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '13px', lineHeight: 1.55 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[7px]"
              style={{ width: '4px', height: '4px', background: style.color }}
            />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TowsCrosswalk({ so, st, wo, wt, className }: TowsCrosswalkProps) {
  const [hovered, setHovered] = useState<CellKey | null>(null);

  return (
    <div
      role="region"
      aria-label="TOWS crosswalk · strategic SWOT matrix"
      className={['w-full', className ?? ''].join(' ')}
    >
      {/* Column headers row · Opportunities | Threats · desktop only */}
      <div className="hidden md:grid grid-cols-[100px_1fr_1fr] gap-2 mb-2">
        <div /> {/* spacer for row labels col */}
        <div className="flex items-center gap-2 px-2">
          <TrendingUp size={13} className="flex-none" style={{ color: '#7075c8' }} aria-hidden="true" />
          <p
            className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-muted)]"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Opportunities
          </p>
        </div>
        <div className="flex items-center gap-2 px-2">
          <AlertTriangle size={13} className="flex-none" style={{ color: '#c46147' }} aria-hidden="true" />
          <p
            className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-muted)]"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            Threats
          </p>
        </div>
      </div>

      {/* Row 1 · Strengths × (O · T) */}
      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-2 mb-2">
        <div className="hidden md:flex flex-col justify-center px-2">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={13} className="flex-none" style={{ color: '#9488ec' }} aria-hidden="true" />
            <p
              className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-muted)]"
              style={{ fontSize: '10px', fontWeight: 600 }}
            >
              Strengths
            </p>
          </div>
        </div>
        <Cell data={so} styleKey="so" hovered={hovered} setHovered={setHovered} />
        <Cell data={st} styleKey="st" hovered={hovered} setHovered={setHovered} />
      </div>

      {/* Row 2 · Weaknesses × (O · T) */}
      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-2">
        <div className="hidden md:flex flex-col justify-center px-2">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={13} className="flex-none" style={{ color: '#525252' }} aria-hidden="true" />
            <p
              className="font-body uppercase tracking-[0.14em] text-[var(--semantic-ink-muted)]"
              style={{ fontSize: '10px', fontWeight: 600 }}
            >
              Weaknesses
            </p>
          </div>
        </div>
        <Cell data={wo} styleKey="wo" hovered={hovered} setHovered={setHovered} />
        <Cell data={wt} styleKey="wt" hovered={hovered} setHovered={setHovered} />
      </div>
    </div>
  );
}
