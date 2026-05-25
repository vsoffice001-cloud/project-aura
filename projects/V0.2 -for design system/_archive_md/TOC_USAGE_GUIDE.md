# 📋 Sticky TOC (Table of Contents) - Copy & Paste Guide

## ✅ What You Need to Copy

The **TableOfContents component** is already created in your design system!

**Location:** `/src/design-system/components/molecules/TableOfContents/`

---

## 🚀 Quick Copy & Paste Usage

### Option 1: Auto-Generate TOC (Simplest)

Just add your headings with IDs, then drop in the component:

```tsx
import { TableOfContents } from '@/design-system/components';

function MyPage() {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <h1 id="introduction">Introduction</h1>
        <p>Content here...</p>
        
        <h2 id="getting-started">Getting Started</h2>
        <p>More content...</p>
        
        <h2 id="features">Features</h2>
        <p>Even more content...</p>
        
        <h3 id="feature-1">Feature 1</h3>
        <p>Details...</p>
      </main>
      
      {/* Sticky TOC Sidebar */}
      <aside style={{ width: '240px' }}>
        <TableOfContents />
      </aside>
    </div>
  );
}
```

**That's it!** The TOC auto-generates from your page headings.

---

### Option 2: Manual TOC Items (More Control)

Provide custom items:

```tsx
import { TableOfContents } from '@/design-system/components';

function MyPage() {
  const tocItems = [
    { id: 'intro', label: 'Introduction', level: 1 },
    { id: 'setup', label: 'Setup', level: 1 },
    { id: 'install', label: 'Installation', level: 2 },
    { id: 'config', label: 'Configuration', level: 2 },
    { id: 'usage', label: 'Usage', level: 1 },
    { id: 'examples', label: 'Examples', level: 2 },
  ];
  
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <main style={{ flex: 1 }}>
        <h1 id="intro">Introduction</h1>
        <h1 id="setup">Setup</h1>
        <h2 id="install">Installation</h2>
        <h2 id="config">Configuration</h2>
        <h1 id="usage">Usage</h1>
        <h2 id="examples">Examples</h2>
      </main>
      
      <aside style={{ width: '240px' }}>
        <TableOfContents items={tocItems} />
      </aside>
    </div>
  );
}
```

---

## 📐 Complete Layout Pattern

### Full Page with Sticky TOC

```tsx
import { TableOfContents, Section } from '@/design-system/components';

function DocumentationPage() {
  return (
    <Section>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 240px',
        gap: '64px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Main Content Area */}
        <main>
          <h1 id="introduction">Introduction</h1>
          <p>Welcome to our documentation...</p>
          
          <h2 id="quick-start">Quick Start</h2>
          <p>Get started in 5 minutes...</p>
          
          <h3 id="installation">Installation</h3>
          <p>Run npm install...</p>
          
          <h3 id="first-steps">First Steps</h3>
          <p>Create your first app...</p>
          
          <h2 id="advanced">Advanced Usage</h2>
          <p>Deep dive into features...</p>
          
          <h3 id="customization">Customization</h3>
          <p>Customize everything...</p>
          
          <h2 id="api">API Reference</h2>
          <p>Complete API docs...</p>
        </main>
        
        {/* Sticky TOC Sidebar */}
        <aside>
          <TableOfContents 
            title="On This Page"
            top="100px"
          />
        </aside>
      </div>
    </Section>
  );
}
```

---

## 🎨 Customization Options

### All Available Props

```tsx
<TableOfContents
  // Custom items (optional - auto-generates if not provided)
  items={[
    { id: 'section-1', label: 'Section 1', level: 1 },
    { id: 'section-2', label: 'Section 2', level: 2 },
  ]}
  
  // Title
  title="On This Page"  // or "Contents" or "Jump to..."
  
  // Sticky position from top
  top="100px"  // Adjust based on your header height
  
  // Show active indicator bar
  showActiveIndicator={true}
  
  // Smooth scroll behavior
  smoothScroll={true}
  
  // Custom styles
  style={{ width: '240px' }}
  className="my-custom-class"
/>
```

---

## 📱 Responsive Pattern

Hide TOC on mobile, show on desktop:

```tsx
import { TableOfContents } from '@/design-system/components';

function ResponsivePage() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr',
      gap: '48px',
    }}>
      <main>
        {/* Content */}
      </main>
      
      {/* Show only on desktop */}
      <aside 
        style={{ 
          width: '240px',
          display: 'none',
        }}
        className="desktop-only"
      >
        <TableOfContents />
      </aside>
    </div>
  );
}

// In your CSS:
// @media (min-width: 1024px) {
//   .desktop-only { display: block !important; }
// }
```

Or use Tailwind:

```tsx
<aside className="hidden lg:block w-60">
  <TableOfContents />
</aside>
```

---

## 🎯 Real-World Examples

### Example 1: Documentation Page

```tsx
import { TableOfContents, Section, Heading } from '@/design-system/components';

function Docs() {
  return (
    <div style={{ display: 'flex', gap: '64px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <Heading level="h1" id="getting-started">Getting Started</Heading>
        <p>Lorem ipsum...</p>
        
        <Heading level="h2" id="installation">Installation</Heading>
        <p>Lorem ipsum...</p>
        
        <Heading level="h2" id="usage">Usage</Heading>
        <p>Lorem ipsum...</p>
      </main>
      
      {/* TOC */}
      <aside style={{ width: '240px', flexShrink: 0 }}>
        <TableOfContents title="Contents" />
      </aside>
    </div>
  );
}
```

---

### Example 2: Blog Post

