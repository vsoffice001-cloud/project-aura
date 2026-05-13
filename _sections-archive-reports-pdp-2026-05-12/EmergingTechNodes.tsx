'use client';

/**
 * EmergingTechNodes — Row 24 — Recipe report-detail.md line 65
 * bg: warm-300 · spacing: lg · motion: Framer node stagger 80ms
 * 4-tile constellation grid — 2×2 desktop · 1-col mobile
 * Each tile: icon · h3 · description · adoption Badge · time-horizon Badge
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Wifi, Link, TrendingUp, type LucideIcon } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { NodesModule } from '@/types/schema';

const ICON_MAP: Record<string, LucideIcon> = {
  Bot,
  Wifi,
  Link,
  TrendingUp,
  Cpu: TrendingUp,
  Activity: TrendingUp,
};

const ADOPTION_FROM_EXAMPLE: Record<number, { adoption: string; horizon: string }> = {
  0: { adoption: 'Scaling', horizon: 'Near-term (1-2 yr)' },
  1: { adoption: 'Mature', horizon: 'Now' },
  2: { adoption: 'Emerging', horizon: 'Mid-term (2-4 yr)' },
  3: { adoption: 'Scaling', horizon: 'Near-term (1-2 yr)' },
};

interface Props {
  tech: NodesModule | null;
}

interface TechTileProps {
  node: NodesModule['nodes'][number];
  index: number;
  prefersReduced: boolean | null;
}

function TechTile({ node, index, prefersReduced }: TechTileProps) {
  const Icon = node.icon ? (ICON_MAP[node.icon] ?? TrendingUp) : TrendingUp;
  const meta = ADOPTION_FROM_EXAMPLE[index] ?? { adoption: 'Emerging', horizon: 'Mid-term (2-4 yr)' };

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card variant="white" padding="md" className="h-full flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--color-ramp-periwinkle-200)' }}
            aria-hidden="true"
          >
            <Icon
              size={20}
              style={{ color: 'var(--color-ramp-periwinkle-700, #4338ca)' }}
            />
          </div>
          <h3
            className="font-[var(--typography-family-display)] font-semibold leading-snug"
            style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-black)' }}
          >
            {node.label}
          </h3>
        </div>

        <p
          className="leading-relaxed"
          style={{ fontSize: 'var(--typography-size-sm)', color: 'var(--color-neutral-700, #374151)' }}
        >
          {node.body}
        </p>

        {node.exampleCompanies && node.exampleCompanies.length > 0 && (
          <p
            className="italic"
            style={{ fontSize: 'var(--typography-size-xs)', color: 'var(--color-neutral-500, #6b7280)' }}
          >
            e.g. {node.exampleCompanies.join(', ')}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Badge theme="purple">{meta.adoption}</Badge>
          <Badge theme="neutral">{meta.horizon}</Badge>
        </div>
      </Card>
    </motion.div>
  );
}

export function EmergingTechNodes({ tech }: Props) {
  const prefersReduced = useReducedMotion();

  if (!tech || tech.nodes.length === 0) return null;

  const tiles = tech.nodes.slice(0, 8);

  return (
    <SectionWrapper background="warm" spacing="lg" id="sec-emerging-tech">
      <SectionLabel>Technology</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-6">
        {tech.heading ?? 'Emerging Technological Advancements'}
      </SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {tiles.map((node, i) => (
          <TechTile
            key={node.id}
            node={node}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
