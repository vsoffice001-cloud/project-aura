'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useHeroVisibility } from '@/hooks/useHeroVisibility';

export interface StickyNavSection {
  id: string;
  label: string;
}

interface StickyNavBarProps {
  sections: StickyNavSection[];
  /** Report title — reserved for Phase B section-aware label swap */
  reportTitle?: string;
  reportSlug: string;
}

const DEFAULT_SECTIONS: StickyNavSection[] = [
  { id: 'intelligence-snapshot', label: 'Overview' },
  { id: 'key-stats', label: 'Key Stats' },
  { id: 'executive-summary', label: 'Summary' },
  { id: 'report-scope', label: 'Scope' },
  { id: 'market-overview', label: 'Market' },
  { id: 'market-size', label: 'Sizing' },
  { id: 'segments', label: 'Segments' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'toc', label: 'Contents' },
];

/**
 * StickyNavBar — recipe row 5.
 * Sticky top-0, appears after hero scroll. 11 section jump-links + CTA right.
 * Mobile: collapses to chevron toggle showing 3 max links.
 * CSS sticky + Framer show/hide.
 */
export function StickyNavBar({ sections, reportSlug }: StickyNavBarProps) {
  const prefersReduced = useReducedMotion();
  const heroPassed = useHeroVisibility('pdp-hero');
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // Track active section via scroll position
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', () => {
    const navSections = sections.length > 0 ? sections : DEFAULT_SECTIONS;
    for (let i = navSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(navSections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80) {
          setActiveId(navSections[i].id);
          break;
        }
      }
    }
  });

  const resolvedSections = sections.length > 0 ? sections : DEFAULT_SECTIONS;

  const handleSectionClick = (id: string, label: string) => {
    dispatch('section_nav_click', { section_name: label, section_id: id });
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleCTA = () => {
    dispatch('sample_cta_click', { cta_location: 'sticky_nav', section_name: 'StickyNavBar' });
    openForm('sample', { reportSlug, ctaLocation: 'sticky_nav', sectionName: 'StickyNavBar' });
  };

  if (!heroPassed) return null;

  return (
    <motion.div
      data-sticky-nav
      role="navigation"
      aria-label="In-page navigation"
      className="sticky top-0 z-40 border-b border-[var(--border-default)]"
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.85)' }}
      initial={prefersReduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center max-w-[var(--container-page)] mx-auto px-4 sm:px-6 md:px-8 h-12 gap-1">
        <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
          {resolvedSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleSectionClick(sec.id, sec.label)}
              aria-current={activeId === sec.id ? 'location' : undefined}
              className="shrink-0 px-3 py-1.5 text-[var(--typography-size-xs)] font-[var(--typography-family-body)] font-medium uppercase tracking-wider rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)]"
              style={{
                color: activeId === sec.id ? 'var(--color-foundation-black)' : 'var(--surface-text-muted)',
                borderBottom: activeId === sec.id ? '2px solid var(--color-brand-red)' : '2px solid transparent',
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>
        <Button variant="brand" size="sm" onClick={handleCTA}>
          Download Sample Report
        </Button>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="sticky-nav-mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center gap-1 text-[var(--typography-size-xs)] font-[var(--typography-family-body)] font-semibold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)]"
          >
            Sections
            {mobileOpen ? <ChevronUp className="h-3.5 w-3.5" aria-hidden /> : <ChevronDown className="h-3.5 w-3.5" aria-hidden />}
          </button>
          <Button variant="brand" size="sm" onClick={handleCTA}>
            Download Sample
          </Button>
        </div>

        {mobileOpen && (
          <motion.div
            id="sticky-nav-mobile-menu"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden mt-2"
          >
            <div className="grid grid-cols-3 gap-1 pb-2">
              {resolvedSections.slice(0, 9).map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSectionClick(sec.id, sec.label)}
                  className="text-[var(--typography-size-xs)] font-[var(--typography-family-body)] px-2 py-1.5 rounded text-left truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)]"
                  style={{ color: activeId === sec.id ? 'var(--color-foundation-black)' : 'var(--surface-text-muted)' }}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