```tsx
import { TableOfContents } from '@/design-system/components';

function BlogPost() {
  const tocItems = [
    { id: 'intro', label: 'Introduction', level: 1 },
    { id: 'problem', label: 'The Problem', level: 1 },
    { id: 'solution', label: 'Our Solution', level: 1 },
    { id: 'results', label: 'Results', level: 2 },
    { id: 'metrics', label: 'Key Metrics', level: 3 },
    { id: 'conclusion', label: 'Conclusion', level: 1 },
  ];
  
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '48px' }}>
      <div>
        <h1 id="intro">Introduction</h1>
        {/* Article content */}
      </div>
      
      <TableOfContents items={tocItems} top="80px" />
    </article>
  );
}
```

---

### Example 3: Long Form Report

```tsx
import { TableOfContents, Section } from '@/design-system/components';

function Report() {
  return (
    <>
      {/* Header */}
      <Section background="dark" paddingY="default">
        <h1 style={{ color: 'white' }}>Market Research Report</h1>
      </Section>
      
      {/* Content + TOC */}
      <Section>
        <div style={{ display: 'flex', gap: '64px' }}>
          <main style={{ flex: 1 }}>
            <h2 id="executive-summary">Executive Summary</h2>
            <p>Key findings...</p>
            
            <h2 id="methodology">Methodology</h2>
            <p>Our approach...</p>
            
            <h2 id="findings">Findings</h2>
            <p>Detailed results...</p>
            
            <h3 id="market-size">Market Size</h3>
            <p>$45.2M market...</p>
            
            <h3 id="growth-trends">Growth Trends</h3>
            <p>8.9% CAGR...</p>
            
            <h2 id="recommendations">Recommendations</h2>
            <p>Our suggestions...</p>
          </main>
          
          <aside style={{ width: '240px' }}>
            <TableOfContents 
              title="Report Sections"
              top="120px"
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
```

---

## 🎨 Styling Variations

### Custom Colors

```tsx
<TableOfContents
  style={{
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
  }}
/>
```

### With Border

```tsx
<TableOfContents
  style={{
    borderLeft: '2px solid #e5e5e5',
    paddingLeft: '16px',
  }}
/>
```

### Compact Version

```tsx
<TableOfContents
  title="Jump to"
  style={{
    fontSize: '14px',
    width: '200px',
  }}
/>
```

---

## ⚡ Pro Tips

### Tip 1: Adjust Sticky Position

Match your header height:

```tsx
// If header is 80px tall
<TableOfContents top="80px" />

// If header is 100px tall
<TableOfContents top="100px" />

// With extra spacing
<TableOfContents top="120px" />
```

### Tip 2: Manual Items for Complex Structures

Use manual items when you have custom labels:

```tsx
const items = [
  { id: 'intro', label: '👋 Introduction', level: 1 },
  { id: 'features', label: '✨ Features', level: 1 },
  { id: 'pricing', label: '💰 Pricing', level: 1 },
];

<TableOfContents items={items} />
```

### Tip 3: Ensure IDs on Headings

Make sure all headings have IDs:

```tsx
// ✅ Good
<h2 id="my-section">My Section</h2>

// ❌ Bad - no ID
<h2>My Section</h2>
```

### Tip 4: Responsive Layout

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media (min-width: 1024px)': {
    gridTemplateColumns: '1fr 240px',
  }
}}>
  <main>{/* Content */}</main>
  <aside className="hidden lg:block">
    <TableOfContents />
  </aside>
</div>
```

---

## 🔧 Features Included

✅ **Auto-generates from page headings** - No setup needed  
✅ **Manual item support** - Full control when needed  
✅ **Active section highlighting** - Shows current section  
✅ **Smooth scrolling** - Nice UX  
✅ **Sticky positioning** - Always visible  
✅ **Multi-level support** - h1, h2, h3, etc.  
✅ **Indentation by level** - Visual hierarchy  
✅ **Hover effects** - Interactive feedback  
✅ **Accessible** - Proper ARIA labels  

---

## 📋 Complete Copy-Paste Template

Save this as a starter template:

```tsx
import { TableOfContents, Section } from '@/design-system/components';

function MyPage() {
  return (
    <Section>
      {/* Two-column layout: content + TOC */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        gap: '64px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* ====== MAIN CONTENT ====== */}
        <main>
          <h1 id="title">Page Title</h1>
          <p>Content here...</p>
          
          <h2 id="section-1">Section 1</h2>
          <p>More content...</p>
          
          <h3 id="subsection-1">Subsection 1</h3>
          <p>Even more...</p>
          
          <h2 id="section-2">Section 2</h2>
          <p>And more...</p>
        </main>
        
        {/* ====== STICKY TOC ====== */}
        <aside>
          <TableOfContents 
            title="On This Page"
            top="100px"
          />
        </aside>
      </div>
    </Section>
  );
}

export default MyPage;
```

**Just copy this entire template and replace the content!**

---

## 🎉 Summary

### What to Copy & Paste:

**Nothing!** The component is already in your design system.

### How to Use:

1. **Import it:**
   ```tsx
   import { TableOfContents } from '@/design-system/components';
   ```

2. **Add to your page:**
   ```tsx
   <aside style={{ width: '240px' }}>
     <TableOfContents />
   </aside>
   ```

3. **Ensure headings have IDs:**
   ```tsx
   <h2 id="my-section">My Section</h2>
   ```

4. **Done!** ✅

---

## 🔗 Files to Reference

- **Component:** `/src/design-system/components/molecules/TableOfContents/TableOfContents.tsx`
- **Export:** `/src/design-system/components/index.ts`
- **This Guide:** `/TOC_USAGE_GUIDE.md`

---

**Now you can add a sticky TOC to any page in seconds!** 🚀
