'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: tech name (text-xl font-display — icon + name in card header is visual anchor; maturity badge follows)
 * Type rhythm: xl/sm/base/xs — tech name = text-xl · maturity badge = text-xs · description = text-sm · impact = text-sm · accent dot color = accent-purple per research pillar
 * Motion: node stagger 100ms (whileInView · once · opacity 0→1 + y 16→0 per card)
 *   — useReducedMotion disables stagger; all nodes render at final state
 * Depth: borders + accent dot — Card with 1px border-subtle + accent left-border (3px solid accentVar) to differentiate tech maturity tier
 * Mobile: 1-col stack · 2-col sm · 4-col lg · stack column default
 */

/**
 * EmergingTechNodes — 4-tile technology constellation (recipe row 25)
 *
 * Variant: editorial-light
 * Background: warm · spacing: lg (LOCK 3)
 * STANDALONE section — has own SectionWrapper
 *
 * Layout: 4-tile grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 constellation
 * Public: all tech names + descriptions visible
 *
 * A11y: <ul> <li> semantic · if SVG: <title> + <desc> · text labels as HTML
 * useReducedMotion mandatory · node stagger
 * TODO: promote to DS molecule after sprint
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Wifi, Link2, TrendingUp, Cpu, Globe } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Badge,
  Card,
} from '@kenresearch/design-system/atoms';
import type { NodesModule } from '@/types/schema';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EmergingTechNodesProps {
  techs: NodesModule;
}

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  Bot,
  Wifi,
  Link: Link2,
  TrendingUp,
  Cpu,
  Globe,
};

function TechIcon({ icon, size = 24 }: { icon?: string; size?: number }) {
  const Icon = icon ? (ICON_MAP[icon] ?? Cpu) : Cpu;
  return <Icon size={size} aria-hidden />;
}

// ─── Adoption stage badge ─────────────────────────────────────────────────────

// DS Badge: theme for color, variant for shape
const ADOPTION_BADGE_THEME: Record<string, 'neutral' | 'muted' | 'brand'> = {
  emerging: 'neutral',
  growing: 'muted',
  mature: 'brand',
};

// ─── Single tech node ─────────────────────────────────────────────────────────

interface TechNodeProps {
  id: string;
  label: string;
  body?: string;
  icon?: string;
  exampleCompanies?: string[];
  adoptionStage?: 'emerging' | 'growing' | 'mature';
  delayIndex: number;
  shouldReduceMotion: boolean;
}

function TechNode({
  label,
  body,
  icon,
  exampleCompanies,
  adoptionStage,
  delayIndex,
  shouldReduceMotion,
}: TechNodeProps) {
  return (
    <motion.li
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delayIndex * 0.08,
      }}
      className="list-none"
    >
      <article aria-label={`Emerging technology: ${label}`} className="h-full">
        <Card padding="md" className="flex flex-col gap-4 h-full">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-ramp-periwinkle-100)' }}
            aria-hidden="true"
          >
            <TechIcon icon={icon} size={20} />
          </div>

          {/* Label */}
          <h3 className="text-base font-display font-medium leading-snug" style={{ color: 'var(--color-foundation-black)' }}>
            {label}
          </h3>

          {/* Description */}
          {body && (
            <p className="text-compact font-body leading-relaxed flex-1" style={{ color: 'var(--surface-text-muted)' }}>
              {body}
            </p>
          )}

          {/* Adoption stage */}
          {adoptionStage && (
            <Badge theme={ADOPTION_BADGE_THEME[adoptionStage] ?? 'neutral'} variant="rounded">
              {adoptionStage.charAt(0).toUpperCase() + adoptionStage.slice(1)}
            </Badge>
          )}

          {/* Example companies */}
          {exampleCompanies && exampleCompanies.length > 0 && (
            <div
              className="pt-2"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
                <strong style={{ color: 'var(--color-foundation-black)' }}>Used by:</strong>{' '}
                {exampleCompanies.join(', ')}
              </p>
            </div>
          )}
        </Card>
      </article>
    </motion.li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function EmergingTechNodes({ techs }: EmergingTechNodesProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (!techs.nodes || techs.nodes.length === 0) return null;

  return (
    <SectionWrapper background="warm" spacing="lg" id="emerging-tech">
      <div className="flex flex-col gap-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Technology</SectionLabel>
          <SectionHeading level={2} align="left">
            {techs.heading ?? 'Emerging Technological Advancements'}
          </SectionHeading>
          {techs.subheading && (
            <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
              {techs.subheading}
            </p>
          )}
        </motion.div>

        {/* 4-tile constellation grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          aria-label="Emerging technologies"
        >
          {techs.nodes.map((node, idx) => (
            <TechNode
              key={node.id}
              id={node.id}
              label={node.label}
              body={node.body}
              icon={node.icon}
              exampleCompanies={node.exampleCompanies}
              adoptionStage={node.adoptionStage}
              delayIndex={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
