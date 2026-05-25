/**
 * FAQSection
 *
 * WHY:
 * - Report PDPs need a dedicated FAQ block to pre-answer buyer objections (format, data freshness,
 *   custom research, sample vs full, refund, access speed) before cart-abandonment.
 * - Single-open accordion (only one panel expanded at once) reduces cognitive overload vs all-open —
 *   users scan the question list then decide which answer to read (progressive disclosure pattern).
 * - Bottom contact-CTA box gives a "still stuck?" escape hatch — captures leads who couldn't find
 *   answers vs bouncing to a competitor. Unique pattern to FAQSection; not in CTABanner.
 * - aria-expanded + aria-controls + role="region" + aria-labelledby wires full keyboard/screen-reader
 *   contract for accordion per ARIA Authoring Practices Guide 1.2 §3.1.
 *
 * WHAT:
 * - `<section>` with optional section label + h2 heading + paragraph description.
 * - Accordion list: `<ul role="list">` · each item is a `<li>` with `<button>` trigger +
 *   `<div role="region">` answer panel.
 * - Single-open: toggling an open item closes it; opening a new item closes the previous.
 * - Chevron rotates 180deg on open (CSS transition, respects reduced-motion via inline conditional).
 * - Answer reveal: Framer Motion `AnimatePresence` + `motion.div` fade+slide; falls back to no
 *   motion when `useReducedMotion()` returns true.
 * - Contact CTA box: flex row on sm+, brand CTA link, light warm surface.
 * - All content injected via `faqs` prop — no inline mock data in this file.
 * - `defaultOpenId` prop controls which item is open on first render (default: first item).
 *
 * WHEN:
 * - Bottom third of report PDP pages (after pricing, before footer).
 * - Any page that needs an accordion FAQ block with a contact escape hatch.
 *
 * WHEN NOT:
 * - Simple collapsible sections inside a card → use `CollapsibleSection` atom.
 * - Full-page help/support centre → different organism needed.
 * - More than ~12 FAQ items → consider splitting into tabbed categories.
 *
 * WHERE:
 * - `projects/V0_lite_report/` — report PDP page FAQ block.
 * - Any consumer page that imports from `@kenresearch/design-system`.
 *
 * HOW:
 * ```tsx
 * import { FAQSection } from '@kenresearch/design-system/organisms';
 *
 * // Minimal — inject data, first item open by default
 * <FAQSection faqs={faqItems} />
 *
 * // With default open item specified
 * <FAQSection faqs={faqItems} defaultOpenId="faq-2" />
 *
 * // Custom heading
 * <FAQSection
 *   faqs={faqItems}
 *   heading="Common Questions"
 *   description="Everything you need before you buy."
 *   contactHref="/contact"
 *   contactLabel="Talk to Research Team"
 * />
 * ```
 *
 * @wwwwh-complete true
 * @a11y_status reviewed-AA
 * @lifecycle stable
 * @promotedFrom V0_lite_report-legacy/src/app/components/FAQSection.tsx
 */
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '../atoms/SectionLabel';
import { SectionHeading } from '../atoms/SectionHeading';
import { CTALink } from '../atoms/CTALink';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single FAQ item passed to FAQSection. */
export interface FAQItem {
  /** Unique string ID used for aria-controls / aria-labelledby pairing. */
  id: string;
  /** The question text shown in the accordion trigger button. */
  question: string;
  /** The answer text revealed when the item is expanded. */
  answer: string;
}

