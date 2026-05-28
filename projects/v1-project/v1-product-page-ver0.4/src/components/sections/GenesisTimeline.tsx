'use client';

/**
 * GenesisTimeline — v0.4 port from v0.3 (verbatim · inline type)
 *
 * @what  Horizontal timeline (desktop md+) / vertical stack (mobile) showing market
 *        genesis milestones — year + label + 1-line description + connecting line.
 * @why   PRD V2 §15 · "Market Genesis" visual anchor for §04 Market Overview tab.
 *        User 2026-05-20 brief B3: port v0.3 AS-IS · color polish (red → neutral) preserved.
 * @where Inside MarketOverviewGenesisSection (Genesis tab).
 * @when  Renders when milestones array ≥ 2 items.
 * @how   Desktop horizontal · mobile vertical stack · Framer stagger · useReducedMotion gate.
 *
 * Ported 2026-05-21 from v0.3 src/components/sections/GenesisTimeline.tsx.
 * Schema type inlined (no @/data dependency in v0.4).
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface GenesisMilestone {
  year: string | number;
  label: string;
  description: string;
}

interface GenesisTimelineProps {
  milestones: GenesisMilestone[];
}

// S4 2026-05-22 · terminal dots (first + last) = brand-red · mid = subtle gray
const NODE_ENDPOINT_COLOR = 'var(--color-brand-red, #b01f24)';
const NODE_MID_COLOR = 'rgba(0,0,0,0.2)';
// Hairline synced to mid-dot color for visual consistency
const HAIRLINE_COLOR = 'rgba(0,0,0,0.12)';

export function GenesisTimeline({ milestones }: GenesisTimelineProps) {
  const prefersReduced = useReducedMotion() ?? false;
  // S4 · hover state: track which column index is hovered (-1 = none)
  const [hoveredIdx, setHoveredIdx] = useState<number>(-1);

  if (!milestones || milestones.length < 2) return null;

  return (
    <div data-component="GenesisTimeline">
      {/* ── Desktop: horizontal timeline (md+) ── */}
      <div className="genesis-desktop hidden md:block relative">
        <div
          aria-hidden="true"
          className="absolute top-5 left-5 right-5 h-px z-0"
          style={{ background: HAIRLINE_COLOR }}
        />
        <div className="flex items-start gap-0">
          {milestones.map((m, i) => {
            const isTerminal = i === 0 || i === milestones.length - 1;
            // S4 · hover dim: if any column is hovered, non-hovered columns go to 0.35 opacity
            const isFaded = hoveredIdx !== -1 && hoveredIdx !== i;
            return (
              <motion.div
                key={i}
                initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: prefersReduced ? 0 : i * 0.07 }}
                className="timeline-col flex-1 flex flex-col items-center text-center px-2 relative z-10"
                style={{
                  opacity: isFaded ? 0.35 : 1,
                  transition: prefersReduced ? 'none' : 'opacity 200ms ease-out',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                <div
                  aria-hidden="true"
                  className="rounded-full mb-3 shrink-0"
                  style={{
                    width: isTerminal ? '8px' : '6px',
                    height: isTerminal ? '8px' : '6px',
                    background: isTerminal ? NODE_ENDPOINT_COLOR : NODE_MID_COLOR,
                    border: '2px solid var(--color-foundation-white, #ffffff)',
                    boxShadow: isTerminal
                      ? '0 0 0 1px rgba(176,31,36,0.25)'
                      : '0 0 0 1px rgba(0,0,0,0.12)',
                  }}
                />
                {/* Year · ink-muted · G.13.1 unit/micro-label role */}
                <span
                  className="font-display font-light tracking-[0.04em] block mb-0.5"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--semantic-ink-muted)',
                    fontVariantNumeric: 'tabular-nums lining-nums',
                  }}
                >
                  {m.year}
                </span>
                {/* Title · ink-strong · 14-15px DM Sans 500 */}
                <span
                  className="font-body block mb-1 leading-snug"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--semantic-ink-strong)',
                  }}
                >
                  {m.label}
                </span>
                {/* Body · S4 · 13px DM Sans · ink-muted (softer than title) */}
                <span
                  className="font-body leading-relaxed"
                  style={{
                    fontSize: '13px',
                    color: 'var(--semantic-ink-muted)',
                  }}
                >
                  {m.description}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: vertical stack (< md) ── */}
      <div className="genesis-mobile flex flex-col relative md:hidden">
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[9px] w-px"
          style={{ background: HAIRLINE_COLOR }}
        />
        {milestones.map((m, i) => {
          const isTerminal = i === 0 || i === milestones.length - 1;
          return (
            <motion.div
              key={i}
              initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: prefersReduced ? 0 : i * 0.05 }}
              className={`flex items-start gap-4 relative ${i < milestones.length - 1 ? 'pb-5' : ''}`}
            >
              <div
                aria-hidden="true"
                className="rounded-full shrink-0 mt-0.5 z-10 relative"
                style={{
                  width: isTerminal ? '10px' : '8px',
                  height: isTerminal ? '10px' : '8px',
                  background: isTerminal ? NODE_ENDPOINT_COLOR : NODE_MID_COLOR,
                  border: '2px solid var(--color-foundation-white, #ffffff)',
                  boxShadow: isTerminal
                    ? '0 0 0 1px rgba(176,31,36,0.25)'
                    : '0 0 0 1px rgba(0,0,0,0.12)',
                }}
              />
              <div>
                <span
                  className="font-body tracking-[0.04em] block mb-0.5"
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--semantic-ink-muted)',
                    fontVariantNumeric: 'tabular-nums lining-nums',
                  }}
                >
                  {m.year}
                </span>
                {/* Title · ink-strong · 14px 500 */}
                <span
                  className="font-body block mb-0.5 leading-snug"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--semantic-ink-strong)',
                  }}
                >
                  {m.label}
                </span>
                {/* Body · S4 · 13px DM Sans · ink-muted */}
                <span
                  className="font-body leading-relaxed"
                  style={{
                    fontSize: '13px',
                    color: 'var(--semantic-ink-muted)',
                  }}
                >
                  {m.description}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
