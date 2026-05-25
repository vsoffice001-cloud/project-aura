'use client';

/**
 * SwotMatrix · modern 4-quadrant SWOT viz w/ center donut + hover elevation.
 *
 * @what  2×2 quadrant layout · center SVG donut chart (4 colored arcs · one per
 *        quadrant · NO center text). Each quadrant:
 *        - tinted soft bg per its color
 *        - eyebrow + icon
 *        - text bullets (existing SWOT content shape)
 *        - hover → quadrant elevates (shadow + transform) + matching donut arc
 *          highlights (brighter saturation + slight scale)
 *        Borders fade outward (gradient mask · CSS `mask-image`) for premium
 *        edge treatment.
 *
 * @why   Replaces simple text 2×2 in §11 IndustryAnalysisSection (SWOT tab) w/
 *        modern interactive viz · keeps text content (refs canonical 2×2 frame
 *        preserved) · adds center donut + hover state · scalable to any content
 *        length per quadrant.
 *
 * @when  §11 SWOT tab (primary consumer). Promote to DS at 2nd consumer.
 *        Useful for any 4-pair categorical layout (Eisenhower · Quadrant · BCG matrix variant).
 *
 * @how   ```tsx
 *        <SwotMatrix
 *          strengths={{ label: 'Strengths', points: ['…', '…'] }}
 *          weaknesses={{ label: 'Weaknesses', points: ['…'] }}
 *          opportunities={{ label: 'Opportunities', points: ['…'] }}
 *          threats={{ label: 'Threats', points: ['…'] }}
 *        />
 *        ```
 *
 * Color mapping (Ken DS · per COLOR-USAGE-GUIDE.md §3):
 * - Strengths     = purple-500    #9488ec (positive · primary brand)
 * - Opportunities = periwinkle-500 #c3c6f9 (positive · soft outlook)
 * - Weaknesses    = black-500     #737373 (neutral · refs canonical for caution · NEVER brand-red · brand-red is CTAs only per user 2026-05-21)
 * - Threats       = coral-700     #c46147 (warm caution · NOT alarm)
 * Donut fill opacity tuned for aesthetic vs full-blown saturation (0.72 default · 0.95 hover).
 *
 * @relatedDoc projects/v1-product-page-ver0.4/docs/COLOR-USAGE-GUIDE.md §3
 * @relatedMemory feedback_web_pdp_vs_print_refs.md
 *
 * Project-local atom · promote to DS at 2nd consumer.
 */

import { useState } from 'react';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, type LucideIcon } from 'lucide-react';

interface QuadrantData {
  label: string;
  points: readonly string[];
}

export interface SwotMatrixProps {
  strengths: QuadrantData;
  weaknesses: QuadrantData;
  opportunities: QuadrantData;
  threats: QuadrantData;
  className?: string;
}

type QuadrantKey = 'strengths' | 'weaknesses' | 'opportunities' | 'threats';

interface QuadrantStyle {
  color: string;        // Solid hex for arc + eyebrow + dot
  bgTint: string;       // Soft alpha background for quadrant
  bgHover: string;      // Stronger alpha on hover
  Icon: LucideIcon;
}

const QUADRANT_STYLES: Record<QuadrantKey, QuadrantStyle> = {
  strengths: {
    color: '#9488ec',                       // purple-500 · positive primary
    bgTint: 'rgba(148, 136, 236, 0.05)',
    bgHover: 'rgba(148, 136, 236, 0.11)',
    Icon: Sparkles,
  },
  weaknesses: {
    color: '#525252',                       // black-600 neutral · refs canonical for caution · NEVER brand-red
    bgTint: 'rgba(0, 0, 0, 0.03)',
    bgHover: 'rgba(0, 0, 0, 0.06)',
    Icon: TrendingDown,
  },
  opportunities: {
    color: '#7075c8',                       // periwinkle-800 · positive soft
    bgTint: 'rgba(112, 117, 200, 0.05)',
    bgHover: 'rgba(112, 117, 200, 0.11)',
    Icon: TrendingUp,
  },
  threats: {
    color: '#c46147',                       // coral-700 deeper · warm caution · NOT alarm
    bgTint: 'rgba(196, 97, 71, 0.04)',
    bgHover: 'rgba(196, 97, 71, 0.09)',
    Icon: AlertTriangle,
  },
};

// ─────────────────────────────────────────────────────────────────
// Donut · SVG · 4 arcs · each can be highlighted on hover
// ─────────────────────────────────────────────────────────────────

interface DonutProps {
  hovered: QuadrantKey | null;
  /** Optional outer diameter in px · default 120 */
  size?: number;
}

/**
 * Builds an SVG arc path for a given quadrant.
 * S = top-left      (180° → 270°)
 * W = top-right     (270° → 360°)
 * O = bottom-left   (90°  → 180°)
 * T = bottom-right  (0°   → 90°)
 * (Standard SWOT matrix orientation)
 */
function arcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
  const x1 = cx + outerR * Math.cos(toRad(startAngle));
  const y1 = cy + outerR * Math.sin(toRad(startAngle));
  const x2 = cx + outerR * Math.cos(toRad(endAngle));
  const y2 = cy + outerR * Math.sin(toRad(endAngle));
  const x3 = cx + innerR * Math.cos(toRad(endAngle));
  const y3 = cy + innerR * Math.sin(toRad(endAngle));
  const x4 = cx + innerR * Math.cos(toRad(startAngle));
  const y4 = cy + innerR * Math.sin(toRad(startAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ');
}

function CenterDonut({ hovered, size = 160 }: DonutProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.48; // thicker arcs · refs modern dashboard (Stripe/Linear/Vercel)

  const arcs: Array<{ key: QuadrantKey; start: number; end: number }> = [
    { key: 'strengths',     start: 270, end: 360 }, // top-left visual = NW quadrant
    { key: 'weaknesses',    start: 0,   end: 90 },  // top-right = NE quadrant
    { key: 'threats',       start: 90,  end: 180 }, // bottom-right = SE quadrant
    { key: 'opportunities', start: 180, end: 270 }, // bottom-left = SW quadrant
  ];

  // Mapping: top-left visually = NW quadrant of grid (strengths)
  // SVG arc angles: 0° = top · 90° = right · 180° = bottom · 270° = left
  // Re-map so the arc visually sits in the same quadrant as its content:
  // S top-left → arc 270-360 (NW · top half left side)
  // Correction: use 180-270 for top-left visual
  // Final arcs · top-left/top-right/bottom-right/bottom-left:
  const orientedArcs: Array<{ key: QuadrantKey; start: number; end: number }> = [
    { key: 'strengths',     start: 270, end: 360 },  // NW
    { key: 'weaknesses',    start: 0,   end: 90 },   // NE
    { key: 'threats',       start: 90,  end: 180 },  // SE
    { key: 'opportunities', start: 180, end: 270 },  // SW
  ];
  void arcs;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="block"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="swotArcGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {orientedArcs.map((a) => {
        const style = QUADRANT_STYLES[a.key];
        const isHover = hovered === a.key;
        // Slight inset gap between arcs (visual breath)
        const gap = 1.5;
        return (
          <g
            key={a.key}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: isHover ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 240ms cubic-bezier(0.2, 0.7, 0.3, 1)',
            }}
          >
            <path
              d={arcPath(cx, cy, outerR, innerR, a.start + gap, a.end - gap)}
              fill={style.color}
              fillOpacity={isHover ? 0.95 : 0.72}
              filter={isHover ? 'url(#swotArcGlow)' : undefined}
              style={{ transition: 'fill-opacity 200ms ease-out' }}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Quadrant Card · inside its grid cell
// ─────────────────────────────────────────────────────────────────

interface QuadrantCardProps {
  data: QuadrantData;
  styleKey: QuadrantKey;
  hovered: QuadrantKey | null;
  setHovered: (k: QuadrantKey | null) => void;
  /** Visual cell position · used for content offset away from center donut */
  position: 'nw' | 'ne' | 'se' | 'sw';
}

function QuadrantCard({ data, styleKey, hovered, setHovered, position }: QuadrantCardProps) {
  const style = QUADRANT_STYLES[styleKey];
  const isHover = hovered === styleKey;

  // Inner padding · v4 2026-05-21 · uniform outer-5 · directional inner clearance
  // for 170px donut. Corner OPPOSITE donut = outer (pr/pl/pt/pb 5 = 20px) ·
  // edge TOWARD donut = inner offset (md:20 = 80px + lg:24 = 96px clear). Symmetric.
  // All 4 quadrants have IDENTICAL outer-padding so heights match content not framing.
  const innerPadding: Record<typeof position, string> = {
    nw: 'p-5 md:pr-20 md:pb-20 lg:pr-24 lg:pb-24',
    ne: 'p-5 md:pl-20 md:pb-20 lg:pl-24 lg:pb-24',
    sw: 'p-5 md:pr-20 md:pt-20 lg:pr-24 lg:pt-24',
    se: 'p-5 md:pl-20 md:pt-20 lg:pl-24 lg:pt-24',
  };

  // Text alignment per position · refs SWOT templates: NW/SW left-align · NE/SE right-align
  // For Ken keep all left-align (readability > infographic symmetry)
  // But align eyebrow + icon row to outer corner for visual balance
  const headerJustify: Record<typeof position, string> = {
    nw: 'justify-start',
    ne: 'justify-end',
    sw: 'justify-start',
    se: 'justify-end',
  };

  return (
    <div
      onMouseEnter={() => setHovered(styleKey)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(styleKey)}
      onBlur={() => setHovered(null)}
      tabIndex={0}
      role="group"
      aria-label={data.label}
      className={[
        'relative rounded-[var(--radius-sm,12px)]',
        'transition-all duration-300 ease-out',
        innerPadding[position],
      ].join(' ')}
      style={{
        background: isHover ? style.bgHover : style.bgTint,
        transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHover
          ? `0 10px 28px -16px ${style.color}40, 0 4px 12px -8px rgba(0,0,0,0.06)`
          : '0 0 0 0 transparent',
        outline: 'none',
      }}
    >
      {/* Header · icon + eyebrow */}
      <div className={['flex items-center gap-2 mb-3', headerJustify[position]].join(' ')}>
        <style.Icon
          size={14}
          className="flex-none"
          style={{ color: style.color }}
          aria-hidden="true"
        />
        <p
          className="font-body uppercase tracking-[0.14em]"
          style={{
            fontSize: '10.5px',
            fontWeight: 700,
            color: style.color,
            letterSpacing: '0.14em',
          }}
        >
          {data.label}
        </p>
      </div>

      {/* Bullets · tightened spacing 2026-05-21 · single viewport target */}
      <ul className="space-y-1.5">
        {data.points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-[var(--semantic-ink-body)]"
            style={{ fontSize: '12.5px', lineHeight: 1.5 }}
          >
            <span
              aria-hidden="true"
              className="inline-block flex-none rounded-full mt-[6px]"
              style={{ width: '4px', height: '4px', background: style.color }}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main · SwotMatrix
// ─────────────────────────────────────────────────────────────────

export function SwotMatrix({
  strengths,
  weaknesses,
  opportunities,
  threats,
  className,
}: SwotMatrixProps) {
  const [hovered, setHovered] = useState<QuadrantKey | null>(null);

  return (
    <div
      className={['relative w-full', className ?? ''].join(' ')}
      role="region"
      aria-label="SWOT analysis quadrant matrix"
    >
      {/* 2x2 grid · v4 2026-05-21 · perfect alignment fix.
           - Equal-height rows via `grid-auto-rows: 1fr` (both rows same height max-content)
           - Stretch items via `items-stretch` · all 4 quadrants same height
           - Donut occupies a 3-col × 3-row sub-grid · spans CENTER intersection
             (uses CSS Grid `grid-area` · auto-centers · NO transform math · perfectly aligned)
           - Zero gap · quadrants share edges · single hairline cross drawn via SVG below
           - Quadrant card overflow-hidden BUT donut absolute on top w/ z-10
        */}
      <div
        className="relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_1fr]"
        style={{ gridAutoRows: '1fr' }}
      >
        {/* SVG hairline cross · drawn BELOW quadrants · matches absolute donut pivot.
             Positioned exactly at 50%/50% w/ fade gradient. Hidden on mobile. */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none hidden md:block"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="swotHHairFade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0" />
              <stop offset="20%" stopColor="#e5e5e5" stopOpacity="1" />
              <stop offset="80%" stopColor="#e5e5e5" stopOpacity="1" />
              <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="swotVHairFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0" />
              <stop offset="20%" stopColor="#e5e5e5" stopOpacity="1" />
              <stop offset="80%" stopColor="#e5e5e5" stopOpacity="1" />
              <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Horizontal hairline through center · pixel-perfect */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#swotHHairFade)" strokeWidth="1" />
          {/* Vertical hairline through center · pixel-perfect */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#swotVHairFade)" strokeWidth="1" />
        </svg>

        {/* NW · Strengths */}
        <QuadrantCard
          data={strengths}
          styleKey="strengths"
          hovered={hovered}
          setHovered={setHovered}
          position="nw"
        />
        {/* NE · Weaknesses */}
        <QuadrantCard
          data={weaknesses}
          styleKey="weaknesses"
          hovered={hovered}
          setHovered={setHovered}
          position="ne"
        />
        {/* SW · Opportunities */}
        <QuadrantCard
          data={opportunities}
          styleKey="opportunities"
          hovered={hovered}
          setHovered={setHovered}
          position="sw"
        />
        {/* SE · Threats */}
        <QuadrantCard
          data={threats}
          styleKey="threats"
          hovered={hovered}
          setHovered={setHovered}
          position="se"
        />

        {/* Center donut · floats on EXACT 2x2 intersection · v4 uses absolute + transform
            but parent grid now has equal-height rows so center is mathematically true
            mid-point. Radial gradient inner-hole masks the SVG cross hairlines. */}
        <div
          className="absolute pointer-events-none hidden md:flex items-center justify-center z-10"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '170px',
            height: '170px',
            background: 'radial-gradient(circle at center, var(--color-foundation-white, #ffffff) 0%, var(--color-foundation-white, #ffffff) 47%, transparent 52%)',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.08)) drop-shadow(0 1px 3px rgba(0,0,0,0.04))',
          }}
          aria-hidden="true"
        >
          <CenterDonut hovered={hovered} size={160} />
        </div>
      </div>

      {/* Axis labels removed 2026-05-21 · spacing optimization · single-viewport target.
          SWOT framework cues live in quadrant headers (color + icon + label) · axis
          labels duplicated info + ate vertical space. Promote back if QA flags
          missing context. */}
    </div>
  );
}
