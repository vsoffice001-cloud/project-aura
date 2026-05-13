<!--
  ADDITIONS TO: GITHUB_REPO_MANIFEST.md
  
  Add to the "Interactive Components" table in the
  "src/app/components/ - Core Components" section.
-->

### Layout Components (NEW)

| File | Purpose |
|------|---------|
| `SectionHeading.tsx` | Reusable heading molecule (eyebrow + h1/h2/h3, Major Third scale) |
| `SectionWrapper.tsx` | Page section layout wrapper (background, spacing, max-width) |
| `Card.tsx` | Content container molecule (variant, padding, shadow, hover) |
| `ScrollToTop.tsx` | Floating action button — scroll to top (Motion animated) |
| `ScrollProgress.tsx` | Generic scroll depth progress bar (brand red, z-9999) |
| `iconColors.ts` | Semantic icon color constants (content=#806ce0, utility=#737373) |

<!--
  Note: ReadingProgressBar.tsx (already in repo) is the case-study-specific
  version. ScrollProgress.tsx is the generic version for any page.
  
  Update the file count at the bottom:
  **Total Files on GitHub:** ~101 files across 4 main directories
-->

<!--
  Add to Version History table:
-->

| Date | Changes |
|------|---------|
| Feb 28, 2026 | v3.3 sync: Added 6 new components (SectionHeading, SectionWrapper, Card, ScrollToTop, ScrollProgress, iconColors); Updated COMPONENT_GUIDELINES_4WH.md with 4W+H docs for all new components; Updated index.ts barrel exports |
