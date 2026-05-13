'use client';

import { ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@kenresearch/design-system/atoms';
import type { BreadcrumbCrumb } from '@/types/schema';

interface BreadcrumbProps {
  crumbs: BreadcrumbCrumb[];
}

/**
 * Breadcrumb — semantic trail nav.
 * Recipe row 2: bg white · spacing sm · motion static.
 * Last crumb = aria-current="page" w/ no link.
 */
export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <SectionWrapper background="white" spacing="sm">
      <nav aria-label="breadcrumb">
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
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] text-[var(--color-foundation-black)] truncate max-w-[16rem]"
                    itemProp="name"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <a
                      href={crumb.href}
                      className="text-[var(--typography-size-compact)] font-[var(--typography-family-body)] text-[var(--surface-text-muted)] hover:text-[var(--color-foundation-black)] transition-colors duration-150 whitespace-nowrap"
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </a>
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-[var(--surface-text-muted)]"
                      strokeWidth={1.5}
                      aria-hidden
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
