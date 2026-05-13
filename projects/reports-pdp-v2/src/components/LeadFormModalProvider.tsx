'use client';

/**
 * LeadFormModalProvider — PRD §46
 * Global modal manager. Any component can call openForm(type, context).
 * Renders a single <dialog> at root. Focus trap, ESC, restore focus.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { LeadFormType } from '@/types/schema';
import { SampleLeadForm } from '@/components/forms/SampleLeadForm';
import { DatasetUnlockLeadForm } from '@/components/forms/DatasetUnlockLeadForm';
import { AnalystCallLeadForm } from '@/components/forms/AnalystCallLeadForm';
import { CustomizationLeadForm } from '@/components/forms/CustomizationLeadForm';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface FormContext {
  reportSlug: string;
  chartId?: string;
  sectionName?: string;
  ctaLocation?: string;
}

interface LeadFormModalContextValue {
  isOpen: boolean;
  currentType: LeadFormType | null;
  formContext: FormContext | null;
  openForm: (type: LeadFormType, context: FormContext) => void;
  closeForm: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const LeadFormModalContext = createContext<LeadFormModalContextValue | null>(null);

export function useLeadFormModal(): LeadFormModalContextValue {
  const ctx = useContext(LeadFormModalContext);
  if (!ctx) {
    throw new Error('useLeadFormModal must be used inside LeadFormModalProvider');
  }
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Titles per form type
// ─────────────────────────────────────────────────────────────────────────────

const FORM_TITLES: Record<LeadFormType, string> = {
  sample: 'Download Sample Report',
  'dataset-unlock': 'Unlock Full Dataset',
  'analyst-call': 'Schedule an Analyst Call',
  customization: 'Request Report Customization',
};

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function LeadFormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<LeadFormType | null>(null);
  const [formContext, setFormContext] = useState<FormContext | null>(null);

  // Ref to the element that triggered open — for focus restore
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

  const openForm = useCallback((type: LeadFormType, context: FormContext) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setCurrentType(type);
    setFormContext(context);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    // Restore focus after animation
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeForm();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeForm]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Focus first focusable on open
    const firstFocusable = dialog.querySelector<HTMLElement>(focusableSelectors);
    firstFocusable?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelectors));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  // Prevent body scroll while modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const ctxValue: LeadFormModalContextValue = {
    isOpen,
    currentType,
    formContext,
    openForm,
    closeForm,
  };

  return (
    <LeadFormModalContext.Provider value={ctxValue}>
      {children}

      <AnimatePresence>
        {isOpen && currentType && formContext && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              onClick={closeForm}
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              key="dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={[
                'fixed z-50 bg-white shadow-2xl overflow-y-auto',
                // Mobile: full-screen sheet
                'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-2xl',
                // Desktop: centered modal
                'sm:inset-x-auto sm:inset-y-auto sm:top-1/2 sm:left-1/2',
                'sm:-translate-x-1/2 sm:-translate-y-1/2',
                'sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-2xl',
              ].join(' ')}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 40 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 36 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-neutral-900"
                  style={{ fontFamily: 'var(--font-display, "Noto Serif", serif)' }}
                >
                  {FORM_TITLES[currentType]}
                </h2>
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                  aria-label="Close form"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Form body */}
              <div className="px-6 py-6">
                {currentType === 'sample' && (
                  <SampleLeadForm context={formContext} onClose={closeForm} />
                )}
                {currentType === 'dataset-unlock' && (
                  <DatasetUnlockLeadForm context={formContext} onClose={closeForm} />
                )}
                {currentType === 'analyst-call' && (
                  <AnalystCallLeadForm context={formContext} onClose={closeForm} />
                )}
                {currentType === 'customization' && (
                  <CustomizationLeadForm context={formContext} onClose={closeForm} />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LeadFormModalContext.Provider>
  );
}
