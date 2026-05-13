/**
 * FOUNDATIONS CONTENT - Re-export Hub
 * ====================================
 * This file re-exports all Foundations tab content from modular sub-files.
 * All consuming files (e.g., DesignSystemDashboard.tsx) import from this path,
 * so no import changes are needed elsewhere.
 */

// Shared helpers (used by all foundations sub-files)
export { DocSection } from './foundations/FoundationsHelpers';

// Main content sections
export { ColorsContent } from './foundations/ColorsContent';
export { TypographyContent } from './foundations/TypographyContent';
export { SpacingContent } from './foundations/SpacingContent';
export { LayoutGridContent } from './foundations/LayoutGridContent';
export { ElevationContent, BorderRadiusContent } from './foundations/ElevationBorderRadius';

// "All Tokens" expanded views (already in separate files)
export { AllColorsPaletteContent } from '@/app/components/AllColorsPaletteContent';
export { AllTypographyTokensContent } from '@/app/components/AllTypographyTokensContent';
export { AllSpacingTokensContent } from '@/app/components/AllSpacingTokensContent';
export { AllLayoutGridTokensContent } from '@/app/components/AllLayoutGridTokensContent';
export { AllElevationTokensContent } from '@/app/components/AllElevationTokensContent';
export { AllBorderRadiusTokensContent } from '@/app/components/AllBorderRadiusTokensContent';
