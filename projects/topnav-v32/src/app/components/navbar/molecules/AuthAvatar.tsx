/**
 * AuthAvatar — Re-export from Design System
 *
 * The canonical Avatar now lives at /src/design-system/components/Avatar.tsx.
 * This file provides a thin adapter that maps the navbar's AuthAvatar interface
 * (user?: { initials } prop) to the DS Avatar interface (initials?: string prop).
 *
 * @deprecated Import { Avatar } from '../../../../design-system/components' instead.
 */

import { forwardRef } from 'react';
import { Avatar } from '../../../../design-system/components/Avatar';

interface AuthAvatarProps {
  size?: 'sm' | 'md';
  user?: { initials: string } | null;
  isActive: boolean;
  onClick: () => void;
}

export const AuthAvatar = forwardRef<HTMLButtonElement, AuthAvatarProps>(
  ({ size = 'md', user, isActive, onClick }, ref) => {
    return (
      <Avatar
        ref={ref}
        size={size}
        initials={user?.initials}
        isActive={isActive}
        onClick={onClick}
      />
    );
  }
);

AuthAvatar.displayName = 'AuthAvatar';
