'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: sticky-nav
 * Lead element: active chip (red underline indicator via Framer layoutId spring)
 * Support: all other section chips (0.6 opacity; hover restores full)
 * Type rhythm: text-compact / — / — / — (nav chips only · no headline hierarchy needed)
 * Motion event: active-state transition 150ms spring (stiffness 380 · damping 30 · layoutId="sticky-nav-indicator")
 *   scroll shadow transitions 200ms ease — both respect shouldReduceMotion (no animation on reduced)
 * Depth: borders-only (sticky element · white bg · 1px bottom border · shadow on scroll only)
 * Mobile override: horizontal scroll chips (overflow-x-auto · scrollbarWidth none) · CTA cluster hidden at <md
 */

/**
 * StickyNavBar — Sticky section navigation (recipe row 5)
 *
 * Variant: editorial-light
 * Background: n/a sticky (no SectionWrapper per LOCK 3)
 * Position: sticky top-0 z-40 after hero scroll
 * A11y: landmark nav, aria-current, keyboard focus
 *
 * Renders 11 section anchors. Active section highlighted via
 * IntersectionObserver. Right side: CTA cluster (Download Sample Report).
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@kenresearch/design-system/atoms';
import type { TocEntry } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

export interface StickyNavBarProps {
  sections: TocEntry[];
  reportSlug: string;
}

const NAV_SECTIONS = [
  { id: 'sec-overview', label: 'Executive Summary', anchor: 'exec-summary' },
  { id: 'sec-sizing', label: 'Market Size', anchor: 'key-stats' },
  { id: 'sec-definitions', label: 'Definitions', anchor: 'market-definitions' },
  { id: 'sec-taxonomy', label: 'Taxonomy', anchor: 'taxonomy-tree' },
  { id: 'sec-ecosystem', label: 'Ecosystem', anchor: 'ecosystem-tier' },
  { id: 'sec-segmentation', label: 'Segmentation', anchor: 'segment-intel' },
  { id: 'sec-dynamics', label: 'SWOT & Drivers', anchor: 'industry-analysis' },
  { id: 'sec-challenges', label: 'Challenges', anchor: 'challenges-solutions' },
  { id: 'sec-competition', label: 'Competitive', anchor: 'competitor-landscape' },
  { id: 'sec-trends', label: 'Trends', anchor: 'recent-trends' },
  { id: 'sec-methodology', label: 'Methodology', anchor: 'methodology-flow' },
];

// sections: used by Wave 4 composer for dynamic nav building — Wave 1 uses static NAV_SECTIONS
export function StickyNavBar({ sections: _tocSections, reportSlug }: StickyNavBarProps) {
  void _tocSections; // consumed by Wave 4 StickyNavBar rebuild
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();

  // Track page scroll for shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const anchors = NAV_SECTIONS.map((s) => document.getElementById(s.anchor)).filter(Boolean);
    if (anchors.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = NAV_SECTIONS.find((s) => s.anchor === entry.target.id);
            if (match) setActiveId(match.id);
          }
        }
      },
      { threshold: 0.25, rootMargin: '-80px 0px -60% 0px' },
    );

    anchors.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'instant' : 'smooth' });
    }
  }, [shouldReduceMotion]);

  return (
    <div
      className="sticky top-0 z-40"
      style={{
        backgroundColor: 'var(--color-foundation-white)',
        borderBottom: '1px solid var(--border-soft)',
        boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
        transition: shouldReduceMotion ? 'none' : 'box-shadow 200ms ease',
      }}
      id="sticky-nav"
    >
      <div
        className="mx-auto flex items-center gap-0"
        style={{ maxWidth: 'var(--container-page)' }}
      >
        {/* Section links — horizontal scroll on mobile */}
        <nav
          aria-label="Report sections"
          className="flex-1 min-w-0"
        >
          <div
            ref={scrollContainerRef}
            className="flex items-center overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {NAV_SECTIONS.map((section) => {
              const isActive = activeId === section.id;
              return (
                // Wrapper provides position-relative for the active underline indicator
                <div
                  key={section.id}
                  className="relative shrink-0"
                  style={{ color: 'var(--color-foundation-black)' }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(section.anchor)}
                    ariaLabel={section.label}
                    className={[
                      'whitespace-nowrap px-3 h-auto py-3 rounded-none border-0 bg-transparent',
                      isActive ? 'font-medium' : 'opacity-60 hover:opacity-100',
                    ].join(' ')}
                  >
                    {section.label}
                  </Button>
                  {/* Active underline indicator — sibling of Button, positioned under wrapper */}
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="sticky-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
                      style={{ backgroundColor: 'var(--color-brand-red)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && shouldReduceMotion && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
                      style={{ backgroundColor: 'var(--color-brand-red)' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Right CTA cluster — hidden on smallest screens */}
        <div className="hidden md:flex shrink-0 items-center gap-3 pl-4 pr-4 border-l border-[var(--border-soft)]">
          <Button
            variant="brand"
            size="sm"
            animatedArrow
            onClick={() =>
              openForm('sample', {
                reportSlug,
                ctaLocation: 'sticky-nav',
                sectionName: 'nav',
              })
            }
            ariaLabel="Download sample report"
          >
            <Download size={14} aria-hidden="true" />
            Sample Report
          </Button>
        </div>
      </div>
    </div>
  );
}
