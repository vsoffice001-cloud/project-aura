/**
 * ReportStoreHero — Organism (DS v4.3)
 *
 * WHAT: Report Store hero section wrapping ProductHero with RS-specific defaults.
 * WHY:  Encapsulates the hero configuration so the template doesn't inline props.
 * WHEN: Top of ReportStorePage (Home mode).
 * HOW:  Thin wrapper around ProductHero with HERO_CONFIG from data.ts.
 */
import { ProductHero } from '@/app/components/organisms/ProductHero';
import { HERO_CONFIG } from '@/app/components/data';

export function ReportStoreHero() {
  return (
    <ProductHero
      label={HERO_CONFIG.label}
      title={HERO_CONFIG.title}
      subtitle={HERO_CONFIG.subtitle}
      searchPlaceholder={HERO_CONFIG.searchPlaceholder}
      badges={[...HERO_CONFIG.badges]}
    />
  );
}
