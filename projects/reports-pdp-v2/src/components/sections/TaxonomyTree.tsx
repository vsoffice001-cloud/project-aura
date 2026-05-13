'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: Taxonomy tree
 * Lead element: parent category (left-rail treeitem · active = black bg white text · selected state clear)
 * Support: child nodes (text-compact · indented · locked nodes blurred text + lock icon)
 * Type rhythm: 2xl/base/sm/xs — SectionHeading level={2} (section lead) · branch label = text-base font-display
 *   child labels = text-compact font-body · grandchild = text-compact (same as child; acceptable for tree depth)
 * Motion event: expand spring 200ms (AnimatePresence height 0→auto · 220ms ease) · panel cross-fade 220ms
 *   — DECISION: expand + cross-fade = 2 events max · within budget
 *   — useReducedMotion: duration: 0 on motion.div · content renders instantly
 * Depth: borders-only (Card variant="outlined" shadow="none" · white bg on white section bg — border separates)
 *   left-rail items: transparent bg → black bg on active (state-driven, not depth shadow)
 * Mobile override: desktop 2-col hidden at <md · mobile accordion visible only at <md (md:hidden)
 *   accordion expand/collapse via AnimatePresence height · no horizontal scroll
 */

/**
 * TaxonomyTree — Market taxonomy (recipe row 10)
 *
 * Variant: editorial-light
 * Background: white · spacing: lg (LOCK 3)
 *
 * Desktop: 2-col split — left rail parent list · right panel children + description
 * Mobile: accordion tree (each parent expands)
 *
 * Access:
 *   public layer: parent + first-level children visible
 *   deep nodes: lead-gated (visual blur + CTA)
 *
 * A11y: ARIA tree pattern (role="tree" · role="treeitem" · aria-expanded)
 * TODO: promote accordion inline component to DS atom after sprint
 */

import { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Lock } from 'lucide-react';
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Button,
} from '@kenresearch/design-system/atoms';
import type { TaxonomyModule, TaxonomyNode } from '@/types/schema';
import { useLeadFormModal } from '@/components/LeadFormModalProvider';

// ─── Node depth gating ───────────────────────────────────────────────────────

const PUBLIC_DEPTH = 1; // parent (0) + first-level children (1) = public

function isPublicDepth(depth: number): boolean {
  return depth <= PUBLIC_DEPTH;
}

// ─── Desktop: left-rail + right-panel ───────────────────────────────────────

