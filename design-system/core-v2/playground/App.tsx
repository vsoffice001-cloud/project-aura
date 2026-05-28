import React from 'react';

/**
 * Playground App · entry hub for Ken DS v2.
 * Links to charts/tables showcase (port 3070) + Storybook + v1 reference (port 3040).
 */
export default function App(): React.ReactElement {
  const card: React.CSSProperties = {
    display: 'block',
    padding: '20px 24px',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '8px',
    background: '#fff',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 200ms, transform 200ms',
  };
  const title: React.CSSProperties = { fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: 'rgba(26,26,46,0.92)' };
  const desc: React.CSSProperties = { fontSize: '12px', color: 'rgba(0,0,0,0.62)' };
  const port: React.CSSProperties = { fontSize: '10px', fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)', marginTop: '8px', display: 'block' };

  return (
    <main style={{ padding: '2rem', fontFamily: 'DM Sans, sans-serif', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>
        Ken Research · Design System v2
      </h1>
      <p style={{ color: 'rgba(0,0,0,0.62)', marginBottom: '32px' }}>
        Token-only · React 19 + Next 15 + Tailwind v4 · soft editorial periwinkle palette.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <a href="http://localhost:3070" target="_blank" rel="noopener noreferrer" style={card}>
          <div style={title}>Charts &amp; Tables Showcase</div>
          <div style={desc}>21 chart/table demos · light + dark + compare · WCAG audited.</div>
          <code style={port}>localhost:3070</code>
        </a>
        <a href="http://localhost:3040/test/phase-2" target="_blank" rel="noopener noreferrer" style={card}>
          <div style={title}>v1 PDP Reference</div>
          <div style={desc}>v0.4 product page · canonical visual baseline for all charts.</div>
          <code style={port}>localhost:3040/test/phase-2</code>
        </a>
        <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer" style={card}>
          <div style={title}>Storybook · DS Components</div>
          <div style={desc}>Atoms · molecules · organisms · token references.</div>
          <code style={port}>localhost:6006</code>
        </a>
      </div>

      <div className="ds-author-mark" aria-label="Project attribution" />
    </main>
  );
}
