# 🧹 CODE CLEANUP & DEDUPLICATION AUDIT

**Date:** February 13, 2026  
**Status:** In Progress - Phase 1: Discovery

---

## 🎯 OBJECTIVES

1. ✅ Fix Hero section glass effect bug (COMPLETE)
2. 🔍 Identify duplicate components
3. 🗑️ Remove unused code
4. ✨ Clean and optimize codebase
5. 📚 Ensure design system consistency

---

## ✅ ISSUE #1: HERO SECTION FIXED

### **Problem:**
Hero section "Report Details" card was invisible/blending into background.

### **Root Cause:**
Missing CSS variables in `/src/styles/theme.css`:
- `--glass-bg`, `--glass-border`, `--glass-glow`
- `--glass-text`, `--glass-text-muted`, `--glass-accent`, `--glass-hover`
- `--pattern-opacity`, `--pattern-dot-position`, etc.

### **Solution:** ✅ COMPLETE
Added missing variables to theme.css:
```css
/* GLASS EFFECT (Hero Section Card) */
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-border: rgba(255, 255, 255, 0.15);
--glass-glow: rgba(255, 255, 255, 0.05);
--glass-text: rgba(255, 255, 255, 0.95);
--glass-text-muted: rgba(255, 255, 255, 0.5);
--glass-accent: rgba(176, 31, 36, 0.8);
--glass-hover: rgba(255, 255, 255, 0.12);

/* DOT PATTERN BACKGROUND */
--pattern-opacity: 0.05;
--pattern-dot-position: 1px;
--pattern-dot-size: 1px;
--pattern-grid-size: 20px;
```

**Result:** Hero card now properly visible with glass effect! 🎉

---

## 🔍 ISSUE #2: COMPONENT DUPLICATION ANALYSIS

### **Potential Duplicates Found:**

#### **1. SectionHeader Component - DUPLICATE!**
- `/src/app/components/SectionHeader.tsx` (Page-level)
- `/src/app/components/ui/section-header.tsx` (UI component)

**Analysis Needed:**
- Check if both are identical or serve different purposes
- Consolidate if duplicate
- Update all imports

#### **2. Design System Folders - MULTIPLE SYSTEMS?**
```
/design-system/               # Old design system?
/design-system-export/        # Export package?
/src/design-system/           # Active design system?
```

**Questions:**
- Which is the active system?
- Can we remove old folders?
- Are exports still needed?

#### **3. Badge Component - DUPLICATE!**
- `/src/app/components/ui/badge.tsx`
- `/design-system-export/ui/badge.tsx`
- `/src/design-system/components/atoms/Badge/Badge.tsx`

**Three versions!** Need to consolidate.

#### **4. Button Component - DUPLICATE!**
- `/src/app/components/ui/button.tsx`
- `/design-system-export/ui/button.tsx`
- `/src/design-system/components/atoms/Button/Button.tsx`

**Three versions!** Need to consolidate.

#### **5. Card Component - DUPLICATE!**
- `/src/app/components/ui/card.tsx`
- `/design-system-export/ui/card.tsx`
- `/src/design-system/components/molecules/Card/Card.tsx`

**Three versions!** Need to consolidate.

#### **6. TableOfContents - DUPLICATE!**
- `/src/app/components/TableOfContentsSection.tsx`
- `/src/app/components/TableOfContentsSidebar.tsx`
- `/src/app/components/ui/table-of-contents.tsx`
- `/src/design-system/components/molecules/TableOfContents/TableOfContents.tsx`

**Four versions!** Significant duplication.

#### **7. Footer Component - DUPLICATE!**
- `/src/app/components/Footer.tsx`
- `/src/design-system/components/organisms/Footer/Footer.tsx`

**Two versions!**

#### **8. Header Component - DUPLICATE!**
- `/src/app/components/Header.tsx`
- `/src/design-system/components/organisms/Header/Header.tsx`

**Two versions!**

#### **9. FAQSection Component - DUPLICATE!**
- `/src/app/components/FAQSection.tsx`
- `/src/design-system/components/organisms/FAQSection/FAQSection.tsx`

**Two versions!**