export interface FAQSectionProps {
  /**
   * Array of FAQ items to render.
   * All content must be injected — no inline defaults in the component.
   * // TODO: replace w/ real API — `GET /api/reports/{slug}/faqs`
   */
  faqs: FAQItem[];
  /**
   * ID of the FAQ item that should be open on initial render.
   * Defaults to the first item's id. Pass `null` to start all closed.
   */
  defaultOpenId?: string | null;
  /**
   * Eyebrow label above the section heading.
   * @default "FREQUENTLY ASKED"
   */
  label?: string;
  /**
   * Main section h2 heading text.
   * @default "Frequently Asked Questions"
   */
  heading?: string;
  /**
   * Subtext below the heading.
   * @default "Everything you need to know about our market research reports"
   */
  description?: string;
  /**
   * href for the contact CTA at the bottom of the section.
   * @default "/contact"
   */
  contactHref?: string;
  /**
   * Label for the contact CTA button.
   * @default "Contact Research Team"
   */
  contactLabel?: string;
  /** Optional additional className on the root `<section>`. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FAQSection({
  faqs,
  defaultOpenId,
  label = 'FREQUENTLY ASKED',
  heading = 'Frequently Asked Questions',
  description = 'Everything you need to know about our market research reports',
  contactHref = '/contact',
  contactLabel = 'Contact Research Team',
  className,
}: FAQSectionProps) {
  // Derive initial open id: explicit prop > first item > null
  const initialId =
    defaultOpenId !== undefined
      ? defaultOpenId
      : faqs.length > 0
        ? faqs[0].id
        : null;

  const [openId, setOpenId] = useState<string | null>(initialId);
  const prefersReducedMotion = useReducedMotion();

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      data-component="FAQSection"
      className={className}
      style={{ backgroundColor: 'var(--section-bg-primary)' }}
    >
      {/* Inner layout wrapper — constrained to content width, standard section padding */}
      <div
        style={{
          maxWidth: 'var(--container-content)',
          margin: '0 auto',
          paddingTop: 'var(--section-py-mobile)',
          paddingBottom: 'var(--section-py-mobile)',
          paddingLeft: 'var(--padding-mobile)',
          paddingRight: 'var(--padding-mobile)',
        }}
        className="sm:px-6 md:px-8 lg:pt-20 lg:pb-20"
      >
        {/* ----------------------------------------------------------------
            Section header
        ---------------------------------------------------------------- */}
        <div
          style={{ maxWidth: 'var(--container-prose)', marginBottom: 'var(--section-header-mb)' }}
        >
          <div className="inline-flex mb-3">
            <SectionLabel style="text" background="light">
              {label}
            </SectionLabel>
          </div>
          <SectionHeading level={2} align="left">
            {heading}
          </SectionHeading>
          <p
            style={{
              fontSize: 'var(--typography-size-sm)',
              color: 'var(--semantic-ink-muted)',
              marginTop: 'var(--pair-heading-description)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {description}
          </p>
        </div>

        {/* ----------------------------------------------------------------
            Accordion list
        ---------------------------------------------------------------- */}
        <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const triggerId = `faq-question-${faq.id}`;
            const panelId = `faq-answer-${faq.id}`;

            return (
              <li
                key={faq.id}
                style={{
                  border: `1px solid ${isOpen ? 'var(--border-input)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  transition: 'var(--transition-normal)',
                  backgroundColor: 'var(--section-bg-primary)',
                }}
              >
                {/* Trigger button — 44px min height for touch target compliance */}
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-lg) var(--space-xl)',
                    minHeight: '44px',
                    backgroundColor: isOpen ? 'var(--tint-soft)' : 'transparent',
                    transition: 'var(--transition-fast)',
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--typography-size-sm)',
                      fontWeight: 'var(--typography-weight-medium)',
                      color: 'var(--semantic-ink-strong)',
                      lineHeight: 'var(--leading-relaxed)',
                      paddingRight: 'var(--space-md)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      flexShrink: 0,
                      color: 'var(--icon-utility)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `transform var(--duration-normal) var(--ease-out)`,
                    }}
                    strokeWidth={2}
                  />
                </button>

                {/* Answer panel — Framer AnimatePresence for enter/exit */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, height: 'auto' }
                          : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 1, height: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{
                        height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: 'var(--space-md) var(--space-xl) var(--space-lg)',
                          fontSize: 'var(--typography-size-sm)',
                          color: 'var(--semantic-ink-muted)',
                          lineHeight: 'var(--leading-relaxed)',
                          fontFamily: 'var(--font-sans)',
                          borderTop: '1px solid var(--border-card)',
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* ----------------------------------------------------------------
            Contact CTA box
        ---------------------------------------------------------------- */}
        <div
          style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-xl)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--tint-soft)',
            border: '1px solid var(--border-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
          }}
          className="sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p
              style={{
                fontSize: 'var(--typography-size-sm)',
                fontWeight: 'var(--typography-weight-medium)',
                color: 'var(--semantic-ink-strong)',
                marginBottom: 'var(--space-xs)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Still have questions?
            </p>
            <p
              style={{
                fontSize: 'var(--typography-size-compact)',
                color: 'var(--semantic-ink-muted)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Our research team is here to help you find the right solution
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <CTALink href={contactHref} variant="brand" size="md">
              {contactLabel}
            </CTALink>
          </div>
        </div>
      </div>

    </section>
  );
}
