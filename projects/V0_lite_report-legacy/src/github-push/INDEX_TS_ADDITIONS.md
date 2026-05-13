<!--
  ADDITIONS TO: src/app/components/index.ts
  
  Add these exports after the existing "Utility Components" section,
  before the "Modal/Overlay Components" section.
-->

```typescript
// Layout Components (NEW)
export { SectionHeading } from './SectionHeading';
export { SectionWrapper } from './SectionWrapper';
export { Card } from './Card';

// Scroll Components (NEW)
export { ScrollToTop } from './ScrollToTop';
export { ScrollProgress } from './ScrollProgress';

// Icon System (NEW)
export { iconColors, getIconColor } from './iconColors';
export type { IconColorType } from './iconColors';
```

<!--
  The full updated "Utility Components" + new sections should read:
-->

```typescript
// Utility Components
export { CodeBlockWithCopy } from './CodeBlockWithCopy';
export { CollapsibleSection } from './CollapsibleSection';
export { VariantSwitcher } from './VariantSwitcher';
export { ReadingProgressBar } from './ReadingProgressBar';
export { TableOfContents } from './TableOfContents';

// Layout Components
export { SectionHeading } from './SectionHeading';
export { SectionWrapper } from './SectionWrapper';
export { Card } from './Card';

// Scroll Components
export { ScrollToTop } from './ScrollToTop';
export { ScrollProgress } from './ScrollProgress';

// Icon System
export { iconColors, getIconColor } from './iconColors';
export type { IconColorType } from './iconColors';

// Modal/Overlay Components
export { ContactModal } from './ContactModal';
export { StickyCTA } from './StickyCTA';
```
