# 📝 EXACT FILES TO DELETE - REVIEW DOCUMENT

**Date:** February 13, 2026  
**Total Files to Delete:** 94 files  
**Total Size:** ~5-8 MB (estimated)

---

## 📂 FILE DELETION BREAKDOWN

---

## 🗑️ GROUP 1: /design-system/ (13 files)

**Location:** Root folder  
**Purpose:** Old design system tokens and documentation  
**Why Delete:** Replaced by CSS variables in `/src/styles/theme.css`  
**Risk:** ⚠️ ONE dependency (`DesignSystemPage.tsx` - which is also unused)

### Files to Delete:

```
📄 CHANGELOG.md                      (245 lines - version history)
📄 DEVELOPER-HANDOVER-PACKAGE.md     (580 lines - old handover docs)
📄 FOLDER-STRUCTURE.md               (195 lines - folder structure docs)
📄 HANDOVER-GUIDE.md                 (610 lines - handover guide)
📄 QUICK-REFERENCE.md                (430 lines - quick reference)
📄 README.md                         (890 lines - main documentation)
📄 SUMMARY.md                        (310 lines - summary docs)
📄 TYPOGRAPHY-GUIDE.md               (420 lines - typography guide)
📄 WHATS-NEW-2.0.1.md               (180 lines - changelog)

💻 colors.ts                         (TypeScript design tokens)
💻 index.ts                          (Main export file)
💻 spacing.ts                        (Spacing tokens)
💻 typography.ts                     (Typography tokens)
```

**Total:** 13 files (9 markdown, 4 TypeScript)

---

## 🗑️ GROUP 2: /src/design-system/ (51 files)

**Location:** Source folder - parallel atomic design system  
**Purpose:** Atomic design components (atoms/molecules/organisms)  
**Why Delete:** Duplicates of `/src/app/components/` and `/src/app/components/ui/`  
**Risk:** 🟢 LOW - No active imports found

### 📁 ATOMS (15 files)

```
./components/atoms/Badge/
├── 💻 Badge.tsx                     (Badge component - duplicate of ui/badge.tsx)
└── 💻 index.ts                      (Export file)

./components/atoms/Button/
├── 💻 Button.tsx                    (Button component - duplicate of ui/button.tsx)
└── 💻 index.ts                      (Export file)

./components/atoms/Divider/
├── 💻 Divider.tsx                   (Divider component)
└── 💻 index.ts                      (Export file)

./components/atoms/Heading/
├── 💻 Heading.tsx                   (Heading component)
└── 💻 index.ts                      (Export file)

./components/atoms/IconWrapper/
├── 💻 IconWrapper.tsx               (Icon wrapper component)
└── 💻 index.ts                      (Export file)

./components/atoms/StatCard/
├── 💻 StatCard.tsx                  (StatCard - duplicate of ui/stat-card.tsx)
└── 💻 index.ts                      (Export file)

./components/atoms/Text/
├── 💻 Text.tsx                      (Text component)
└── 💻 index.ts                      (Export file)

💻 ./components/atoms/index.ts       (Atoms barrel export)
```

### 📁 MOLECULES (13 files)

```
./components/molecules/Card/
├── 💻 Card.tsx                      (Card component - duplicate of ui/card.tsx)
└── 💻 index.ts                      (Export file)

./components/molecules/List/
├── 💻 List.tsx                      (List component)
└── 💻 index.ts                      (Export file)

./components/molecules/Section/
├── 💻 Section.tsx                   (Section component)
└── 💻 index.ts                      (Export file)

./components/molecules/Table/
├── 💻 Table.tsx                     (Table component - duplicate of ui/table.tsx)
└── 💻 index.ts                      (Export file)

./components/molecules/TableOfContents/
├── 💻 TableOfContents.tsx           (TOC - duplicate of ui/table-of-contents.tsx)
└── 💻 index.ts                      (Export file)

💻 ./components/molecules/index.ts   (Molecules barrel export)
```

### 📁 ORGANISMS (17 files)

```
./components/organisms/CTASection/
├── 💻 CTASection.tsx                (CTA Section component)
└── 💻 index.ts                      (Export file)

./components/organisms/FAQSection/
├── 💻 FAQSection.tsx                (FAQ - duplicate of components/FAQSection.tsx)
└── 💻 index.ts                      (Export file)

./components/organisms/FeatureShowcase/
├── 💻 FeatureShowcase.tsx           (Feature showcase component)
└── 💻 index.ts                      (Export file)

./components/organisms/Footer/
├── 💻 Footer.tsx                    (Footer - duplicate of components/Footer.tsx)
└── 💻 index.ts                      (Export file)

./components/organisms/Header/
├── 💻 Header.tsx                    (Header - duplicate of components/Header.tsx)
└── 💻 index.ts                      (Export file)

./components/organisms/Hero/
├── 💻 Hero.tsx                      (Hero component)
└── 💻 index.ts                      (Export file)

./components/organisms/StatsSection/
├── 💻 StatsSection.tsx              (Stats section component)
└── 💻 index.ts                      (Export file)

💻 ./components/organisms/index.ts   (Organisms barrel export)
```