function DesktopTaxonomy({
  branches,
  root,
  reportSlug,
}: {
  branches: TaxonomyNode[];
  root: string;
  reportSlug: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { openForm } = useLeadFormModal();
  const panelId = useId();

  const activeBranch = branches[activeIdx];

  return (
    <div className="hidden md:grid grid-cols-[220px_1fr] gap-6 items-start">
      {/* Left rail — parent categories */}
      <nav aria-label="Market taxonomy categories">
        <ul role="tree" aria-label={`${root} taxonomy`} className="flex flex-col gap-1">
          {branches.map((branch, idx) => (
            <li key={branch.label} role="none">
              <div
                role="treeitem"
                aria-selected={activeIdx === idx}
                aria-expanded={activeIdx === idx}
                tabIndex={0}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIdx(idx); }
                  if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, branches.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
                }}
                className="flex items-center gap-2 py-2.5 px-3 rounded-[var(--radius-card)] cursor-pointer transition-colors"
                style={{
                  backgroundColor: activeIdx === idx ? 'var(--color-foundation-black)' : 'transparent',
                  color: activeIdx === idx ? 'var(--color-foundation-white)' : 'var(--color-foundation-black)',
                  outline: 'none',
                }}
                aria-controls={`${panelId}-panel`}
              >
                <span className="text-compact font-body">{branch.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right panel — children */}
      <div id={`${panelId}-panel`} aria-live="polite">
        <AnimatePresence mode="wait">
          {activeBranch && (
            <motion.div
              key={activeBranch.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="outlined" padding="lg" shadow="none">
                <div className="flex flex-col gap-4">
                  <h3
                    className="text-base font-display font-light"
                    style={{ color: 'var(--color-foundation-black)' }}
                  >
                    {activeBranch.label}
                  </h3>

                  {activeBranch.children && (
                    <ul className="flex flex-col gap-2" role="list">
                      {activeBranch.children.map((child) => (
                        <li key={child.label}>
                          <div className="flex flex-col gap-1.5">
                            <p
                              className="text-compact font-body font-medium"
                              style={{ color: 'var(--color-foundation-black)' }}
                            >
                              {child.label}
                            </p>

                            {/* Second-level children — lead-gated */}
                            {child.children && (
                              <ul className="pl-4 flex flex-col gap-1" role="list">
                                {child.children.map((grandchild, depth2Idx) => {
                                  const isLocked = depth2Idx > 1; // first 2 visible, rest gated
                                  return (
                                    <li
                                      key={grandchild.label}
                                      className="flex items-center gap-1.5"
                                      aria-label={
                                        isLocked
                                          ? `${grandchild.label} — Locked — sign in to unlock`
                                          : grandchild.label
                                      }
                                    >
                                      {isLocked ? (
                                        <>
                                          <Lock
                                            size={11}
                                            style={{ color: 'var(--surface-text-muted)' }}
                                            aria-hidden="true"
                                          />
                                          <span
                                            className="text-compact font-body"
                                            style={{
                                              color: 'var(--surface-text-muted)',
                                              filter: 'blur(3px)',
                                              userSelect: 'none',
                                            }}
                                            aria-hidden="true"
                                          >
                                            {grandchild.label}
                                          </span>
                                        </>
                                      ) : (
                                        <span
                                          className="text-compact font-body"
                                          style={{ color: 'var(--color-foundation-black)' }}
                                        >
                                          · {grandchild.label}
                                        </span>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Lead-gate CTA for deeper nodes */}
                  <div
                    className="pt-3 mt-1"
                    style={{ borderTop: '1px solid var(--border-soft)' }}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        openForm('sample', {
                          reportSlug,
                          ctaLocation: 'taxonomy-tree',
                          sectionName: 'taxonomy',
                        })
                      }
                    >
                      Unlock Full Taxonomy Map
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Mobile: accordion tree ──────────────────────────────────────────────────

function AccordionBranch({
  branch,
  depth,
  reportSlug,
}: {
  branch: TaxonomyNode;
  depth: number;
  reportSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { openForm } = useLeadFormModal();
  const isPublic = isPublicDepth(depth);
  const hasChildren = branch.children && branch.children.length > 0;
  const itemId = `accordion-${branch.label.replace(/\s+/g, '-').toLowerCase()}`;

  if (!hasChildren) {
    return (
      <li
        role="treeitem"
        aria-expanded={false}
        aria-selected={false}
        className="py-2 pl-3 text-compact font-body"
        style={{
          color: isPublic ? 'var(--color-foundation-black)' : 'var(--surface-text-muted)',
          paddingLeft: `${depth * 12 + 12}px`,
        }}
      >
        {branch.label}
      </li>
    );
  }

  const isGated = depth >= PUBLIC_DEPTH && !isPublic;

  return (
    <li role="treeitem" aria-expanded={open} aria-selected={false}>
      <div
        role="button"
        tabIndex={0}
        id={itemId}
        aria-expanded={open}
        {...(open && !isGated && branch.children ? { 'aria-controls': `${itemId}-content` } : {})}
        onClick={() => {
          if (isGated) {
            openForm('sample', {
              reportSlug,
              ctaLocation: 'taxonomy-tree-mobile',
              sectionName: 'taxonomy',
            });
          } else {
            setOpen((v) => !v);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isGated) {
              openForm('sample', {
                reportSlug,
                ctaLocation: 'taxonomy-tree-mobile',
                sectionName: 'taxonomy',
              });
            } else {
              setOpen((v) => !v);
            }
          }
        }}
        className="flex items-center justify-between gap-2 py-2.5 px-3 w-full text-left"
        style={{
          paddingLeft: `${depth * 12 + 12}px`,
          cursor: 'pointer',
        }}
      >
        <span
          className="text-compact font-body"
          style={{ color: isGated ? 'var(--surface-text-muted)' : 'var(--color-foundation-black)' }}
        >
          {branch.label}
          {isGated && (
            <Lock size={11} className="inline ml-1.5" style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
          )}
        </span>
        {!isGated && (
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          >
            <ChevronDown size={14} style={{ color: 'var(--surface-text-muted)' }} aria-hidden="true" />
          </motion.div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && !isGated && branch.children && (
          <motion.ul
            id={`${itemId}-content`}
            role="group"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {branch.children.map((child) => (
              <AccordionBranch
                key={child.label}
                branch={child}
                depth={depth + 1}
                reportSlug={reportSlug}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

// ─── TaxonomyTree ────────────────────────────────────────────────────────────

export interface TaxonomyTreeProps {
  taxonomy: TaxonomyModule;
  reportSlug?: string;
}

export function TaxonomyTree({ taxonomy, reportSlug = '' }: TaxonomyTreeProps) {
  return (
    <SectionWrapper background="white" spacing="lg" id="taxonomy">
      <div className="flex flex-col gap-8">
        <SectionHeading level={2} eyebrow="Taxonomy &amp; Scope" align="left">
          {taxonomy.heading ?? 'Market Taxonomy'}
        </SectionHeading>

        {/* Desktop layout */}
        <DesktopTaxonomy
          branches={taxonomy.branches}
          root={taxonomy.root}
          reportSlug={reportSlug}
        />

        {/* Mobile accordion */}
        <div className="md:hidden">
          <Card variant="outlined" padding="md" shadow="none">
            <ul
              role="tree"
              aria-label={`${taxonomy.root} taxonomy`}
              className="flex flex-col"
            >
              {taxonomy.branches.map((branch) => (
                <AccordionBranch
                  key={branch.label}
                  branch={branch}
                  depth={0}
                  reportSlug={reportSlug}
                />
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}
