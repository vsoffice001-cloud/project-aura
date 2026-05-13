/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ DEPRECATED - BADGES & LABELS DESIGN SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This directory is DEPRECATED as of [Current Date].
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🚨 MIGRATION REQUIRED                                                    ║
 * ║                                                                           ║
 * ║  The badge system has been unified into a single, scalable component:    ║
 * ║  → /src/app/components/Badge.tsx                                         ║
 * ║                                                                           ║
 * ║  Please update your imports:                                             ║
 * ║                                                                           ║
 * ║  ❌ OLD (deprecated):                                                     ║
 * ║  import { SectionLabel } from '@/app/components/badges';                 ║
 * ║                                                                           ║
 * ║  ✅ NEW (recommended):                                                    ║
 * ║  import { SectionLabel } from '@/app/components/Badge';                  ║
 * ║                                                                           ║
 * ║  📖 Documentation: /src/app/components/BADGE_SYSTEM.md                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * WHY THE CHANGE?
 * 
 * The old system had 5+ fragmented components with:
 * ❌ Inconsistent APIs (different prop names across components)
 * ❌ Code duplication (similar styling logic repeated)
 * ❌ No clear use case documentation
 * ❌ Difficult to extend (need new file for each variant)
 * 
 * The new Badge system provides:
 * ✅ Single source of truth for all badge variants
 * ✅ Flexible, semantic prop API
 * ✅ Design token-based (uses theme.css)
 * ✅ WCAG AAA compliant
 * ✅ Comprehensive documentation
 * ✅ Easy to customize and extend
 * 
 * MIGRATION GUIDE:
 * 
 * 1. SectionLabel:
 *    import { SectionLabel } from '@/app/components/Badge';
 *    // API unchanged
 * 
 * 2. ObjectivePill:
 *    import { ObjectivePill, ObjectivePillInteractive } from '@/app/components/Badge';
 *    // API updated: objectiveNumber instead of number
 * 
 * 3. InfoCardLabel:
 *    import { InfoCardLabel } from '@/app/components/Badge';
 *    // API simplified
 * 
 * 4. Custom badges:
 *    import { Badge } from '@/app/components/Badge';
 *    <Badge variant="pill" size="sm" theme="warm" bordered shimmer>
 *      Custom
 *    </Badge>
 */

// ═══════════════════════════════════════════════════════════════════════════
// RE-EXPORTS FROM NEW BADGE SYSTEM (For backward compatibility)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @deprecated Use `import { Badge } from '@/app/components/Badge'` instead
 */
export { 
  Badge,
  Badge as default,
} from '../Badge';

/**
 * @deprecated Use `import { SectionLabel } from '@/app/components/Badge'` instead
 */
export { 
  SectionLabel,
  // Legacy exports that still work
  CategoryBadge as CategoryLabel,
} from '../Badge';

/**
 * @deprecated Use `import { ObjectivePill, ObjectivePillInteractive } from '@/app/components/Badge'` instead
 */
export { 
  ObjectivePill,
  ObjectivePillInteractive,
} from '../Badge';

/**
 * @deprecated Use `import { InfoCardLabel } from '@/app/components/Badge'` instead
 */
export { 
  InfoCardLabel,
} from '../Badge';

/**
 * @deprecated Use `import { StepPill } from '@/app/components/Badge'` instead
 */
export { 
  StepPill,
} from '../Badge';

/**
 * @deprecated Use `import { StatusBadge } from '@/app/components/Badge'` instead
 */
export { 
  StatusBadge,
  CategoryBadge,
} from '../Badge';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @deprecated Use types from '@/app/components/Badge' instead
 */
export type {
  BadgeProps,
  BadgeVariant,
  BadgeSize,
  BadgeTheme,
  BadgeMode,
} from '../Badge';

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY COMPONENT EXPORTS (Still functional but deprecated)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * These exports maintain backward compatibility with the old API.
 * They will continue to work but should be migrated to the new Badge system.
 */

// InfoCard components (not part of Badge system, specific UI components)
export {
  InfoCard,
  HeroInfoCardGrid,
  StatCard,
} from './InfoCardLabel';

export type {
  InfoCardProps,
} from './InfoCardLabel';

// SectionLabel helper components (consider migrating to Badge variants)
export {
  SectionLabelWithHeading,
  PublicationDateLabel,
} from './SectionLabel';

export type {
  SectionLabelProps,
  SectionLabelWithHeadingProps,
} from './SectionLabel';

// ObjectivePill helper (consider building with Badge component)
export {
  ObjectivePillGroup,
} from './ObjectivePill';

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS (For reference - use Badge system tokens instead)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @deprecated Use `BADGE_TOKENS` from '@/app/components/Badge' instead
 */
export { 
  BADGE_TOKENS,
  BADGE_TOKENS as SECTION_LABEL_TOKENS,
  BADGE_TOKENS as OBJECTIVE_PILL_TOKENS,
  BADGE_TOKENS as INFO_CARD_LABEL_TOKENS,
} from '../Badge';

// ═══════════════════════════════════════════════════════════════════════════
// MIGRATION TIMELINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PHASE 1 (Current): Backward compatibility maintained
 * - All old imports continue to work
 * - New Badge system available alongside old components
 * - Deprecation warnings in documentation
 * 
 * PHASE 2 (Future): Gradual migration
 * - Update imports across codebase to use new Badge system
 * - Remove old component files once migration complete
 * - Keep InfoCard, HeroInfoCardGrid, StatCard (UI components, not badges)
 * 
 * PHASE 3 (Cleanup): Remove deprecated exports
 * - Delete old component files
 * - Remove this compatibility layer
 * - Keep only new Badge system
 */
