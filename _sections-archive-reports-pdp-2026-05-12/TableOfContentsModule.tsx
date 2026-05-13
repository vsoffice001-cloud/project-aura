'use client';

/**
 * TableOfContentsModule — Row 29 — Recipe report-detail.md line 70
 * bg: white · spacing: lg · motion: Framer accordion expand
 * Public chapters freely expanded · deeper chapters lead-gated
 * shadcn Accordion multi-open · "Preview Full TOC" CTA → openForm('sample')
 */

import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Lock } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  SectionLabel,
  Card,
  Badge,
  Button,
} from '@kenresearch/design-system/atoms';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { TocEntry } from '@/types/schema';

// Public chapter count threshold — chapters beyond this are lead-gated
const PUBLIC_CHAPTER_LIMIT = 6;

interface Props {
  toc: TocEntry[];
  reportSlug: string;
}

interface ChapterRowProps {
  entry: TocEntry;
  isGated: boolean;
  prefersReduced: boolean | null;
  index: number;
}

function ChapterRow({ entry, isGated, prefersReduced, index }: ChapterRowProps) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <AccordionItem
        value={entry.id}
        className={isGated ? 'opacity-60 pointer-events-none select-none' : ''}
        aria-disabled={isGated}
      >
        <AccordionTrigger className="flex items-center gap-4 py-4 hover:no-underline group">
          <div className="flex items-center gap-4 flex-1 min-w-0 text-left">
            {/* Chapter number */}
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums"
              style={{
                background: isGated ? 'var(--color-neutral-100, #f3f4f6)' : 'var(--color-brand-red, #b01f24)',
                color: isGated ? 'var(--color-neutral-400, #9ca3af)' : 'var(--color-foundation-white)',
              }}
              aria-hidden="true"
            >
              {isGated ? <Lock size={10} /> : entry.chapterNumber}
            </span>

            {/* Title */}
            <span
              className="font-[var(--typography-family-display)] font-medium leading-snug truncate"
              style={{ fontSize: 'var(--typography-size-base)', color: isGated ? 'var(--color-neutral-400, #9ca3af)' : 'var(--color-foundation-black)' }}
            >
              {entry.title}
            </span>
          </div>

          {/* Page ref metadata */}
          {entry.pageRef && !isGated && (
            <span
              className="shrink-0 text-xs tabular-nums ml-auto"
              style={{ color: 'var(--color-neutral-400, #9ca3af)' }}
            >
              p.{entry.pageRef}
            </span>
          )}

          {isGated && (
            <Badge theme="neutral" className="shrink-0 ml-auto text-xs">
              Lead-gated
            </Badge>
          )}
        </AccordionTrigger>

        {!isGated && (
          <AccordionContent className="pb-4">
            {entry.subItems && entry.subItems.length > 0 ? (
              <ul className="flex flex-col gap-2 pl-11">
                {entry.subItems.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex items-center gap-2"
                  >
                    <FileText
                      size={12}
                      style={{ color: 'var(--color-neutral-400, #9ca3af)' }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontSize: 'var(--typography-size-sm)',
                        color: 'var(--color-neutral-600, #4b5563)',
                      }}
                    >
                      {sub.title}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="pl-11"
                style={{
                  fontSize: 'var(--typography-size-sm)',
                  color: 'var(--color-neutral-500, #6b7280)',
                }}
              >
                Section detail available in the full report.
              </p>
            )}
          </AccordionContent>
        )}
      </AccordionItem>
    </motion.div>
  );
}

export function TableOfContentsModule({ toc, reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();

  if (!toc || toc.length === 0) return null;

  const publicEntries = toc.filter((_, i) => i < PUBLIC_CHAPTER_LIMIT);
  const gatedEntries = toc.filter((_, i) => i >= PUBLIC_CHAPTER_LIMIT);

  const defaultOpen = publicEntries.slice(0, 2).map((e) => e.id);

  const handlePreviewTOC = () => {
    dispatch('toc_expand', {
      section_name: 'TableOfContentsModule',
      cta_location: 'toc-footer',
    });
    openForm('sample', { reportSlug, sectionName: 'TableOfContents' });
  };

  return (
    <SectionWrapper background="white" spacing="lg" id="sec-toc">
      <SectionLabel>Contents</SectionLabel>
      <SectionHeading level={2} className="mt-2 mb-8">
        Table of Contents
      </SectionHeading>

      <Card variant="white" padding="lg">
        <Accordion defaultValue={defaultOpen}>
          {publicEntries.map((entry, i) => (
            <ChapterRow
              key={entry.id}
              entry={entry}
              isGated={false}
              prefersReduced={prefersReduced}
              index={i}
            />
          ))}

          {gatedEntries.map((entry, i) => (
            <ChapterRow
              key={entry.id}
              entry={entry}
              isGated
              prefersReduced={prefersReduced}
              index={publicEntries.length + i}
            />
          ))}
        </Accordion>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button
          variant="brand"
          size="lg"
          onClick={handlePreviewTOC}
          animatedArrow
        >
          Preview Full TOC
        </Button>
      </div>
    </SectionWrapper>
  );
}
