/**
 * CustomResearchCTA — Organism (DS v4.3)
 *
 * WHAT: Report Store–specific CTA banner wrapping CTABanner with RS copy.
 * WHY:  Encapsulates the final CTA configuration.
 * WHEN: Section 8 of ReportStorePage (Home mode), or bottom of listing page.
 * HOW:  Thin wrapper around CTABanner with CTA_CONFIG from data.ts.
 */
import { CTABanner } from '@/app/components/organisms/CTABanner';
import { CTA_CONFIG } from '@/app/components/data';

interface CustomResearchCTAProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function CustomResearchCTA({ onPrimaryClick, onSecondaryClick }: CustomResearchCTAProps) {
  return (
    <CTABanner
      label={CTA_CONFIG.label}
      title={CTA_CONFIG.title}
      subtitle={CTA_CONFIG.subtitle}
      primaryText={CTA_CONFIG.primaryText}
      primaryShowArrow
      secondaryText={CTA_CONFIG.secondaryText}
      onPrimaryClick={onPrimaryClick}
      onSecondaryClick={onSecondaryClick}
    />
  );
}