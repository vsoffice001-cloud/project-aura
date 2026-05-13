'use client';

/**
 * StickyCTA — Recipe report-detail.md line 79
 * Always-on bottom (mobile) / right rail (desktop)
 * Section-aware label swap via IntersectionObserver
 * Default: "Download Sample Report" → openForm('sample')
 * Hidden when StickyNavBar CTA already showing (after hero scroll on desktop)
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SectionCTAConfig {
  sectionId: string;
  label: string;
  trigger: 'sample' | 'analyst-call' | 'dataset-unlock' | 'customization';
}

// Section-aware CTA map — recipe-locked labels per section
const SECTION_CTA_MAP: SectionCTAConfig[] = [
  { sectionId: 'sec-hero', label: 'Download Sample Report', trigger: 'sample' },
  { sectionId: 'sec-sizing', label: 'Unlock Market Data', trigger: 'dataset-unlock' },
  { sectionId: 'sec-toc', label: 'Preview Full TOC', trigger: 'sample' },
  { sectionId: 'sec-methodology', label: 'Download Sample Report', trigger: 'sample' },
  { sectionId: 'sec-final-cta', label: 'Get Report Access', trigger: 'sample' },
];

const DEFAULT_CTA: SectionCTAConfig = {
  sectionId: '',
  label: 'Download Sample Report',
  trigger: 'sample',
};

// StickyNavBar appears after hero scroll — hide StickyCTA on desktop when nav CTA is visible
const STICKY_NAV_BREAKPOINT = 768; // md

interface Props {
  reportSlug: string;
}

export function StickyCTA({ reportSlug }: Props) {
  const prefersReduced = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const dispatch = useAnalytics();
  const [activeCTA, setActiveCTA] = useState<SectionCTAConfig>(DEFAULT_CTA);
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Track StickyNavBar visibility — it has data-sticky-nav attribute
  useEffect(() => {
    const checkStickyNav = () => {
      if (window.innerWidth >= STICKY_NAV_BREAKPOINT) {
        const stickyNav = document.querySelector('[data-sticky-nav]');
        if (stickyNav) {
          const rect = stickyNav.getBoundingClientRect();
          setIsStickyNavVisible(rect.top >= 0 && rect.top < window.innerHeight);
        }
      } else {
        setIsStickyNavVisible(false);
      }
    };

    checkStickyNav();
    window.addEventListener('scroll', checkStickyNav, { passive: true });
    window.addEventListener('resize', checkStickyNav, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkStickyNav);
      window.removeEventListener('resize', checkStickyNav);
    };
  }, []);

  // Section-aware label swap via IntersectionObserver
  useEffect(() => {
    const observers = observersRef.current;

    SECTION_CTA_MAP.forEach((config) => {
      const el = document.getElementById(config.sectionId);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveCTA(config);
            }
          });
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      observersRef.current = [];
    };
  }, []);

  const handleClick = useCallback(() => {
    dispatch('sample_cta_click', {
      section_name: activeCTA.sectionId || 'global',
      cta_location: 'sticky',
    });
    openForm(activeCTA.trigger, { reportSlug, sectionName: activeCTA.sectionId });
  }, [activeCTA, dispatch, openForm, reportSlug]);

  // Hidden on desktop when StickyNavBar CTA already showing
  if (isStickyNavVisible) return null;

  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <AnimatePresence>
        <motion.div
          key="sticky-mobile"
          initial={prefersReduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? undefined : { y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:hidden fixed bottom-0 inset-x-0 z-[900] p-3"
          style={{
            background: 'var(--color-foundation-white)',
            borderTop: '1px solid var(--border-default)',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <Button
            variant="brand"
            size="lg"
            className="w-full"
            onClick={handleClick}
            animatedArrow
          >
            {activeCTA.label}
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Desktop: right rail pill */}
      <AnimatePresence>
        <motion.div
          key="sticky-desktop"
          initial={prefersReduced ? false : { x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={prefersReduced ? undefined : { x: 40, opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden md:block fixed bottom-6 right-6 z-[900]"
        >
          <Button
            variant="brand"
            size="md"
            onClick={handleClick}
            animatedArrow
          >
            {activeCTA.label}
          </Button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