#### **10. FinalCTA Component - DUPLICATE!**
- `/src/app/components/FinalCTA.tsx`
- `/design-system-export/components/FinalCTA.tsx`

**Two versions!**

#### **11. Stats/StatCard - MULTIPLE VERSIONS!**
- `/src/app/components/ui/stat-card.tsx`
- `/src/app/components/ui/stat-card-group.tsx`
- `/src/app/components/ui/stat-badge.tsx`
- `/src/design-system/components/atoms/StatCard/StatCard.tsx`

**Need to verify which is canonical.**

---

## 🗂️ FOLDER STRUCTURE ANALYSIS

### **Active Codebase:**
```
/src/app/components/          # Main components (ACTIVE)
/src/app/components/ui/       # UI primitives (ACTIVE)
/src/app/constants/           # Icon systems (ACTIVE)
/src/styles/                  # Styles (ACTIVE)
```

### **Questionable Folders:**
```
/design-system/               # Old? 🤔
/design-system-export/        # Export package? 🤔
/src/design-system/           # Parallel system? 🤔
/charts-export-package/       # Export package? 🤔
```

### **Documentation Files:**
50+ markdown files in root - many may be outdated.

---

## 📋 CLEANUP RECOMMENDATIONS

### **Phase 1: Investigate (IN PROGRESS)**
- [ ] Compare SectionHeader versions
- [ ] Check which design-system folder is active
- [ ] Verify badge/button/card canonical versions
- [ ] Audit TableOfContents implementations
- [ ] Check Footer/Header usage
- [ ] Review FAQSection implementations

### **Phase 2: Consolidate**
- [ ] Merge duplicate components
- [ ] Update all imports
- [ ] Remove old versions
- [ ] Archive export packages (if not needed)

### **Phase 3: Clean Folders**
- [ ] Remove unused design-system folders
- [ ] Archive old documentation
- [ ] Organize markdown files into `/docs` folder
- [ ] Clean root directory

### **Phase 4: Verify**
- [ ] Test all pages still work
- [ ] Check design system compliance
- [ ] Run build to verify no errors
- [ ] Update documentation

---

## 🎯 PRIORITY ACTIONS

### **HIGH PRIORITY:**
1. ✅ Fix Hero section glass effect (COMPLETE)
2. 🔴 Consolidate SectionHeader (2 versions)
3. 🔴 Consolidate Badge/Button/Card (3 versions each)
4. 🔴 Consolidate TableOfContents (4 versions)

### **MEDIUM PRIORITY:**
5. 🟡 Consolidate Footer/Header/FAQSection (2 versions each)
6. 🟡 Determine active design-system folder
7. 🟡 Review StatCard versions

### **LOW PRIORITY:**
8. 🟢 Clean up root markdown files
9. 🟢 Archive export packages
10. 🟢 Organize documentation

---

## 📊 DUPLICATION STATISTICS

| Component Type | Versions Found | Priority |
|----------------|----------------|----------|
| **SectionHeader** | 2 | HIGH |
| **Badge** | 3 | HIGH |
| **Button** | 3 | HIGH |
| **Card** | 3 | HIGH |
| **TableOfContents** | 4 | HIGH |
| **Footer** | 2 | MEDIUM |
| **Header** | 2 | MEDIUM |
| **FAQSection** | 2 | MEDIUM |
| **FinalCTA** | 2 | MEDIUM |
| **StatCard** | 4 | MEDIUM |
| **Design System Folders** | 3 | MEDIUM |

**Total Duplicates:** ~30 files

---

## 🚨 RISK ASSESSMENT

### **Risks of Cleanup:**
- Breaking imports
- Losing functionality
- Design system inconsistencies
- Build errors

### **Mitigation Strategy:**
1. Create backup branch before cleanup
2. Compare files thoroughly before deletion
3. Update imports carefully
4. Test after each consolidation
5. Keep git history for rollback

---

## 📝 NEXT STEPS

1. **Investigate SectionHeader** - Compare both versions
2. **Check design-system folders** - Which is active?
3. **Compare Badge/Button/Card** - Find canonical versions
4. **Audit TableOfContents** - Which implementation is used?
5. **Create consolidation plan** - Document merge strategy

---

**Status:** Ready to proceed with detailed investigation! 🚀
