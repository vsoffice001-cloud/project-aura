// SHIM: kenresearch.com owns canonical Footer. This is a placeholder until live site embed. DO NOT EXPAND.

/**
 * Footer — Row 34 — Recipe report-detail.md line 75
 * bg: black · static · SHIM ONLY
 */

import Link from 'next/link';
import { SectionWrapper } from '@kenresearch/design-system/atoms';

const NAV_LINKS = [
  { label: 'Reports', href: '/reports' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Custom Research', href: '/custom-research' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site footer">
      <SectionWrapper background="black" spacing="md">
        <div className="flex flex-col gap-6">
          {/* Wordmark + nav */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Wordmark */}
            <span
              className="font-[var(--typography-family-display)] font-semibold tracking-tight"
              style={{ fontSize: 'var(--typography-size-lg)', color: 'var(--color-foundation-white)' }}
            >
              Ken Research
            </span>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-4 md:gap-6 list-none m-0 p-0">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        fontSize: 'var(--typography-size-sm)',
                        color: 'rgba(250, 250, 250, 0.55)',
                        outlineColor: 'var(--color-foundation-white)',
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(250, 250, 250, 0.1)' }} />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p
              className="text-xs"
              style={{ color: 'rgba(250, 250, 250, 0.35)' }}
            >
              &copy; {currentYear} Ken Research Private Limited. All rights reserved.
            </p>
            <p
              className="text-xs"
              style={{ color: 'rgba(250, 250, 250, 0.25)' }}
            >
              Market Intelligence · Strategic Research · Data-led Decisions
            </p>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
