/**
 * TrackedButton - Button component with built-in analytics tracking
 * 
 * Wraps the design system Button and automatically tracks all CTA clicks
 */

import { Button, ButtonProps } from '@/design-system/Button';
import { useAnalytics } from '../hooks/useAnalytics';

interface TrackedButtonProps extends ButtonProps {
  trackingName: string;
  trackingSection: string;
  trackingMetadata?: Record<string, any>;
}

export function TrackedButton({ 
  trackingName, 
  trackingSection, 
  trackingMetadata,
  onClick,
  children,
  ...buttonProps 
}: TrackedButtonProps) {
  const { trackCTAClick } = useAnalytics();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the CTA click
    trackCTAClick(trackingName, trackingSection, trackingMetadata);
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
}