### 📁 TOKENS (6 files)

```
💻 ./tokens/borders.ts               (Border design tokens)
💻 ./tokens/colors.ts                (Color design tokens)
💻 ./tokens/index.ts                 (Tokens barrel export)
💻 ./tokens/shadows.ts               (Shadow design tokens)
💻 ./tokens/spacing.ts               (Spacing design tokens)
💻 ./tokens/typography.ts            (Typography design tokens)
```

### 📁 DOCS (2 files)

```
📄 ./docs/color-usage-guide.md       (Color usage documentation)
📄 ./docs/patterns-guide.md          (Patterns documentation)
```

### 📁 ROOT (2 files)

```
💻 ./components/index.ts             (Main components barrel export)
```

**Total:** 51 files (45 TypeScript components, 4 TypeScript tokens, 2 markdown docs)

---

## 🗑️ GROUP 3: /design-system-export/ (15 files)

**Location:** Root folder - export package  
**Purpose:** Exportable design system package  
**Why Delete:** Not used, old export attempt  
**Risk:** 🟢 LOW - No active imports

### Files to Delete:

```
📁 components/
├── 💻 FinalCTA.tsx                  (CTA component - duplicate of components/FinalCTA.tsx)
└── 💻 SectionHeader.tsx             (Section header - old version)

📁 ui/
├── 💻 badge.tsx                     (Badge - duplicate of ui/badge.tsx)
├── 💻 button.tsx                    (Button - duplicate of ui/button.tsx)
├── 💻 card.tsx                      (Card - duplicate of ui/card.tsx)
└── 💻 utils.ts                      (Utils - duplicate of ui/utils.ts)

📁 styles/
├── 🎨 fonts.css                     (Font imports - duplicate of src/styles/fonts.css)
└── 🎨 theme.css                     (Theme CSS - duplicate of src/styles/theme.css)

📁 root/
├── 📄 COMPONENT-SPECIFICATIONS.md   (Component specs docs)
├── 📄 DESIGN-RATIONALE.md           (Design rationale docs)
├── 📄 IMPLEMENTATION-SUMMARY-SEGMENTATION-ICONS.md
├── 📄 MARKET-SEGMENTATION-ICONS-DOCUMENTATION.md
├── 📄 QUICK-REFERENCE-SEGMENTATION-ICONS.md
├── 📄 README.md                     (Main readme)
└── 📦 package.json                  (Package manifest)
```

**Total:** 15 files (6 TypeScript, 6 markdown, 2 CSS, 1 JSON)

---

## 🗑️ GROUP 4: /charts-export-package/ (12 files)

**Location:** Root folder - charts export package  
**Purpose:** Exportable charts package  
**Why Delete:** Active charts in `/src/app/components/ui/chart.tsx`  
**Risk:** 🟢 LOW - No active imports

### Files to Delete:

```
📁 components/
├── 💻 chart-title-header.tsx        (Chart header - duplicate)
└── 💻 chart.tsx                     (Chart component - duplicate)

📁 configurations/
├── 📄 chart-config-templates.md     (Config templates)
├── 💻 competitive-landscape-charts.tsx (Chart configs)
└── 💻 market-analysis-charts.tsx    (Chart configs)

📁 design-specs/
├── 📄 chart-colors.md               (Color specifications)
├── 📄 chart-styling-rules.md        (Styling rules)
└── 📄 chart-typography.md           (Typography specs)

📁 root/
├── 📄 CHARTS-OVERVIEW.md            (Overview documentation)
├── 📄 FOLDER-STRUCTURE-AND-EXPORT-GUIDE.md
├── 📄 IMPLEMENTATION-GUIDE.md       (Implementation guide)
└── 📄 README.md                     (Main readme)
```

**Total:** 12 files (4 TypeScript, 8 markdown)

---

## 🗑️ GROUP 5: /src/app/pages/DesignSystemPage.tsx (1 file)

**Location:** Pages folder  
**Purpose:** Old design system showcase page  
**Why Delete:** Duplicate of `/src/app/pages/DesignSystem.tsx` (active version)  
**Risk:** 🟢 LOW - Not imported in App.tsx

### File to Delete:

```
💻 DesignSystemPage.tsx              (580 lines - old design system page)
```

**Comparison:**
- ❌ **DesignSystemPage.tsx** - Imports from `/design-system/` (being deleted)
- ✅ **DesignSystem.tsx** - Self-contained, used in App.tsx line 23

**Total:** 1 file

---

## 📊 DELETION SUMMARY

| Group | Location | Files | Type | Risk |
|-------|----------|-------|------|------|
| **1** | `/design-system/` | 13 | Docs + Tokens | ⚠️ LOW* |
| **2** | `/src/design-system/` | 51 | Components | 🟢 LOW |
| **3** | `/design-system-export/` | 15 | Export Package | 🟢 LOW |
| **4** | `/charts-export-package/` | 12 | Charts Package | 🟢 LOW |
| **5** | `/src/app/pages/DesignSystemPage.tsx` | 1 | Page | 🟢 LOW |
| | **TOTAL** | **92 files** | Mixed | 🟢 **LOW** |

