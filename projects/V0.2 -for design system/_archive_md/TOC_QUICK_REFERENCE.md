# Table of Contents - Quick Reference Card

## ⚡ Copy-Paste Template

```tsx
import { TableOfContents } from '@/components/ui/table-of-contents';

const sections = [
  { number: '1', title: 'Section Title', time: '5m', id: 'section-id' },
  // Add more sections...
];

function MyPage() {
  return (
    <div className="flex">
      <TableOfContents sections={sections} />
      <main className="flex-1 min-w-0">
        <section id="section-id">Content</section>
        {/* Add more sections... */}
      </main>
    </div>
  );
}
```

---

## 📋 Required Files

```
/src/app/components/ui/table-of-contents.tsx  ← Main component
/src/app/components/ui/utils.ts               ← cn() utility
```

---

## 📦 Dependencies

```bash
npm install lucide-react clsx tailwind-merge
```

---

## ⚙️ Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `TOCSection[]` | **required** | Array of sections |
| `initialCollapsed` | `boolean` | `false` | Start collapsed |
| `scrollOffset` | `number` | `200` | Active detection offset (px) |
| `scrollToOffset` | `number` | `120` | Scroll-to offset (px) |
| `showMobileButton` | `boolean` | `true` | Show mobile button |
| `stickyTop` | `number` | `72` | Sticky position (px) |
| `className` | `string` | `undefined` | Custom classes |
| `colors` | `object` | `{}` | Custom colors |

---

## 🎨 Section Object Structure

```typescript
{
  number: string;  // "1", "2", "A", "B"
  title: string;   // "Introduction"
  time: string;    // "5m", "10min"
  id: string;      // "intro" (must match <section id="intro">)
}
```

---

## 🎯 Common Patterns

### Start Collapsed
```tsx
<TableOfContents sections={sections} initialCollapsed={true} />
```

### Custom Colors
```tsx
<TableOfContents 
  sections={sections}
  colors={{
    activeBg: '#7f5fe3',
    activeText: '#ffffff',
    badgeActive: '#7f5fe3',
  }}
/>
```

### Adjust Offsets
```tsx
<TableOfContents 
  sections={sections}
  scrollOffset={300}      // Earlier detection
  scrollToOffset={80}     // Match header height
/>
```

### Hide Mobile Button
```tsx
<TableOfContents sections={sections} showMobileButton={false} />
```

---

## ⚠️ Critical Requirements

1. **Section IDs MUST match exactly:**
   ```tsx
   // ✅ Correct
   { id: 'intro' }           // TOC
   <section id="intro">      // HTML
   
   // ❌ Wrong
   { id: 'intro' }           // TOC
   <section id="Introduction">  // HTML (doesn't match!)
   ```

2. **Parent must use flex layout:**
   ```tsx
   // ✅ Correct
   <div className="flex">
     <TableOfContents />
     <main className="flex-1 min-w-0">
   
   // ❌ Wrong
   <div>  // Not flex!
     <TableOfContents />
   ```

3. **Main content needs min-w-0:**
   ```tsx
   <main className="flex-1 min-w-0">  // min-w-0 is important!
   ```

---

## 🐛 Troubleshooting

### Issue: Sections not highlighting
**Fix:** Check section IDs match, adjust `scrollOffset`

### Issue: No smooth scroll
**Fix:** Add to CSS:
```css
html { scroll-behavior: smooth; }
```

### Issue: TOC overlaps content
**Fix:** Use proper flex layout with `min-w-0` on main

### Issue: Mobile button not showing
**Fix:** Check z-index conflicts, ensure no `overflow:hidden` on body

---

## 📱 Responsive Behavior

| Screen | Behavior |
|--------|----------|
| **Desktop** (lg+) | Sticky sidebar, collapsible |
| **Mobile** (< lg) | Hidden sidebar, floating button + drawer |

---

## 🎨 Color Customization

```tsx
colors={{
  activeBg: '#f5f5f5',        // Active section background
  activeText: '#171717',      // Active section text
  completedText: '#171717',   // Completed section text
  upcomingText: '#737373',    // Upcoming section text
  badgeActive: '#171717',     // Active/completed badge
  badgeUpcoming: '#f5f5f5',   // Upcoming badge background
  hoverBg: '#fafafa',         // Hover background
}}
```

---

## 📊 States Explained

| State | Appearance | When |
|-------|------------|------|
| **Active** | Bold, highlighted, dark badge | Currently viewing |
| **Completed** | Checkmark icon, semi-transparent | Scrolled past |
| **Upcoming** | Faded, number badge | Not reached yet |

---

## 🔧 Utilities

### Calculate Total Time
```tsx
const totalTime = sections.reduce((acc, s) => 
  acc + parseInt(s.time), 0
);
console.log(`${totalTime}m total`);
```

### Generate Sections from Headings
```tsx
const headings = document.querySelectorAll('h2');
const sections = Array.from(headings).map((h, i) => ({
  number: `${i + 1}`,
  title: h.textContent || '',
  time: '5m',
  id: h.id || `section-${i}`,
}));
```

---

## 📚 Full Documentation

- **Complete Guide:** `/TOC_DOCUMENTATION.md`
- **Usage Examples:** `/TOC_USAGE_GUIDE.md`
- **Project Docs:** `/PROJECT_DOCUMENTATION.md`

---

## ✅ Checklist Before Using

- [ ] Copied component file
- [ ] Installed dependencies
- [ ] Created section data array
- [ ] Added matching IDs to HTML sections
- [ ] Used flex layout with `min-w-0` on main
- [ ] Tested scroll behavior
- [ ] Checked mobile responsiveness

---

**Ready to use in any project!** 🚀
