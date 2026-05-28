'use client';

/**
 * ShowcaseContent · Registry-driven content pane.
 *
 * Reads search from context · filters DEMOS · renders per-category sections.
 * Must be a child of ShowcaseProviders (inside ShowcaseLayout).
 *
 * @module charts-showcase/components/ShowcaseContent
 */

import { useMemo } from 'react';
import { DEMOS, CATEGORY_META, CATEGORY_ORDER } from '@/lib/demo-registry';
import { useSearch, useCategoryFilter } from '@/lib/context';
import { DemoCanvas } from './DemoCanvas';

export function ShowcaseContent() {
  const { search } = useSearch();
  const { visibleCategories } = useCategoryFilter();

  const filtered = useMemo(() => {
    let result = DEMOS.filter(d => visibleCategories.has(d.category));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, visibleCategories]);

  return (
    <>
      {/* Page intro */}
      <div style={{ marginBottom: '40px' }}>
        <p
          className="font-body uppercase tracking-[0.12em] text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '10px', fontWeight: 600, marginBottom: '8px' }}
        >
          @kenresearch/design-system/charts · Sprint B.2 · 2026-05-25
        </p>
        <h1
          className="font-display font-light text-[var(--semantic-ink-strong)]"
          style={{
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '10px',
          }}
        >
          Chart Library Showcase
        </h1>
        <p
          className="font-body text-[var(--semantic-ink-body)]"
          style={{ fontSize: '14px', maxWidth: '52ch', lineHeight: 1.65 }}
        >
          Live preview of {DEMOS.length} components exported from the Ken Research design system charts barrel.
          All data is mock · educational only.
        </p>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p
          className="font-body italic text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '14px' }}
        >
          No components match &ldquo;{search}&rdquo;. Try searching for a component name or category.
        </p>
      )}

      {/* Category sections — mb-16 (64px) between groups per spacing rhythm spec */}
      {CATEGORY_ORDER.map(cat => {
        const catDemos = filtered.filter(d => d.category === cat);
        if (catDemos.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <section
            key={cat}
            aria-labelledby={`section-${cat}`}
            className="mb-16"
          >
            {/* Section header — mb-8 (32px) below per spacing rhythm spec */}
            <div className="mb-8">
              <h2
                id={`section-${cat}`}
                className="font-display text-[var(--semantic-ink-strong)]"
                style={{
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  marginBottom: '6px',
                }}
              >
                {meta.label}
              </h2>
              <p
                className="font-body text-[var(--semantic-ink-muted)]"
                style={{ fontSize: '12px', lineHeight: 1.6 }}
              >
                {meta.description}
              </p>
              <div
                style={{
                  height: '1px',
                  background: 'rgba(0,0,0,0.08)',
                  marginTop: '16px',
                }}
              />
            </div>

            {/* Demo cards — alternating bg per 3-pane card-level pattern */}
            {catDemos.map((demo, idx) => (
              <DemoCanvas key={demo.id} demo={demo} cardIndex={idx} />
            ))}
          </section>
        );
      })}

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: '20px',
          marginTop: '32px',
          marginBottom: '40px',
        }}
      >
        <p
          className="font-body text-[var(--semantic-ink-muted)]"
          style={{ fontSize: '11px' }}
        >
          @kenresearch/design-system · charts barrel · Sprint B.2 · 2026-05-25 · aura-builder Sonnet 4.6
        </p>
      </footer>
    </>
  );
}
