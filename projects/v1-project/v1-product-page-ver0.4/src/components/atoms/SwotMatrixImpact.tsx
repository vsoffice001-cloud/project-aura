'use client';

/**
 * SwotMatrixImpact · variant C · 2×2 + per-bullet impact pills.
 *
 * @what  2×2 quadrant grid · each bullet point carries an inline HIGH/MED/LOW
 *        pill indicating impact tier. Hover quadrant elevates · impact pills
 *        are color-coded but neutral (not brand-red · per COLOR-USAGE-GUIDE).
 *
 * @why   Refs canonical adds lightweight viz to text · honest scoring (3-tier ·
 *        not false-precision numeric). Reader scans impact ranking inside text
 *        narrative · adds analyst voice w/o decorative chart. Industry pattern
 *        seen in IBISWorld driver lists + McKinsey impact callouts.
 *
 * @when  Use when impact ranking is defensible from underlying data (PRD anchor ·
 *        Ken Primary survey). Skip when all bullets are equal-weight qualitative.
 *
 * @how   ```tsx
 *        <SwotMatrixImpact
 *          strengths={{
 *            label: 'Strengths',
 *            points: [
 *              { text: 'Geographic moat', impact: 'high' },
 *              { text: 'Tier-1 share', impact: 'medium' },
 *            ],
 *          }}
 *          ...
 *        />
 *        ```
 */

import { useState } from 'react';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, type LucideIcon } from 'lucide-react';

export type ImpactTier = 'high' | 'medium' | 'low';

export interface ImpactPoint {
  text: string;
  impact: ImpactTier;
}

interface QuadrantData {
  label: string;
  points: readonly ImpactPoint[];
}

export interface SwotMatrixImpactProps {
  strengths: QuadrantData;
  weaknesses: QuadrantData;
  opportunities: QuadrantData;
  threats: QuadrantData;
  className?: string;
}

type QuadrantKey = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

interface QuadrantStyle {
  color: string;
  bgTint: string;
  bgHover: string;
  Icon: LucideIcon;
}

const STYLES: Record<QuadrantKey, QuadrantStyle> = {
  strengths: {
    color: '#9488ec',
    bgTint: 'rgba(148, 136, 236, 0.05)',
    bgHover: 'rgba(148, 136, 236, 0.10)',
    Icon: Sparkles,
  },
  weaknesses: {
    color: '#525252',
    bgTint: 'rgba(0, 0, 0, 0.03)',
    bgHover: 'rgba(0, 0, 0, 0.06)',
    Icon: TrendingDown,
  },
  opportunities: {
    color: '#7075c8',
    bgTint: 'rgba(112, 117, 200, 0.05)',
    bgHover: 'rgba(112, 117, 200, 0.10)',
    Icon: TrendingUp,
  },
  threats: {
    color: '#c46147',
    bgTint: 'rgba(196, 97, 71, 0.04)',
    bgHover: 'rgba(196, 97, 71, 0.09)',
    Icon: AlertTriangle,
  },
};

// Impact tier visual treatment · neutral by design · 3-step opacity scale on dots
const IMPACT_META: Record<ImpactTier, { label: string; filled: number }> = {
  high:   { label: 'HIGH',   filled: 3 },
  medium: { label: 'MED',    filled: 2 },
  low:    { label: 'LOW',    filled: 1 },
};

function ImpactPill({ tier, accentColor }: { tier: ImpactTier; accentColor: string }) {
  const meta = IMPACT_META[tier];
  // 3-segment dot pill · filled dots count = tier strength
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 flex-none"
      style={{
        background: 'var(--color-foundation-white, #ffffff)',
        border: '1px solid var(--black-100, #f5f5f5)',
      }}
      aria-label={`Impact ${meta.label}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block rounded-full"
          style={{
            width: '4px',
            height: '4px',
            background: i < meta.filled ? accentColor : 'var(--black-200, #e5e5e5)',
          }}
        />
      ))}
      <span
        className="font-body uppercase tracking-[0.08em] ml-0.5"
        style={{
          fontSize: '8.5px',
          fontWeight: 700,
          color: 'var(--semantic-ink-muted)',
          letterSpacing: '0.08em',
        }}
      >
        {meta.label}
      </span>
    </span>
  );
}

function Quadrant({
  data,
  styleKey,
  hovered,
  setHovered,
}: {
  data: QuadrantData;
  styleKey: QuadrantKey;
  hovered: QuadrantKey | null;
  setHovered: (k: QuadrantKey | null) => void;
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
      aria-label={data.label}
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
      <div className="flex items-center gap-2 mb-3.5">
        <style.Icon size={16} className="flex-none" style={{ color: style.color }} aria-hidden="true" />
        <p
          className="font-body uppercase tracking-[0.14em]"
          style={{ fontSize: '11px', fontWeight: 700, color: style.color }}
        >
          {data.label}
        </p>
      </div>
      <ul className="space-y-3">
        {data.points.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '13px', lineHeight: 1.55 }}
          >
            <ImpactPill tier={p.impact} accentColor={style.color} />
            <span className="min-w-0">{p.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SwotMatrixImpact({ strengths, weaknesses, opportunities, threats, className }: SwotMatrixImpactProps) {
  const [hovered, setHovered] = useState<QuadrantKey | null>(null);
  return (
    <div
      role="region"
      aria-label="SWOT analysis · 2x2 + per-bullet impact pills"
      className={['grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5', className ?? ''].join(' ')}
    >
      <Quadrant data={strengths}     styleKey="strengths"     hovered={hovered} setHovered={setHovered} />
      <Quadrant data={weaknesses}    styleKey="weaknesses"    hovered={hovered} setHovered={setHovered} />
      <Quadrant data={opportunities} styleKey="opportunities" hovered={hovered} setHovered={setHovered} />
      <Quadrant data={threats}       styleKey="threats"       hovered={hovered} setHovered={setHovered} />
    </div>
  );
}
