/**
 * ⚡ SIMPLE COPY-PASTE TEMPLATE
 * 
 * Copy this entire file to quickly add a sticky TOC to any page.
 * 
 * STEPS:
 * 1. Copy this file
 * 2. Replace the headings and content with yours
 * 3. Done!
 */

import { TableOfContents } from '@/design-system/components';

export default function MyPage() {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
      gap: '64px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px',
    }}>
      
      {/* ============= YOUR CONTENT HERE ============= */}
      <main>
        
        <h1 id="title">Page Title</h1>
        <p>Your introduction text here...</p>
        
        <h2 id="section-1">Section 1</h2>
        <p>Section 1 content...</p>
        
        <h3 id="subsection-1a">Subsection 1A</h3>
        <p>Subsection content...</p>
        
        <h3 id="subsection-1b">Subsection 1B</h3>
        <p>More subsection content...</p>
        
        <h2 id="section-2">Section 2</h2>
        <p>Section 2 content...</p>
        
        <h3 id="subsection-2a">Subsection 2A</h3>
        <p>Subsection content...</p>
        
        <h2 id="section-3">Section 3</h2>
        <p>Section 3 content...</p>
        
      </main>
      
      {/* ============= STICKY TOC (NO CHANGES NEEDED) ============= */}
      <aside>
        <TableOfContents />
      </aside>
      
    </div>
  );
}
