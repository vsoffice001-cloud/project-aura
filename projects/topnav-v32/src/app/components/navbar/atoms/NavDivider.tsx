/**
 * NavDivider — Re-export from Design System
 *
 * The canonical Divider now lives at /src/design-system/components/Divider.tsx.
 * This file maps the navbar-specific name to the DS primitive for backward
 * compatibility. All new code should import Divider from the DS directly.
 *
 * @deprecated Import { Divider } from '../../../../design-system/components' instead.
 */
import { Divider } from '../../../../design-system/components/Divider';

interface NavDividerProps {
  className?: string;
}

export function NavDivider({ className = '' }: NavDividerProps) {
  return <Divider className={className} />;
}