*⚠️ Group 1 has one dependency (DesignSystemPage.tsx) which is also being deleted

---

## 🔍 FILE SIZE BREAKDOWN

```
TypeScript files:    ~65 files    (~3-4 MB)
Markdown files:      ~25 files    (~2-3 MB)
CSS files:           ~2 files     (~50-100 KB)
JSON files:          ~1 file      (~1-2 KB)
```

**Estimated Total:** 5-8 MB

---

## ✅ VERIFICATION - NO ACTIVE DEPENDENCIES

All files verified with grep searches:

```bash
✅ No imports from /design-system/ (except DesignSystemPage.tsx - also deleted)
✅ No imports from /src/design-system/
✅ No imports from /design-system-export/
✅ No imports from /charts-export-package/
✅ DesignSystemPage.tsx not imported in App.tsx
```

---

## 🎯 WHAT STAYS (ACTIVE FILES)

These remain untouched:

### ✅ Active Components (19 files)
```
/src/app/components/Header.tsx                    ✅ USED
/src/app/components/HeroSection.tsx               ✅ USED
/src/app/components/MarketOverview.tsx            ✅ USED
/src/app/components/ScopeOfReport.tsx             ✅ USED
/src/app/components/MarketAnalysis.tsx            ✅ USED
/src/app/components/MarketDataTable.tsx           ✅ USED
/src/app/components/SegmentationSection.tsx       ✅ USED
/src/app/components/RegionalComparison.tsx        ✅ USED
/src/app/components/GrowthDriversChallenges.tsx   ✅ USED
/src/app/components/CompetitiveLandscape.tsx      ✅ USED
/src/app/components/TableOfContentsSection.tsx    ✅ USED
/src/app/components/TableOfContentsSidebar.tsx    ✅ USED
/src/app/components/TargetAudience.tsx            ✅ USED
/src/app/components/ResearchMethodology.tsx       ✅ USED
/src/app/components/FAQSection.tsx                ✅ USED
/src/app/components/RelatedReports.tsx            ✅ USED
/src/app/components/FinalCTA.tsx                  ✅ USED
/src/app/components/Footer.tsx                    ✅ USED
/src/app/components/FloatingCTA.tsx               ✅ USED
```

### ✅ Active UI Components (~22 used)
```
/src/app/components/ui/badge.tsx                  ✅ ACTIVE
/src/app/components/ui/button.tsx                 ✅ ACTIVE
/src/app/components/ui/card.tsx                   ✅ ACTIVE
/src/app/components/ui/chart.tsx                  ✅ ACTIVE
/src/app/components/ui/chart-title-header.tsx     ✅ ACTIVE
/src/app/components/ui/accordion.tsx              ✅ ACTIVE
/src/app/components/ui/icon-card.tsx              ✅ ACTIVE
/src/app/components/ui/stat-card.tsx              ✅ ACTIVE
/src/app/components/ui/stat-card-group.tsx        ✅ ACTIVE
/src/app/components/ui/text-card.tsx              ✅ ACTIVE
/src/app/components/ui/overhead-text.tsx          ✅ ACTIVE
/src/app/components/ui/section-header.tsx         ✅ ACTIVE
/src/app/components/ui/body-text.tsx              ✅ ACTIVE
/src/app/components/ui/timeline-card.tsx          ✅ ACTIVE
/src/app/components/ui/comparison-parameter-card.tsx ✅ ACTIVE
/src/app/components/ui/analysis-card.tsx          ✅ ACTIVE
/src/app/components/ui/stakeholder-card.tsx       ✅ ACTIVE
/src/app/components/ui/segmentation-card.tsx      ✅ ACTIVE
/src/app/components/ui/methodology-card.tsx       ✅ ACTIVE
/src/app/components/ui/table.tsx                  ✅ ACTIVE
/src/app/components/ui/input.tsx                  ✅ ACTIVE
/src/app/components/ui/progress-bar.tsx           ✅ ACTIVE
/src/app/components/ui/utils.ts                   ✅ ACTIVE
```

### ✅ Active Pages (6 files)
```
/src/app/pages/DesignSystem.tsx                   ✅ ACTIVE (used in App.tsx)
/src/app/pages/MindMapDemo.tsx                    ✅ ACTIVE
/src/app/pages/StakeholderIconsPage.tsx           ✅ ACTIVE
/src/app/pages/SegmentationIconsPage.tsx          ✅ ACTIVE
/src/app/pages/ChartsShowcasePage.tsx             ✅ ACTIVE
/src/app/pages/MarketInsightsExamplePage.tsx      ❓ (verify usage)
```

### ✅ Active Styles (5 files)
```
/src/styles/theme.css                             ✅ ACTIVE (just fixed!)
/src/styles/fonts.css                             ✅ ACTIVE
/src/styles/index.css                             ✅ ACTIVE
/src/styles/tailwind.css                          ✅ ACTIVE
/src/styles/components.css                        ✅ ACTIVE
```

---

## ⚡ NEXT STEPS

**Option A:** Proceed with deletion (recommended)  
**Option B:** Show me specific file contents  
**Option C:** Test one group first  

**Your call! Ready when you are.** 🚀
