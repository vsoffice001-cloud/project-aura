'use client';

/**
 * CRAFT (aura-craft step 4.5 · 2026-05-12)
 * Section type: nav-strip
 * Lead element: chip row (breadcrumb trail — Industry > SubIndustry > Report)
 * Support: chevron separators (muted opacity · non-interactive visual)
 * Type rhythm: text-compact / — / — / — (xs contextual nav — no headline needed)
 * Motion event: static — no animation (nav-strips never animate · Cat 3 principle)
 * Depth: borders-only (nav-strip type · white bg · no shadow needed)
 * Mobile override: flex-wrap ensures chips wrap cleanly at 390px; no truncation
 */

/**
 * Breadcrumb — Report PDP breadcrumb trail
 *
 * Variant: editorial-light
 * Background: white · spacing: sm (per LOCK 3 recipe)
 * Access: public
 */

import { ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@kenresearch/design-system/atoms';
import type { BreadcrumbCrumb } from '@/types/schema';

export interface BreadcrumbProps {
  crumbs: BreadcrumbCrumb[];
}

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <SectionWrapper background="white" spacing="sm" id="breadcrumb">
      <nav aria-label="Breadcrumb">
        <ol
          className="flex flex-wrap items-center gap-1"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li
                key={crumb.href}
                className="inline-flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    className="text-compact font-body"
                    style={{ color: 'var(--color-foundation-black)', opacity: 0.6 }}
                    aria-current="page"
                    itemProp="name"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <a
                      href={crumb.href}
                      className="text-compact font-body transition-colors duration-150 underline-offset-2 hover:underline"
                      style={{ color: 'var(--surface-text-muted)' }}
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </a>
                    <ChevronRight
                      size={12}
                      className="opacity-40 flex-shrink-0"
                      style={{ color: 'var(--surface-text-muted)' }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <meta itemProp="position" content={String(i + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </SectionWrapper>
  );
}
