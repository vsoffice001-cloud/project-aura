'use client';

import { TopNavigation } from '@kenresearch/design-system/organisms';
import { Button } from '@kenresearch/design-system/atoms';
import { Logo } from './Logo';

/**
 * NavbarShell — V0.2_report consumer wrapper around DS <TopNavigation>.
 */
export function NavbarShell() {
  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') window.location.href = path;
  };

  const handleSignOut = () => {
    // TODO: wire to consumer auth context.
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
