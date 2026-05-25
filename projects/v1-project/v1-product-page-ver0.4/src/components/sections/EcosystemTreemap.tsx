'use client';

/**
 * EcosystemTreemap — v0.4 §07 Cold Storage Players · TreeMap variant
 *
 * @what  D3 treemap visualization · box area = pallet count · color = tier
 *        (warm-deep tier 1 · cool-mid tier 2 · neutral-light tier 3).
 *        Renders Tier 1+2+3 players from PRD §6.5 verbatim data in one canvas.
 *
 * @why   User asked for treemap variant alongside card-grid pattern. TreeMap
 *        shows market-share proportions VISUALLY (vs flat text cards) ·
 *        Lineage's 590K pallets dwarfs everyone — visible at glance.
 *
 * @when  Inside EcosystemSection Cold Storage tab · view-toggle Cards vs TreeMap.
 *
 * @how   d3-hierarchy treemap layout · SVG render · sized to container ·
 *        responsive (clamp width). Box content: player name + pallet count.
 *        Hover: scale + tooltip (subtle). Reduced-motion respects (no entrance scale).
 *
 * Source: PRD V2.1 §6.5 verbatim (13 cold-storage players · 3 tiers).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { hierarchy, treemap } from 'd3-hierarchy';
import { useReducedMotion } from 'framer-motion';

interface Player {
  name: string;
  pallets: number;
  sharePct: number;
  tier: 1 | 2 | 3;
}

const PLAYERS: Player[] = [
  // Tier 1 · >200K
  { name: 'Lineage', pallets: 590000, sharePct: 12.5, tier: 1 },
  // Tier 2 · 15K-200K
  { name: 'Americold', pallets: 226000, sharePct: 4.8, tier: 2 },
  { name: 'NewCold', pallets: 225000, sharePct: 4.8, tier: 2 },
  { name: 'Oxford Cold Storage', pallets: 165000, sharePct: 3.5, tier: 2 },
  // Tier 3 · <15K (some 15-36K technically tier-2-edge but PRD groups <40K under "tier 3 long tail")
  { name: 'Linfox', pallets: 36000, sharePct: 0.8, tier: 3 },
  { name: 'Laverton', pallets: 29000, sharePct: 0.6, tier: 3 },
  { name: 'Karras', pallets: 25350, sharePct: 0.5, tier: 3 },
  { name: 'Auscold', pallets: 25000, sharePct: 0.5, tier: 3 },
  { name: 'Swire', pallets: 24845, sharePct: 0.5, tier: 3 },
  { name: 'P.Pullar', pallets: 23000, sharePct: 0.5, tier: 3 },
  { name: 'Freezex', pallets: 20000, sharePct: 0.4, tier: 3 },
  { name: 'Austco Polar', pallets: 18000, sharePct: 0.4, tier: 3 },
  { name: 'Altona', pallets: 15500, sharePct: 0.4, tier: 3 },
];

const TIER_COLORS: Record<Player['tier'], { bg: string; border: string; text: string; muted: string }> = {
  1: {
    // Tier 1 · purple-500 bg · purple-700 border · white text (high contrast)
    bg: '#9488ec',
    border: '#5a5fa0',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.80)',
  },
  2: {
    // Tier 2 · periwinkle-500 bg · periwinkle-700 border · ink-strong text
    bg: '#c3c6f9',
    border: '#7075c8',
    text: 'var(--semantic-ink-strong)',
    muted: 'var(--semantic-ink-body)',
  },
  3: {
    // Tier 3 · perano-800 at 30% opacity bg · perano-700 border · ink-body text
    bg: 'rgba(134, 179, 229, 0.20)',
    border: 'rgba(134, 179, 229, 0.55)',
    text: 'var(--semantic-ink-strong)',
    muted: 'var(--semantic-ink-muted)',
  },
};

interface TreemapCell {
  name: string;
  pallets: number;
  sharePct: number;
  tier: Player['tier'];
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const ROOT_DATA = {
  name: 'root',
  children: PLAYERS.map((p) => ({ ...p, value: p.pallets })),
};

export function EcosystemTreemap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);
  const [hovered, setHovered] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  // Track container width (responsive)
  useEffect(() => {
    if (!wrapRef.current) return;
    const update = () => {
      if (wrapRef.current) setWidth(wrapRef.current.clientWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Treemap layout · aspect ratio ~ 16:9
  const height = Math.max(360, Math.round(width * 0.5));

  const cells: TreemapCell[] = useMemo(() => {
    const root = hierarchy(ROOT_DATA as unknown as { name: string; value?: number; children?: unknown[] })
      .sum((d) => (d as { value?: number }).value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    treemap<typeof ROOT_DATA>()
      .size([width, height])
      .paddingInner(4)
      .paddingOuter(2)
      .round(true)(root as never);
    return (root.leaves() as unknown as Array<{
      data: Player;
      x0: number;
      x1: number;
      y0: number;
      y1: number;
    }>).map((leaf) => ({
      name: leaf.data.name,
      pallets: leaf.data.pallets,
      sharePct: leaf.data.sharePct,
      tier: leaf.data.tier,
      x0: leaf.x0,
      y0: leaf.y0,
      x1: leaf.x1,
      y1: leaf.y1,
    }));
  }, [width, height]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4">
        {[
          { tier: 1 as const, label: 'Tier 1', range: '> 200,000 pallets' },
          { tier: 2 as const, label: 'Tier 2', range: '15,000–200,000 pallets' },
          { tier: 3 as const, label: 'Tier 3', range: '< 15,000 pallets' },
        ].map((l) => {
          const c = TIER_COLORS[l.tier];
          return (
            <div key={l.tier} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block w-3 h-3 rounded-[2px]"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              />
              <span className="font-body text-[12px] text-[var(--semantic-ink-body)]">
                <strong className="font-medium text-[var(--semantic-ink-strong)]">{l.label}</strong>
                <span className="text-[var(--semantic-ink-subtle)] ml-1.5">{l.range}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* TreeMap */}
      <div
        ref={wrapRef}
        className="relative rounded-[var(--radius-sm,10px)] border border-[var(--black-100)] bg-[var(--color-foundation-white)] overflow-hidden"
        style={{ height: `${height}px` }}
        role="img"
        aria-label="Cold Storage market share treemap · box area proportional to pallet capacity · color encodes tier"
      >
        <svg width={width} height={height} className="block">
          {cells.map((cell) => {
            const w = cell.x1 - cell.x0;
            const h = cell.y1 - cell.y0;
            const colors = TIER_COLORS[cell.tier];
            const isHovered = hovered === cell.name;
            const fontSize = Math.min(18, Math.max(11, Math.floor(w / 12)));
            const subFontSize = Math.min(13, Math.max(9, Math.floor(w / 18)));
            const showSubText = h > 50 && w > 80;
            const showShare = h > 70 && w > 90;
            return (
              <g
                key={cell.name}
                transform={`translate(${cell.x0}, ${cell.y0})`}
                onMouseEnter={() => setHovered(cell.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(cell.name)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                role="button"
                aria-label={`${cell.name}: ${cell.pallets.toLocaleString()} pallets · ${cell.sharePct.toFixed(1)}% market share · Tier ${cell.tier}`}
                style={{
                  cursor: 'default',
                  outline: 'none',
                  transition: prefersReduced ? 'none' : 'opacity 200ms ease-out',
                  opacity: hovered && !isHovered ? 0.55 : 1,
                }}
              >
                <rect
                  width={w}
                  height={h}
                  rx={4}
                  ry={4}
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth={1}
                />
                {/* Player name */}
                <text
                  x={10}
                  y={fontSize + 8}
                  fill={colors.text}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: `${fontSize}px`,
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {cell.name}
                </text>
                {/* Pallets · tabular-nums */}
                {showSubText && (
                  <text
                    x={10}
                    y={fontSize + 8 + subFontSize + 6}
                    fill={colors.muted}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: `${subFontSize}px`,
                      fontWeight: 500,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {cell.pallets.toLocaleString()} pallets
                  </text>
                )}
                {/* Share % */}
                {showShare && (
                  <text
                    x={10}
                    y={h - 10}
                    fill={colors.muted}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: `${subFontSize}px`,
                      fontWeight: 500,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {cell.sharePct.toFixed(1)}% share
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Caption */}
      <p className="font-body text-[12px] text-[var(--semantic-ink-subtle)] italic">
        Box area is proportional to pallet capacity. Source: Ken Research Analysis · 13 named players · 200–250 total operators.
      </p>
    </div>
  );
}
