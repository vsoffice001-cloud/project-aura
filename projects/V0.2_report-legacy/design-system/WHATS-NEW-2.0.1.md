# 🎉 What's New in Project KP 2.0.1

**Release Date:** January 23, 2026  
**Type:** Feature Update (Non-Breaking)  
**Time to Read:** 2 minutes

---

## ✨ 3 New Token Systems Added

### 1. 🎨 **Border Radius - Intent-Driven**

**Before:** "Should this be 5px or 8px?"  
**Now:** "What kind of component is this?"

```css
/* Each size has a PURPOSE */
--radius-xs: 2.5px     /* Micro elements (badges, tags) */
--radius-sm: 5px       /* Ken standard (buttons, inputs) ⭐ */
--radius-md: 10px      /* Standard cards */
--radius-lg: 15px      /* Modals, dialogs */
--radius-xl: 20px      /* Hero containers */
--radius-full: 9999px  /* Circular (avatars) */
```

**Quick Use:**
```tsx
<button className="rounded-[5px]">Ken Standard</button>
<div className="rounded-[10px]">Card</div>
<div className="rounded-[15px]">Modal</div>
```

---

### 2. 🏔️ **Elevation - Semantic Depth**

**Before:** "How much shadow should this have?"  
**Now:** "What UI layer is this?"

```css
/* Each level is a LAYER in your UI */
--elevation-flat: none         /* No lift */
--elevation-xs: ...            /* Minimal (borders) */
--elevation-sm: ...            /* Subtle hover */
--elevation-md: ...            /* Standard cards ⭐ */
--elevation-lg: ...            /* Modals, dialogs */
--elevation-xl: ...            /* Deep overlays */
```

**Quick Use:**
```css
.card { box-shadow: var(--elevation-md); }
.modal { box-shadow: var(--elevation-lg); }
.cta:hover { box-shadow: var(--shadow-brand-red-hover); }
```

---

### 3. ⚡ **Transitions - Feel Tuning**

**Before:** "How fast should this animate?"  
**Now:** "What kind of interaction is this?"

```css
/* Each duration has a FEEL */
--duration-xxs: 150ms   /* Micro-interactions */
--duration-xs: 200ms    /* Quick feedback */
--duration-sm: 300ms    /* Default (recommended) ⭐ */
--duration-md: 400ms    /* State changes */
--duration-lg: 500ms    /* Content */
--duration-xl: 600ms    /* Page transitions */
--duration-xxl: 700ms   /* Loading */
--duration-xxxl: 800ms  /* Emphasis */
--duration-max: 900ms   /* Dramatic */

/* Recommended timing function */
--timing-ease-out: cubic-bezier(0.16, 1, 0.3, 1)  /* Natural feel ⭐ */
```

**Quick Use:**
```css
.button {
  transition: all var(--duration-sm) var(--timing-ease-out);
}
```

---

## 🎯 Why These Changes?

### **Intent-Driven = Faster Decisions**

❌ **Old Way:**
```css
/* Guessing and trial/error */
.button { border-radius: 5px; }   /* Is this right? */
.card { border-radius: 8px; }     /* Or maybe 10px? */
.modal { border-radius: 12px; }   /* Too much? */
```

✅ **New Way:**
```css
/* Purpose-driven - obvious choices */
.button { border-radius: var(--radius-sm); }   /* Forms/inputs */
.card { border-radius: var(--radius-md); }     /* Cards */
.modal { border-radius: var(--radius-lg); }    /* Modals */
```

---

## 📦 How to Use

### **CSS Variables (Easiest)**

```css
.my-card {
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-md);
  transition: all var(--duration-sm) var(--timing-ease-out);
}

.my-card:hover {
  box-shadow: var(--elevation-sm);
}
```

### **TypeScript/React**

```typescript
import { borderRadius, shadows, transitions } from '@/design-system';

const styles = {
  borderRadius: borderRadius.md,  // '10px'
  boxShadow: shadows.md,          // '0 4px 12px...'
  transition: `all ${transitions.duration.sm} ${transitions.timing.easeOut}`,
};
```

### **Tailwind**

```tsx
<div 
  className="rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-[300ms]"
  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
>
  Card content
</div>
```

---

## 🚀 Common Patterns

### **Standard Button**
```css
.button {
  border-radius: var(--radius-sm);     /* 5px - Ken standard */
  transition: all var(--duration-xs) var(--timing-ease-out);  /* 200ms */
}
```

### **Card Component**
```css
.card {
  border-radius: var(--radius-md);     /* 10px */
  box-shadow: var(--elevation-md);     /* Standard */
  transition: box-shadow var(--duration-sm) var(--timing-ease-out);
}

.card:hover {
  box-shadow: var(--elevation-sm);     /* Subtle lift */
}
```

### **Modal/Dialog**
```css
.modal {
  border-radius: var(--radius-lg);     /* 15px - spacious */
  box-shadow: var(--elevation-lg);     /* Elevated */
  transition: opacity var(--duration-xl) var(--timing-ease-in-out);  /* 600ms */
}
```

### **CTA with Brand Shadow**
```css
.cta {
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-brand-red);
  transition: all var(--duration-sm) var(--timing-ease-out);
}

.cta:hover {
  box-shadow: var(--shadow-brand-red-hover);
}
```

---

## ✅ Quick Reference Table

| What | CSS Variable | Value | When to Use |
|------|--------------|-------|-------------|
| **Button radius** | `--radius-sm` | 5px | Buttons, inputs, chips |
| **Card radius** | `--radius-md` | 10px | Cards, panels, tables |
| **Modal radius** | `--radius-lg` | 15px | Dialogs, modals |
| **Card shadow** | `--elevation-md` | 0 4px 12px | Standard cards |
| **Modal shadow** | `--elevation-lg` | 0 12px 28px | Modals, dropdowns |
| **Button transition** | `--duration-xs` | 200ms | Quick feedback |
| **Default transition** | `--duration-sm` | 300ms | Most interactions |
| **Page transition** | `--duration-xl` | 600ms | Modals, drawers |
| **Timing function** | `--timing-ease-out` | cubic-bezier(...) | Recommended |

---

## 🎨 Updated Files

✅ `/design-system/spacing.ts` - TypeScript exports  
✅ `/src/styles/theme.css` - CSS variables  
✅ `/design-system/README.md` - Complete documentation  
✅ `/design-system/CHANGELOG.md` - Version history  

---

## 🔄 Migration

**Good News:** 100% backward compatible! No breaking changes.

**Old variables still work:**
- ✅ You can update at your own pace
- ✅ New projects should use new tokens
- ✅ Existing code won't break

---

## 📖 Learn More

- **Full Docs:** `/design-system/README.md`
- **Changelog:** `/design-system/CHANGELOG.md`
- **Quick Ref:** `/design-system/QUICK-REFERENCE.md`

---

## 🎉 That's It!

**25+ new tokens** for border radius, elevation, and transitions.  
**Intent-driven design** = faster decisions, better consistency.  
**100% backward compatible** = no migration stress.

**Start using these today! 🚀**

---

**Version:** 2.0.1  
**Status:** Production Ready ✅
