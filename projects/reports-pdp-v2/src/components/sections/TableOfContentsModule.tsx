'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: chapter title (text-2xl font-display · each <summary> headline is visual anchor · chapter number badge follows in same row)
 * Type rhythm: 2xl/sm/base/micro — SectionHeading = text-2xl · chapter summary headline = text-sm font-medium · sub-item title = text-base · page numbers = text-xs micro tabular-nums
 * Motion: native <details> expand (browser-native) · section fade-up on mount (whileInView · once · 300ms)
 *   — useReducedMotion guard on mount animation · native <details> unaffected
 * Depth: borders-only — <details> rows with border-bottom-subtle · locked chapters = Lock icon + blur overlay on sub-items · no card shadow
 * Mobile: full-width accordion · touch-friendly summaries 44px min-height · stack column default
 */

/**
 * TableOfContentsModule — expandable accordion (recipe row 29)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * Public: major chapter titles (access='public')
 * Lead-gated: full TOC (access='lead-gated' / 'paid')
 *
 * Expand All / Collapse All controls at top.
 * Semantic <details><summary> accordion — a11y built-in.
 * CTA: "Preview Full TOC" (lead form trigger)
 *
 * A11y: <nav aria-label="Table of contents"> · role semantics native from <details>.
 * Framer fade-up on mount · useReducedMotion guard.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Lock, FileText } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as unknown as [number, number, number, number];
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Button,
  Badge,
} from '@kenresearch/design-system/atoms';
import type { TocEntry } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface TableOfContentsModuleProps {
  toc: TocEntry[];
  reportSlug?: string;
}

// TODO: promote custom accordion controls to DS atom when >3 consumers exist
interface ChapterRowProps {
  entry: TocEntry;
  isOpen: boolean;
  onToggle: () => void;
}

function ChapterRow({ entry, isOpen, onToggle }: ChapterRowProps) {
  const isGated = entry.access === 'lead-gated' || entry.access === 'paid';

  return (
    <div
      style={{ borderBottom: '1px solid var(--border-soft)' }}
    >
      <div
        className="flex items-center gap-3 py-3.5 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-expanded={isGated ? undefined : isOpen}
        aria-label={
          isGated
            ? `Chapter ${entry.chapterNumber}: ${entry.title} — locked, sign in to view`
            : `${isOpen ? 'Collapse' : 'Expand'} chapter ${entry.chapterNumber}: ${entry.title}`
        }
        onClick={() => {
          if (!isGated) onToggle();
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isGated) {
            e.preventDefault();
            onToggle();
          }
        }}
        style={{ color: isGated ? 'var(--surface-text-muted)' : 'var(--color-foundation-black)' }}
      >
        {/* Chapter number badge */}
        <span
          className="shrink-0 w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center text-compact font-display font-medium"
          style={{
            backgroundColor: isGated ? 'var(--color-ramp-warm-100)' : 'var(--color-ramp-warm-200)',
            color: 'var(--surface-text-muted)',
          }}
          aria-hidden="true"
        >
          {entry.chapterNumber}
        </span>

        {/* Title */}
        <span className="text-compact font-body flex-1 leading-snug">
          {entry.title}
        </span>

        {/* Lock or chevron */}
        {isGated ? (
          <Lock size={13} aria-hidden="true" style={{ color: 'var(--surface-text-muted)', flexShrink: 0 }} />
        ) : entry.subItems && entry.subItems.length > 0 ? (
          <span
            aria-hidden="true"
            style={{
              fontSize: '12px',
              color: 'var(--surface-text-muted)',
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
              display: 'inline-block',
              flexShrink: 0,
            }}
          >
            ▾
          </span>
        ) : null}

        {isGated && (
          <Badge theme="muted" variant="minimal">
            Gated
          </Badge>
        )}
      </div>

      {/* Sub-items (public only) */}
      {!isGated && isOpen && entry.subItems && entry.subItems.length > 0 && (
        <ul className="pb-3 pl-10 flex flex-col gap-1.5" aria-label={`Subsections of ${entry.title}`}>
          {entry.subItems.map((sub) => (
            <li
              key={sub.id}
              className="text-compact font-body leading-snug"
              style={{ color: 'var(--surface-text-muted)' }}
            >
              {sub.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TableOfContentsModule({ toc, reportSlug = '' }: TableOfContentsModuleProps) {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Track open chapters (by id)
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const publicChapters = toc.filter((e) => e.access === 'public');
  const gatedChapters = toc.filter((e) => e.access !== 'public');

  const allPublicOpen = publicChapters.every((e) => openIds.has(e.id));

  const expandAll = () => {
    const publicIds = publicChapters.map((e) => e.id);
    setOpenIds(new Set(publicIds));
  };

  const collapseAll = () => setOpenIds(new Set());

  return (
    <SectionWrapper background="white" spacing="lg" id="table-of-contents">
      <div className="flex flex-col gap-8">

        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <SectionLabel>Contents</SectionLabel>
          <SectionHeading level={2} align="left">
            Table of Contents
          </SectionHeading>
          <p className="mt-2 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            {publicChapters.length} public chapters · {gatedChapters.length} additional chapters in full report
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.06 }}
          className="flex items-center gap-3"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={allPublicOpen ? collapseAll : expandAll}
            ariaLabel={allPublicOpen ? 'Collapse all chapters' : 'Expand all chapters'}
          >
            {allPublicOpen ? 'Collapse All' : 'Expand All'}
          </Button>
          <span aria-hidden="true" style={{ color: 'var(--border-soft)' }}>·</span>
          <div className="flex items-center gap-1.5 text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            <FileText size={13} aria-hidden="true" />
            {toc.length} chapters total
          </div>
        </motion.div>

        {/* TOC list */}
        <motion.nav
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
          aria-label="Table of contents"
          style={{ borderTop: '1px solid var(--border-soft)' }}
        >
          {toc.map((entry) => (
            <ChapterRow
              key={entry.id}
              entry={entry}
              isOpen={openIds.has(entry.id)}
              onToggle={() => toggle(entry.id)}
            />
          ))}
        </motion.nav>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <p className="text-compact font-body" style={{ color: 'var(--surface-text-muted)' }}>
            Full TOC with all subsections available in the sample report.
          </p>
          <Button
            variant="brand"
            size="md"
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'toc-module',
                sectionName: 'table-of-contents',
              })
            }
          >
            Preview Full TOC
          </Button>
        </div>

      </div>
    </SectionWrapper>
  );
}
