/**
 * VS Design System - Custom Hooks
 * 
 * Reusable React hooks for design system patterns.
 * Import hooks using: import { useShimmer } from '@/app/hooks'
 */

// 🎯 CORE INTERACTION HOOKS
export { useShimmer } from './useShimmer';

// Scroll & Navigation Hooks
export { useActiveSection } from './useActiveSection';
export { useScrollDirection } from './useScrollDirection';
export { useScrollAnimation } from './useScrollAnimation';
export { useReadingProgress } from './useReadingProgress';
export { useSectionProgress } from './useSectionProgress';
export { useHeroVisibility } from './useHeroVisibility';

// Utility Hooks
export { useCounter } from './useCounter';
export { useMagneticEffect } from './useMagneticEffect';

// Layout Hooks
export { useResponsiveGutter } from './useResponsiveGutter';

// ── Report Store Hooks (v4.3) ────────────────────────────────
export { useReportFilters } from './useReportFilters';
export type { ActiveChip, ReportFilters } from './useReportFilters';
export { useProgressiveLoad } from './useProgressiveLoad';
export { useCrossfade } from './useCrossfade';
export { useMountTransition } from './useMountTransition';