/**
 * DesktopNavItems — Primary nav triggers + search + CTA button
 *
 * WHY:   The 5 dropdown triggers, search bar, and CTA button form a cohesive
 *        desktop-only navigation strip. Grouping them as one organism keeps
 *        the main NavBar component thin.
 * WHAT:  A horizontal flex row (hidden on mobile/tablet, visible >=1024px) containing:
 *        - N NavDropdownTrigger molecules (configurable via `items` prop)
 *        - SearchBar molecule with beam animation
 *        - Design System Brand Button (sm, no arrow, 32px height)
 *        Gap: 24px between triggers (responsive: 32px at xl via gap-6 xl:gap-8)
 * WHEN:  Visible only on desktop (>=1024px).
 * WHERE: NavBar component (right section of primary nav).
 * HOW:   <DesktopNavItems items={NAV_ITEMS} activeDropdown={state} handlers={handlers} />
 *
 * Props:
 *   items          — Array of { id, label } nav item descriptors (injectable)
 *   activeDropdown — Current open dropdown ID
 *   onMouseEnter   — Hover enter for each trigger
 *   onKeyDown      — Keyboard handler for each trigger
 */

import { NavDropdownTrigger } from '../molecules/NavDropdownTrigger';
import { SearchBar } from '../molecules/SearchBar';
import type { NavItemConfig } from '../types';
import type { ReactNode } from 'react';

/** Default nav items — used when no `items` prop is provided */
const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
  { id: 'survey', label: 'Surveys' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'insights', label: 'Insights' },
];

interface DesktopNavItemsProps {
  items?: NavItemConfig[];
  activeDropdown: string | null;
  onMouseEnter: (menu: string) => void;
  onKeyDown: (e: React.KeyboardEvent, menu: string) => void;
  /** Injected CTA button — keeps DS Button outside the package boundary */
  ctaButton?: ReactNode;
}

export function DesktopNavItems({
  items = DEFAULT_NAV_ITEMS,
  activeDropdown,
  onMouseEnter,
  onKeyDown,
  ctaButton,
}: DesktopNavItemsProps) {
  return (
    <>
      {/* Nav triggers + Search — hidden on mobile */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {items.map((item) => (
          <NavDropdownTrigger
            key={item.id}
            label={item.label}
            isOpen={activeDropdown === item.id}
            onMouseEnter={() => onMouseEnter(item.id)}
            onKeyDown={(e) => onKeyDown(e, item.id)}
          />
        ))}

        <SearchBar />
      </div>

      {/* CTA Button — injected from consumer */}
      {ctaButton && (
        <div className="hidden lg:block">
          {ctaButton}
        </div>
      )}
    </>
  );
}