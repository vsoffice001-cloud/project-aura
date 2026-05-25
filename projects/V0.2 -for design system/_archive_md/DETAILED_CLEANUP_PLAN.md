# 🗑️ DETAILED CLEANUP & DELETION PLAN

**Date:** February 13, 2026  
**Status:** Ready for Execution  
**Risk Level:** 🟡 MEDIUM (Requires careful execution)

---

## 📋 TABLE OF CONTENTS

1. [Active Codebase Identification](#active-codebase)
2. [Files to DELETE](#files-to-delete)
3. [Files to KEEP](#files-to-keep)
4. [Import Updates Required](#import-updates)
5. [Execution Steps](#execution-steps)
6. [Verification Checklist](#verification)

---

## 🎯 ACTIVE CODEBASE IDENTIFICATION

### **Primary Active Folder Structure:**
```
/src/app/
├── components/          ✅ ACTIVE - Page-level components (19 files)
├── components/ui/       ✅ ACTIVE - Reusable UI primitives (50+ files)
├── constants/           ✅ ACTIVE - Icon systems (2 files)
├── pages/               ✅ ACTIVE - Demo/showcase pages (6 files)
└── hooks/               ✅ ACTIVE - Custom hooks (1 file)

/src/styles/            ✅ ACTIVE - CSS files (5 files)
```

### **Components Actually Used in App.tsx:**
```typescript
// Page-level components (ACTIVE)
Header, HeroSection, MarketOverview, ScopeOfReport, MarketAnalysis,
MarketDataTable, SegmentationSection, RegionalComparison,
GrowthDriversChallenges, CompetitiveLandscape, TableOfContentsSection,
TargetAudience, ResearchMethodology, FAQSection, RelatedReports,
FinalCTA, Footer, FloatingCTA, TableOfContentsSidebar
```

### **UI Components Actually Used (ACTIVE):**
```typescript
// From /src/app/components/ui/
button, card, chart, chart-title-header, accordion, icon-card,
text-card, overhead-text, section-header, body-text, stat-card,
stat-card-group, comparison-parameter-card, analysis-card,
stakeholder-card, segmentation-card, methodology-card, timeline-card,
table, input, progress-bar, utils
```

---

## 🗑️ FILES TO DELETE

### **CATEGORY 1: Duplicate Design System Folders**

#### **❌ DELETE: /design-system/ (Root folder)**
**Reason:** Old design system tokens/docs. Active system is in `/src/`

**Files to delete:**
```
/design-system/CHANGELOG.md
/design-system/DEVELOPER-HANDOVER-PACKAGE.md
/design-system/FOLDER-STRUCTURE.md
/design-system/HANDOVER-GUIDE.md
/design-system/QUICK-REFERENCE.md
/design-system/README.md
/design-system/SUMMARY.md
/design-system/TYPOGRAPHY-GUIDE.md
/design-system/WHATS-NEW-2.0.1.md
/design-system/colors.ts
/design-system/index.ts
/design-system/spacing.ts
/design-system/typography.ts
```

**Risk:** 🟢 LOW - No imports from this folder in active code

**Verification:**
```bash
# Check no imports
grep -r "from '@/design-system'" src/
grep -r "from './design-system'" src/
```

---

#### **❌ DELETE: /src/design-system/ (Parallel system)**
**Reason:** Duplicate atomic design system. Active components are in `/src/app/components/ui/`

**Folders to delete:**
```
/src/design-system/components/atoms/
/src/design-system/components/molecules/
/src/design-system/components/organisms/
/src/design-system/docs/
/src/design-system/tokens/
```

**Files inside:**
- Badge.tsx (duplicate of /src/app/components/ui/badge.tsx)
- Button.tsx (duplicate of /src/app/components/ui/button.tsx)
- Card.tsx (duplicate of /src/app/components/ui/card.tsx)
- StatCard.tsx (duplicate of /src/app/components/ui/stat-card.tsx)
- Header.tsx (duplicate of /src/app/components/Header.tsx)
- Footer.tsx (duplicate of /src/app/components/Footer.tsx)
- FAQSection.tsx (duplicate of /src/app/components/FAQSection.tsx)
- TableOfContents.tsx (duplicate of /src/app/components/ui/table-of-contents.tsx)
- + 20 more duplicate files

**Risk:** 🟡 MEDIUM - Need to verify no imports

**Verification:**
```bash
# Check no imports
grep -r "from '@/design-system/components" src/app/
```

---

#### **❌ DELETE: /design-system-export/ (Export package)**
**Reason:** Old export package. Not used in active codebase.

**Files to delete:**
```
/design-system-export/COMPONENT-SPECIFICATIONS.md
/design-system-export/DESIGN-RATIONALE.md
/design-system-export/IMPLEMENTATION-SUMMARY-SEGMENTATION-ICONS.md
/design-system-export/MARKET-SEGMENTATION-ICONS-DOCUMENTATION.md
/design-system-export/QUICK-REFERENCE-SEGMENTATION-ICONS.md
/design-system-export/README.md
/design-system-export/package.json
/design-system-export/components/FinalCTA.tsx
/design-system-export/components/SectionHeader.tsx
/design-system-export/styles/fonts.css
/design-system-export/styles/theme.css
/design-system-export/ui/badge.tsx
/design-system-export/ui/button.tsx
/design-system-export/ui/card.tsx
/design-system-export/ui/utils.ts
```

**Risk:** 🟢 LOW - No imports from this folder

**Verification:**
```bash
# Check no imports
grep -r "from '@/design-system-export" src/
grep -r "from './design-system-export" src/
```

---

#### **❌ DELETE: /charts-export-package/ (Charts export)**
**Reason:** Old charts export. Active charts are in `/src/app/components/ui/chart.tsx`

**Files to delete:**
```
/charts-export-package/CHARTS-OVERVIEW.md
/charts-export-package/FOLDER-STRUCTURE-AND-EXPORT-GUIDE.md
/charts-export-package/IMPLEMENTATION-GUIDE.md
/charts-export-package/README.md
/charts-export-package/components/chart-title-header.tsx
/charts-export-package/components/chart.tsx
/charts-export-package/configurations/chart-config-templates.md
/charts-export-package/configurations/competitive-landscape-charts.tsx
/charts-export-package/configurations/market-analysis-charts.tsx
/charts-export-package/design-specs/chart-colors.md
/charts-export-package/design-specs/chart-styling-rules.md
/charts-export-package/design-specs/chart-typography.md
```

**Risk:** 🟢 LOW - Active chart is in `/src/app/components/ui/`

---

### **CATEGORY 2: Unused UI Components**

#### **❌ DELETE: Shadcn UI components NOT used**

Check usage of these components:
```
/src/app/components/ui/alert-dialog.tsx        ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/alert.tsx               ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/aspect-ratio.tsx        ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/avatar.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/breadcrumb.tsx          ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/calendar.tsx            ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/carousel.tsx            ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/checkbox.tsx            ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/collapsible.tsx         ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/command.tsx             ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/context-menu.tsx        ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/dialog.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/drawer.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/dropdown-menu.tsx       ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/form.tsx                ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/hover-card.tsx          ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/input-otp.tsx           ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/label.tsx               ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/menubar.tsx             ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/navigation-menu.tsx     ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/pagination.tsx          ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/popover.tsx             ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/progress.tsx            ❓ NOT FOUND IN IMPORTS (progress-bar.tsx is used)
/src/app/components/ui/radio-group.tsx         ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/resizable.tsx           ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/scroll-area.tsx         ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/select.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/separator.tsx           ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/sheet.tsx               ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/sidebar.tsx             ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/skeleton.tsx            ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/slider.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/sonner.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/switch.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/tabs.tsx                ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/textarea.tsx            ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/toggle-group.tsx        ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/toggle.tsx              ❓ NOT FOUND IN IMPORTS
/src/app/components/ui/tooltip.tsx             ❓ NOT FOUND IN IMPORTS
```

**Risk:** 🟢 LOW - If unused, safe to delete  
**Action:** Need to verify each with grep search

---

### **CATEGORY 3: Unused Page Components**

#### **❌ DELETE or ARCHIVE: Demo/Example Pages (Optional)**

```
/src/app/pages/DesignSystem.tsx               ✅ USED - Keep
/src/app/pages/DesignSystemPage.tsx           ❓ DUPLICATE? Check if used
/src/app/pages/MindMapDemo.tsx                ✅ USED - Keep
/src/app/pages/StakeholderIconsPage.tsx       ✅ USED - Keep
/src/app/pages/SegmentationIconsPage.tsx      ✅ USED - Keep
/src/app/pages/ChartsShowcasePage.tsx         ✅ USED - Keep
/src/app/pages/MarketInsightsExamplePage.tsx  ❓ NOT FOUND - Delete?
/src/app/examples/ExamplePageWithTOC.tsx      ❓ NOT FOUND - Delete?
```

**Risk:** 🟢 LOW - Demo pages, not critical

---

### **CATEGORY 4: Duplicate Top-Level Components**

#### **❌ No duplicates found!**
- `/src/app/components/SectionHeader.tsx` - OLD (different from ui version)
- But NOT a duplicate, serves different purpose (complex header with chapter)

**Decision:** KEEP both. Rename to avoid confusion:
- Keep: `/src/app/components/ui/section-header.tsx` (standard)
- Rename: `/src/app/components/SectionHeader.tsx` → `LegacySectionHeader.tsx` (if used)

---

### **CATEGORY 5: Root Documentation Files**

#### **🟡 ARCHIVE: Old documentation (50+ markdown files)**

**Suggestion:** Move to `/docs-archive/` folder instead of deleting

**Files to move:**
```
All *.md files in root EXCEPT:
- README.md (keep)
- MASTER_COMPONENT_INDEX.md (keep)
- CODE_CLEANUP_AUDIT.md (keep)
- COMPREHENSIVE_COMPONENT_ANALYSIS_PART*.md (keep - these are valuable!)
```

**Risk:** 🟢 LOW - Documentation only

---

## ✅ FILES TO KEEP

### **Active Codebase (DO NOT DELETE):**
```
✅ /src/app/components/*.tsx (19 page components)
✅ /src/app/components/ui/*.tsx (Active UI components)
✅ /src/app/components/figma/ImageWithFallback.tsx (System component)
✅ /src/app/constants/*.tsx (Icon systems)
✅ /src/app/pages/*.tsx (Active demo pages)
✅ /src/app/hooks/*.tsx (Custom hooks)
✅ /src/styles/*.css (All styles)
✅ /src/types/*.ts (TypeScript types)
✅ /package.json
✅ /vite.config.ts
✅ /postcss.config.mjs
```

### **Documentation to Keep:**
```
✅ /README.md
✅ /MASTER_COMPONENT_INDEX.md
✅ /CODE_CLEANUP_AUDIT.md
✅ /COMPREHENSIVE_COMPONENT_ANALYSIS_PART*.md (Parts 1-7)
✅ /guidelines/Guidelines.md
```

---

## 🔧 IMPORT UPDATES REQUIRED

### **No import updates needed!**

✅ All active code imports from `/src/app/components/` or `/src/app/components/ui/`  
✅ No code imports from folders we're deleting  
✅ Safe to proceed with deletion

---

## 📝 EXECUTION STEPS

### **PHASE 1: Verification (REQUIRED FIRST)**

```bash
# 1. Create backup branch
git checkout -b cleanup-backup
git add .
git commit -m "Backup before cleanup"

# 2. Verify no imports from folders to delete
echo "Checking /design-system/ imports..."
grep -r "from '@/design-system'" src/ || echo "✅ No imports found"

echo "Checking /src/design-system/ imports..."
grep -r "from '@/design-system/components" src/app/ || echo "✅ No imports found"

echo "Checking /design-system-export/ imports..."
grep -r "from '@/design-system-export" src/ || echo "✅ No imports found"

echo "Checking /charts-export-package/ imports..."
grep -r "from '@/charts-export-package" src/ || echo "✅ No imports found"

# 3. Test build before deletion
npm run build
```

**✅ If all checks pass, proceed to Phase 2**

---

### **PHASE 2: Safe Deletion (LOW RISK)**

```bash
# Create cleanup branch
git checkout -b feature/cleanup-duplicates

# 1. DELETE: Root design-system folder
rm -rf /design-system/

# 2. DELETE: Src design-system folder
rm -rf /src/design-system/

# 3. DELETE: Design-system-export folder
rm -rf /design-system-export/

# 4. DELETE: Charts-export-package folder
rm -rf /charts-export-package/

# Commit Phase 2
git add .
git commit -m "chore: remove duplicate design system folders"
```

---

### **PHASE 3: Verify Unused UI Components (MEDIUM RISK)**

```bash
# Check each unused shadcn component
for file in alert-dialog alert aspect-ratio avatar breadcrumb calendar \
            carousel checkbox collapsible command context-menu dialog \
            drawer dropdown-menu form hover-card input-otp label menubar \
            navigation-menu pagination popover progress radio-group \
            resizable scroll-area select separator sheet sidebar skeleton \
            slider sonner switch tabs textarea toggle-group toggle tooltip; do
  echo "Checking $file..."
  grep -r "from '@/app/components/ui/$file'" src/app/ || echo "  ❌ Not used"
done
```

**If NOT used, delete:**
```bash
# Example for unused components
rm /src/app/components/ui/alert-dialog.tsx
rm /src/app/components/ui/alert.tsx
# ... etc (only if verified unused)

git add .
git commit -m "chore: remove unused shadcn UI components"
```

---

### **PHASE 4: Clean Unused Pages (LOW RISK)**

```bash
# Check if pages are used
grep -r "DesignSystemPage" src/app/App.tsx || echo "Not used"
grep -r "MarketInsightsExamplePage" src/app/App.tsx || echo "Not used"
grep -r "ExamplePageWithTOC" src/app/App.tsx || echo "Not used"

# If not used, delete
rm /src/app/pages/DesignSystemPage.tsx (if duplicate)
rm /src/app/pages/MarketInsightsExamplePage.tsx (if unused)
rm -rf /src/app/examples/ (if unused)

git add .
git commit -m "chore: remove unused example pages"
```

---

### **PHASE 5: Archive Documentation (OPTIONAL)**

```bash
# Create docs archive
mkdir /docs-archive

# Move old markdown files
mv /AUDIT*.md /docs-archive/
mv /BLITZ*.md /docs-archive/
mv /CHAPTER*.md /docs-archive/
mv /CHARTS*.md /docs-archive/
# ... etc (keep only essential docs in root)

git add .
git commit -m "docs: archive old documentation files"
```

---

### **PHASE 6: Final Verification**

```bash
# 1. Test build
npm run build

# 2. Test dev server
npm run dev
# Manually test all pages:
# - Main landing page
# - /design-system
# - /mind-map-demo
# - /stakeholder-icons
# - /segmentation-icons
# - /charts-showcase

# 3. If all tests pass:
git push origin feature/cleanup-duplicates
```

---

## ✅ VERIFICATION CHECKLIST

After cleanup, verify:

- [ ] **Build succeeds:** `npm run build` completes without errors
- [ ] **Dev server runs:** `npm run dev` starts successfully
- [ ] **Main page loads:** All sections render correctly
- [ ] **Hero card visible:** Glass effect working (bug we fixed)
- [ ] **All demo pages work:** Test each /page route
- [ ] **No console errors:** Check browser console
- [ ] **Components render:** All cards, charts, sections display
- [ ] **Icons load:** Phosphor icons display correctly
- [ ] **Styles apply:** Colors, fonts, spacing correct
- [ ] **No missing imports:** No "module not found" errors

---

## 📊 EXPECTED RESULTS

### **Files Deleted:**
- ❌ `/design-system/` → ~13 files
- ❌ `/src/design-system/` → ~50 files
- ❌ `/design-system-export/` → ~15 files
- ❌ `/charts-export-package/` → ~12 files
- ❌ Unused shadcn UI components → ~30-40 files (if unused)
- ❌ Unused example pages → ~3 files (if unused)
- ❌ Old documentation → ~50 files (archived)

**Total:** ~170-200 files removed/archived

### **Space Saved:**
Estimated: **5-10 MB** of code/docs removed

### **Benefits:**
✅ Cleaner codebase  
✅ Faster builds (fewer files)  
✅ No confusion about which components to use  
✅ Easier maintenance  
✅ Clear folder structure  

---

## 🚨 ROLLBACK PLAN

If anything breaks:

```bash
# Option 1: Revert last commit
git revert HEAD

# Option 2: Reset to backup
git checkout cleanup-backup

# Option 3: Cherry-pick specific commits
git cherry-pick <commit-hash>
```

---

## 🎯 SUMMARY

| Category | Files to Delete | Risk Level | Impact |
|----------|----------------|------------|--------|
| **Design System Folders** | ~90 files | 🟢 LOW | High - Removes confusion |
| **Unused UI Components** | ~30-40 files | 🟡 MEDIUM | Medium - Cleaner ui folder |
| **Unused Pages** | ~3 files | 🟢 LOW | Low - Examples only |
| **Documentation** | ~50 files | 🟢 LOW | Low - Archive, not delete |
| **TOTAL** | ~170-200 files | 🟡 MEDIUM | **High benefit** |

---

## 🚀 RECOMMENDATION

**Execute in this order:**
1. ✅ **Phase 1: Verification** (REQUIRED)
2. ✅ **Phase 2: Delete duplicate folders** (Safe, high impact)
3. 🟡 **Phase 3: Delete unused UI components** (Requires verification)
4. ✅ **Phase 4: Delete unused pages** (Safe if verified)
5. ✅ **Phase 5: Archive docs** (Optional, low risk)
6. ✅ **Phase 6: Final verification** (REQUIRED)

**Estimated time:** 30-60 minutes  
**Risk:** 🟡 MEDIUM (with proper verification, becomes 🟢 LOW)

---

**Ready to execute? Let me know and I'll start with Phase 1! 🚀**
