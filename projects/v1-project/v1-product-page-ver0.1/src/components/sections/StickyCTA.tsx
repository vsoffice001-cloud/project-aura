'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Lead: CTA label (text-sm font-medium · Button variant="brand" · label swaps contextually per section in view)
 * Type rhythm: sm — CTA label = text-sm (Button default · compact for overlay) · dismiss X = icon only · no headline no body
 * Motion: slide-in 250ms (AnimatePresence · y: 80→0 mobile / x: 20→0 desktop · ease-out) + label swap (opacity 0→1 200ms on text change via AnimatePresence key)
 *   — useReducedMotion: instant render/dismiss (no slide transition · label swap still occurs but instant)
 * Depth: shadow-modal — fixed overlay above content · --shadow-modal for elevation clarity · mobile bottom-bar has top border
 * Mobile: fixed bottom · full-width bar · 60px height · dismiss X top-right · desktop: floating right-rail card
 */

/**
 * StickyCTA — overlay · always-on bottom mobile / right rail desktop (recipe row 36)
 *
 * Mobile: fixed bottom · 60px height · full-width
 * Desktop ≥1024: floating right-rail card
 * Section-aware label swap via IntersectionObserver on known section ids.
 * Hide when FinalCTABlock is in view.
 *
 * No SectionWrapper — overlay element.
 * A11y: role="region" aria-label · 44px touch targets · keyboard nav.
 * Framer AnimatePresence for mount/unmount · useReducedMotion guard.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@kenresearch/design-system/atoms';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';
import { X } from 'lucide-react';

// Section id → CTA label map (recipe-locked)
const SECTION_LABELS: Array<{ id: string; label: string; formType: 'sample' | 'analyst-call' | 'customization' }> = [
  { id: 'report-hero', label: 'Download Sample Report', formType: 'sample' },
  { id: 'market-size-chart', label: 'Unlock Dataset', formType: 'sample' },
  { id: 'segmentation', label: 'Request Customization', formType: 'customization' },
  { id: 'competitor-landscape', label: 'Talk to Analyst', formType: 'analyst-call' },
];

const DEFAULT_LABEL = 'Get Report Access';
const DEFAULT_FORM = 'sample' as const;

interface ActiveCtaState {
  label: string;
  formType: 'sample' | 'analyst-call' | 'customization';
}

export function StickyCTA() {
  const { openForm } = useLeadFormModal();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState<ActiveCtaState>({ label: DEFAULT_LABEL, formType: DEFAULT_FORM });
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);

  // Show after scrolling past hero
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide when FinalCTABlock is in view
  useEffect(() => {
    const el = document.getElementById('final-cta');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFinalCtaVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Section-aware label swap
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_LABELS.forEach(({ id, label, formType }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive({ label, formType });
          }
        },
        { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const shouldShow = visible && !dismissed && !finalCtaVisible;

  const handleCta = () => {
    openForm(active.formType, {
      reportSlug: '',
      ctaLocation: 'sticky-cta',
      sectionName: 'sticky',
    });
  };

  const handleDismiss = () => setDismissed(true);

  // Animation variants
  const mobileVariants = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { y: 80, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 80, opacity: 0 },
      };

  const desktopVariants = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { x: 80, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 80, opacity: 0 },
      };

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          {/* Mobile: fixed bottom bar */}
          <motion.div
            key="sticky-mobile"
            className="lg:hidden"
            role="region"
            aria-label="Quick conversion actions"
            variants={mobileVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 var(--space-4)',
              gap: 'var(--space-3)',
              backgroundColor: 'var(--color-foundation-white)',
              borderTop: '1px solid var(--border-soft)',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <Button
              variant="brand"
              size="md"
              onClick={handleCta}
              fullWidth
              ariaLabel={`${active.label} — report access`}
            >
              {active.label}
            </Button>
            <Button
              variant="ghost"
              size="md"
              iconOnly
              icon={<X size={18} aria-hidden="true" />}
              onClick={handleDismiss}
              ariaLabel="Dismiss sticky CTA"
            />
          </motion.div>

          {/* Desktop: right-rail card */}
          <motion.div
            key="sticky-desktop"
            className="hidden lg:flex"
            role="region"
            aria-label="Quick conversion actions"
            variants={desktopVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              right: 'var(--space-6)',
              bottom: 'var(--space-8)',
              zIndex: 50,
              width: '220px',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              backgroundColor: 'var(--color-foundation-white)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-soft)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            <p
              className="text-compact font-display font-medium"
              style={{ color: 'var(--color-foundation-black)' }}
            >
              Report Access
            </p>
            <Button
              variant="brand"
              size="sm"
              onClick={handleCta}
              fullWidth
              ariaLabel={`${active.label} — report access`}
            >
              {active.label}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                openForm('analyst-call', {
                  reportSlug: '',
                  ctaLocation: 'sticky-cta-desktop',
                  sectionName: 'sticky',
                })
              }
              fullWidth
            >
              Talk to Analyst
            </Button>
            <div style={{ position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)' }}>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<X size={14} aria-hidden="true" />}
                onClick={handleDismiss}
                ariaLabel="Dismiss sticky CTA panel"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
