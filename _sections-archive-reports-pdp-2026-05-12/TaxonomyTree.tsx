'use client';

/**
 * TaxonomyTree — Row 11 — Recipe report-detail.md line 52
 * bg: white · spacing: lg · motion: Framer expand transitions
 * Desktop: collapsible nested tree (details/summary — keyboard-friendly)
 * Mobile: shadcn Accordion
 * Deep nodes (level 3+) wrapped in AccessLevelGate (lead-gated)
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
} from '@kenresearch/design-system/atoms';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AccessLevelGate } from '@/components/AccessLevelGate';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { TaxonomyModule, TaxonomyNode } from '@/types/schema';
import { Lock, ChevronRight } from 'lucide-react';

interface Props {
  taxonomy: TaxonomyModule;
}

const GATE_ACCESS = {
  level: 'lead-gated' as const,
  ctaTrigger: 'sample' as const,
  schemaIsAccessibleForFree: false,
  paywallSelector: '.kr-paywall-taxonomy',
  publicPreview: {
    summaryText: 'Submit your details to explore the full taxonomy tree.',
  },
};

// ─── Desktop tree node ───────────────────────────────────────────────────────
interface TreeNodeProps {
  node: TaxonomyNode;
  depth?: number;
  prefersReduced: boolean | null;
}

function TreeNode({ node, depth = 0, prefersReduced }: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isDeep = depth >= 2;

  const nodeContent = (
    <details
      style={{ marginLeft: depth === 0 ? 0 : 'var(--space-5)' }}
      open={depth < 2}
    >
      <summary
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          borderRadius: 'var(--radius-sm)',
          cursor: hasChildren ? 'pointer' : 'default',
          listStyle: 'none',
          fontSize: depth === 0
            ? 'var(--typography-size-sm)'
            : 'var(--typography-size-compact)',
          fontWeight: depth === 0 ? 600 : 400,
          color: depth === 0 ? 'var(--surface-text)' : 'var(--surface-text-muted)',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (hasChildren) {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              'var(--color-ramp-warm-100)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
        }}
      >
        {hasChildren && (
          <ChevronRight
            size={12}
            aria-hidden="true"
            style={{ color: 'var(--color-brand-red)', flexShrink: 0 }}
            className="details-chevron"
          />
        )}
        {!hasChildren && (
          <span
            aria-hidden="true"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-ramp-warm-400)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        )}
        {node.label}
        {isDeep && !hasChildren && (
          <Lock
            size={10}
            aria-label="Requires form submission"
            style={{ color: 'var(--color-ramp-warm-500)', marginLeft: 'auto' }}
          />
        )}
      </summary>

      {hasChildren && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {node.children!.map((child) => (
            <TreeNode
              key={child.label}
              node={child}
              depth={depth + 1}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      )}
    </details>
  );

  // Deep nodes (level 3+) are lead-gated
  if (isDeep) {
    return (
      <AccessLevelGate
        access={GATE_ACCESS}
        moduleId="taxonomy-deep"
        sectionName="TaxonomyTree"
        fallback={
          <div
            style={{
              marginLeft: 'var(--space-5)',
              padding: 'var(--space-2) var(--space-3)',
              fontSize: 'var(--typography-size-compact)',
              color: 'var(--surface-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <Lock size={10} aria-hidden="true" />
            {node.label} (unlock to view)
          </div>
        }
      >
        {nodeContent}
      </AccessLevelGate>
    );
  }

  return nodeContent;
}

// ─── Mobile accordion (shadcn) ───────────────────────────────────────────────
interface MobileAccordionNodeProps {
  node: TaxonomyNode;
  depth?: number;
}

function MobileAccordionNode({ node, depth = 0 }: MobileAccordionNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isDeep = depth >= 2;

  if (!hasChildren) {
    const leaf = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          paddingLeft: `calc(var(--space-3) + ${depth * 16}px)`,
          fontSize: 'var(--typography-size-compact)',
          color: 'var(--surface-text-muted)',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--color-ramp-warm-400)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        {node.label}
      </div>
    );
    return isDeep ? (
      <AccessLevelGate
        access={GATE_ACCESS}
        moduleId="taxonomy-deep-mobile"
        sectionName="TaxonomyTree"
        fallback={
          <div
            style={{
              padding: 'var(--space-2) var(--space-3)',
              fontSize: 'var(--typography-size-compact)',
              color: 'var(--surface-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <Lock size={10} aria-hidden="true" />
            {node.label} (unlock to view)
          </div>
        }
      >
        {leaf}
      </AccessLevelGate>
    ) : leaf;
  }

  return (
    <Accordion multiple>
      <AccordionItem
        value={node.label}
        style={{
          paddingLeft: `${depth * 12}px`,
          border: 'none',
        }}
      >
        <AccordionTrigger
          style={{
            fontSize:
              depth === 0
                ? 'var(--typography-size-sm)'
                : 'var(--typography-size-compact)',
            fontWeight: depth === 0 ? 600 : 400,
            color:
              depth === 0
                ? 'var(--surface-text)'
                : 'var(--surface-text-muted)',
          }}
        >
          {node.label}
        </AccordionTrigger>
        <AccordionContent>
          {node.children!.map((child) => (
            <MobileAccordionNode
              key={child.label}
              node={child}
              depth={depth + 1}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function TaxonomyTree({ taxonomy }: Props) {
  const prefersReduced = useReducedMotion();
  const dispatch = useAnalytics();

  const handleExpand = () => {
    dispatch('toc_expand', { section_name: 'TaxonomyTree' });
  };

  return (
    <SectionWrapper
      background="white"
      spacing="lg"
      maxWidth="wide"
      id="sec-taxonomy"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="inline-flex mb-3">
          <SectionLabel background="light" variant="default">
            TAXONOMY
          </SectionLabel>
        </div>
        <SectionHeading level={2} align="left">
          {taxonomy.heading ?? 'Market Taxonomy'}
        </SectionHeading>
        {taxonomy.root && (
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--surface-text-muted)',
              marginTop: 'var(--space-3)',
              lineHeight: 1.6,
            }}
          >
            Root: <strong style={{ color: 'var(--surface-text)' }}>{taxonomy.root}</strong>
          </p>
        )}
      </motion.div>

      {/* Desktop tree — hidden on mobile */}
      <motion.div
        className="hidden md:block mt-8"
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <div
          style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-soft)',
            background: 'var(--color-ramp-warm-50)',
            padding: 'var(--space-6)',
          }}
          onClick={handleExpand}
          role="group"
          aria-label="Market taxonomy tree"
        >
          {/* Root node */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-ramp-warm-200)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--typography-family-display)',
                fontSize: 'var(--typography-size-base)',
                fontWeight: 700,
                color: 'var(--surface-text)',
              }}
            >
              {taxonomy.root}
            </span>
          </div>

          {/* Branches */}
          <div className="flex flex-col gap-1">
            {taxonomy.branches.map((branch) => (
              <TreeNode
                key={branch.label}
                node={branch}
                depth={0}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>

        {/* Reduced-motion: static CSS applied globally — no GSAP */}
        <style>{`
          details[open] > summary .details-chevron {
            transform: rotate(90deg);
          }
        `}</style>
      </motion.div>

      {/* Mobile accordion — hidden on desktop */}
      <div className="md:hidden mt-8">
        <div
          style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-soft)',
            background: 'var(--color-ramp-warm-50)',
            padding: 'var(--space-4)',
          }}
          onClick={handleExpand}
        >
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              marginBottom: 'var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-ramp-warm-200)',
              fontFamily: 'var(--typography-family-display)',
              fontSize: 'var(--typography-size-sm)',
              fontWeight: 700,
              color: 'var(--surface-text)',
            }}
          >
            {taxonomy.root}
          </div>
          {taxonomy.branches.map((branch) => (
            <MobileAccordionNode key={branch.label} node={branch} depth={0} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
