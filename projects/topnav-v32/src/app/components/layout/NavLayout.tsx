/**
 * NavLayout — Top navigation layout wrapper (TEMPLATE level)
 *
 * WHY:   This is the routing template that wraps all pages with the navbar.
 *        After extracting TopNavigation, it's a ~30-line thin shell:
 *        one component for the nav, one <Outlet /> for page content.
 * WHAT:  Composes TopNavigation organism (entire nav experience) + <Outlet />.
 * WHEN:  Rendered as the root layout in React Router (wraps all pages).
 * WHERE: /src/app/components/layout/NavLayout.tsx -> routes.ts
 * HOW:   Used as `Component` in createBrowserRouter route config.
 *
 * Architecture:
 *   ┌─────────────────────────────────────────────────────┐
 *   │ TopNavigation (full nav — hooks + organisms)        │
 *   │   ├── SkipLink (accessibility)                      │
 *   │   ├── ARIA Live Region (announcements)              │
 *   │   ├── SecondaryBar (desktop only, 40px)             │
 *   │   │   ├── NavLink x 2 (Procurement, Expert Panel)  │
 *   │   │   ├── CompanyTrigger + CompanyDropdown           │
 *   │   │   └── AuthButtons OR AuthAvatar+Popover         │
 *   │   └── Sticky Section                                │
 *   │       ├── Backdrop overlay (mega menu blur)         │
 *   │       ├── PrimaryNav (60px)                         │
 *   │       │   ├── LogoButton                            │
 *   │       │   ├── MobileControls (< 1024px)             │
 *   │       │   └── DesktopNavItems (>= 1024px)           │
 *   │       ├── MegaMenuDropdowns x N                     │
 *   │       └── MobileMenu (push overlay)                 │
 *   ├─────────────────────────────────────────────────────┤
 *   │ <main id="main-content"><Outlet /></main>           │
 *   └─────────────────────────────────────────────────────┘
 */

import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

// Navbar — single drop-in component
import { TopNavigation } from '../navbar/organisms';
import type { NavItemConfig, MegaMenuEntry } from '../navbar/types';

// Design system
import { Button } from '../ds/Button';
import { Logo } from '../../../design-system/components/Logo';

// Mega menu dropdowns (consumer-provided content)
import { CompanyDropdown } from '../CompanyDropdown';
import { ConsultingDropdown } from '../ConsultingDropdown';
import { IndustriesDropdown } from '../IndustriesDropdown';
import { InsightsDropdown } from '../InsightsDropdown';
import { SurveyDropdown } from '../SurveyDropdown';
import { ReportsDropdown } from '../ReportsDropdown';

// Mobile push menu (consumer-provided content)
import { MobileMenu } from '../mobile/MobileMenu';

// Footer
import { Footer } from './Footer';

// ─── Nav configuration (single source of truth) ───────────────────────
const NAV_ITEMS: NavItemConfig[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'industries', label: 'Industries' },
  { id: 'survey', label: 'Surveys' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'insights', label: 'Insights' },
];

const MEGA_MENUS: MegaMenuEntry[] = [
  { id: 'consulting', render: (isOpen) => <ConsultingDropdown isOpen={isOpen} /> },
  { id: 'industries', render: (isOpen) => <IndustriesDropdown isOpen={isOpen} /> },
  { id: 'insights', render: (isOpen) => <InsightsDropdown isOpen={isOpen} /> },
  { id: 'survey', render: (isOpen) => <SurveyDropdown isOpen={isOpen} /> },
  { id: 'reports', render: (isOpen) => <ReportsDropdown isOpen={isOpen} /> },
];

export function NavLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation
        logo={<Logo size="sm" />}
        isAuthenticated={isAuthenticated}
        user={user}
        onNavigate={(path) => navigate(path)}
        onSignOut={() => { logout(); navigate('/'); }}
        items={NAV_ITEMS}
        megaMenus={MEGA_MENUS}
        ctaButton={<Button variant="brand" size="sm">Book discovery call</Button>}
        companyDropdown={(isOpen) => <CompanyDropdown isOpen={isOpen} />}
        mobileMenu={(isOpen, onClose) => <MobileMenu isOpen={isOpen} onClose={onClose} />}
      />

      {/* Page Content */}
      <main id="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}