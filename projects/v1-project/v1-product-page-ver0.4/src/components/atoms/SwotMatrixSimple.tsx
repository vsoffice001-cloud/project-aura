'use client';

/**
 * SwotMatrixSimple · variant B · refs canonical 2×2 tinted bg + icons.
 *
 * @what  Simple 2×2 grid · tinted bg per quadrant · icon + eyebrow + bullets.
 *        NO center donut · NO false-precision viz · pure refs canonical
 *        (McKinsey/Bain/PwC SWOT pattern).
 *
 * @why   Honest refs alignment · SWOT is qualitative narrative · should not
 *        add decorative center viz. This variant matches industry-canonical
 *        consulting deliverable layout · scales infinitely (more bullets =
 *        taller quadrant · no donut blocking center).
 *
 * @when  Default SWOT presentation when no scoring data exists. Prefer over
 *        SwotMatrix (donut variant) for premium B2B research aesthetic.
 *
 * @how   ```tsx
 *        <SwotMatrixSimple strengths={…} weaknesses={…} opportunities={…} threats={…} />
 *        ```
 *
 * Color discipline (per COLOR-USAGE-GUIDE.md §3):
 * - Strengths     = purple-500    #9488ec
 * - Opportunities = periwinkle-800 #7075c8
 * - Weaknesses    = black-600     #525252 (neutral · NOT brand-red)
 * - Threats       = coral-700     #c46147
 */

import { useState } from 'react';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, type LucideIcon } from 'lucide-react';

interface QuadrantData {
  label: string;
  points: readonly string[];
}

export interface SwotMatrixSimpleProps {
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
      <div className="flex items-center gap-2 mb-3">
        <style.Icon size={16} className="flex-none" style={{ color: style.color }} aria-hidden="true" />
        <p
          className="font-body uppercase tracking-[0.14em]"
          style={{ fontSize: '11px', fontWeight: 700, color: style.color }}
        >
          {data.label}
        </p>
      </div>
      <ul className="space-y-2">
        {data.points.map((p, i) => (
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
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SwotMatrixSimple({ strengths, weaknesses, opportunities, threats, className }: SwotMatrixSimpleProps) {
  const [hovered, setHovered] = useState<QuadrantKey | null>(null);
  return (
    <div
      role="region"
      aria-label="SWOT analysis · simple 2x2 grid"
      className={['grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5', className ?? ''].join(' ')}
    >
      <Quadrant data={strengths}     styleKey="strengths"     hovered={hovered} setHovered={setHovered} />
      <Quadrant data={weaknesses}    styleKey="weaknesses"    hovered={hovered} setHovered={setHovered} />
      <Quadrant data={opportunities} styleKey="opportunities" hovered={hovered} setHovered={setHovered} />
      <Quadrant data={threats}       styleKey="threats"       hovered={hovered} setHovered={setHovered} />
    </div>
  );
}
