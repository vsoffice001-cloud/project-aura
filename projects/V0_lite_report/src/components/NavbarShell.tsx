'use client';

import { TopNavigation } from '@kenresearch/design-system/organisms';
import { Button } from '@kenresearch/design-system/atoms';
import { Logo } from './Logo';

/**
 * NavbarShell — V0_lite_report consumer wrapper around DS <TopNavigation>.
 *
 * Wires:
 *   - logo render slot → <Logo/>
 *   - ctaButton slot → <Button variant="brand" size="sm"> Book discovery </Button>
 *   - onNavigate → window-location for now (Next router migration when routes exist)
 *   - onSignOut → no-op stub
 *   - companyDropdown / mobileMenu → null (mega-menu data not built yet — Phase E adds)
 *
 * Phase C step 4e — replaces legacy NewHeader.
 */
export function NavbarShell() {
  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') window.location.href = path;
  };

  const handleSignOut = () => {
    // TODO: wire to consumer auth context once defined.
  };

  return (
    <TopNavigation
      logo={<Logo />}
      isAuthenticated={false}
      onNavigate={handleNavigate}
      onSignOut={handleSignOut}
      ctaButton={
        <Button variant="brand" size="sm" onClick={() => handleNavigate('/contact')}>
          Book discovery call
        </Button>
      }
    />
  );
}
